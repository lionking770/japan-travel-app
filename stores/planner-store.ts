import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createEmptyPlan,
  flattenPlaces,
  type DetailedPlan,
  type PlaceCategory,
  type SavedPlace,
  type ScheduleItem,
  type StickyNote,
} from "@/lib/planner-types";
import type { WeatherSelection, WeatherSnapshot } from "@/lib/weather-types";

type PlannerView = "list" | "edit";
type EditTab = "place" | "schedule";

type PlacePickMode = {
  category: PlaceCategory;
} | null;

type PersistedSlice = {
  plans: DetailedPlan[];
  draft: DetailedPlan | null;
  view: PlannerView;
  editTab: EditTab;
  quickNotes: StickyNote[];
  prefectureMemos: Record<string, string>;
  weatherSelection: WeatherSelection;
  weatherSnapshot: WeatherSnapshot | null;
};

type PlannerState = PersistedSlice & {
  isHydrated: boolean;
  modalOpen: boolean;
  placePickMode: PlacePickMode;
  pendingPlace: SavedPlace | null;
  mapFocus: SavedPlace | null;
  toast: string | null;
  setHydrated: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  createPlan: () => void;
  openPlan: (id: string) => void;
  deletePlan: (id: string) => void;
  updateDraft: (patch: Partial<DetailedPlan>) => void;
  setEditTab: (tab: EditTab) => void;
  setDuration: (days: number) => void;
  saveDraft: () => void;
  renamePlace: (category: PlaceCategory, placeId: string, name: string) => void;
  removePlace: (category: PlaceCategory, placeId: string) => void;
  addScheduleItem: (day: number) => void;
  updateScheduleItem: (day: number, itemId: string, patch: Partial<ScheduleItem>) => void;
  removeScheduleItem: (day: number, itemId: string) => void;
  startPlacePick: (category: PlaceCategory) => void;
  setPendingPlace: (place: SavedPlace | null) => void;
  confirmPendingPlace: () => void;
  cancelPlacePick: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  focusPlaceOnMap: (placeId: string) => void;
  clearMapFocus: () => void;
  addQuickNote: (note: StickyNote) => void;
  updateQuickNote: (id: string, text: string) => void;
  removeQuickNote: (id: string) => void;
  setPrefectureMemo: (id: string, text: string) => void;
  setWeatherPrefecture: (id: string | null) => void;
  setWeatherCity: (id: string | null) => void;
  setWeatherDates: (patch: Partial<Pick<WeatherSelection, "startDate" | "nights">>) => void;
  setWeatherSnapshot: (snapshot: WeatherSnapshot | null) => void;
};

function ensureScheduleDays(plan: DetailedPlan, days: number): Record<string, ScheduleItem[]> {
  const next: Record<string, ScheduleItem[]> = {};
  for (let day = 1; day <= days; day += 1) {
    next[String(day)] = plan.schedule[String(day)] ?? [];
  }
  return next;
}

function readLegacyJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set, get) => ({
      isHydrated: false,
      plans: [],
      draft: null,
      view: "list",
      editTab: "place",
      quickNotes: [],
      prefectureMemos: {},
      weatherSelection: {
        prefectureId: null,
        cityId: null,
        startDate: "",
        nights: 3,
      },
      weatherSnapshot: null,
      modalOpen: false,
      placePickMode: null,
      pendingPlace: null,
      mapFocus: null,
      toast: null,

      setHydrated: (value) => set({ isHydrated: value }),

      openModal: () =>
        set({
          modalOpen: true,
          view: get().draft ? "edit" : "list",
          placePickMode: null,
          pendingPlace: null,
        }),

      closeModal: () =>
        set({
          modalOpen: false,
          placePickMode: null,
          pendingPlace: null,
          mapFocus: null,
        }),

      createPlan: () =>
        set({
          draft: createEmptyPlan(),
          view: "edit",
          editTab: "place",
          modalOpen: true,
        }),

      deletePlan: (id) => {
        const plans = get().plans.filter((plan) => plan.id !== id);
        const draft = get().draft;
        set({
          plans,
          draft: draft?.id === id ? null : draft,
          view: "list",
          placePickMode: null,
          pendingPlace: null,
          mapFocus: null,
          modalOpen: true,
        });
      },

      openPlan: (id) => {
        const plan = get().plans.find((item) => item.id === id);
        if (!plan) return;
        set({
          draft: structuredClone(plan),
          view: "edit",
          editTab: "place",
          modalOpen: true,
        });
      },

      updateDraft: (patch) => {
        const draft = get().draft;
        if (!draft) return;
        set({ draft: { ...draft, ...patch } });
      },

      setEditTab: (tab) => set({ editTab: tab }),

      setDuration: (days) => {
        const draft = get().draft;
        if (!draft) return;
        const duration = Math.min(Math.max(Math.round(days) || 1, 1), 21);
        set({
          draft: {
            ...draft,
            duration,
            schedule: ensureScheduleDays(draft, duration),
          },
        });
      },

      renamePlace: (category, placeId, name) => {
        const draft = get().draft;
        if (!draft) return;
        const trimmed = name.trim();
        if (!trimmed) return;
        set({
          draft: {
            ...draft,
            places: {
              ...draft.places,
              [category]: draft.places[category].map((place) =>
                place.id === placeId ? { ...place, name: trimmed } : place,
              ),
            },
          },
        });
      },

      saveDraft: () => {
        const draft = get().draft;
        if (!draft) return;
        const saved: DetailedPlan = {
          ...draft,
          title: draft.title.trim() || "제목 없는 계획",
          updatedAt: Date.now(),
        };
        const exists = get().plans.some((plan) => plan.id === saved.id);
        const plans = exists
          ? get().plans.map((plan) => (plan.id === saved.id ? saved : plan))
          : [saved, ...get().plans];
        set({
          plans,
          draft: null,
          view: "list",
          modalOpen: true,
        });
      },

      removePlace: (category, placeId) => {
        const draft = get().draft;
        if (!draft) return;
        set({
          draft: {
            ...draft,
            places: {
              ...draft.places,
              [category]: draft.places[category].filter((place) => place.id !== placeId),
            },
            schedule: Object.fromEntries(
              Object.entries(draft.schedule).map(([day, items]) => [
                day,
                items.filter((item) => item.placeId !== placeId),
              ]),
            ),
          },
        });
      },

      addScheduleItem: (day) => {
        const draft = get().draft;
        if (!draft) return;
        const key = String(day);
        const item: ScheduleItem = {
          id: crypto.randomUUID(),
          time: "09:00",
          placeId: "",
        };
        set({
          draft: {
            ...draft,
            schedule: {
              ...draft.schedule,
              [key]: [...(draft.schedule[key] ?? []), item],
            },
          },
        });
      },

      updateScheduleItem: (day, itemId, patch) => {
        const draft = get().draft;
        if (!draft) return;
        const key = String(day);
        set({
          draft: {
            ...draft,
            schedule: {
              ...draft.schedule,
              [key]: (draft.schedule[key] ?? []).map((item) =>
                item.id === itemId ? { ...item, ...patch } : item,
              ),
            },
          },
        });
      },

      removeScheduleItem: (day, itemId) => {
        const draft = get().draft;
        if (!draft) return;
        const key = String(day);
        set({
          draft: {
            ...draft,
            schedule: {
              ...draft.schedule,
              [key]: (draft.schedule[key] ?? []).filter((item) => item.id !== itemId),
            },
          },
        });
      },

      startPlacePick: (category) =>
        set({
          placePickMode: { category },
          pendingPlace: null,
          mapFocus: null,
          modalOpen: false,
        }),

      setPendingPlace: (place) => set({ pendingPlace: place }),

      confirmPendingPlace: () => {
        const { draft, placePickMode, pendingPlace } = get();
        if (!draft || !placePickMode || !pendingPlace) return;
        set({
          draft: {
            ...draft,
            places: {
              ...draft.places,
              [placePickMode.category]: [
                ...draft.places[placePickMode.category],
                pendingPlace,
              ],
            },
          },
          placePickMode: null,
          pendingPlace: null,
          modalOpen: true,
          view: "edit",
          editTab: "place",
        });
      },

      cancelPlacePick: () =>
        set({
          placePickMode: null,
          pendingPlace: null,
          modalOpen: true,
          view: "edit",
          editTab: "place",
        }),

      showToast: (message) => set({ toast: message }),
      clearToast: () => set({ toast: null }),

      focusPlaceOnMap: (placeId) => {
        const draft = get().draft;
        if (!draft || !placeId) {
          get().showToast("먼저 장소를 선택해 주세요");
          return;
        }
        const place = flattenPlaces(draft.places).find((item) => item.id === placeId);
        if (!place) {
          get().showToast("해당 장소를 찾을 수 없습니다");
          return;
        }
        set({
          mapFocus: place,
          modalOpen: false,
          editTab: "schedule",
        });
      },

      clearMapFocus: () =>
        set({
          mapFocus: null,
          modalOpen: true,
          view: "edit",
          editTab: "schedule",
        }),

      addQuickNote: (note) => set({ quickNotes: [note, ...get().quickNotes] }),

      updateQuickNote: (id, text) =>
        set({
          quickNotes: get().quickNotes.map((note) =>
            note.id === id ? { ...note, text } : note,
          ),
        }),

      removeQuickNote: (id) => {
        const next = get().quickNotes.filter((note) => note.id !== id);
        set({ quickNotes: next });
      },

      setPrefectureMemo: (id, text) =>
        set({
          prefectureMemos: {
            ...get().prefectureMemos,
            [id]: text,
          },
        }),

      setWeatherPrefecture: (id) =>
        set({
          weatherSelection: {
            ...get().weatherSelection,
            prefectureId: id,
            cityId: null,
          },
          weatherSnapshot: null,
        }),

      setWeatherCity: (id) =>
        set({
          weatherSelection: {
            ...get().weatherSelection,
            cityId: id,
          },
        }),

      setWeatherDates: (patch) =>
        set({
          weatherSelection: {
            ...get().weatherSelection,
            ...patch,
          },
        }),

      setWeatherSnapshot: (snapshot) => set({ weatherSnapshot: snapshot }),
    }),
    {
      name: "japan-travel-planner",
      skipHydration: true,
      partialize: (state): PersistedSlice => ({
        plans: state.plans,
        draft: state.draft,
        view: state.view,
        editTab: state.editTab,
        quickNotes: state.quickNotes,
        prefectureMemos: state.prefectureMemos,
        weatherSelection: state.weatherSelection,
        weatherSnapshot: state.weatherSnapshot,
      }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<PersistedSlice>;
        return {
          ...current,
          plans: saved.plans ?? current.plans,
          draft: saved.draft ?? current.draft,
          view: saved.view ?? current.view,
          editTab: saved.editTab ?? current.editTab,
          quickNotes: saved.quickNotes ?? current.quickNotes,
          prefectureMemos: saved.prefectureMemos ?? current.prefectureMemos,
          weatherSelection: saved.weatherSelection ?? current.weatherSelection,
          weatherSnapshot: saved.weatherSnapshot ?? current.weatherSnapshot,
        };
      },
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        const nextQuick =
          state.quickNotes.length > 0
            ? state.quickNotes
            : readLegacyJson<StickyNote[]>("japan-quick-memos", []);
        const nextPrefecture =
          Object.keys(state.prefectureMemos).length > 0
            ? state.prefectureMemos
            : readLegacyJson<Record<string, string>>("japan-prefecture-memos", {});

        usePlannerStore.setState({
          quickNotes: nextQuick,
          prefectureMemos: nextPrefecture,
          isHydrated: true,
        });
      },
    },
  ),
);

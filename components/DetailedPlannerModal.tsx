"use client";

import { Check, ChevronDown, Pencil, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  PLACE_CATEGORIES,
  PLACE_CATEGORY_META,
  flattenPlaces,
  type PlaceCategory,
} from "@/lib/planner-types";
import { usePlannerStore } from "@/stores/planner-store";

export default function DetailedPlannerModal() {
  const view = usePlannerStore((state) => state.view);
  const closeModal = usePlannerStore((state) => state.closeModal);
  const deletePlan = usePlannerStore((state) => state.deletePlan);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(
    null,
  );

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="모달 닫기"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={closeModal}
      />
      <div className="relative flex max-h-[min(90vh,880px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {view === "list" ? (
          <PlanListView onRequestDelete={setPendingDelete} />
        ) : (
          <PlanEditView onRequestDelete={setPendingDelete} />
        )}
      </div>
      {pendingDelete ? (
        <DeleteConfirmDialog
          title={pendingDelete.title}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            deletePlan(pendingDelete.id);
            setPendingDelete(null);
          }}
        />
      ) : null}
    </div>
  );
}

function PlanListView({
  onRequestDelete,
}: {
  onRequestDelete: (target: { id: string; title: string }) => void;
}) {
  const plans = usePlannerStore((state) => state.plans);
  const isHydrated = usePlannerStore((state) => state.isHydrated);
  const createPlan = usePlannerStore((state) => state.createPlan);
  const openPlan = usePlannerStore((state) => state.openPlan);
  const closeModal = usePlannerStore((state) => state.closeModal);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const list = isHydrated ? plans : [];
    if (!keyword) return list;
    return list.filter((plan) => plan.title.toLowerCase().includes(keyword));
  }, [isHydrated, plans, query]);

  const showSuggest = query.trim().length > 0;

  return (
    <>
      <header className="border-b border-zinc-100 px-5 py-4">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">세부 계획 짜기</h2>
            <p className="mt-1 text-sm text-zinc-500">계획을 찾거나 새로 만들어 보세요.</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="계획 검색"
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm outline-none focus:border-zinc-400"
            />
            {showSuggest && (
              <ul className="absolute z-10 mt-2 max-h-56 w-full overflow-y-auto rounded-2xl border border-zinc-200 bg-white py-1 shadow-lg">
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-zinc-400">일치하는 계획이 없습니다</li>
                ) : (
                  filtered.map((plan) => (
                    <li key={plan.id}>
                      <button
                        type="button"
                        onClick={() => openPlan(plan.id)}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-zinc-50"
                      >
                        {plan.title}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={createPlan}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-sm hover:bg-zinc-800"
            aria-label="새 계획"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {!isHydrated ? (
          <p className="py-10 text-center text-sm text-zinc-400">계획을 불러오는 중...</p>
        ) : plans.length === 0 ? (
          <p className="py-10 text-center text-sm text-zinc-400">
            아직 저장된 계획이 없습니다. + 버튼으로 시작하세요.
          </p>
        ) : (
          <ul className="space-y-2">
            {(query.trim() ? filtered : plans).map((plan) => (
              <li
                key={plan.id}
                className="flex items-center rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-white hover:shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => openPlan(plan.id)}
                  className="min-w-0 flex-1 px-4 py-3 text-left"
                >
                  <span className="block truncate text-sm font-medium text-zinc-900">
                    {plan.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-zinc-400">{plan.duration}일 일정</span>
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRequestDelete({
                      id: plan.id,
                      title: plan.title.trim() || "제목 없는 계획",
                    });
                  }}
                  className="mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600"
                  aria-label={`${plan.title} 삭제`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function PlanEditView({
  onRequestDelete,
}: {
  onRequestDelete: (target: { id: string; title: string }) => void;
}) {
  const draft = usePlannerStore((state) => state.draft);
  const editTab = usePlannerStore((state) => state.editTab);
  const setEditTab = usePlannerStore((state) => state.setEditTab);
  const updateDraft = usePlannerStore((state) => state.updateDraft);
  const saveDraft = usePlannerStore((state) => state.saveDraft);
  const closeModal = usePlannerStore((state) => state.closeModal);

  if (!draft) return null;

  return (
    <>
      <header className="flex items-center gap-3 border-b border-zinc-100 px-5 py-4">
        <input
          value={draft.title}
          onChange={(event) => updateDraft({ title: event.target.value })}
          placeholder="여행계획 제목"
          className="h-11 min-w-0 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-medium outline-none focus:border-zinc-400"
        />
        <div className="flex rounded-xl bg-zinc-100 p-1">
          <TabButton active={editTab === "place"} onClick={() => setEditTab("place")}>
            장소
          </TabButton>
          <TabButton active={editTab === "schedule"} onClick={() => setEditTab("schedule")}>
            일정
          </TabButton>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          aria-label="닫기"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {editTab === "place" ? <PlacePanel /> : <SchedulePanel />}
      </div>

      <footer className="flex justify-end gap-2 border-t border-zinc-100 px-5 py-3">
        <button
          type="button"
          onClick={() =>
            onRequestDelete({
              id: draft.id,
              title: draft.title.trim() || "제목 없는 계획",
            })
          }
          className="inline-flex h-11 items-center rounded-xl border border-red-200 px-5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          삭제
        </button>
        <button
          type="button"
          onClick={saveDraft}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800"
        >
          <Save className="h-4 w-4" />
          저장
        </button>
      </footer>
    </>
  );
}

function PlacePanel() {
  const draft = usePlannerStore((state) => state.draft);
  const startPlacePick = usePlannerStore((state) => state.startPlacePick);
  const removePlace = usePlannerStore((state) => state.removePlace);
  const renamePlace = usePlannerStore((state) => state.renamePlace);

  if (!draft) return null;

  return (
    <div className="space-y-3">
      {PLACE_CATEGORIES.map((category) => (
        <PlaceCategoryBlock
          key={category}
          category={category}
          places={draft.places[category]}
          onAdd={() => startPlacePick(category)}
          onRename={(placeId, name) => renamePlace(category, placeId, name)}
          onRemove={(placeId) => removePlace(category, placeId)}
        />
      ))}
    </div>
  );
}

function PlaceCategoryBlock({
  category,
  places,
  onAdd,
  onRename,
  onRemove,
}: {
  category: PlaceCategory;
  places: { id: string; name: string; address: string }[];
  onAdd: () => void;
  onRename: (placeId: string, name: string) => void;
  onRemove: (placeId: string) => void;
}) {
  const meta = PLACE_CATEGORY_META[category];

  return (
    <section className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-800">
          {meta.emoji} {meta.label}
        </h3>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200 hover:bg-zinc-900 hover:text-white"
          aria-label={`${meta.label} 추가`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {places.length === 0 ? (
        <p className="px-1 py-2 text-xs text-zinc-400">아직 없습니다. + 로 지도에서 고르세요.</p>
      ) : (
        <ul className="space-y-1.5">
          {places.map((place) => (
            <PlaceRow
              key={place.id}
              name={place.name}
              address={place.address}
              onRename={(name) => onRename(place.id, name)}
              onRemove={() => onRemove(place.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function PlaceRow({
  name,
  address,
  onRename,
  onRemove,
}: {
  name: string;
  address: string;
  onRename: (name: string) => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  useEffect(() => {
    setValue(name);
  }, [name]);

  function commit() {
    const next = value.trim();
    if (next) onRename(next);
    else setValue(name);
    setEditing(false);
  }

  return (
    <li className="flex items-start justify-between gap-2 rounded-xl bg-white px-3 py-2">
      <span className="min-w-0 flex-1">
        {editing ? (
          <input
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={commit}
            onKeyDown={(event) => {
              if (event.key === "Enter") commit();
              if (event.key === "Escape") {
                setValue(name);
                setEditing(false);
              }
            }}
            className="h-8 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2 text-sm outline-none focus:border-zinc-400"
          />
        ) : (
          <span className="block text-sm text-zinc-800">{name}</span>
        )}
        {address ? <span className="mt-0.5 block text-xs text-zinc-400">{address}</span> : null}
      </span>
      <div className="mt-0.5 flex shrink-0 items-center gap-1">
        {editing ? (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={commit}
            className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            aria-label="이름 저장"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="이름 수정"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="삭제"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </li>
  );
}

function SchedulePanel() {
  const draft = usePlannerStore((state) => state.draft);
  const setDuration = usePlannerStore((state) => state.setDuration);
  const addScheduleItem = usePlannerStore((state) => state.addScheduleItem);
  const updateScheduleItem = usePlannerStore((state) => state.updateScheduleItem);
  const removeScheduleItem = usePlannerStore((state) => state.removeScheduleItem);
  const focusPlaceOnMap = usePlannerStore((state) => state.focusPlaceOnMap);
  const [openDay, setOpenDay] = useState(1);

  if (!draft) return null;

  const placeOptions = flattenPlaces(draft.places);

  return (
    <div>
      <label className="mb-4 flex items-center gap-3 text-sm">
        <span className="font-medium text-zinc-700">여행 기간</span>
        <input
          type="number"
          min={1}
          max={21}
          value={draft.duration}
          onChange={(event) => setDuration(Number(event.target.value))}
          className="h-10 w-20 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none"
        />
        <span className="text-zinc-400">일</span>
      </label>

      <div className="space-y-2">
        {Array.from({ length: draft.duration }, (_, index) => index + 1).map((day) => {
          const items = draft.schedule[String(day)] ?? [];
          const opened = openDay === day;
          return (
            <section key={day} className="overflow-hidden rounded-2xl border border-zinc-100">
              <div className="flex items-center bg-zinc-50">
                <button
                  type="button"
                  onClick={() => setOpenDay(opened ? 0 : day)}
                  className="flex flex-1 items-center justify-between px-4 py-3 text-left text-sm font-semibold"
                >
                  {day}일차
                  <ChevronDown className={`h-4 w-4 text-zinc-400 ${opened ? "rotate-180" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addScheduleItem(day);
                    setOpenDay(day);
                  }}
                  className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-700 ring-1 ring-zinc-200"
                  aria-label={`${day}일차 일정 추가`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {opened && (
                <div className="space-y-2 px-3 py-3">
                  {items.length === 0 ? (
                    <p className="px-1 text-xs text-zinc-400">+ 로 시간과 장소를 넣으세요.</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <input
                          type="time"
                          value={item.time}
                          onChange={(event) =>
                            updateScheduleItem(day, item.id, { time: event.target.value })
                          }
                          className="h-10 rounded-xl border border-zinc-200 bg-white px-2 text-sm"
                        />
                        <select
                          value={item.placeId}
                          onChange={(event) =>
                            updateScheduleItem(day, item.id, { placeId: event.target.value })
                          }
                          className="h-10 min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-2 text-sm"
                        >
                          <option value="">장소 선택</option>
                          {placeOptions.map((place) => (
                            <option key={place.id} value={place.id}>
                              {PLACE_CATEGORY_META[place.category].emoji} {place.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => focusPlaceOnMap(item.placeId)}
                          disabled={!item.placeId}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 disabled:cursor-not-allowed disabled:text-zinc-300"
                          aria-label="지도에서 보기"
                        >
                          <Search className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeScheduleItem(day, item.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                          aria-label="일정 삭제"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function DeleteConfirmDialog({
  title,
  onCancel,
  onConfirm,
}: {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="삭제 확인 닫기"
        className="absolute inset-0 bg-black/30"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
        <p className="text-center text-sm leading-6 text-zinc-800">
          &quot;{title}&quot; 을(를) 지우시겠습니까?
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            아니오
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 rounded-xl bg-red-600 text-sm font-medium text-white hover:bg-red-700"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
        active ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
      }`}
    >
      {children}
    </button>
  );
}

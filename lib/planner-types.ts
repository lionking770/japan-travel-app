export const PLACE_CATEGORIES = ["stay", "food", "sight", "shop", "other"] as const;

export type PlaceCategory = (typeof PLACE_CATEGORIES)[number];

export const PLACE_CATEGORY_META: Record<
  PlaceCategory,
  { label: string; emoji: string }
> = {
  stay: { label: "숙소", emoji: "🏨" },
  food: { label: "식당", emoji: "🍱" },
  sight: { label: "관광지", emoji: "🏯" },
  shop: { label: "쇼핑", emoji: "🛍️" },
  other: { label: "기타", emoji: "🎸" },
};

export type StickyNote = {
  id: string;
  text: string;
  color: string;
};

export type SavedPlace = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  placeId?: string;
};

export type ScheduleItem = {
  id: string;
  time: string;
  placeId: string;
};

export type DetailedPlan = {
  id: string;
  title: string;
  duration: number;
  places: Record<PlaceCategory, SavedPlace[]>;
  schedule: Record<string, ScheduleItem[]>;
  updatedAt: number;
};

export function emptyPlaces(): Record<PlaceCategory, SavedPlace[]> {
  return {
    stay: [],
    food: [],
    sight: [],
    shop: [],
    other: [],
  };
}

export function createEmptyPlan(): DetailedPlan {
  return {
    id: crypto.randomUUID(),
    title: "",
    duration: 3,
    places: emptyPlaces(),
    schedule: { "1": [], "2": [], "3": [] },
    updatedAt: Date.now(),
  };
}

export function flattenPlaces(places: Record<PlaceCategory, SavedPlace[]>) {
  return PLACE_CATEGORIES.flatMap((category) =>
    places[category].map((place) => ({ ...place, category })),
  );
}

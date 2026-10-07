"use client";

import { MapPin, Undo2, X } from "lucide-react";
import { PLACE_CATEGORY_META } from "@/lib/planner-types";
import { usePlannerStore } from "@/stores/planner-store";

export default function PlacePickOverlay() {
  const placePickMode = usePlannerStore((state) => state.placePickMode);
  const pendingPlace = usePlannerStore((state) => state.pendingPlace);
  const mapFocus = usePlannerStore((state) => state.mapFocus);
  const confirmPendingPlace = usePlannerStore((state) => state.confirmPendingPlace);
  const cancelPlacePick = usePlannerStore((state) => state.cancelPlacePick);
  const clearMapFocus = usePlannerStore((state) => state.clearMapFocus);

  if (mapFocus && !placePickMode) {
    return (
      <>
        <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center px-4">
          <div className="pointer-events-auto flex max-w-lg items-center gap-3 rounded-2xl bg-zinc-900/95 px-4 py-3 text-sm text-white shadow-xl">
            <MapPin className="h-4 w-4 shrink-0 text-orange-300" />
            <p className="flex-1">지도에서 보는 중: {mapFocus.name}</p>
            <button
              type="button"
              onClick={clearMapFocus}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
            >
              <Undo2 className="h-3.5 w-3.5" />
              계획으로
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!placePickMode) return null;

  const meta = PLACE_CATEGORY_META[placePickMode.category];

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center px-4">
        <div className="pointer-events-auto flex max-w-lg items-center gap-3 rounded-2xl bg-zinc-900/95 px-4 py-3 text-sm text-white shadow-xl">
          <MapPin className="h-4 w-4 shrink-0 text-orange-300" />
          <p className="flex-1">
            {meta.emoji} {meta.label}에 넣을 장소를 지도에서 클릭하세요.
            {pendingPlace ? ` 선택됨: ${pendingPlace.name}` : ""}
          </p>
          <button
            type="button"
            onClick={cancelPlacePick}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="장소 선택 취소"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-30 flex justify-center px-4">
        <button
          type="button"
          disabled={!pendingPlace}
          onClick={confirmPendingPlace}
          className="h-14 w-[min(92vw,480px)] rounded-2xl bg-orange-500 px-4 text-base font-semibold text-white shadow-2xl disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {pendingPlace ? `[ ${pendingPlace.name} ] 추가하기` : "장소 추가하기"}
        </button>
      </div>
    </>
  );
}

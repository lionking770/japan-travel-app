"use client";

import { ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { PREFECTURES, type Prefecture } from "@/lib/prefectures";
import { usePlannerStore } from "@/stores/planner-store";

export default function PrefectureMemoPopup({ onClose }: { onClose: () => void }) {
  const isHydrated = usePlannerStore((state) => state.isHydrated);
  const memos = usePlannerStore((state) => state.prefectureMemos);
  const setPrefectureMemo = usePlannerStore((state) => state.setPrefectureMemo);
  const [selected, setSelected] = useState<Prefecture | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, Prefecture[]>();
    for (const prefecture of PREFECTURES) {
      const list = map.get(prefecture.region) ?? [];
      list.push(prefecture);
      map.set(prefecture.region, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <Modal
      title={selected ? `${selected.nameKo} 메모` : "도도부현별 메모"}
      subtitle={
        selected
          ? `${selected.nameJa} · 이 지역 일정만 따로 적어 두세요.`
          : "지역을 고르면 전용 메모장이 열립니다."
      }
      onClose={onClose}
      wide
      headerExtra={
        selected ? (
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="inline-flex h-9 items-center gap-1 rounded-full bg-zinc-100 px-3 text-sm text-zinc-700 hover:bg-zinc-200"
          >
            <ChevronLeft className="h-4 w-4" />
            목록
          </button>
        ) : null
      }
    >
      {!isHydrated ? (
        <p className="py-10 text-center text-sm text-zinc-400">메모를 불러오는 중...</p>
      ) : selected ? (
        <textarea
          value={memos[selected.id] ?? ""}
          onChange={(event) => setPrefectureMemo(selected.id, event.target.value)}
          placeholder={`${selected.nameKo}에서 가고 싶은 곳, 맛집, 이동 메모...`}
          className="min-h-80 w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-7 text-zinc-800 outline-none focus:border-zinc-400"
        />
      ) : (
        <div className="space-y-5">
          {grouped.map(([region, list]) => (
            <section key={region}>
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-zinc-400">{region}</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {list.map((prefecture) => {
                  const hasMemo = Boolean(memos[prefecture.id]?.trim());
                  return (
                    <button
                      key={prefecture.id}
                      type="button"
                      onClick={() => setSelected(prefecture)}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-left hover:border-zinc-300 hover:bg-white"
                    >
                      <p className="text-sm font-medium text-zinc-900">{prefecture.nameKo}</p>
                      <p className="mt-0.5 text-xs text-zinc-400">{prefecture.nameJa}</p>
                      {hasMemo ? (
                        <p className="mt-2 text-[11px] text-emerald-600">메모 있음</p>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </Modal>
  );
}

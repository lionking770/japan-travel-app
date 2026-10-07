"use client";

import { Plus, Trash2 } from "lucide-react";
import Modal from "@/components/Modal";
import type { StickyNote } from "@/lib/planner-types";
import { usePlannerStore } from "@/stores/planner-store";

const COLORS = ["#FEF3C7", "#DBEAFE", "#FCE7F3", "#DCFCE7", "#FFEDD5", "#EDE9FE"];

function createNote(): StickyNote {
  return {
    id: crypto.randomUUID(),
    text: "",
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function QuickMemoPopup({ onClose }: { onClose: () => void }) {
  const isHydrated = usePlannerStore((state) => state.isHydrated);
  const notes = usePlannerStore((state) => state.quickNotes);
  const addQuickNote = usePlannerStore((state) => state.addQuickNote);
  const updateQuickNote = usePlannerStore((state) => state.updateQuickNote);
  const removeQuickNote = usePlannerStore((state) => state.removeQuickNote);

  function addNote() {
    addQuickNote(createNote());
  }

  return (
    <Modal
      title="퀵 메모"
      subtitle="스티커 메모처럼 바로 적고, 다 쓰면 버려 주세요."
      onClose={onClose}
      wide
      headerExtra={
        <button
          type="button"
          onClick={addNote}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-amber-950 hover:bg-amber-300"
          aria-label="메모 추가"
        >
          <Plus className="h-4 w-4" />
        </button>
      }
    >
      {!isHydrated ? (
        <p className="py-10 text-center text-sm text-zinc-400">메모를 불러오는 중...</p>
      ) : notes.length === 0 ? (
        <p className="py-10 text-center text-sm text-zinc-400">
          아직 메모가 없습니다. + 로 스티커를 추가하세요.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {notes.map((note) => (
            <article
              key={note.id}
              className="flex min-h-44 flex-col rounded-xl p-3 shadow-sm"
              style={{ backgroundColor: note.color }}
            >
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeQuickNote(note.id)}
                  className="rounded-md p-1 text-zinc-500 hover:bg-black/5 hover:text-zinc-800"
                  aria-label="메모 삭제"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={note.text}
                onChange={(event) => updateQuickNote(note.id, event.target.value)}
                placeholder="메모 적기..."
                className="min-h-28 flex-1 resize-none bg-transparent text-sm leading-6 text-zinc-800 outline-none placeholder:text-zinc-500"
              />
            </article>
          ))}
        </div>
      )}
    </Modal>
  );
}

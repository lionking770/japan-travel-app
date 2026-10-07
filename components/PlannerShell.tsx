"use client";

import { CalendarRange, CloudSun, MapPin, Menu, NotebookPen, StickyNote, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DetailedPlannerModal from "@/components/DetailedPlannerModal";
import Map from "@/components/Map";
import PlacePickOverlay from "@/components/PlacePickOverlay";
import PlannerToast from "@/components/PlannerToast";
import StoreHydration from "@/components/StoreHydration";
import PrefectureMemoPopup from "@/components/PrefectureMemoPopup";
import QuickMemoPopup from "@/components/QuickMemoPopup";
import WeatherPopup from "@/components/WeatherPopup";
import { usePlannerStore } from "@/stores/planner-store";

type Panel = "weather" | "quick" | "prefecture" | null;

export default function PlannerShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modalOpen = usePlannerStore((state) => state.modalOpen);
  const openPlannerModal = usePlannerStore((state) => state.openModal);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  function openPanel(next: Panel) {
    setPanel(next);
    setMenuOpen(false);
  }

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden">
      <StoreHydration />
      <Map />

      <div ref={menuRef} className="absolute right-4 top-4 z-20">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-800 shadow-lg ring-1 ring-black/5"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {menuOpen && (
          <nav className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-white py-1 shadow-xl ring-1 ring-black/5">
            <MenuItem
              icon={<CloudSun className="h-4 w-4" />}
              label="날씨 조회"
              onClick={() => openPanel("weather")}
            />
            <MenuItem
              icon={<StickyNote className="h-4 w-4" />}
              label="퀵 메모"
              onClick={() => openPanel("quick")}
            />
            <MenuItem
              icon={<NotebookPen className="h-4 w-4" />}
              label="도도부현별 메모"
              onClick={() => openPanel("prefecture")}
            />
            <MenuItem
              icon={<CalendarRange className="h-4 w-4" />}
              label="세부 계획 짜기"
              onClick={() => {
                setMenuOpen(false);
                setPanel(null);
                openPlannerModal();
              }}
            />
          </nav>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-4 z-10">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-md ring-1 ring-black/5">
          <MapPin className="h-3.5 w-3.5 text-orange-600" />
          일본 여행 플래너
        </div>
      </div>

      {panel === "weather" && <WeatherPopup onClose={() => setPanel(null)} />}
      {panel === "quick" && <QuickMemoPopup onClose={() => setPanel(null)} />}
      {panel === "prefecture" && <PrefectureMemoPopup onClose={() => setPanel(null)} />}
      {modalOpen && <DetailedPlannerModal />}
      <PlacePickOverlay />
      <PlannerToast />
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-800 hover:bg-zinc-50"
    >
      <span className="text-zinc-500">{icon}</span>
      {label}
    </button>
  );
}

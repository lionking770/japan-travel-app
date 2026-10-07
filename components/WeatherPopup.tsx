"use client";

import { addDays, format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { CloudSun } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import SearchCombobox from "@/components/SearchCombobox";
import { citiesInPrefecture, findCity } from "@/lib/japan-cities";
import { PREFECTURES, findPrefecture } from "@/lib/prefectures";
import type { WeatherSnapshot } from "@/lib/weather-types";
import { usePlannerStore } from "@/stores/planner-store";

function weatherQueryKey(cityId: string, startDate: string, days: number) {
  return `${cityId}|${startDate}|${days}`;
}

export default function WeatherPopup({ onClose }: { onClose: () => void }) {
  const isHydrated = usePlannerStore((state) => state.isHydrated);
  const selection = usePlannerStore((state) => state.weatherSelection);
  const snapshot = usePlannerStore((state) => state.weatherSnapshot);
  const setWeatherPrefecture = usePlannerStore((state) => state.setWeatherPrefecture);
  const setWeatherCity = usePlannerStore((state) => state.setWeatherCity);
  const setWeatherDates = usePlannerStore((state) => state.setWeatherDates);
  const setWeatherSnapshot = usePlannerStore((state) => state.setWeatherSnapshot);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");
  const startDate = selection.startDate || today;
  const nights = selection.nights;
  const days = Math.max(nights, 0) + 1;
  const prefecture = findPrefecture(selection.prefectureId ?? "");
  const city = findCity(selection.cityId ?? "");
  const cityOptions = useMemo(
    () => (selection.prefectureId ? citiesInPrefecture(selection.prefectureId) : []),
    [selection.prefectureId],
  );

  useEffect(() => {
    if (!isHydrated) return;
    if (!selection.startDate) {
      setWeatherDates({ startDate: today });
    }
  }, [isHydrated, selection.startDate, setWeatherDates, today]);

  const endLabel = useMemo(
    () => format(addDays(parseISO(startDate), days - 1), "M월 d일", { locale: ko }),
    [startDate, days],
  );

  async function fetchWeather(
    cityId: string,
    date: string,
    tripDays: number,
    force = false,
  ) {
    const selectedCity = findCity(cityId);
    if (!selectedCity) return;

    const queryKey = weatherQueryKey(cityId, date, tripDays);
    if (!force && snapshot?.queryKey === queryKey) return;

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        city: selectedCity.nameEn,
        lat: String(selectedCity.lat),
        lon: String(selectedCity.lon),
        startDate: date,
        days: String(tripDays),
      });
      const response = await fetch(`/api/weather?${params.toString()}`);
      const payload = (await response.json()) as Omit<WeatherSnapshot, "queryKey"> & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(payload.error ?? "날씨를 불러오지 못했습니다.");
      }
      setWeatherSnapshot({
        city: `${selectedCity.nameKo} (${payload.city || selectedCity.nameEn})`,
        trip: payload.trip,
        forecastLimitDays: payload.forecastLimitDays,
        queryKey,
      });
    } catch (err) {
      setWeatherSnapshot(null);
      setError(err instanceof Error ? err.message : "날씨 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isHydrated || !selection.cityId || !startDate) return;
    void fetchWeather(selection.cityId, startDate, days);
    // City selection should trigger a fetch; matching queryKey skips duplicates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, selection.cityId, startDate, days]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selection.cityId) {
      setError("도도부현과 세부 도시를 선택해 주세요.");
      return;
    }
    void fetchWeather(selection.cityId, startDate, days, true);
  }

  return (
    <Modal
      title="여행 일정 날씨"
      subtitle="도도부현을 고른 뒤 도시를 검색하면 일자별 예보를 보여 줍니다."
      onClose={onClose}
    >
      {!isHydrated ? (
        <p className="py-10 text-center text-sm text-zinc-400">저장된 날씨 설정을 불러오는 중...</p>
      ) : (
        <>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-zinc-700">도도부현</span>
              <SearchCombobox
                value={selection.prefectureId}
                placeholder="도도부현 검색 (한글/영문)"
                emptyText="일치하는 도도부현이 없습니다"
                options={PREFECTURES.map((item) => ({
                  id: item.id,
                  title: item.nameKo,
                  subtitle: `${item.nameJa} · ${item.nameEn} · ${item.region}`,
                  keywords: [item.nameJa, item.nameEn, item.region, item.id],
                }))}
                onSelect={setWeatherPrefecture}
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-zinc-700">세부 도시</span>
              <SearchCombobox
                value={selection.cityId}
                disabled={!selection.prefectureId}
                placeholder={
                  selection.prefectureId
                    ? `${prefecture?.nameKo ?? ""} 도시 검색`
                    : "먼저 도도부현을 선택해 주세요"
                }
                emptyText="일치하는 도시가 없습니다"
                options={cityOptions.map((item) => ({
                  id: item.id,
                  title: item.nameKo,
                  subtitle: `${item.nameJa} · ${item.nameEn}`,
                  keywords: [item.nameJa, item.nameEn, item.id],
                }))}
                onSelect={setWeatherCity}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-zinc-700">여행 시작 날짜</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => setWeatherDates({ startDate: event.target.value })}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none focus:border-zinc-400"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-zinc-700">여행 일수</span>
                <input
                  type="number"
                  min={0}
                  max={15}
                  value={nights}
                  onChange={(event) => setWeatherDates({ nights: Number(event.target.value) })}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none focus:border-zinc-400"
                />
                <span className="mt-1 block text-xs text-zinc-500">
                  {nights}박 {days}일 · {endLabel}까지
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !selection.cityId}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 text-sm font-medium text-white disabled:opacity-60"
            >
              <CloudSun className="h-4 w-4" />
              {loading ? "예보를 불러오는 중..." : "일자별 날씨 보기"}
            </button>
          </form>

          {city ? (
            <p className="mt-3 text-xs text-zinc-500">
              선택: {prefecture?.nameKo} · {city.nameKo} ({city.nameEn})
            </p>
          ) : null}

          {error && (
            <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm leading-6 text-orange-800">
              {error}
            </p>
          )}

          {snapshot && (
            <div className="mt-5">
              <p className="mb-3 text-sm text-zinc-500">
                {snapshot.city} · OpenWeatherMap 무료 예보는 앞으로 약 5일까지입니다.
              </p>
              <ul className="space-y-2">
                {snapshot.trip.map((day, index) => (
                  <li
                    key={day.date}
                    className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {index + 1}일차 · {format(parseISO(day.date), "M월 d일 (EEE)", { locale: ko })}
                      </p>
                      {day.available ? (
                        <p className="mt-0.5 text-sm capitalize text-zinc-500">{day.description}</p>
                      ) : (
                        <p className="mt-0.5 text-sm text-zinc-400">이 날짜는 예보 범위 밖입니다</p>
                      )}
                    </div>
                    {day.available ? (
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                          alt=""
                          width={40}
                          height={40}
                        />
                        <p className="text-sm font-semibold text-zinc-800">
                          {day.min}° / {day.max}°
                        </p>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

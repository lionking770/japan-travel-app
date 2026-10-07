"use client";

import { addDays, format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { CloudSun } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import Modal from "@/components/Modal";

type TripDay = {
  date: string;
  available: boolean;
  min?: number;
  max?: number;
  description?: string;
  icon?: string;
};

type WeatherPayload = {
  city: string;
  trip: TripDay[];
  forecastLimitDays?: number;
  error?: string;
};

const CITIES = ["Tokyo", "Osaka", "Kyoto", "Sapporo", "Fukuoka", "Naha", "Nagoya"];

export default function WeatherPopup({ onClose }: { onClose: () => void }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const [city, setCity] = useState("Tokyo");
  const [startDate, setStartDate] = useState(today);
  const [nights, setNights] = useState(3);
  const [data, setData] = useState<WeatherPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const days = Math.max(nights, 0) + 1;
  const endLabel = useMemo(
    () => format(addDays(parseISO(startDate), days - 1), "M월 d일", { locale: ko }),
    [startDate, days],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        city,
        startDate,
        days: String(days),
      });
      const response = await fetch(`/api/weather?${params.toString()}`);
      const payload = (await response.json()) as WeatherPayload;
      if (!response.ok) {
        throw new Error(payload.error ?? "날씨를 불러오지 못했습니다.");
      }
      setData(payload);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "날씨 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="여행 일정 날씨"
      subtitle="시작일과 숙박 일수를 넣으면 일자별 예보를 보여 줍니다."
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-zinc-700">도시</span>
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none focus:border-zinc-400"
          >
            {CITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-zinc-700">여행 시작 날짜</span>
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
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
              onChange={(event) => setNights(Number(event.target.value))}
              className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm outline-none focus:border-zinc-400"
            />
            <span className="mt-1 block text-xs text-zinc-500">
              {nights}박 {days}일 · {endLabel}까지
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 text-sm font-medium text-white disabled:opacity-60"
        >
          <CloudSun className="h-4 w-4" />
          {loading ? "예보를 불러오는 중..." : "일자별 날씨 보기"}
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm leading-6 text-orange-800">
          {error}
        </p>
      )}

      {data && (
        <div className="mt-5">
          <p className="mb-3 text-sm text-zinc-500">
            {data.city} · OpenWeatherMap 무료 예보는 앞으로 약 5일까지입니다.
          </p>
          <ul className="space-y-2">
            {data.trip.map((day, index) => (
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
    </Modal>
  );
}

import { addDays, format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

const OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5";

export async function GET(request: NextRequest) {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "WEATHER_API_KEY가 .env.local에 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const { searchParams } = request.nextUrl;
  const city = searchParams.get("city")?.trim();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const startDate = searchParams.get("startDate");
  const daysParam = Number(searchParams.get("days") ?? "5");
  const days = Number.isFinite(daysParam) ? Math.min(Math.max(daysParam, 1), 16) : 5;

  if (!city && (!lat || !lon)) {
    return NextResponse.json(
      { error: "city 또는 lat/lon 파라미터가 필요합니다." },
      { status: 400 },
    );
  }

  const locationQuery =
    lat && lon
      ? `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
      : `q=${encodeURIComponent(city!)}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `${OPENWEATHER_BASE}/weather?${locationQuery}&appid=${apiKey}&units=metric&lang=kr`,
        { next: { revalidate: 600 } },
      ),
      fetch(
        `${OPENWEATHER_BASE}/forecast?${locationQuery}&appid=${apiKey}&units=metric&lang=kr`,
        { next: { revalidate: 600 } },
      ),
    ]);

    if (!currentRes.ok) {
      const payload = await currentRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            payload?.message ??
            "날씨 정보를 가져오지 못했습니다. 도시명을 확인해 주세요.",
        },
        { status: currentRes.status },
      );
    }

    const current = await currentRes.json();
    const forecastJson = forecastRes.ok ? await forecastRes.json() : { list: [] };
    const forecastByDate = pickDailyForecast(forecastJson.list ?? []);

    const tripStart = startDate && !Number.isNaN(Date.parse(startDate))
      ? new Date(`${startDate}T00:00:00`)
      : new Date();

    const trip = Array.from({ length: days }, (_, index) => {
      const date = format(addDays(tripStart, index), "yyyy-MM-dd");
      const forecast = forecastByDate.get(date);
      return {
        date,
        available: Boolean(forecast),
        min: forecast?.min,
        max: forecast?.max,
        description: forecast?.description,
        icon: forecast?.icon,
      };
    });

    return NextResponse.json({
      city: current.name,
      country: current.sys?.country,
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      humidity: current.main.humidity,
      description: current.weather?.[0]?.description ?? "",
      icon: current.weather?.[0]?.icon ?? "01d",
      wind: current.wind?.speed ?? 0,
      forecastLimitDays: 5,
      trip,
    });
  } catch {
    return NextResponse.json(
      { error: "날씨 API 요청 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }
}

type ForecastItem = {
  dt_txt: string;
  main: { temp_min: number; temp_max: number };
  weather: { description: string; icon: string }[];
};

function pickDailyForecast(list: ForecastItem[]) {
  const byDay = new Map<
    string,
    { date: string; min: number; max: number; description: string; icon: string }
  >();

  for (const item of list) {
    const date = item.dt_txt.slice(0, 10);
    const existing = byDay.get(date);
    const min = item.main.temp_min;
    const max = item.main.temp_max;
    const isNoon = item.dt_txt.includes("12:00:00");

    if (!existing) {
      byDay.set(date, {
        date,
        min,
        max,
        description: item.weather?.[0]?.description ?? "",
        icon: item.weather?.[0]?.icon ?? "01d",
      });
      continue;
    }

    existing.min = Math.min(existing.min, min);
    existing.max = Math.max(existing.max, max);
    if (isNoon) {
      existing.description = item.weather?.[0]?.description ?? existing.description;
      existing.icon = item.weather?.[0]?.icon ?? existing.icon;
    }
  }

  for (const day of byDay.values()) {
    day.min = Math.round(day.min);
    day.max = Math.round(day.max);
  }

  return byDay;
}

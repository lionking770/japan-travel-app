export type WeatherTripDay = {
  date: string;
  available: boolean;
  min?: number;
  max?: number;
  description?: string;
  icon?: string;
};

export type WeatherSnapshot = {
  city: string;
  trip: WeatherTripDay[];
  forecastLimitDays?: number;
  queryKey: string;
};

export type WeatherSelection = {
  prefectureId: string | null;
  cityId: string | null;
  startDate: string;
  nights: number;
};

"use client";

import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { usePlannerStore } from "@/stores/planner-store";

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = [
  "places",
];

const JAPAN_CENTER = { lat: 36.2048, lng: 138.2529 };

const mapContainerStyle = { width: "100%", height: "100%" };

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  scaleControl: true,
  rotateControl: true,
  clickableIcons: true,
  gestureHandling: "greedy",
  mapTypeControlOptions: {
    position: 5,
  },
  zoomControlOptions: {
    position: 8,
  },
};

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100">
        <EmptyState
          title="Google Maps API 키가 필요합니다"
          body=".env.local의 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY에 키를 넣고 개발 서버를 다시 시작해 주세요."
        />
      </div>
    );
  }

  return <MapCanvas apiKey={apiKey} />;
}

function reportPlaceLoadError(source: string, status: string, detail?: unknown) {
  console.error(`[${source}] 장소 정보 로드 실패`, { status, detail });
  usePlannerStore.getState().showToast(`장소 정보 로드 실패 (상태 코드: ${status})`);
}

function MapCanvas({ apiKey }: { apiKey: string }) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const placePickMode = usePlannerStore((state) => state.placePickMode);
  const pendingPlace = usePlannerStore((state) => state.pendingPlace);
  const mapFocus = usePlannerStore((state) => state.mapFocus);
  const setPendingPlace = usePlannerStore((state) => state.setPendingPlace);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "japan-travel-map-places-ko",
    googleMapsApiKey: apiKey,
    language: "ko",
    region: "KR",
    libraries: libraries as ("places")[],
  });

  useEffect(() => {
    if (!map || !mapFocus) return;
    map.panTo({ lat: mapFocus.lat, lng: mapFocus.lng });
    map.setZoom(16);
    setInfoOpen(true);
  }, [map, mapFocus]);

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    mapInstance.setOptions({ clickableIcons: true });
    setMap(mapInstance);
  }, []);

  const onSearchSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (!map || !query.trim()) return;

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: query.trim(), region: "JP" }, (results, status) => {
        if (status !== "OK" || !results?.[0]?.geometry?.location) {
          reportPlaceLoadError("Geocoder", String(status), results);
          return;
        }

        const location = results[0].geometry.location;
        if (results[0].geometry.viewport) {
          map.fitBounds(results[0].geometry.viewport);
        } else {
          map.panTo(location);
          map.setZoom(15);
        }

        if (!usePlannerStore.getState().placePickMode) return;

        const address = results[0].formatted_address;
        setPendingPlace({
          id: crypto.randomUUID(),
          name: address,
          address,
          lat: location.lat(),
          lng: location.lng(),
        });
      });
    },
    [map, query, setPendingPlace],
  );

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      console.log("Map clicked event:", e);

      if (!usePlannerStore.getState().placePickMode) return;

      const placeId = (e as { placeId?: string }).placeId;

      if (placeId) {
        (e as google.maps.IconMouseEvent).stop?.();

        void (async () => {
          try {
            await google.maps.importLibrary("places");
            const place = new google.maps.places.Place({ id: placeId });
            await place.fetchFields({ fields: ["displayName", "location"] });

            const placeName = place.displayName || "선택한 장소";
            const location = place.location;
            if (!location) {
              reportPlaceLoadError("Place", "NO_LOCATION", place);
              return;
            }

            setPendingPlace({
              id: crypto.randomUUID(),
              name: placeName,
              address: "",
              lat: location.lat(),
              lng: location.lng(),
              placeId,
            });
          } catch (error) {
            reportPlaceLoadError("Place", "FETCH_FIELDS_FAILED", error);
          }
        })();
        return;
      }

      const latLng = e.latLng;
      if (!latLng) {
        reportPlaceLoadError("Geocoder", "NO_LATLNG", e);
        return;
      }

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status !== "OK" || !results?.[0]) {
          reportPlaceLoadError("Geocoder", String(status), results);
          return;
        }

        const address = results[0].formatted_address;
        setPendingPlace({
          id: crypto.randomUUID(),
          name: address,
          address,
          lat: latLng.lat(),
          lng: latLng.lng(),
        });
      });
    },
    [setPendingPlace],
  );

  if (loadError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100">
        <EmptyState
          title="지도를 불러오지 못했습니다"
          body="API 키, Maps JavaScript API·Places API 활성화, 결제 계정 상태를 확인해 주세요."
        />
      </div>
    );
  }

  if (!mounted || !isLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-sm text-zinc-500">
        일본 지도를 불러오는 중...
      </div>
    );
  }

  const activeMarker = pendingPlace ?? mapFocus;

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={JAPAN_CENTER}
        zoom={5}
        options={{
          ...mapOptions,
          clickableIcons: true,
          draggableCursor: placePickMode ? "pointer" : undefined,
        }}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        <form
          onSubmit={onSearchSubmit}
          className="absolute left-1/2 top-4 z-10 w-[min(92vw,420px)] -translate-x-1/2"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="장소 검색 (예: 후시미이나리, 오사카성)"
            className="h-12 w-full rounded-full bg-white px-5 text-sm text-zinc-800 shadow-lg outline-none ring-1 ring-black/5 placeholder:text-zinc-400"
          />
        </form>
        {activeMarker ? (
          <MarkerF
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            title={activeMarker.name}
            onClick={() => setInfoOpen(true)}
          />
        ) : null}
        {activeMarker && infoOpen ? (
          <InfoWindowF
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={() => setInfoOpen(false)}
            options={{ pixelOffset: new google.maps.Size(0, -36) }}
          >
            <div className="min-w-32 px-1 py-0.5">
              <p className="text-sm font-semibold text-zinc-900">{activeMarker.name}</p>
              {activeMarker.address ? (
                <p className="mt-0.5 text-xs text-zinc-500">{activeMarker.address}</p>
              ) : null}
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-md px-8 text-center">
      <p className="font-medium text-zinc-800">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{body}</p>
    </div>
  );
}

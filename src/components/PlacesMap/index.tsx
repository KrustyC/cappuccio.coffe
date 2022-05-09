import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { Place } from "@/types/global";
import { useUserLocation } from "@/hooks/useUserLocation";

import dynamic from "next/dynamic";
import { SearchBar } from "./SearchBar";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export const PlacesMap = () => {
  const { location, getLocationFromBrowser } = useUserLocation();
  const { data } = useNetlifyGetFunction<{ places: Place[] }>({
    fetchUrlPath: "/places",
  });

  const places = data?.places || [];
  const markers = places.map((place) => ({
    id: place._id,
    coordinates: place.address.coordinates,
    popup: <div>{place.name}</div>,
  }));

  return (
    <div className="relative">
      <DynamicMap
        className="h-screen z-0"
        center={{ lat: location?.lat || 51.505, lng: location?.lng || -0.09 }} // @TODO understand what the center should be
        zoom={13}
        markers={markers}
      />

      <div className="absolute flex top-[100px] md:top-[50px] left-0 right-0 m-auto h-24 w-full px-4 md:w-[800px]">
        <SearchBar getLocationFromBrowser={getLocationFromBrowser} />
      </div>
    </div>
  );
};

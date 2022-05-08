import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { Place } from "@/types/global";
import { MarkerIcon } from "@/components/icons/Marker";
import { useUserLocation } from "@/hooks/useUserLocation";

import dynamic from "next/dynamic";

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

      <div className="absolute flex top-[100px] md:top-[50px] left-0 right-0 m-auto h-24 w-full px-4 md:w-7/12">
        <input
          className="w-full border-2 border-primary rounded-lg h-16 px-4 text-lg shadow-md mr-4"
          placeholder="Where are you looking for cappuccino? Or use your current position if you prefer"
        />
        <button
          className="flex items-center bg-[#F055C3] justify-center w-[60px] h-[60px] border-2 border-[#F055C3] rounded-full h-16 px-4 text-lg shadow-md"
          onClick={getLocationFromBrowser}
        >
          <MarkerIcon className="w-12 h-12 fill-[#FFFFFF]" />
        </button>
      </div>
    </div>
  );
};

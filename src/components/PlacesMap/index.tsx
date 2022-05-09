import dynamic from "next/dynamic";

import { usePlacesMap } from "./usePlacesMap";
import { SearchBar } from "./SearchBar";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export const PlacesMap = () => {
  const { center, places, fetchPlacesByAddress, fetchPlacesByCoordinates } =
    usePlacesMap();

  const markers = places.map((place) => ({
    id: place._id,
    coordinates: place.address.coordinates,
    popup: <div>{place.name}</div>,
  }));

  return (
    <div className="relative">
      <DynamicMap
        className="h-screen z-0"
        center={center}
        zoom={13}
        markers={markers}
      />

      <div className="absolute flex top-[100px] md:top-[50px] left-0 right-0 m-auto h-24 w-full px-4 md:w-[800px]">
        <SearchBar
          fetchPlacesByAddress={fetchPlacesByAddress}
          fetchPlacesByCoordinates={fetchPlacesByCoordinates}
        />
      </div>
    </div>
  );
};

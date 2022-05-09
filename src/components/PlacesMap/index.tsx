import dynamic from "next/dynamic";

import { usePlacesMap } from "./usePlacesMap";
import { SearchBar } from "./SearchBar";
import { UserLocationInput } from "./UserLocationInput";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const DynamicPlacePopup = dynamic(() => import("./PlacePopup"), {
  ssr: false,
});

export const PlacesMap = () => {
  const { center, places, fetchPlacesByAddress, fetchPlacesByCoordinates } =
    usePlacesMap();

  const markers = places.map((place) => ({
    id: place._id,
    coordinates: place.address.coordinates,
    popup: <DynamicPlacePopup place={place} />,
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
        <SearchBar fetchPlacesByAddress={fetchPlacesByAddress} />
      </div>

      <div className="absolute flex justify-center items-center bottom-[30px] right-[20px] fill-transparent h-[80px] w-[80px]">
        <UserLocationInput onSearch={fetchPlacesByCoordinates} />
      </div>
    </div>
  );
};

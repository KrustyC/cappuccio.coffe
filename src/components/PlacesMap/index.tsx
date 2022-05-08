import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { Place } from "@/types/global";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const PlacesMap = () => {
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
    <div className="bg-primary">
      <DynamicMap
        className="h-screen"
        center={{ lat: 51.505, lng: -0.09 }} // @TODO understand what the center should be
        zoom={13}
        markers={markers}
      />
    </div>
  );
};

export default PlacesMap;

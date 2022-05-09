import { Popup } from "react-leaflet";
import Link from "next/link";
import { Place } from "@/types/global";

interface PlacePopupProps {
  place: Place;
}

const PlacePopup: React.FC<PlacePopupProps> = ({ place }) => {
  return (
    <Popup>
      <div className="flex flex-col w-[150px]">
        <span className="text-xl font-bold">{place.name}</span>
        <Link href={`/places/${place._id}`}>
          <a>View</a>
        </Link>
      </div>
    </Popup>
  );
};

export default PlacePopup;

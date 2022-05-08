import { Place } from "@/types/global";

interface PlaceCardProps {
  place: Place;
  onWantToRemovePlace: VoidFunction;
}

export const PlaceCard: React.FC<React.PropsWithChildren<PlaceCardProps>> = ({
  place,
  onWantToRemovePlace,
}) => (
  <div className="bg-white shadow rounded-lg p-4 ">
    <div className="flex flex-col h-full">
      <span className="text-xl font-bold text-gray-900 mb-2">{place.name}</span>

      <div className="flex items-end justify-end mt-2 w-100 grow">
        <div>
          <a
            href={`/admin/places/${place._id}`}
            className="btn-admin btn-primary btn-sm text-base uppercase mr-2"
          >
            Edit
          </a>

          <button
            className="btn-admin btn-danger btn-sm text-base uppercase"
            onClick={onWantToRemovePlace}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
);

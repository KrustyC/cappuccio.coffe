import { useEffect } from "react";
import { toast } from "react-toastify";
import { AdminLayout } from "@/layouts/AdminLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { PlaceCard } from "@/components/admin/Cards/PlaceCard";
import { Place } from "@/types/global";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { NextPageWithLayout } from "@/types/app";

const AdminPlaces: NextPageWithLayout<undefined> = () => {
  const {
    items: places,
    loading,
    error,
    itemToRemoveIndex: placeToRemoveIndex,
    onWantToRemoveItem: onWantToRemovePlace,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ places: Place[] }, Place>({
    fetchPath: "/admin-places",
    parseResponse: (response) => response.places,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching places");
    }
  }, [error]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {places.map((place, index) => (
              <PlaceCard
                key={place._id}
                place={place}
                onWantToRemovePlace={() => onWantToRemovePlace(index)}
              />
            ))}
          </div>
        )}
      </div>

      {placeToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="place"
          itemToDelete={places[placeToRemoveIndex]}
          questionItem={places[placeToRemoveIndex].name}
          deletePath={`/admin-places?id=${places[placeToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminPlacesLayout: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <AdminLayout>
    <IndexLayout
      title="Places"
      subtitle="Here you can manage your places."
      itemName="Places"
      createItemPath="/admin/places/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminPlaces.Layout = AdminPlacesLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminPlaces;

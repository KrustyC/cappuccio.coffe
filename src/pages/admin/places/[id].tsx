import { useEffect } from "react";
import { GetStaticPaths } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { PlaceForm } from "@/components/admin/Forms/PlaceForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { Place } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

interface EditProps {
  id: string;
}

const Edit: React.FC<React.PropsWithChildren<EditProps>> = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useNetlifyGetFunction<{
    place: Place;
  }>({
    fetchUrlPath: `/admin-places?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ place: Place }>({ user });

  const onEditPlace = async (updatedPlace: Place | Omit<Place, "_id">) => {
    const res = await onUpdate(`/admin-places?id=${id}`, {
      place: { _id: id, ...updatedPlace },
    });

    if (res !== undefined) {
      toast.success("Place successfully updated!");
      setTimeout(() => {
        router.push("/admin/places");
      }, 800);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching place");
    }

    if (updateError) {
      toast.error("Error updating place");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit Place</h2>
      </div>

      <div className="flex justify-between mt-4">
        <Panel className="mr-4 w-full">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <PlaceForm
              pending={pending}
              place={data?.place}
              onSavePlace={onEditPlace}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminPlacesEdit: NextPageWithLayout<undefined> = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

AdminPlacesEdit.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default AdminPlacesEdit;

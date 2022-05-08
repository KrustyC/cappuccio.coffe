import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { PlaceForm } from "@/components/admin/Forms/PlaceForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { Place } from "@/types/global";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/app";

const AdminPlacesCreate: NextPageWithLayout<undefined> = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ place: Place }>({ user });

  const onCreatePlace = async (place: Place) => {
    const res = await onCreate(`/admin-places`, { place });

    if (res !== undefined) {
      toast.success("Place successfully added!");
      setTimeout(() => {
        router.push("/admin/places");
      }, 800);
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Create Place</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 w-full">
          <PlaceForm pending={pending} onSavePlace={onCreatePlace} />
        </Panel>
      </div>
    </div>
  );
};

AdminPlacesCreate.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminPlacesCreate;

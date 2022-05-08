import { useState } from "react";
import { Address } from "@/types/global";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";

import { AddressModal } from "../../AddressModal";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

interface LocationInputProps {
  currentAddress?: Address;
  onChangeAddress: (address: Address) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  currentAddress,
  onChangeAddress,
}) => {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => setShowModal(true);

  const onConfirm = (newAddress: Address) => {
    onChangeAddress(newAddress);
    setShowModal(false);
  };

  const onChangeAddressText = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAddress({
      coordinates: {
        lat: currentAddress?.coordinates.lat || 0,
        lng: currentAddress?.coordinates.lng || 0,
      },
      address: e.target.value as string,
    });
  };

  const onCancel = () => setShowModal(false);

  return (
    <div className="flex flex-col items-start justify-start">
      <div>
        <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
          Location
        </span>
      </div>

      <div className="flex items-center w-full">
        {currentAddress ? (
          <div className="flex w-full flex-col">
            <span className="w-full">
              <input
                className="w-full border-2 p-3 border-admin-primary rounded-lg"
                type="text"
                value={currentAddress.address}
                onChange={onChangeAddressText}
              />
            </span>

            <DynamicMap
              className="z-0 h-[250px] w-full md:w-[400px] mt-4"
              center={currentAddress.coordinates}
              markers={[
                { id: uuidv4(), coordinates: currentAddress.coordinates },
              ]}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            No location selected yet
            <div className="h-[250px] w-[400px] bg-[#e3e3e3]" />
          </div>
        )}
      </div>

      <button
        className="btn-admin btn-primary btn-sm mt-2"
        type="button"
        onClick={onShowModal}
      >
        {currentAddress ? "Edit" : "Pick"} Location
      </button>

      {showModal && (
        <AddressModal
          currentAddress={currentAddress}
          onChangeAddress={onConfirm}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

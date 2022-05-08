import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { Address } from "@/types/global";

import { Modal } from "../Modal";
import { LoadingSpinner } from "../LoadingSpinner";
import { useRetrieveAddressForward } from "./useRetrieveAddressForward";

const DynamicMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
interface AddressModalProps {
  currentAddress?: Address;
  onChangeAddress: (selectedAddress: Address) => void;
  onCancel: VoidFunction;
}

export const AddressModal: React.FC<
  React.PropsWithChildren<AddressModalProps>
> = ({ currentAddress, onChangeAddress, onCancel }) => {
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [addressInput, setAddressInput] = useState(
    currentAddress?.address || ""
  );

  const { suggestedPlaces, onSearch, loading } = useRetrieveAddressForward();

  const onConfirmChoice = () => {
    onChangeAddress(selectedAddress!);
  };

  const onSelectPlace = (place: Address) => {
    setSelectedAddress(place);
  };

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(addressInput);
    }
  };

  const onChangeAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  return (
    <Modal width="w-screen md:w-7/12">
      <div className="w-full flex flex-col">
        <h2 className="text-2xl text-admin-primary font-bold py-4">
          Choose place
        </h2>
        <div className="mt-2 flex flex-col md:flex-row items-center">
          <input
            className="w-full border-2 p-3 border-admin-primary rounded-lg"
            type="text"
            name="address"
            onKeyDown={onHandleKeyDown}
            value={addressInput}
            onChange={onChangeAddressInput}
          />

          <button
            type="button"
            className="btn-admin btn-primary mt-4 md:mt-0 md:ml-4 w-full"
            onClick={() => onSearch(addressInput)}
          >
            Search
          </button>
        </div>
      </div>

      <div className="h-[550px] max-h-[550px] overflow-scroll pb-4">
        {loading ? (
          <div className="h-24 flex align-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="flex flex-col mt-6">
            <div className="md:w-1/2 flex flex-col mpr-8 w-full max-h-[490px] overflow-scroll">
              {suggestedPlaces.map((place) => (
                <div
                  key={uuidv4()}
                  className={`p-4 mb-4 cursor-pointer h-20 border-2 -[#0DB082] rounded-lg ${
                    place.address === selectedAddress?.address
                      ? "bg-[#5CE3BE]"
                      : ""
                  }`}
                  onClick={() => onSelectPlace(place)}
                >
                  {place.address}
                </div>
              ))}
            </div>

            <div className="md:w-1/2 h-full">
              <DynamicMap
                className="h-[490px]"
                center={selectedAddress?.coordinates}
                markers={
                  selectedAddress?.coordinates
                    ? [
                        {
                          id: uuidv4(),
                          coordinates: selectedAddress.coordinates,
                        },
                      ]
                    : []
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button className="btn-admin" onClick={onCancel}>
          Close
        </button>

        <button
          className="btn-admin btn-primary ml-4"
          onClick={onConfirmChoice}
        >
          Confirm Choice
        </button>
      </div>
    </Modal>
  );
};

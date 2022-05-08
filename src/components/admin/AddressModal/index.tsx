import { useState } from "react";
import { MapContainer, Marker, useMap, TileLayer } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";

import { Modal } from "../Modal";
import { LoadingSpinner } from "../LoadingSpinner";
import { Address } from "@/types/global";
import { useRetrieveAddressForward } from "./useRetrieveAddressForward";

interface AddressModalProps {
  currentAddress?: Address;
  onChangeAddress: (selectedAddress: Address) => void;
  onCancel: VoidFunction;
}

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  map.setView(center, zoom);

  return null;
}

const AddressModal: React.FC<React.PropsWithChildren<AddressModalProps>> = ({
  currentAddress,
  onChangeAddress,
  onCancel,
}) => {
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

  const onChangeAddressInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  return (
    <Modal>
      <div className="w-full flex flex-col">
        <h2 className="text-2xl text-admin-primary font-bold py-4">
          Choose place
        </h2>
        <div className="mt-2 flex items-center">
          <input
            className="w-full border-2 p-3 border-admin-primary rounded-lg"
            type="text"
            name="address"
            value={addressInput}
            onChange={onChangeAddressInput}
          />

          <button
            type="button"
            className="btn-admin btn-primary ml-4"
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
          <div className="flex mt-6">
            <div className="w-1/2 flex flex-col pr-8 w-full max-h-[490px] overflow-scroll">
              {suggestedPlaces.map((place) => (
                <div
                  key={uuidv4()}
                  className={`p-4 cursor-pointer h-20 border-2 mb-4 border-[#0DB082] rounded-lg ${
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

            <div className="w-1/2 h-full">
              <MapContainer
                className="h-[490px]"
                center={[
                  selectedAddress?.coordinates.lat || 51.505,
                  selectedAddress?.coordinates.lng || -0.09,
                ]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <ChangeView
                  center={[
                    selectedAddress?.coordinates.lat || 51.505,
                    selectedAddress?.coordinates.lng || -0.09,
                  ]}
                  zoom={13}
                />

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {selectedAddress && (
                  <Marker
                    position={[
                      selectedAddress.coordinates.lat,
                      selectedAddress.coordinates.lng,
                    ]}
                  />
                )}
              </MapContainer>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button className="btn-admin" onClick={onCancel}>
          {" "}
          Close{" "}
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

export default AddressModal;

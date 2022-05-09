import { useState } from "react";

interface AddressInputProps {
  onSearch: (address: string) => void;
}

export const AddressInput: React.FC<AddressInputProps> = ({ onSearch }) => {
  const [addressInput, setAddressInput] = useState("");

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
    <input
      className="w-full border-2 border-primary rounded-lg h-[60px] px-4 text-lg shadow-md"
      placeholder="Looking for a cappuccino anywhere?"
      value={addressInput}
      onChange={onChangeAddressInput}
      onKeyDown={onHandleKeyDown}
    />
  );
};

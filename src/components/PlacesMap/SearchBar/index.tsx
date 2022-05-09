import { useTrail, a } from "react-spring";
import { useEffect, useState } from "react";
import { Coordinates } from "@/types/global";

import { AddressInput } from "./AddressInput";
import { UserLocationInput } from "./UserLocationInput";

interface SearchBarProps {
  fetchPlacesByAddress: (address: string) => void;
  fetchPlacesByCoordinates: (coordinates: Coordinates) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  fetchPlacesByAddress,
  fetchPlacesByCoordinates,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const trail = useTrail(2, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: show ? 1 : 0,
    height: show ? 60 : 0,
    from: { opacity: 0, height: 0 },
  });

  const { height: inputHeight, ...inputStyle } = trail[0];
  const { height: buttonHeight, ...buttonStyle } = trail[1];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <a.div style={inputStyle} className="flex-1 mr-4">
        <a.div style={{ height: inputHeight }}>
          <AddressInput onSearch={fetchPlacesByAddress} />
        </a.div>
      </a.div>

      <a.div style={buttonStyle} className="flex-none w-[60px]">
        <a.div style={{ height: buttonHeight }}>
          <UserLocationInput onSearch={fetchPlacesByCoordinates} />
        </a.div>
      </a.div>
    </div>
  );
};

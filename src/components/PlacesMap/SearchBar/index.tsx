import { useTrail, a } from "react-spring";
import { useEffect, useState } from "react";

import { AddressInput } from "./AddressInput";

interface SearchBarProps {
  fetchPlacesByAddress: (address: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  fetchPlacesByAddress,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const trail = useTrail(1, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: show ? 1 : 0,
    height: show ? 60 : 0,
    from: { opacity: 0, height: 0 },
  });

  const { height: inputHeight, ...inputStyle } = trail[0];
  // const { height: buttonHeight, ...buttonStyle } = trail[1];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <a.div style={inputStyle} className="flex-1">
        <a.div style={{ height: inputHeight }}>
          <AddressInput onSearch={fetchPlacesByAddress} />
        </a.div>
      </a.div>
    </div>
  );
};

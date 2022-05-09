import { useTrail, a } from "react-spring";
import { useEffect, useState } from "react";
import { MarkerIcon } from "@/components/icons/Marker";

interface SearchBarProps {
  getLocationFromBrowser: VoidFunction;
}

const config = { mass: 5, tension: 2000, friction: 200 };

export const SearchBar: React.FC<SearchBarProps> = ({
  getLocationFromBrowser,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const trail = useTrail(2, {
    config,
    opacity: open ? 1 : 0,
    height: open ? 60 : 0,
    from: { opacity: 0, height: 0 },
  });

  const { height: inputHeight, ...inputStyle } = trail[0];
  const { height: buttonHeight, ...buttonStyle } = trail[1];

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <a.div style={inputStyle} className="flex-1 mr-4">
        <a.div style={{ height: inputHeight }}>
          <input
            className="w-full border-2 border-primary rounded-lg h-[60px] px-4 text-lg shadow-md"
            placeholder="Where are you looking for cappuccino? Or use your current position if you prefer"
          />
        </a.div>
      </a.div>

      <a.div style={buttonStyle} className="flex-none w-[60px]">
        <a.div style={{ height: buttonHeight }}>
          <button
            className="flex items-center bg-[#F055C3] justify-center w-[60px] h-[60px] border-2 border-[#F055C3] rounded-full h-16 px-4 text-lg shadow-md"
            onClick={getLocationFromBrowser}
          >
            <MarkerIcon className="w-12 h-12 fill-[#FFFFFF]" />
          </button>
        </a.div>
      </a.div>
    </div>
  );
};

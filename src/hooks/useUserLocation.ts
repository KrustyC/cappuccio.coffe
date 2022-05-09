import { useState } from "react";
import { Coordinates } from "@/types/global";

export function useUserLocation() {
  const [location, setLocation] = useState<Coordinates>();

  const getLocationFromBrowser = () => {
    if (!("geolocation" in navigator)) {
      console.log("Geolocation not available");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return { location, getLocationFromBrowser };
}

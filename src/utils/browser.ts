import { Coordinates } from "@/types/global";

export async function getLocationFromBrowser(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject("Geolocation not available");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  });
}

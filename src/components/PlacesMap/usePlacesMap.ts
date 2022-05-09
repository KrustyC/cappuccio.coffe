import { useState } from "react";
import { fetchJson } from "@/utils/fetch-json";
import { Coordinates, Place } from "@/types/global";

const BASE_PATH = `${process.env.baseUrl}/.netlify/functions/places`;

export function usePlacesMap() {
  const [center, setCenter] = useState<Coordinates>({
    lat: 51.505,
    lng: -0.09,
  });
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const fetchPlacesByAddress = async (address: string) => {
    setLoading(true);
    setError(undefined);

    try {
      const url = `${BASE_PATH}?address=${address}`;
      const response = await fetchJson(url);

      if (response.center) {
        setCenter(response.center);
      }

      setPlaces(response.places || []);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlacesByCoordinates = async (coordinates: Coordinates) => {
    setCenter(coordinates);
    setLoading(true);
    setError(undefined);

    try {
      const radius = 5;
      const url = `${BASE_PATH}?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=${radius}`;

      const response = await fetchJson(url);

      setPlaces(response.places || []);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    center,
    places,
    loading,
    error,
    fetchPlacesByAddress,
    fetchPlacesByCoordinates,
  };
}

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchJson } from "@/utils/fetch-json";
import { Address } from "@/types/global";

export function useRetrieveAddressForward() {
  const { user } = useAuth();
  const [suggestedPlaces, setSuggestedPlaces] = useState<Address[]>([]);
  const [searchAddress, setSearchAddress] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const retrieveAddress = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const url = `${process.env.baseUrl}/.netlify/functions/admin-forward-address?address=${searchAddress}`;
        const options = {
          token: user?.token?.access_token,
        };

        const response = await fetchJson(url, options);

        setSuggestedPlaces(response.addresses);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    if (user && searchAddress.length > 5) {
      retrieveAddress();
    }
  }, [searchAddress]);

  const onSearch = (newAddress: string) => {
    setSearchAddress(newAddress);
  };

  return { suggestedPlaces, onSearch, loading, error };
}

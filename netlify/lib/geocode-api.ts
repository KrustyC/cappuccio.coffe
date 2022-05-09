import axios from "axios";
import { OPENCAGE_BASE_ENDPOINT } from "../shared/constants";

export async function fetchAddressesFromForwardAddress(address: string) {
  try {
    const url = `${OPENCAGE_BASE_ENDPOINT}/forward`;
    const options = {
      params: {
        key: process.env.GEOCODING_API_KEY,
        q: address,
      },
    };

    const res = await axios.get(url, options);

    if (!res.data?.results?.length) {
      return [];
    }

    return res.data.results.map(({ geometry, formatted }) => {
      return {
        address: formatted,
        coordinates: geometry,
      };
    });
  } catch (error) {
    // @TODO Maybe throw an error here
    return [];
  }
}

// export async function fetchBackwardAddress() {}

import { Handler, HandlerEvent } from "@netlify/functions";
import { jsonResponse } from "../shared/utils";
import { connect } from "../shared/mongodb-client";
import { HTTP_METHODS } from "../shared/constants";

import { fetchSinglePlace, fetchPlacesByCoordinates } from "../lib/places";
import { fetchAddressesFromForwardAddress } from "../lib/geocode-api";

const DEFAULT_RADIUS = 3000; // Radius in meters

interface QueryStringParameters {
  address?: string;
  lat?: string;
  lng?: string;
  radius?: string;
}

async function fetchCenterFromAddress(address: string) {
  const addresses = await fetchAddressesFromForwardAddress(address);
  if (!addresses.length) {
    return null;
  }

  return addresses[0].coordinates;
}

async function get(event: HandlerEvent) {
  const client = await connect();

  if (!client) {
    throw new Error("Can not connect to DB");
  }

  const { id } = event.queryStringParameters as { id?: string };
  if (id) {
    const place = await fetchSinglePlace(id, client);

    if (!place) {
      return jsonResponse({
        status: 404,
        body: { message: "Place not found" },
      });
    }

    return jsonResponse({ status: 200, body: { place } });
  }

  const { address, lat, lng, radius } =
    event.queryStringParameters as QueryStringParameters;

  if (!(lat && lng) && !address) {
    throw new Error("Please provide either `lat` and `lng` or `address`");
  }

  const center =
    lat && lng
      ? { lat: parseFloat(lat), lng: parseFloat(lng) }
      : await fetchCenterFromAddress(address);

  if (!center) {
    throw new Error("Could not find provided address");
  }

  const options = {
    ...center,
    radius: radius ? parseFloat(radius) : DEFAULT_RADIUS,
  };

  const places = await fetchPlacesByCoordinates(options, client);

  return jsonResponse({
    status: 200,
    body: {
      places,
      center,
    },
  });
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== HTTP_METHODS.GET) {
    return jsonResponse({
      status: 405,
      body: { message: "Method not allowed" },
    });
  }

  try {
    return get(event);
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching places, please try again later on.",
      },
    });
  }
};

export { handler };

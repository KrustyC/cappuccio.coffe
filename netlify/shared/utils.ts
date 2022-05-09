import { HandlerResponse } from "@netlify/functions";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

interface JSONResponse {
  status: number;
  body: Record<string, unknown>;
  headers?: { [header: string]: string | number | boolean };
}

export function jsonResponse({
  status,
  body,
  headers = DEFAULT_HEADERS,
}: JSONResponse): HandlerResponse {
  return {
    statusCode: status,
    headers,
    body: JSON.stringify(body),
  };
}

interface ApiAddress {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface DBAddress {
  address: string;
  point: {
    type: "Point";
    coordinates: [number, number]; // lng, lat
  };
}

export function mapApiAddressToDBAddress(apiAddress: ApiAddress): DBAddress {
  return {
    address: apiAddress.address,
    point: {
      type: "Point",
      coordinates: [apiAddress.coordinates.lng, apiAddress.coordinates.lat],
    },
  };
}

export function mapDBAddressToApiAddress(dbAddress: DBAddress): ApiAddress {
  const [lng, lat] = dbAddress.point.coordinates;

  return {
    address: dbAddress.address,
    coordinates: { lat, lng },
  };
}

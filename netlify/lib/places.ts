import { mapDBAddressToApiAddress } from "../shared/utils";
import { MongoClient, ObjectId } from "mongodb";

const PLACES_COLLECTION = "places";

export async function fetchSinglePlace(id: string, client: MongoClient) {
  const place = await client
    .db(process.env.MONGO_DB_NAME)
    .collection(PLACES_COLLECTION)
    .findOne({ _id: new ObjectId(id) });

  if (!place) {
    return null;
  }

  return {
    ...place,
    address: mapDBAddressToApiAddress(place.address),
  };
}

interface FetchPlacesByCoordinatesOptions {
  lat: number;
  lng: number;
  radius: number;
}

export async function fetchPlacesByCoordinates(
  options: FetchPlacesByCoordinatesOptions,
  client: MongoClient
) {
  const { lat, lng, radius } = options;

  const places = await client
    .db(process.env.MONGO_DB_NAME)
    .collection(PLACES_COLLECTION)
    .find({
      "address.point": {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $minDistance: 0,
          $maxDistance: radius,
        },
      },
    })
    .toArray();

  return places.map((place) => ({
    ...place,
    address: mapDBAddressToApiAddress(place.address),
  }));
}

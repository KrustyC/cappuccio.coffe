import { Handler, HandlerEvent } from "@netlify/functions";
import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";
import { adminHandler } from "../shared/admin-handler";
import { jsonResponse } from "../shared/utils";
import { OPENCAGE_BASE_ENDPOINT, HTTP_METHODS } from "../shared/constants";

async function get(client: MongoClient, handlerEvent: HandlerEvent) {
  const { address } = handlerEvent.queryStringParameters as {
    address?: string;
  };

  if (!address) {
    return jsonResponse({
      status: 400,
      body: {
        message: "Please pass an `address` parameter.",
      },
    });
  }

  try {
    const url = `${OPENCAGE_BASE_ENDPOINT}/forward`;
    const options = {
      params: {
        key: process.env.GEOCODING_API_KEY,
        q: address,
      },
    };

    const res = await axios.get(url, options);

    console.log(res.data?.results);

    const places =
      res.data?.results?.map(({ geometry, formatted }) => {
        return {
          address: formatted,
          coordinates: geometry,
        };
      }) || [];

    return jsonResponse({
      status: 200,
      body: { places },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message:
          "Error fetching address data from given string, please try again later on.",
      },
    });
  }
}

const handler: Handler = async (event, context) => {
  const handlers = [{ method: HTTP_METHODS.GET, handler: get }];

  return adminHandler({
    event,
    context,
    handlers,
    onlyAuthorizedUsers: true,
  });
};

export { handler };

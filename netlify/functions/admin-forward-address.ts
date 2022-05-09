import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { adminHandler } from "../shared/admin-handler";
import { jsonResponse } from "../shared/utils";
import { fetchAddressesFromForwardAddress } from "../lib/geocode-api";
import { HTTP_METHODS } from "../shared/constants";

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
    const addresses = await fetchAddressesFromForwardAddress(address);

    return jsonResponse({
      status: 200,
      body: { addresses },
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

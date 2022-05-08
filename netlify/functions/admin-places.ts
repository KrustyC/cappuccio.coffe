import { Handler, HandlerEvent } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";
import * as yup from "yup";
import { adminHandler } from "../shared/admin-handler";
import { jsonResponse } from "../shared/utils";
import { HTTP_METHODS } from "../shared/constants";

export const placeSchema = yup.object().shape({
  name: yup.string().required("please enter a name for the place"),
  description: yup
    .string()
    .required("please enter a description for the place"),
  images: yup
    .array()
    .of(yup.string().required("please enter an image for the place")),
  address: yup
    .object()
    .shape({
      address: yup
        .string()
        .required("please enter an address string for the place"),
      coordinates: yup
        .object()
        .shape({
          lat: yup
            .number()
            .required("please enter address.coordinates.lat for the place"),
          lng: yup
            .number()
            .required("please enter address.coordinates.lng for the place"),
        })
        .required("please enter an address for the place"),
    })
    .required("please enter an address for the place"),
});

const PLACES_COLLECTION = "places";

async function get(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { id } = handlerEvent.queryStringParameters as { id?: string };

    if (id) {
      const place = await client
        .db(process.env.MONGO_DB_NAME)
        .collection(PLACES_COLLECTION)
        .findOne({ _id: new ObjectId(id) });

      if (!place) {
        return jsonResponse({
          status: 404,
          body: {
            message: `Project with id "${id}" could not be found`,
          },
        });
      }

      return jsonResponse({
        status: 200,
        body: { place },
      });
    }

    const places = await client
      .db(process.env.MONGO_DB_NAME)
      .collection(PLACES_COLLECTION)
      .find()
      .toArray();

    return jsonResponse({
      status: 200,
      body: { places },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error fetching places, please try again later on.",
      },
    });
  }
}

async function post(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { place = null } = handlerEvent.body
      ? JSON.parse(handlerEvent.body)
      : {};

    let placeDocument;

    try {
      placeDocument = await placeSchema.validate(place);
    } catch (error) {
      console.error(error);
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "Validation Error",
            error: (error as Error).message,
          },
        },
      });
    }

    const result = await client
      .db(process.env.MONGO_DB_NAME)
      .collection(PLACES_COLLECTION)
      .insertOne({
        ...placeDocument,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    return jsonResponse({
      status: 200,
      body: { message: "Project successfully added", id: result.insertedId },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message:
          "Error adding your place to the database, please try again later on.",
      },
    });
  }
}

async function put(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    const { id } = handlerEvent.queryStringParameters as { id?: string };

    if (!id) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "It is required to pass a id in the form of a query parameter `id`",
          },
        },
      });
    }

    const { place = null } = handlerEvent.body
      ? JSON.parse(handlerEvent.body)
      : {};

    let placeDocument;

    try {
      placeDocument = await placeSchema.validate(place);
    } catch (error) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "Validation Error",
            error: (error as Error).message,
          },
        },
      });
    }

    await client
      .db(process.env.MONGO_DB_NAME)
      .collection(PLACES_COLLECTION)
      .findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            name: placeDocument.name,
            description: placeDocument.description,
            images: placeDocument.images,
            address: placeDocument.address,
            updatedAt: new Date(),
          },
        }
      );

    return jsonResponse({
      status: 200,
      body: { message: "Project successfully updated" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error updating your place, please try again later on.",
      },
    });
  }
}

async function deleteProject(client: MongoClient, handlerEvent: HandlerEvent) {
  try {
    // Find the query params slug
    const { id } = handlerEvent.queryStringParameters as { id?: string };

    if (!id) {
      return jsonResponse({
        status: 400,
        body: {
          message: {
            name: "It is required to pass a id in the form of a query parameter `id`",
          },
        },
      });
    }

    await client
      .db(process.env.MONGO_DB_NAME)
      .collection(PLACES_COLLECTION)
      .deleteMany({
        _id: new ObjectId(id),
      });

    return jsonResponse({
      status: 200,
      body: { message: "Project successfully deleted" },
    });
  } catch (error) {
    return jsonResponse({
      status: 500,
      body: {
        message: "Error deleting the place, please try again later on.",
      },
    });
  }
}
const handler: Handler = async (event, context) => {
  const handlers = [
    { method: HTTP_METHODS.GET, handler: get },
    { method: HTTP_METHODS.POST, handler: post },
    { method: HTTP_METHODS.PUT, handler: put },
    { method: HTTP_METHODS.DELETE, handler: deleteProject },
  ];

  return adminHandler({
    event,
    context,
    handlers,
    onlyAuthorizedUsers: true,
  });
};

export { handler };

export enum REST_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type Place = {
  _id?: string;
  name: string;
  address: Address;
  description: string;
  images: string[];
  amenities?: {
    alternativeMilks?: boolean;
    oatly?: boolean;
    goodFood?: boolean;
  };
};

export type FormPlaceImage = {
  image: string;
};

export type Address = {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type FormPlace = {
  _id?: string;
  name: string;
  address?: Address;
  description: string;
  amenities?: {
    alternativeMilks?: boolean;
    oatly?: boolean;
    goodFood?: boolean;
  };
  images: FormPlaceImage[];
};

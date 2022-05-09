import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { Place } from "@/types/global";
import parse from "html-react-parser";

interface PlacesPageProps {
  place: Place;
}

const PlacePage: NextPage<PlacesPageProps> = ({ place }) => {
  const mainImage = place.images[0] || "";

  return (
    <>
      <Head>
        <title>{place.name} | cappuccio.coffee</title>
        <meta name="description" content={`Detail page for ${place.name}}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen p-4">
        <div className="w-full md:w-9/12 md:min-h-screen md:m-auto flex flex-col-reverse md:flex-row md:items-center md:justify-center">
          <div className="w-full md:w-1/2 flex flex-col">
            <span className="text-4xl md:text-6xl font-bold">{place.name}</span>
            <span className="text-xl mt-4">{parse(place.description)}</span>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src={mainImage}
              alt="Picture of the place"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const url = `${process.env.baseUrl}/.netlify/functions/places?id=${id}`;

  try {
    const res = await axios.get(url);
    return {
      props: {
        place: res.data.place,
      },
    };
  } catch (error) {
    // Maybe here I should redirect
    return {
      props: {
        place: undefined,
      },
    };
  }
};

import type { NextPage } from "next";
import Head from "next/head";
import { PlacesMap } from "@/components/PlacesMap";

const PlacesPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Places | cappuccio.coffee</title>
        <meta name="description" content="Product & Graphic Designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen">
        <PlacesMap />
      </div>
    </div>
  );
};

export default PlacesPage;

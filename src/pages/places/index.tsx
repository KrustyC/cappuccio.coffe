import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicPlacesMap = dynamic(() => import("@/components/CappuccinosMap"), {
  ssr: false,
});

const PlacesPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Places | cappuccio.coffee</title>
        <meta name="description" content="Product & Graphic Designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen">
        <DynamicPlacesMap />
      </div>
    </div>
  );
};

export default PlacesPage;

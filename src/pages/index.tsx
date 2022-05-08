import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { CappuccinoUndraw } from "@/components/icons/CappuccinoUndraw";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cappuccinos Blog</title>
        <meta name="description" content="Product & Graphic Designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen">
        <div className="w-full md:w-9/12 h-screen m-auto flex flex-col md:flex-row items-center justify-center">
          <div className="w-1/2 flex flex-col">
            <span className="text-6xl font-bold">cappuccio.coffee</span>
            <span className="text-xl mt-4">
              Welcome to our very own collection of <b>good </b> cappuccino
              places around the world! We are Beatrice & Davide and this website
              contains our very own list of great cappuccino places we tried.
              <br />
              Checkout great cappuccinos <Link href="/places">near you.</Link>
            </span>
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <CappuccinoUndraw />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

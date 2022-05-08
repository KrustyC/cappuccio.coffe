import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Cappuccinos Blog</title>
        <meta name="description" content="Product & Graphic Designer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen">
        <div className="w-screen h-screen m-auto flex flex-col items-center justify-center">
          This is the amazing cappuccino{"'"}s blog
        </div>
      </div>
    </div>
  );
};

export default Home;

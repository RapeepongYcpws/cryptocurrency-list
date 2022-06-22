import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/CoinDetail.module.css";
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();
export default function CoinDetail({ coinResult, name }: any) {
  const router = useRouter();
  console.log("router.query ==> 123");

  var [coinData, setCoinData]: any = useState(null);

  useEffect(() => {
    console.log("useEffect ==> ");
    getCoinDetail();
  }, []);
  async function getCoinDetail() {
    setCoinData(coinResult);
    // console.log("CoinData ==> ", JSON.stringify(coinData));
  }

  if (coinData == null) {
    return <>DATA NOT FOUDN</>;
  } else {
    return (
      <>
        <div className="bg-gray-100 mx-auto min-h-screen  h-full p-5 lg:p-10">
          <img
            className={"inline-flex h-20"}
            src={coinData.image.large}
            alt=""
          />
          <div className="mt-3 text-3xl font-bold flex">
            {" "}
            {coinData.name}{" "}
            <span className="p-1 rounded text-lg bg-slate-300 ml-3 self-center">
              {coinData.market_data.current_price.usd.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 break-words"> {coinData.description.en}</div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context: any) {
  let { coinId } = context.query;
  let coinResult = null;
  let queryCoin = await CoinGeckoClient.coins.fetch(coinId, {
    tickers: false,
  });
  if (queryCoin.success) {
    coinResult = queryCoin.data;
  }
  console.log("coinResult ==> 11");
  return {
    props: {
      coinResult: coinResult,
    },
  };
}

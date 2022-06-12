import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function CoinTableList({ coinList }: any) {
  useEffect(() => {
    console.log("coinList123 ==> ", coinList);
  }, []);
  function getGraphUrl(url: string) {
    let id = url.split("/")[5];
    return `https://www.coingecko.com/coins/${id}/sparkline`;
  }

  return (
    <>
      <table className="w-full text-dark dark:text-light relative">
        <thead className="border-y bg-red-400" style={{ zIndex: "1" }}>
          <tr>
            <td className="p-2 self-center break-words text-left sticky left-0 bg-light dark:bg-dark duration-500 min-w-[45px] max-w-[45px]">
              #
            </td>
            <td
              className={`p-2 flex-1 self-center break-words text-left sticky left-[45px] bg-light dark:bg-dark duration-500 min-w-[120px] max-w-[140px]`}
            >
              Name
            </td>
            <td className="p-2 self-center break-words text-right min-w-[100px] bg-light dark:bg-dark duration-500">
              Price
            </td>
            <td className="p-2 self-center break-words text-right min-w-[100px] bg-light dark:bg-dark duration-500">
              24h %
            </td>
            <td className="p-2 self-center break-words text-right min-w-[100px] bg-light dark:bg-dark duration-500">
              7d%
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              Market Cap
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              Volumn(24h)
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              Circulating Supply
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              Last 7 Days
            </td>
          </tr>
        </thead>
        <tbody>
          {coinList.map((coin: any, index: number) => (
            <tr className="border-b" key={index}>
              <td className="p-2 self-center break-words text-left sticky left-0 bg-light dark:bg-dark duration-500 min-w-[45px] max-w-[45px]">
                {coin.market_data.market_cap_rank}
              </td>
              <td
                className={`p-2 flex-1 self-center break-words text-left sticky bg-light dark:bg-dark duration-500 left-[45px] min-w-[140px]`}
              >
                <img
                  src={coin.image.thumb}
                  alt=""
                  className="mr-2 inline-block rounded"
                />{" "}
                <span className="hidden sm:inline">{coin.name + " "}</span>
                <span className="text-sm font-bold py-1 px-2 bg-gray-100 dark:bg-slate-800 rounded text-dark dark:text-light">
                  {coin.symbol.toUpperCase()}
                </span>
              </td>
              <td className="p-2 self-center break-words text-right duration-500 border-b">
                $
                {Boolean(coin.market_data.current_price.usd)
                  ? coin.market_data.current_price.usd.toLocaleString()
                  : ""}
              </td>
              <td
                className={
                  `p-2 self-center break-words text-right ` +
                  (coin.market_data.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500")
                }
              >
                {Boolean(coin.market_data.price_change_percentage_24h)
                  ? coin.market_data.price_change_percentage_24h
                      .toFixed(2)
                      .toLocaleString() + "%"
                  : "-"}
              </td>
              <td
                className={
                  `p-2 self-center break-words text-right ` +
                  (coin.market_data.price_change_percentage_7d > 0
                    ? "text-green-500"
                    : "text-red-500")
                }
              >
                {Boolean(coin.market_data.price_change_percentage_7d)
                  ? coin.market_data.price_change_percentage_7d
                      .toFixed(2)
                      .toLocaleString() + "%"
                  : "-"}
              </td>
              <td className="p-2 self-center break-words text-right">
                {Boolean(coin.market_data.market_cap.usd)
                  ? "$" + coin.market_data.market_cap.usd.toLocaleString()
                  : "-"}
              </td>
              <td className="p-2 self-center break-words text-right">
                {Boolean(coin.market_data.total_volume.usd)
                  ? "$" + coin.market_data.total_volume.usd.toLocaleString()
                  : "-"}
              </td>
              <td className="p-2 self-center break-words text-right">
                {Boolean(coin.market_data.circulating_supply)
                  ? parseInt(
                      coin.market_data.circulating_supply
                    ).toLocaleString() +
                    " " +
                    coin.symbol.toUpperCase()
                  : "-"}
              </td>
              <td className="p-2 self-center break-words text-right ">
                <img
                  className="inline h-14"
                  src={getGraphUrl(coin.image.thumb)}
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  return { props: {} };
}

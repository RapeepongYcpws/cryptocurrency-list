import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function CoinTableList({
  coinList,
  listChange,
  orderTable,
}: any) {
  useEffect(() => {
    console.log("coinList123 ==> ", coinList);
    console.log("listChange123 ==> ", listChange);
  }, []);
  function getGraphUrl(url: string) {
    let id = url.split("/")[5];
    return `https://www.coingecko.com/coins/${id}/sparkline`;
  }
  function sortOrderTable(columnName: String) {
    listChange(columnName);
  }

  return (
    <>
      <table className="w-full text-dark dark:text-light relative">
        <thead className="border-y bg-red-400" style={{ zIndex: "1" }}>
          <tr>
            <td className="p-2 self-center break-words text-left sticky left-0 bg-light dark:bg-dark duration-500 min-w-[45px] max-w-[45px]">
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("index")}
              >
                #
                {orderTable.split(":")[0] == "index" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td
              className={`p-2 flex-1 self-center break-words text-left sticky left-[45px] bg-light dark:bg-dark duration-500 min-w-[120px] max-w-[140px]`}
            >
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("name")}
              >
                Name
                {orderTable.split(":")[0] == "name" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td className="p-2 self-center break-words text-right min-w-[100px] bg-light dark:bg-dark duration-500">
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("price")}
              >
                Price
                {orderTable.split(":")[0] == "price" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td className="p-2 self-center break-words text-right min-w-[100px] bg-light dark:bg-dark duration-500">
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("24h")}
              >
                24h%
                {orderTable.split(":")[0] == "24h" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td className="p-2 self-center break-words text-right min-w-[100px] bg-light dark:bg-dark duration-500">
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("7d")}
              >
                7d%
                {orderTable.split(":")[0] == "7d" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("marketcap")}
              >
                Market Cap
                {orderTable.split(":")[0] == "marketcap" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("volumn")}
              >
                Volumn(24h)
                {orderTable.split(":")[0] == "volumn" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              <span
                className="cursor-pointer"
                onClick={() => sortOrderTable("supply")}
              >
                Circulating Supply
                {orderTable.split(":")[0] == "supply" ? (
                  <FontAwesomeIcon
                    icon={
                      orderTable.split(":")[1] == "asc"
                        ? faCaretUp
                        : faCaretDown
                    }
                    style={{ fontSize: 16, marginLeft: "8px" }}
                  />
                ) : null}
              </span>
            </td>
            <td className="p-2 self-center break-words text-right min-w-[160px] bg-light dark:bg-dark duration-500">
              Last 7 Days
            </td>
          </tr>
        </thead>
        <tbody>
          {coinList.map((coin: any, index: number) => (
            <Link href={"/coin/" + coin.id} key={index}>
              <tr className="border-b cursor-pointer">
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
            </Link>
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

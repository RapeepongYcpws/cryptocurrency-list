import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the icons you need
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { Switch, Pagination, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { SunIcon } from "../public/icon/SunIcon";
import { MoonIcon } from "../public/icon/MoonIcon";
import CoinTableList from "../components/coinTableList";
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();
export default function Index({ resultCoinList }: any) {
  let [coinList, setCoinList] = useState([]);
  const router: any = useRouter();
  let [showLoading, setShowLoading]: any = useState(true);
  let [showBtnScrollToTop, setShowBtnScrollToTop]: any = useState(false);
  let [isDarkMode, setIsDarkMode]: any = useState(false);
  let [currentPage, setCurrentPage]: any = useState();

  function onSwitchThemeChange(value: any) {
    setIsDarkMode(value.target.checked);
    if (value.target.checked) {
      window.localStorage.theme = "dark";
    } else {
      window.localStorage.theme = "light";
    }
  }
  useEffect(() => {
    console.log("use Effect start");
    if (Boolean(window.localStorage.theme)) {
      setIsDarkMode(window.localStorage.theme == "dark");
    } else {
      window.localStorage.theme = "light";
    }
    addEventListener("scroll", () => {
      if (document.documentElement?.scrollTop > 500) {
        setShowBtnScrollToTop(true);
      } else {
        setShowBtnScrollToTop(false);
      }
    });
    if (Boolean(parseInt(router.query.page))) {
      setCurrentPage(parseInt(router.query.page));
      getCoinList(router.query.page);
    } else {
      setCurrentPage(1);
      if (resultCoinList.success) {
        setCoinList(resultCoinList.data);
      }
    }
    console.log(router.query);
    // getCoinList(1);
  }, []);
  async function getCoinList(page: any) {
    console.log("getCoinList ", page);
    let resultCoinList = await CoinGeckoClient.coins.all({
      per_page: 20,
      page: page,
      sparkline: true,
    });
    if (resultCoinList.success) {
      setCoinList(resultCoinList.data);
    }
    setShowLoading(false);
  }
  function pageChange(page: any) {
    setShowLoading(true);
    router.push("?page=" + page);
    getCoinList(page);
  }
  function q() {
    console.log(router.query);
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      {showLoading ? (
        <div className="absolute w-full h-full top-0 left-0 opacity-30 flex justify-center">
          <Loading
            className="fixed top-[40%]"
            color="primary"
            loadingCss={{ width: "150px", height: "150px" }}
          ></Loading>
        </div>
      ) : (
        ""
      )}

      <div className={`${isDarkMode ? "dark" : ""}`}>
        <div
          className="bg-light dark:bg-dark min-h-screen"
          style={{ transition: ".5s" }}
        >
          <div className="container mx-auto">
            <div className="flex py-5">
              <div className="w-full text-2xl font-bold text-dark dark:text-light self-center">
                Crypto Currency
                {/* <button onClick={q}>OK</button> */}
              </div>

              <span className="text-white px-3 w-auto flex items-center h-10">
                <Switch
                  bordered
                  checked={isDarkMode}
                  color="primary"
                  className="mb-1"
                  iconOn={<MoonIcon filled />}
                  iconOff={<SunIcon filled />}
                  onChange={(e) => onSwitchThemeChange(e)}
                />
              </span>
            </div>
            {/* CoinTableList */}
            <div className="m-3 relative" style={{ overflowX: "auto" }}>
              {coinList.length > 0 ? <CoinTableList coinList={coinList} /> : ""}
            </div>
            <div className="flex justify-center py-5">
              <Pagination
                onChange={(e: number) => pageChange(e)}
                total={100}
                page={currentPage}
                // initialPage={currentPage}
              />
            </div>
          </div>
          <div>
            {showBtnScrollToTop ? (
              <button
                className="bg-slate-500 hover:bg-slate-600 dark:bg-gray-200 dark:hover:bg-gray-100 text-light dark:text-dark
                 fixed bottom-20 right-10 md:bottom-10 md:right-20 py-2 px-3 rounded duration-200"
                onClick={scrollToTop}
              >
                <FontAwesomeIcon icon={faArrowUp} style={{ fontSize: 20 }} />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // export async function getStaticProps() {
  console.log("getServerSideProps is START");
  // set theme
  let coinList = await CoinGeckoClient.coins.all({
    per_page: 20,
    page: 1,
    sparkline: true,
  });
  return {
    props: { resultCoinList: coinList }, // will be passed to the page component as props
  };
}

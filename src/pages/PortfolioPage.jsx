import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Holdings from "../components/Holdings";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import StockList from "../components/StockList";
import { BalanceContext } from "../context/BalanceContext";
import { UserContext } from "../context/UserContext";
import { PricesContext } from "../context/PricesContext";
import DropNav from "../components/DropNav";

const PortfolioPage = () => {
  const { prices, setPrices } = useContext(PricesContext);
  const { balance } = useContext(BalanceContext);
  const { user } = useContext(UserContext);
  const [indice, setIndice] = useState("NIFTY%2050");
  const [loading, setLoading] = useState(true);
  const [toggleHold, setToggleHold] = useState(false);
  const width = window.innerWidth;
  const options = [
    { label: "NIFTY 50", value: "NIFTY%2050" },
    { label: "NIFTY 100", value: "NIFTY%20100" },
    { label: "NIFTY 200", value: "NIFTY%20200" },
    { label: "NIFTY 500", value: "NIFTY%20500" },
    { label: "NIFTY BANK", value: "NIFTY%20BANK" },
    { label: "NIFTY IT", value: "NIFTY%20IT" },
    { label: "NIFTY MIDCAP 50", value: "NIFTY%20MIDCAP%2050" },
    { label: "NIFTY AUTO", value: "NIFTY%20AUTO" },
    { label: "NIFTY FMCG", value: "NIFTY%20FMCG" },
    { label: "NIFTY FIN SERVICES", value: "NIFTY%20FIN%20SERVICE" },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetch(
        "https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%2050",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "latest-stock-price.p.rapidapi.com",
            "x-rapidapi-key":
              "dd30c0fdc8msh523335511414c57p184161jsnfc8877fab7bb",
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          setPrices(response);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, navigate, setPrices]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `https://latest-stock-price.p.rapidapi.com/price?Indices=${indice}`;
    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "latest-stock-price.p.rapidapi.com",
        "x-rapidapi-key": "dd30c0fdc8msh523335511414c57p184161jsnfc8877fab7bb",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setPrices(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <DropNav />
          <section className="flex flex-col lp:flex-row mb:justify-center mb:items-center lp:justify-start lp:items-start">
            {width < 640 ? (
              <p className="text-3xl text-blue-500 font-display mt-4 lp:mt-8 lp:border-2 rounded-sm px-4">
                My balance = {Math.round(balance * 100) / 100}
              </p>
            ) : (
              <></>
            )}
            <ul className="tb:hidden flex flex-row w-screen items-center justify-evenly mt-4">
              <li
                className={`${
                  toggleHold
                    ? "text-blue-500"
                    : "text-gray-500 border-2 px-2 py-1 rounded-sm"
                } text-xl font-display mr-4`}
                onClick={() => {
                  setToggleHold(false);
                }}
              >
                Stock list
              </li>
              <li
                className={`${
                  toggleHold
                    ? "text-gray-500 border-2 px-2 py-1 rounded-sm"
                    : "text-blue-500"
                } text-xl font-display mr-4`}
                onClick={() => {
                  setToggleHold(true);
                }}
              >
                Holdings
              </li>
            </ul>
            {width > 640 || !toggleHold ? (
              <section className="w-screen tb:w-1/2 border-2">
                <form className="flex m-2 tb:m-4 items-end lp:items-start">
                  <div className="flex flex-col lp:flex-row ml-4">
                    <label
                      htmlFor="indice"
                      className="mt-1 tb:mt-3 text-lg lp:text-xl font-sans text-gray-800 lp:font-semibold"
                    >
                      Choose an Indice :
                    </label>
                    <select
                      value={indice}
                      className="mt-1 h-8 tb:h-full w-4/5 tb:mt-3 lp:ml-4 text-lg tb:text-xl font-sans text-gray-800 tb:font-semibold"
                      onChange={(e) => {
                        setIndice(e.target.value);
                      }}
                    >
                      {options.map((option, id) => (
                        <option key={id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white h-10 lp:h-full tb:font-semibold lp:font-bold ml-4 lp:ml-8 lp:mt-4 rounded-sm lp:rounded-md px-4"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </form>
                <StockList prices={prices} />
              </section>
            ) : (
              <></>
            )}
            {width > 640 || toggleHold ? (
              <section className="w-1/2 flex items-center flex-col">
                {width > 640 ? (
                  <p className="text-3xl text-blue-500 font-display mt-4 lp:mt-8 lp:border-2 rounded-sm px-4">
                    My balance = {Math.round(balance * 100) / 100}
                  </p>
                ) : (
                  <></>
                )}
                <Holdings />
              </section>
            ) : (
              <></>
            )}
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default PortfolioPage;

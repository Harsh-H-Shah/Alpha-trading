import React, { useState, useContext, useRef } from "react";
import { BalanceContext } from "../context/BalanceContext";
import { ShareContext } from "../context/ShareContext";
import { PricesContext } from "../context/PricesContext";

const SellPrice = (share, key) => {
  const [isOpen, setIsOpen] = useState(false);
  const { balance, setBalance } = useContext(BalanceContext);
  const { shares, setShares } = useContext(ShareContext);
  const { prices } = useContext(PricesContext);
  const quantityRef = useRef(0);
  const handleSell = (
    e,
    share,
    quantity,
    balance,
    setBalance,
    shares,
    setShares,
    prices
  ) => {
    e.preventDefault();
    if (quantity > Number(share.share.quantity)) {
      alert("You dont have enough shares");
    } else {
      const newShares = shares.map((s) => {
        if (s.symbol === share.share.symbol) {
          return {
            ...s,
            quantity: Number(s.quantity) - quantity,
          };
        }
        return s;
      });
      const finalShares = newShares.filter((s) => s.quantity > 0);
      setShares(finalShares);
      const sellingStock = prices.find((p) => p.symbol === share.share.symbol);
      const newBalance =
        Math.round(Number(sellingStock.lastPrice) * quantity * 100) / 100;
      setBalance(Number(balance) + newBalance);
    }
    setIsOpen(false);
  };
  return (
    <article key={key}>
      <section
        onClick={() => setIsOpen(!isOpen)}
        className="m-4 flex flex-row cursor-pointer items-center text-sm w-72 lp:w-full lp:text-lg justify-between bg-blue-300 text-blue-500 bg-opacity-25 border-blue-600 rounded-md border-2 px-4 py-2"
      >
        <p>{share.share.symbol}</p>
        <p className="ml-4 mr-2">Quantity : {share.share.quantity}</p>
        <p className="ml-2">Bought at price : {share.share.price}</p>
      </section>
      {isOpen && (
        <div className="m-4 shadow-neuShadow rounded-md border-2 p-4">
          <form>
            <label htmlFor="quantity" className="ml-4 lp:ml-0">
              Enter quantity :
            </label>
            <input
              type="number"
              name="quantity"
              className="border-none rounded-sm mx-4 mt-2 lp:mt-0"
              ref={quantityRef}
              required
            ></input>
            <button
              className="bg-blue-500 text-white px-4 rounded-sm mx-4 mt-4 lp:mt-0"
              onClick={(e) => {
                handleSell(
                  e,
                  share,
                  quantityRef.current.value,
                  balance,
                  setBalance,
                  shares,
                  setShares,
                  prices
                );
              }}
            >
              Sell
            </button>
          </form>
        </div>
      )}
    </article>
  );
};

export default SellPrice;

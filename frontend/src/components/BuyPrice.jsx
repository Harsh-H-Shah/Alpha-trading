import React, { useState, useContext, useRef } from 'react';
import { BalanceContext } from '../context/BalanceContext';
import { ShareContext } from '../context/ShareContext';

const BuyPrice = (price, key) => {
  const [isOpen, setIsOpen] = useState(false);
  const { balance, setBalance } = useContext(BalanceContext);
  const { shares, setShares } = useContext(ShareContext);
  const quantityRef = useRef(0);
  const sufficientBalance = (price, quantity) => {
    return balance >= price * quantity;
  };
  const handleBuy = (e, price, quantity, setBalance) => {
    e.preventDefault();
    setBalance((balance - price.price.lastPrice * quantity).toFixed(2));
    setShares([
      ...shares,
      {
        symbol: price.price.symbol,
        quantity: quantity,
        price: price.price.lastPrice,
      },
    ]);
    setIsOpen(false);
  };
  return (
    <article key={key}>
      <section
        className={
          'm-4 flex flex-row cursor-pointer items-center justify-between' +
          (price.price.open - price.price.lastPrice < 0
            ? ' bg-green-300 text-green-500 bg-opacity-25 border-green-600 rounded-md border-2 px-4 py-2'
            : ' bg-red-300 text-red-500 bg-opacity-25 border-red-600 rounded-md border-2 px-4 py-2')
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-normal font-sans">{price.price.symbol}</p>
        <p>
          {price.price.lastPrice}
          <span className="text-lg ml-4 mr-2 font-bold">
            {price.price.open - price.price.lastPrice < 0 ? '↑' : '↓'}
          </span>
          {price.price.pChange}%
        </p>
      </section>
      {isOpen && (
        <div className="m-4 shadow-neuShadow rounded-md border-2 p-4">
          <form>
            <label htmlFor="quantity" className="mx-4 mb-4">
              Enter quantity :
            </label>
            <input
              type="text"
              name="quantity"
              className="border-none rounded-sm mx-4"
              ref={quantityRef}
            ></input>
            <button
              className="bg-blue-500 text-white px-4 rounded-sm mx-4 mt-4"
              onClick={(e) => {
                if (
                  sufficientBalance(
                    price.price.lastPrice,
                    quantityRef.current.value
                  )
                ) {
                  handleBuy(e, price, quantityRef.current.value, setBalance);
                } else {
                  alert('Insufficient balance');
                }
                if (quantityRef.current.value <= 0) {
                  alert('Enter a quantity greater than 0');
                } else if (
                  Math.floor(quantityRef.current.value) !==
                  Number(quantityRef.current.value)
                ) {
                  alert('Enter an integer quantity');
                }
              }}
            >
              Buy
            </button>
          </form>
        </div>
      )}
    </article>
  );
};

export default BuyPrice;

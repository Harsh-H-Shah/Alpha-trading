import React from 'react';
import BuyPrice from './BuyPrice';

const StockList = (prices) => {
  return (
    <div className="overflow-scroll max-h-screen">
      {prices &&
        prices.prices.map((price, id) => {
          return <BuyPrice key={id} price={price} />;
        })}
    </div>
  );
};

export default StockList;

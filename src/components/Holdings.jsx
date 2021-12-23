import React, { useContext } from 'react';
import SellPrice from './SellPrice';
import { ShareContext } from '../context/ShareContext';

const Holdings = () => {
  const { shares } = useContext(ShareContext);
  return (
    <>
      {shares &&
        shares.map((share, id) => (
          <SellPrice share={share} key={id * Math.random() * 20} />
        ))}
    </>
  );
};

export default Holdings;

import React, { useContext } from "react";
import SellPrice from "./SellPrice";
import { ShareContext } from "../context/ShareContext";

const Holdings = () => {
  const { shares } = useContext(ShareContext);
  return (
    <>
      {shares.length === 0 && (
        <span className="my-4">
          <p className="text-center text-black font-display text-4xl">Oops</p>
          <p className="text-center text-black font-display text-2xl">
            You don't have any shares yet
          </p>
        </span>
      )}
      {shares &&
        shares.map((share, id) => (
          <SellPrice share={share} key={id * Math.random() * 20} />
        ))}
    </>
  );
};

export default Holdings;

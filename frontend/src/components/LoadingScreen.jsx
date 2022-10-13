import React from 'react';
import '../static/css/Loading.css';

const LoadingScreen = () => {
  return (
    <div className=" bg-gradient-to-r from-gray-500 via-gray-700 to-black w-screen">
      <section className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>Loading</span>
      </section>
    </div>
  );
};

export default LoadingScreen;

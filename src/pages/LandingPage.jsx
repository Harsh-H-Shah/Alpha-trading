import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Banner from '../static/images/Landing.png';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <section className="flex flex-row justify-between content-center">
        <div className="flex flex-col items-center justify-center w-1/2">
          <h1 className="text-7xl font-display font-extrabold -mt-10">
            Alpha Trading
          </h1>
          <h1 className="text-4xl font-sans font-bold mt-10">
            Think stocks
            <br /> differently
          </h1>
          <Link to="/playground">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
              Get started
            </button>
          </Link>
        </div>
        <img src={Banner} alt="Banner" className="h-screen" />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import DropNav from '../components/DropNav';
import Banner from '../static/images/Landing.png';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <DropNav />
      <section className="flex flex-row justify-between items-center min-w-full">
        <div className="flex flex-col items-start mx-4 tb:ml-20 lp:ml-32 dp:items-center justify-center w-1/2 my-36 tb:my-56">
          <h1 className="text-3xl tb:text-3xl lp:text-5xl dp:text-7xl font-display font-extrabold -mt-10 select-none">
            Alpha Trading
          </h1>
          <h1 className="text-xl tb:text-2xl lp:text-3xl dp:text-4xl font-sans font-bold mt-10 select-none">
            Think stocks
            <br /> differently
          </h1>
          <Link to="/portfolio">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm lp:text-xl tb:font-bold py-1 tb:py-2 px-2 lp:px-4 rounded mt-6">
              Get started
            </button>
          </Link>
        </div>
        <img
          src={Banner}
          alt="Banner"
          className="h-2/5 tb:h-2/5 lp:4/5 dp:h-screen w-1/2 tb:w-2/5"
        />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;

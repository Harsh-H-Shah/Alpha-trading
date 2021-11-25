import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Think stocks differently</h1>
      <Link to="/playground">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get started
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default LandingPage;

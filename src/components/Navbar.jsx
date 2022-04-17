import React, { useContext } from 'react';
import Logo from '../static/images/LogoBlack.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Profile from './Profile';

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="hidden tb:visible h-16 bg-black tb:flex flex-row tb:justify-evenly lp:justify-start dp:justify-between items-center font-serif shadow-md">
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-16 w-full" />
      </Link>
      <section className="flex flex-row justify-between text-white dp:text-xl mx-6">
        <Link to="/">
          <p className="mx-4 lp:mx-8 dp:mx-12">Home</p>
        </Link>
        {user ? (
          <Link to="/portfolio">
            <p className="mx-6 lp:mx-8 dp:mx-12">Portfolio</p>
          </Link>
        ) : (
          <Link to="/login">
            <p className="mx-6 lp:mx-8 dp:mx-12">Portfolio</p>
          </Link>
        )}
        <Link to="/news">
          <p className="mx-6 lp:mx-8 dp:mx-12">News</p>
        </Link>
        <Link to="/about">
          <p className="mx-6 lp:mx-8 dp:mx-12">About</p>
        </Link>
      </section>
      {user ? (
        <Profile />
      ) : (
        <Link to="/login">
          <p className="text-white lp:text-xl mr-4">Login/SignUp</p>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

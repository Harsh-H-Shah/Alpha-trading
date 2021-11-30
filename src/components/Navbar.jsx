import React, { useContext } from 'react';
import Logo from '../static/images/LogoBlack.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Profile from './Profile';

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="h-16 bg-black flex flex-row justify-between items-center font-serif shadow-md">
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-16" />
      </Link>
      <section className="flex flex-row justify-between text-white text-xl">
        <Link to="/">
          <p className="mx-12">Home</p>
        </Link>
        <Link to="/playground">
          <p className="mx-12">Playground</p>
        </Link>
        <Link to="/blog">
          <p className="mx-12">Blog</p>
        </Link>
        <Link to="/about">
          <p className="mx-12">About</p>
        </Link>
      </section>
      {user ? (
        <Profile />
      ) : (
        <Link to="/login">
          <p className="text-white text-xl mr-4">Login/SignUp</p>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;

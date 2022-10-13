import React, { useState, useContext } from 'react';
import Logo from '../static/images/logoSmall.png';
import hamburger from '../static/icons/hamburger.png';
import close from '../static/icons/close.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import auth from '../firebase';
import { signOut } from 'firebase/auth';

const DropNav = () => {
  const { user, setUser } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);
  const Signout = () => {
    const userConfirmSignOut = window.confirm(
      'Are you sure you want to sign out?'
    );
    if (userConfirmSignOut) {
      signOut(auth)
        .then(() => {
          setUser(null);
          setOpenMenu(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <nav className="tb:hidden w-screen bg-black drop-shadow-md flex flex-row z-50 items-center">
      <img
        src={hamburger}
        alt="hamburger"
        className="h-6 w-6 mx-4 my-2 cursor-pointer"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      />
      <Link to="/">
        <img src={Logo} alt="logo" className="h-8 my-2" />
      </Link>
      {openMenu && (
        <ul
          className="bg-gray-900 text-white z-50 h-screen fixed left-0 w-3/4 top-0 flex flex-col items-start"
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <section className="w-full flex flex-row items-center justify-between shadow-neuShadow">
            {user ? (
              <p className="mx-4">
                Welcome,{' '}
                <span className="text-lg font-sans">{user.displayName}</span>
              </p>
            ) : (
              <p className="text-md font-sans ml-4">
                <Link to="/signup" className="mr-1">
                  Sign Up
                </Link>
                /
                <Link to="/login" className="ml-1">
                  Log In
                </Link>
              </p>
            )}
            <button
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              <img src={close} alt="close" className="h-4 w-4 m-4" />
            </button>
          </section>
          <Link className="ml-4 my-3 cursor-pointer" to="/">
            Home
          </Link>
          <hr className=" bg-primary w-full opacity-30" />
          <li className="ml-4 mt-4 mb-3 cursor-pointer">
            {user ? (
              <Link to="/portfolio">Portfolio</Link>
            ) : (
              <Link to="/login">Portfolio</Link>
            )}
          </li>
          <hr className=" bg-primary w-full opacity-30" />
          <Link className="ml-4 my-3 cursor-pointer" to="/news">
            News
          </Link>
          <hr className=" bg-primary w-full opacity-30" />
          <Link className="ml-4 my-3 cursor-pointer" to="/about">
            About
          </Link>
          <hr className=" bg-primary w-full opacity-30" />
          {user && (
            <button
              className="ml-4 my-3 cursor-pointer"
              onClick={() => {
                Signout();
              }}
            >
              <Link to="/">Sign out</Link>
            </button>
          )}
        </ul>
      )}
    </nav>
  );
};

export default DropNav;

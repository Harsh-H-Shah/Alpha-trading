import React from 'react';
import Logo from '../static/images/LogoBlack.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex flex-col tb:flex-row tb:place-content-between justify-evenly font-sans font-light align-middle bg-black">
      <section className="flex flex-col align-middle mx-10 text-sm tb:text-lg text-white tracking-wider">
        <img src={Logo} alt="logo" className="w-36 tb:w-full tb:h-28" />
        <p>Alpha Trading Ltd.</p>
        <div className="flex flex-row justify-between mt-4">
          <a href="www.facebook.com">
            <i className="fab fa-facebook fa-2x" />
          </a>
          <a href="https://twitter.com/home">
            <i className="fab fa-twitter fa-2x" />
          </a>
          <a href="https://www.linkedin.com/feed/">
            <i className="fab fa-linkedin fa-2x" />
          </a>
          <a href="https://github.com/Harsh-H-Shah/Alpha-trading">
            <i className="fab fa-github fa-2x" />
          </a>
        </div>
      </section>
      <section className="flex flex-col content-end mx-10 text-white tracking-wider">
        <p className="font-medium text-lg tb:text-xl my-6">Products</p>
        <Link to="/portfolio" className="mt-1 text-sm tb:text-lg">
          Playground
        </Link>
        <Link to="/portfolio" className="mt-1 text-sm tb:text-lg">
          Stock Prices
        </Link>
        <Link to="/news" className="mt-1 text-sm tb:text-lg">
          News
        </Link>
        <Link to="/news" className="mt-1 text-sm tb:text-lg">
          Guidances
        </Link>
      </section>
      <section className="flex flex-col content-end mx-10 text-white tracking-wider mb-6 tb:mb-4 lp:mb-2">
        <p className="font-medium text-lg tb:text-xl my-6">Alpha</p>
        <Link to="/about" className="mt-1 text-sm tb:text-lg">
          About us
        </Link>
        <Link to="/about" className="mt-1 text-sm tb:text-lg">
          Help and support
        </Link>
        <Link to="/privacy-policy" className="mt-1 text-sm tb:text-lg">
          Privacy Policy
        </Link>
        <Link to="/terms" className="mt-1 text-sm tb:text-lg">
          Terms of Use
        </Link>
      </section>
    </footer>
  );
};

export default Footer;

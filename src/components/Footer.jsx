import React from 'react';
import Logo from '../static/images/LogoBlack.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex flex-row justify-evenly font-sans font-light align-middle bg-black">
      <section className="flex flex-col content-end mx-10 text-lg text-white tracking-wider mb-8">
        <img src={Logo} alt="logo" className="h-28" />
        <p>
          Alpha Trading Ltd.
          <br />
          All rights reserved.
        </p>
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
        <p className="font-medium text-xl my-6">Products</p>
        <Link to="/playground" className="mt-1">
          Playground
        </Link>
        <Link to="/playground" className="mt-1">
          Prices
        </Link>
        <Link to="/blog" className="mt-1">
          Blogs
        </Link>
        <Link to="/blog" className="mt-1">
          News
        </Link>
        <Link to="/blog" className="mt-1">
          Guidances
        </Link>
      </section>
      <section className="flex flex-col content-end mx-10 text-white tracking-wider">
        <p className="font-medium text-xl my-6">Alpha</p>
        <Link to="/about" className="mt-1">
          About us
        </Link>
        <Link to="/about" className="mt-1">
          Help and support
        </Link>
        <Link to="/about" className="mt-1">
          Careers
        </Link>
        <Link to="/privacy-policy" className="mt-1">
          Privacy Policy
        </Link>
        <Link to="/terms" className="mt-1">
          Terms of Use
        </Link>
      </section>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <section className="mt-6 mx-10">
        <h1 className="text-2xl font-sans font-bold">About us</h1>
        <p className="text-xl font-sans font-light mt-10">
          Alpha Trading is a platform which primarily focuses on helping the
          youth with investing. We are developing a Playground for users in
          which users can experience trading without risking their fortune. We
          will be using certain APIs to fetch current stock price data. Users
          can buy and sell stocks with our imitation money. We also provide a
          news and information page in which we will be fetching news regarding
          the market. This will help users understand how the markets work and
          the significant impact news can have on it. Our goal isn’t to just
          provide a pseudo trading platform, instead we will focus more on
          educating and training our users.
        </p>
        <p className="text-xl font-sans font-light mt-10">
          We have developed 4 pages, Landing, Authentication, Playground,
          News/Info. First the Landing page where we will check if the user is
          authenticated or not. If not, user can redirect themselves to the
          Login/Signup Page where user can register and authenticate themselves.
          The authentication and registration process are done with the help of
          Firebase.
        </p>
        <p className="text-xl font-sans font-light mt-10">
          Once the user is authenticated they can have access to the Playground
          page. The Playground is a learning platform where you can invest in
          stocks using our imitation currency. Users can study companies on the
          news/fact page and then invest using that knowledge. This will help
          users learn investing rather than gambling.
        </p>
        <p className="text-xl font-sans font-light mt-10">
          We have used Rapid API in order to fetch the latest news for the
          News/Info page and prices of the stocks for the Playground. With
          RapidAPI, you can consume any API using a unified format that is easy
          to understand and embed in your application. Moreover, you can view
          all of the APIs you are connected to using a dashboard that monitors
          things like the number of API requests, latency, and error rates.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;

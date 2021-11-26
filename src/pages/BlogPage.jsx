import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BlogPage = () => {
  useEffect(() => {
    fetch('https://mboum-finance.p.rapidapi.com/ne/news', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
        'x-rapidapi-key': 'dd30c0fdc8msh523335511414c57p184161jsnfc8877fab7bb',
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <h1>Blog</h1>
      <Footer />
    </div>
  );
};

export default BlogPage;

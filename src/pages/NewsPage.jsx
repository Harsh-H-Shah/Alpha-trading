import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BlogPost from "../components/BlogPost";
import LoadingScreen from "../components/LoadingScreen";
import DropNav from "../components/DropNav";

const NewsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://mboum-finance.p.rapidapi.com/ne/news/?symbol=AAPL%2CMSFT", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "mboum-finance.p.rapidapi.com",
        "x-rapidapi-key": "dd30c0fdc8msh523335511414c57p184161jsnfc8877fab7bb",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setBlogs(response.item);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <DropNav />
          <section className="flex flex-col justify-center items-center mt-8">
            <h1 className="text-3xl lp:text-5xl dp:text-6xl font-bold font-display text-center">
              Stock News
            </h1>
            {blogs &&
              blogs.map((blog, index) => <BlogPost blog={blog} key={index} />)}
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default NewsPage;

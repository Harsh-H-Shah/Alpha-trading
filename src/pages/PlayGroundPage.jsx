import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingScreen from '../components/LoadingScreen';

const PlayGroundPage = () => {
  const [loading] = useState(true);
  // useEffect(() => {
  //   fetch('https://latest-stock-price.p.rapidapi.com/any', {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
  //       'x-rapidapi-key': 'dd30c0fdc8msh523335511414c57p184161jsnfc8877fab7bb',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);
  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <h1>Play ground page</h1>
          <Footer />
        </>
      )}
    </div>
  );
};

export default PlayGroundPage;

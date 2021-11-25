import React, { useEffect } from 'react';

const PlayGroundPage = () => {
  useEffect(() => {
    fetch('https://latest-stock-price.p.rapidapi.com/any', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
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
      <h1>Khelo dimaag se</h1>
    </div>
  );
};

export default PlayGroundPage;

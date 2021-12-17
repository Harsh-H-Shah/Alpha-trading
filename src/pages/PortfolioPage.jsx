import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Holdings from '../components/Holdings';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import StockList from '../components/StockList';
import { BalanceContext } from '../context/BalanceContext';
import { UserContext } from '../context/UserContext';
import { PricesContext } from '../context/PricesContext';

const PortfolioPage = () => {
  const [indice, setIndice] = useState('NIFTY%2050');
  const { prices, setPrices } = useContext(PricesContext);
  const [loading, setLoading] = useState(true);
  const { balance } = useContext(BalanceContext);
  const { user } = useContext(UserContext);
  console.log(user);
  const options = [
    { label: 'NIFTY 50', value: 'NIFTY%2050' },
    { label: 'NIFTY 100', value: 'NIFTY%20100' },
    { label: 'NIFTY 200', value: 'NIFTY%20200' },
    { label: 'NIFTY 500', value: 'NIFTY%20500' },
    { label: 'NIFTY BANK', value: 'NIFTY%20BANK' },
    { label: 'NIFTY IT', value: 'NIFTY%20IT' },
    { label: 'NIFTY MIDCAP 50', value: 'NIFTY%20MIDCAP%2050' },
    { label: 'NIFTY AUTO', value: 'NIFTY%20AUTO' },
    { label: 'NIFTY FMCG', value: 'NIFTY%20FMCG' },
    { label: 'NIFTY FIN SERVICES', value: 'NIFTY%20FIN%20SERVICE' },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetch(
        'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%2050',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
            'x-rapidapi-key':
              'dd30c0fdc8msh523335511414c57p184161jsnfc8877fab7bb',
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          setPrices(response);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, navigate, setPrices]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `https://latest-stock-price.p.rapidapi.com/price?Indices=${indice}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
        'x-rapidapi-key': 'dd30c0fdc8msh523335511414c57p184161jsnfc8877fab7bb',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setPrices(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <div className="flex flex-row">
            <section className="w-1/2 border-2">
              <form className="flex m-4 align-middle">
                <label
                  htmlFor="email"
                  className="mt-3 text-xl font-sans text-gray-800 font-semibold"
                >
                  Choose an Indice :
                </label>
                <select
                  value={indice}
                  className="mt-3 ml-4 text-xl font-sans text-gray-800 font-semibold"
                  onChange={(e) => {
                    setIndice(e.target.value);
                  }}
                >
                  {options.map((option, id) => (
                    <option key={id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-8 mt-2 rounded-md px-4"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </form>
              <StockList prices={prices} />
            </section>
            <section className="w-1/2 flex items-center flex-col">
              <p className="text-3xl text-blue-500 font-display mt-8 border-2 rounded-sm px-4">
                My balance = {balance}
              </p>
              <Holdings prices={prices} />
            </section>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default PortfolioPage;

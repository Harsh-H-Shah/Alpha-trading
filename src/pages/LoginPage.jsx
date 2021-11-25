import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      <h1>Login here</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          setUser({ name: 'Harshit', age: '21', email: 'harshit@gmail.com' })
        }
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;

import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { Link, Navigate } from 'react-router-dom';

const SignupPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [samasya, setSamasya] = useState('');
  const handleSubmit = async (e, auth, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('Signed up');
        setSamasya('');
        setUser(userCredential.user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        setSamasya(error.message.slice(22, -2));
        // ..
      });
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />
      <div className="w-screen flex flex-col justify-center items-center h-5/6">
        <form className="flex flex-col bg-primary shadow-pn  rounded-lg p-7 mt-14 w-4/6 font-sans">
          <div className="font-medium text-xl tb:text-3xl text-center">
            Sign Up
          </div>
          {samasya && (
            <p className="text-sm tb:text-lg font-sans text-secondary-brightred text-center">
              {samasya}
            </p>
          )}
          <label htmlFor="email" className="mt-3 tb:mt-5 text-md tb:text-xl">
            Email:
          </label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-1 tb:mt-2 w-86 h-7 tb:h-8 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-2 tb:p-4"
          ></input>
          <label htmlFor="password" className="mt-3 tb:mt-5 text-md tb:text-xl">
            Create password:
          </label>
          <input
            type="password"
            name="pass"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mt-1 tb:mt-2 w-86 h-7 tb:h-8 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-2 tb:p-4"
          ></input>
          <label
            htmlFor="confirmpass"
            className="mt-3 tb:mt-5 text-md tb:text-xl"
          >
            Confirm password:
          </label>
          <input
            type="password"
            name="confirmpass"
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
            className="mt-1 tb:mt-2 w-86 h-7 tb:h-8 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-2 tb:p-4"
          ></input>
          <button
            type="submit"
            onClick={(e) => {
              if (password === confirmPass) {
                handleSubmit(e, auth, email, password);
              } else {
                e.preventDefault();
                setSamasya('Passwords did not match');
              }
            }}
            className="mt-4 w-28 h-8 items-center rounded-md shadow-md text-gray-50 text-md bg-gray-900 font-medium"
          >
            Sign Up
          </button>
          <div className="mt-3 tb:mt-8 text-md tb:text-xl">
            Already have an account?
            <Link to="/login">
              <span className="cursor-pointer underline underline-secondary-blue text-secondary-blue">
                Login
              </span>
            </Link>
            .
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

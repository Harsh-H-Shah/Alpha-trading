import React, { useState, useContext, useRef } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../firebase';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { Link, Navigate } from 'react-router-dom';
import DropNav from '../components/DropNav';

const SignupPage = () => {
  const { user, setUser } = useContext(UserContext);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [samasya, setSamasya] = useState('');
  const handleSubmit = async (e, auth, name, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('Signed up');
        setSamasya('');
        setUser(userCredential.user);
        updateProfile(auth.currentUser, {
          displayName: `${name}`,
        })
          .then(() => {
            console.log(name);
          })
          .catch((error) => {
            console.log(error);
          });
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
      <DropNav />
      <div className="w-screen flex flex-col justify-center items-center h-5/6">
        <form className="flex flex-col bg-primary shadow-pn  rounded-lg p-7 mt-14 w-5/6 tb:w-4/6 font-sans">
          <div className="font-bold text-2xl font-sans tb:text-3xl text-center">
            Sign Up
          </div>
          {samasya && (
            <p className="text-sm tb:text-lg font-sans text-secondary-brightred text-center">
              {samasya}
            </p>
          )}
          <label htmlFor="email" className="mt-3 tb:mt-5 text-md tb:text-xl">
            Name:
          </label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            className="mt-1 tb:mt-2 w-86 h-7 tb:h-8 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-2 tb:p-4"
          ></input>
          <label htmlFor="email" className="mt-3 tb:mt-5 text-md tb:text-xl">
            Email:
          </label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            className="mt-1 tb:mt-2 w-86 h-7 tb:h-8 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-2 tb:p-4"
          ></input>
          <label htmlFor="password" className="mt-3 tb:mt-5 text-md tb:text-xl">
            Create password:
          </label>
          <input
            type="password"
            name="pass"
            ref={passwordRef}
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
            ref={confirmPasswordRef}
            className="mt-1 tb:mt-2 w-86 h-7 tb:h-8 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-2 tb:p-4"
          ></input>
          <button
            type="submit"
            onClick={(e) => {
              if (
                passwordRef.current.value === confirmPasswordRef.current.value
              ) {
                handleSubmit(
                  e,
                  auth,
                  nameRef.current.value,
                  emailRef.current.value,
                  passwordRef.current.value
                );
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

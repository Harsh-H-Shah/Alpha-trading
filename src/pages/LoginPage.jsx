import React, { useState, useContext, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Navigate, Link } from 'react-router-dom';
import auth from '../firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { UserContext } from '../context/UserContext';
import {
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth';

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [samasya, setSamasya] = useState('');

  const handleLogin = (e, auth, email, password) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        // ...
      })
      .catch((error) => {
        setSamasya(error.message.slice(22, -2));
      });
  };

  const GoogleProvider = new GoogleAuthProvider();
  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem('token', token);
        // The signed-in user info.
        setUser(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        setSamasya(error.message.slice(22, -2) + email);
        // ...
      });
  };

  const TwitterProvider = new TwitterAuthProvider();
  const handleTwitter = (e) => {
    e.preventDefault();
    signInWithPopup(auth, TwitterProvider)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        console.log(token, secret);
        // The signed-in user info.
        setUser(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />
      <div className="w-screen flex flex-col justify-center items-center h-5/6">
        <form className="flex flex-col bg-primary shadow-pn  rounded-lg p-7 mt-14 w-4/6 font-sans  ">
          <h1 className="font-semibold font-sans text-2xl text-center">
            Login
          </h1>
          {samasya && (
            <p className="text-sm font-sans text-red-600 border-2 rounded-md border-red-600 w-max px-4 self-center mt-2">
              {samasya}
            </p>
          )}
          <label htmlFor="email" className="mt-3 text-md">
            Email:
          </label>
          <input
            type="text"
            name="email"
            ref={emailRef}
            className="mt-1 w-86 h-7 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-4"
          ></input>
          <label htmlFor="password" className="mt-3 text-md">
            Password:
          </label>
          <input
            type="password"
            name="pass"
            ref={passwordRef}
            className="mt-1 w-86 h-7 rounded-md border border-opacity-20 border-secondary-lightgray focus:outline-none p-4"
          ></input>
          <button
            onClick={(e) =>
              handleLogin(
                e,
                auth,
                emailRef.current.value,
                passwordRef.current.value
              )
            }
            className="mt-4 w-28 h-8 text-gray-50 text-md bg-gray-900 items-center rounded-md shadow-md font-medium"
          >
            LogIn
          </button>
          <div className="mt-3 text-md mb-6">
            Need an account?
            <Link to="/signup">
              <span className="cursor-pointer underline underline-secondary-blue text-secondary-blue">
                Signup
              </span>
            </Link>
            .
          </div>
          <hr></hr>
          <section className="flex flex-row justify-evenly items-center">
            <button
              className="flex text-lg font-sans text-red-50 w-max bg-red-500 px-4 py-1 mt-5 self-center rounded-md"
              onClick={(e) => {
                handleGoogle(e);
              }}
            >
              Sign up with Google
            </button>
            <button
              className="flex text-lg font-sans text-red-50 w-max bg-blue-600 px-4 py-1 mt-5 self-center rounded-md"
              onClick={(e) => {
                handleTwitter(e);
              }}
            >
              Sign up with Twitter
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

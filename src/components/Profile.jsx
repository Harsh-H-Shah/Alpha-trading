import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import auth from '../firebase';
import { signOut } from 'firebase/auth';
import useNavigate from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [dropDown, setDropDown] = useState(false);
  const Signout = () => {
    const userConfirmSignOut = window.confirm(
      'Are you sure you want to sign out?'
    );
    if (userConfirmSignOut) {
      signOut(auth)
        .then(() => {
          navigate('/login');
          setUser(null);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      setDropDown(false);
    }
  };

  return (
    <div>
      <button
        className="text-white text-xl mr-4"
        onClick={() => setDropDown(!dropDown)}
      >
        {user.displayName}
      </button>
      {dropDown && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <form
              onSubmit={() => {
                Signout();
              }}
            >
              <button
                type="submit"
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

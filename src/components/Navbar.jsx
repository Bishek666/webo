import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faHome, faSignOut, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  
  return (
    <>
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between px-2 py-2 bg-gray-100 shadow-neuMorphismShadowSm">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-600"
              to="/"
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="ml-2">Home</span>
            </Link>
          </div>
          <div
            className="lg:flex flex-grow items-center"
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 mr-11 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                      to="/profile"
                    >
                      <div className="flex flex-wrap justify-center">
                        <div className="flex items-center">
                            <img
                              src={user.photoURL}
                              alt="..."
                              className="shadow rounded-full w-11 h-11 align-middle border-none"
                            />
                          <span className="ml-2">{user.displayName} </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                      onClick={() => {
                        signOut(auth);
                      }}
                    >
                      <FontAwesomeIcon icon={faSignOut} />
                      <span className="ml-2">Logout</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-600 hover:opacity-75"
                    to="/login"
                  >
                    <FontAwesomeIcon icon={faSignIn} />
                    <span className="ml-2">Login / Register </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

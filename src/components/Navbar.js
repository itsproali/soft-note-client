import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase-init";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div className="navbar bg-purple-700 w-full px-16">
      <div className="flex-1">
        <Link to="/" className="normal-case text-2xl text-white">
          Soft Note
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-circle avatar">
              <div className="w-10 rounded-full">
                <p className="text-2xl text-white w-full items-center justify-center">
                  {user?.displayName?.split(0, 1)}
                </p>
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  className="btn w-full text-white"
                  onClick={handleLogout}
                >
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="flex items-center">
            <li>
              <NavLink to="/login" className="btn btn-primary mx-2">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="btn btn-primary mx-2">
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;

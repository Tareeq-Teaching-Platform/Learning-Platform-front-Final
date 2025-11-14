import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { User2, Search } from "lucide-react";
import { useAuth } from "../../Context/AuthProvider";
import Cart from "./Cart";
import SearchModal from "../SearchModal";
import NotLoggedIn from "../NotLoggedIn";
import logo from "../../logo/logo.png";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Helper function to determine active class
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-green-600 bg-green-50 font-semibold transition-all duration-200"
      : "text-gray-700 hover:text-green-600 hover:bg-green-50 font-semibold transition-all duration-200";
  };

  return (
    <>
      <header className="flex items-center justify-between max-h-16 bg-white shadow-lg px-4 sticky top-0 z-50 backdrop-blur-sm">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="inline-block hover:scale-105 transition-all duration-300"
          >
            <img src={logo} alt="Company Logo" className="h-30 w-auto" />
          </Link>
        </div>

        {/* Navigation Links - Center */}
        <div className="flex-none hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-4 text-lg">
            <li>
              <NavLink to="/" className={getNavLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes" className={getNavLinkClass}>
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavLinkClass}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/faqs" className={getNavLinkClass}>
                FAQs
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Search, Cart & Profile/Auth - Right */}
        <div className="flex-none gap-2 flex items-center">
          {/* Search Button - No login required */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="btn btn-ghost btn-circle hover:bg-green-200 font-bold bg-green-50"
            title="Search courses"
          >
            <Search className="h-6 w-6 text-green-800" />
          </button>

          <Cart />

          {/* Profile or Login Button */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-green-50 hover:scale-105 transition-all duration-150 hover:ring-green-400"
              >
                <div className="w-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User2 className="h-fit w-full text-green-800" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white rounded-xl w-52 border-2 border-green-100"
              >
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-green-600 bg-green-50"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                      } justify-between transition-all duration-150`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-green-600 bg-green-50"
                          : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                      } transition-all duration-200`
                    }
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost hover:bg-green-50 hover:scale-110 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-white rounded-xl w-52 border-2 border-green-100"
            >
              <li>
                <NavLink to="/" className={getNavLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/classes" className={getNavLinkClass}>
                  Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={getNavLinkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs" className={getNavLinkClass}>
                  FAQs
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Search Modal - Available to all users */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import logo from "../Images/logo2.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignout } from "./redux/actions/userActions";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import AdminHeader from "./Admin/AdminHeader";

function Header() {
  const [open, setOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [colorChange, setColorchange] = useState(false);
  const userLogo = userInfo?.logo;
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const logoutHandler = () => {
    dispatch(userSignout());
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    userInfo?.email == "kim" ? (
      <div className="head">
    
        </div>
    ) : (
    <Disclosure
      as="nav"
      className={
        colorChange
          ? "bg-white fixed top-0 right-0 left-0 text-gray-700"
          : "bg-orange-500 text-white z-[999999px] relative"
      }
    >
      {" "}
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center h-16 justify-between">
          <div className="flex items-center justify-center hover:font-extrabold cursor-pointer">
            <span className="sm:hidden">
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={handleClose}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={handleClose}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              )}
            </span>
            <Link to="/">
              <span className="sm:block hidden">Patakenya</span>
            </Link>
          </div>

          <div className="sm:ml-2">
            <div className="flex sm:space-x-2 items-center">
              {userInfo ? (
                <ul className="flex sm:space-x-2 items-center">
                  <li className="text-sm font-medium rounded-md hover:text-gray-700 px-3 py-3 divide-x divide-solid list-none">
                    <Link to={`/my-messages`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-100 icons"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li className="text-sm font-medium rounded-md hover:text-gray-700 px-3 py-3 divide-x divide-solid list-none">
                    <Link to={`/my-notifications/${userInfo?._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-100 icons"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </Link>
                  </li>
                  <div className="dropdown inline-block relative dropdown">
                    <li className="text-sm font-medium rounded-md hover:text-gray-700 px-3 py-3 divide-x divide-solid list-none cursor-pointer">
                      {userLogo && (
                        <img
                          className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-100 icons"
                          src={`${userLogo}`}
                          alt="avatar"
                        />
                      )}
                    </li>

                    <ul className="dropdown-menu absolute hidden text-gray-500 pt-1 w-[150px] text-sm">
                      <li className="rounded-t bg-gray-200 hover:bg-slate-300 py-2 px-4 block whitespace-no-wrap">
                        <Link to={`/profile/${userInfo?._id}`}>Profile</Link>
                      </li>
                      <li className="bg-gray-200 hover:bg-slate-300 py-2 px-4 block whitespace-no-wrap">
                        <Link to="/my-dashboard/page/my-ads">My ads</Link>
                      </li>
                      <li className="rounded-b bg-gray-200 hover:bg-slate-300 py-2 px-4 block whitespace-no-wrap">
                        <Link to="#logout" onClick={logoutHandler}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ul>
              ) : (
                <ul className="flex sm:space-x-2 items-center">
                  <li className="text-sm font-medium rounded-md hover:text-gray-700 px-3 py-3 divide-x divide-solid list-none">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="text-sm font-medium rounded-md hover:text-gray-700 px-3 py-3 divide-x divide-solid list-none">
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              )}

              <div className="flex justify-center">
                <button className="text-center items-center rounded-md font-bold bg-orange-400 px-8 py-1 text-white hover:bg-orange-300">
                  <Link to="/post-ad-free">SELL</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={open ? "nav-list nav-open sm:hidden" : "nav-list"}>
        <Sidebar2 />
      </div>
    </Disclosure>
    )
  );
}

export default Header;

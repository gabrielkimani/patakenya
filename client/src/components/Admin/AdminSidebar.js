import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../Images/logo2.png';

function AdminSidebar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div className="w-[250px] mt-3 hidden sm:block py-4">
      <ul className="space-y-2 w-full h-auto shadow-md rounded">
        <li>
          <span className="mx-auto space-y-4">
            <img
              src={logo}
              alt="product"
              className="h-24 w-24 rounded-full mx-auto"
            />
            <h4 className="text-center text-md text-gray-400 pb-3">
             PATAKENYA LTD
            </h4>
          </span>
          <hr />
        </li>
        <li className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer">
          <Link to="/admin/dashboard/page/my-ads" className="flex items-center">
            <span className="text-sm text-orange-500 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </span>
            <span className="text-md font-medium text-orange-500">Customers</span>
          </Link>
        </li>
        <li className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer">
          <Link to="/my-messages" className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </span>
            <span className="text-md font-medium text-gray-600">Ads </span>
          </Link>
        </li>
        
        <li className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer">
          <Link to="/my-dashboard/page/performance" className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span className="text-md font-medium text-gray-600">
              Messages
            </span>
          </Link>
        </li>
        <li className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer">
          <Link to="/my-dashboard/page/query" className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span className="text-md font-medium text-gray-600">Analytics </span>
          </Link>
        </li>
        <li className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer">
          <Link to="/my-dashboard/page/settings" className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <span className="text-md font-medium text-gray-600">Settings </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;

import React from 'react'
import { Link } from 'react-router-dom';
import {categories} from "./utils/data";


function Sidebar2() {

    
  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || "";
    return `/search/category/${filterCategory}`;
    
      };
  return (
<div className="w-[300px] ">
            <ul className="space-y-2 w-full h-auto shadow-md rounded">
              {categories.map((item, index) => (
                <li
                  key={index}
                  className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer"
                >
                  <Link to={getFilterUrl({category:item?.value})} className="flex items-center justify-between" href="local">
                    <span className="text-md font-medium text-gray-600">
                      {item.value}
                    </span>
                    <span className="text-sm text-gray-700">
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
                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>  )
}

export default Sidebar2
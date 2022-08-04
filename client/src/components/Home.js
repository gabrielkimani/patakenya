import React, { useEffect } from "react";
import { BellIcon } from "@heroicons/react/outline";
import bg from "../Images/bg-image.jpg";
import MiniLoader from "./utils/MiniLoader";
import { listAds } from "./redux/actions/adActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { numberWithCommas } from "./utils/noWithComma";
import {categories} from "./utils/data";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  
  const adsList = useSelector((state) => state.adsList);
  const { ads, error, loading } = adsList;

  useEffect(() => {
    dispatch(listAds({}));

    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/adName/${query}`);
  };

  const getFilterUrl = (filter) => {
const filterCategory = filter.category || "";
return `/search/category/${filterCategory}`;

  };

  return (
    <div>
      <div className="flex text-center mx-auto items-center justify-center bg-hero bg-no-repeat bg-cover h-96 bg-center py-3 bg-orange-500 bg-blend-multiply  bg-fixed">
        <div className="max-w-md w-full">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Find anything you want
            </h1>
            <form onSubmit={submitHandler} className="flex mt-12 p-4">
              <input
                type="search"
                className="form-control focus:outline-none bg-clip-padding border border-solid border-gray-300 w-full py-2 px-2 font-normal text-base"
                placeholder="Do you have..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="inline-block font-bold bg-orange-400 px-5 text-white"
                disabled={!query}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <div></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="w-[300px] mt-3 hidden sm:block py-4">
            <ul className="space-y-2 w-full h-auto shadow-md rounded">
              {categories.map((item, index) => (
                <li
                  key={index}
                  className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer"
                >
                  <Link to={getFilterUrl({category:item?.value})} className="flex items-center justify-between">
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
          </div>
          <div className="w-[960px] mt-3 px-2">
            <span className="font-bold text-2xl">Trending ads</span>
            {loading ? (
              <MiniLoader />
            ) : error ? (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="font-medium">Error!-</span> {error}
              </div>
            ) : (
              <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 mt-2">
                {ads.length === 0 && (
                  <div
                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
                    role="alert"
                  >
                    <span className="font-medium">Ooops!-No ads found</span>
                  </div>
                )}
                {ads.map((item, index) => (
                  <div
                    key={index}
                    className="grid-item shadow-md rounded  cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Link to={`/listings/${item._id}`}>
                        <img
                          src={item?.images[0]}
                          className="h-32 w-full"
                          alt="logo"
                        />
                      </Link>
                      <span className="text-sm text-gray-700 pt-2">
                        {item.adName}
                      </span>
                      <span className="text-md text-orange-500 pb-2 font-bold">
                        KES {numberWithCommas(item.price)}
                      </span>
                    </div>
                  </div>
                ))}
                {ads.length === 0 && (
                  <div className="text-center text-gray-500">No ads found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-700 text-gray-300 mt-6">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mt-4">
          Start selling with us for free
        </span>
        <span className="text-sm">We have the best plug for your business</span>
        <button className="text-center font-bold px-6 bg-orange-500 rounded-md py-3 mt-4 mb-6 hover:bg-orange-400 text-white">
          Get started
        </button>
      </div>
    </div>
  );
}

export default Home;

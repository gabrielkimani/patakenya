import React, { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAds } from "./redux/actions/adActions";
import MiniLoader from "./utils/MiniLoader";
import { detailsUser } from "./redux/actions/userActions";
import { numberWithCommas } from "./utils/noWithComma";
import { categories } from "./utils/data";
import Sidebar from "./Sidebar";

function Filter() {
  const [query, setQuery] = React.useState("");
  const [count, setCount] = React.useState(2);
  const [countCats, setCountCats] = React.useState(4);
  const [climax, setClimax] = React.useState(false);
  const [climaxCats, setClimaxCats] = React.useState(false);
  const adsList = useSelector((state) => state.adsList);
  const { ads, error, loading } = adsList;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loadingUser, userError, user } = userDetails;
  const [showContact, setShowContact] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const counties = [
    { name: "Bomet", ads: "231" },

    { name: "Bungoma", ads: "231" },

    { name: "Busia", ads: "231" },

    { name: "Central", ads: "231" },

    { name: "Eastern", ads: "231" },

    { name: "Homa Bay", ads: "231" },

    { name: "Kajiado", ads: "231" },

    { name: "Kakamega", ads: "231" },

    { name: "Kiambu", ads: "231" },

    { name: "Kilifi", ads: "231" },

    { name: "Kisii", ads: "231" },

    { name: "Kisumu", ads: "231" },

    { name: "Kwale", ads: "231" },

    { name: "Laikipia", ads: "231" },

    { name: " Meru", ads: "231" },

    { name: "Mombasa", ads: "231" },

    { name: "Murang'a", ads: "231" },

    { name: "Nairobi", ads: "231" },

    { name: "Nakuru", ads: "231" },

    { name: "Narok", ads: "231" },

    { name: "Nyamira", ads: "231" },

    { name: "Remote", ads: "231" },

    { name: "Rift Valley", ads: "231" },

    { name: "Siaya", ads: "231" },

    { name: "Uasin Gishu", ads: "231" },

    { name: "Vihiga", ads: "231" },

    { name: "Western", ads: "231" },
  ];

  const {
    adName = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    location = "all",
    condition = "all",
  } = useParams();

  React.useEffect(() => {
    if (count === 2) {
      setClimax(false);
    }

    if (count >= counties.length) {
      setClimax(true);
    }
  }, [count, climax, counties]);


  React.useEffect(() => {
    if (countCats === 4) {
      setClimaxCats(false);
    }

    if (countCats >= categories.length) {
      setClimaxCats(true);
    }
  }, [countCats, climaxCats, categories]);
  const loadMore = () => {
    if (count !== counties.length) {
      setCount(counties.length);
    }
  };

  const moreCategories = () => {
    if (countCats !== categories.length) {
      setCountCats(categories.length);
    }
  };
  useEffect(() => {
    dispatch(
      listAds({
        adName: adName !== "all" ? adName : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
        location: location !== "all" ? location : "",
        condition: condition !== "all" ? condition : "",
      })
    );

    return () => {
      console.log("unmounting");
    };
  }, [
    category,
    dispatch,
    max,
    min,
    adName,
    order,
    rating,
    location,
    condition,
  ]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || adName;
    const filterLocation = filter.location || location;
    const sortOrder = filter.order || order;
    const filterCondition = filter.condition || condition;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/adName/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/location/${filterLocation}/condition/${filterCondition}`;
  };

  useEffect(() => {
    if (!loading && !error) {
      console.log(ads);
    }
  }, [loading, error, ads]);

  const handleUser = (user) => {
    dispatch(detailsUser(user));
    setShowContact(true);
  };

  const handleModal = () => {
    setOpen(!open);
  };
  return (
    <div className="h-full">
      <div className="max-w-6xl mx-auto">
        {/* <li className="flex justify-center items-cente border-y-4">
                <input
                  type="text"
                  placeholder="Filter Ads"
                  className="w-[50%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 mr-4"
                  value={query}
                  onChange={(e) => {
                    navigate(getFilterUrl({ adName: e.target.value }));
                  }}
                />

                <button className="bg-slate-500 rounded-md p-2">search</button>
              </li> */}

        <div className="flex justify-between">
          <div className="w-[350px] mt-3 hidden sm:block py-4 shadow-md p-4 h-4/5">
            <ul className="space-y-3">
              <li>
                <span className="text-2xl text-gray-400 font-bold">
                  Categories
                </span>
              </li>

              <li>
                <ul className="space-y-2 w-full h-auto  rounded">
                  {categories.slice(0, countCats).map((item, index) => (
                    <li
                      key={index}
                      className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer"
                    >
                      <Link
                        to={getFilterUrl({ category: item?.value })}
                        className="flex items-center justify-between"
                      >
                        <span className="text-md font-medium text-gray-600">
                          {item.label}
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

                  {climaxCats === false ? (
                    <button
                      className="w-full px-3 py-2.5 text-xs text-cyan-800 bg-cyan-100 rounded-md border border-cyan-400 inline-flex text-center justify-center"
                      onClick={moreCategories}
                    >
                      More Categories
                    </button>
                  ) : (
                    <button
                      onClick={() => setCountCats(4)}
                      className="w-full px-3 py-2.5 text-xs text-cyan-800 bg-orange-100 rounded-md border border-orange-400 inline-flex text-center justify-center"
                    >
                      Close
                    </button>
                  )}
                </ul>
              </li>
              <li>
                <span className="text-2xl text-gray-400 font-bold">
                  Condition
                </span>
                <div className="mb-3 mt-3">
                  
                </div>
              </li>

              <li>
                <span className="text-2xl text-gray-400 font-bold">
                  Location
                </span>
                <ul className="space-y-2 w-full h-auto  rounded">
                  {counties.slice(0, count).map((item, index) => (
                    <li
                      key={index}
                      className="text-base divide-x-4 hover:bg-gray-300 py-2 px-4 cursor-pointer"
                    >
                      <Link
                        to={getFilterUrl({ location: item.name })}
                        className="flex items-center justify-between"
                      >
                        <span className="text-md font-medium text-gray-600">
                          {item.name}
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
                  {climax === false ? (
                    <button
                      onClick={loadMore}
                      className="w-full px-3 py-2.5 text-xs text-cyan-800 bg-cyan-100 rounded-md border border-cyan-400 inline-flex text-center justify-center"
                    >
                      More Counties
                    </button>
                  ) : (
                    <button
                      onClick={() => setCount(2)}
                      className="w-full px-3 py-2.5 text-xs text-cyan-800 bg-orange-100 rounded-md border border-orange-400 inline-flex text-center justify-center"
                    >
                      Close
                    </button>
                  )}
                </ul>
              </li>

              <li>
                <span className="text-2xl text-gray-400 font-bold">Price</span>
                <div className="flex justify-between items-center space-y-2">
                  <input
                    type="password"
                    placeholder="Min"
                    className="w-28 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                  />
                  <input
                    type="password"
                    placeholder="Max"
                    className="w-28 px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                  />{" "}
                </div>
              </li>
            </ul>
          </div>

          <div className="sm:w-[780px] mt-3 px-4 py-2 w-full h-screen">
            <nav className="rounded-md w-full">
              <div className="flex sm:hidden justify-between items-center">
                <ol className="list-reset flex">
                  <li>
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-700"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-500 mx-2">/</span>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-orange-500 hover:text-orange-700"
                    >
                      Listings
                    </a>
                  </li>
                  <li>
                    <span className="text-gray-500 mx-2">/</span>
                  </li>
                  <li className="text-gray-500">{adName}</li>
                </ol>
                <button
                  className="p-1 mb-1 bg-cyan-800 text-md w-24 flex justify-center items-center rounded text-white"
                  onClick={handleModal}
                >
                  <span>Filter</span>
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </button>
              </div>
            </nav>

            <div className="space-y-6 mt-4">
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
                <>
                  {ads.length === 0 && (
                    <div
                      className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
                      role="alert"
                    >
                      <span className="font-medium">Ooops!-No ads found</span>
                    </div>
                  )}
                  {ads.map((item, index) => (
                    <div className="shadow-md cursor-pointer" key={index}>
                      <Link to={`/listings/${item?._id}`}>
                        <div className="w-full rounded-lg flex sm:h-48 h-32 ">
                          <img
                            src={item?.images[0]}
                            alt="image"
                            className="object-contain w-1/3 md:w-1/2 lg:w-1/3"
                          />

                          <div className="sm:flex  justify-between lg:w-[67%] w-full">
                            <div className="sm:px-6 sm:py-4 px-4 py-0 object-contain">
                              <h4 className="sm:mb-3 mb-1  font-semibold tracking-tight text-gray-900 text-xl">
                                {item?.adName}
                              </h4>
                              <p className="mb-2 text-sm leading-normal text-justify text-sky-900 flex">
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
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>{" "}
                                <span>{item?.location}, Kenya</span>
                              </p>
                              <p className="mb-4">
                                <span className="sm:px-3 px-2 sm:py-1.5 py-1 sm:mt-2 mt-0 text-xs text-cyan-800 bg-cyan-100 rounded-full border border-cyan-400 text-center">
                                  {item?.condition}
                                </span>
                              </p>

                              <p className="text-orange-600 sm:text-lg text-md font-bold sm:mt-2 -mt-2">
                                KSH {numberWithCommas(item?.price)}
                              </p>
                            </div>

                            <div className="sm:flex sm:flex-col hidden sm:px-6 sm:py-4 px-4 py-2 space-y-3 justify-between">
                              <span className="px-3 py-1.5 text-xs text-slate-800 bg-slate-100 rounded">
                                {new Date(item?.date).toLocaleString()}
                              </span>
                              <button className="px-3 py-1.5 text-xs text-orange-800 bg-purple-100 border hover:border-orange-400 rounded">
                                <Link to={`/listings/${item?._id}`}>
                                  Contact Seller
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className={open ? "nav-open nav2-list" : "nav2-list"}>
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default Filter;

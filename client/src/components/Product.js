import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg from "../Images/bg-image.jpg";
import {
  detailsAd,
  listAds,
  viewContact,
  viewWhatsApp,
} from "./redux/actions/adActions";
import MiniLoader from "./utils/MiniLoader";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { detailsUser } from "./redux/actions/userActions";
import { Preloader, ThreeDots } from "react-preloader-icon";
import { numberWithCommas } from "./utils/noWithComma";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adDetails = useSelector((state) => state.adDetails);
  const { ad, loading, error } = adDetails;
  const userDetails = useSelector((state) => state.userDetails);
  const { loadingUser, userError, user } = userDetails;
  const [showContact, setShowContact] = React.useState(false);
  const adsList = useSelector((state) => state.adsList);
  const { ads, error: adsError, loading: loadingAds } = adsList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [thumbnail, setThumbnail] = React.useState("");

  let { id } = useParams();


  useEffect(() => {
    dispatch(detailsAd(id));

    return () => {
      console.log("unmounting");
    };
  }, [id]);

  useEffect(() => {
    if (ad && ad._id) {
      dispatch(detailsUser(ad.user));
    }
  }, [ad]);

  const handleContact = () => {
    setShowContact(true);
    dispatch(viewContact(ad._id));
  };

  const handleWhatsApp = () => {
    setShowContact(true);
    dispatch(viewWhatsApp(ad._id));
  };

  useEffect(() => {
    if (ad && ad._id) {
      dispatch(
        listAds({
          // adName: ad?.adName.slice(4,ad?.adName.length),
          category: ad?.category,
        })
      );
    }
    return () => {
      console.log("unmounting");
    };
  }, [ad]);


  const handleChat = () => {
    navigate(`/chat/seller/${ad?.user}/ad/${ad?.adName}`);
  }

  return (
    <div className="p-4  max-w-6xl mx-auto mb-24">
      <nav className="rounded-md w-full">
        <ol className="list-reset flex">
          <li>
            <a href="#" className="text-orange-500 hover:text-orange-700">
              Home
            </a>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li>
            <a href="#" className="text-orange-500 hover:text-orange-700">
              Listings
            </a>
          </li>
          <li>
            <span className="text-gray-500 mx-2">/</span>
          </li>
          <li className="text-gray-500">Data</li>
        </ol>
      </nav>
      {loading ? (
        <MiniLoader />
      ) : (
        <div className="sm:flex justify-between">
          <div className="flex flex-col justify-center sm:w-[600px] mt-3">
            <div>
              {ad && ad.images && ad.images.length > 0 && (
                
                <img
                  src={thumbnail === "" ? ad?.images[0] : thumbnail}
                  alt="product"
                  className="h-80 w-full"
                />
              )}
            </div>
            <div className="grid grid-cols-4 gap-4 w-full mt-3 bg-gray-200 rounded p-3">
              {ad?.images?.slice(0, 4).map((image, index) => (
                <div className="grid-item" key={index}>
                  <img
                    onClick={() => setThumbnail(image)}
                    src={image}
                    alt="product"
                    // className="h-24 w-24"
                    className={
                      thumbnail && thumbnail === image
                        ? "h-24 w-24 border-2 border-orange-500"
                        : "h-24 w-24"
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-between mt-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-gray-500">
                  {ad?.adName}
                </h2>
                <p className="text-orange-600 text-lg font-bold">
                  KSH {ad?.price}
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-gray-600 text-sm flex items-center">
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
                  <span>{ad?.location},Kenya</span>
                </p>
                <p className="text-gray-600 text-sm flex items-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>{" "}
                  <span>{new Date(ad?.date).toLocaleDateString()}</span>
                </p>
              </div>
              <hr className="border-gray-300 mt-2" />
            </div>
            <div className="flex flex-col justify-between mt-4">
              <h3 className="text-2xl font-bold text-gray-500">Details</h3>
              <ul className="mt-4 list-none">
                <li className="text-gray-600 text-sm">
                  Condition -{" "}
                  <span className="text-gray-500">{ad?.condition}</span>

                </li>
                <li className="text-gray-600 text-sm">
                  Martket price -{" "}
                  <span className="text-gray-500">
                    {ad?.price - 2000} - {ad?.price + 4000}
                  </span>
                </li>
                <li className="text-gray-600 text-sm">
                  Category -{" "}
                  <span className="text-gray-500">{ad?.category}</span>
                </li>
              </ul>
              <hr className="border-gray-300 mt-2" />
            </div>

            <span>
              <h3 className="text-2xl font-bold text-gray-500">Description</h3>
              <p className="text-gray-600 text-sm py-4">{ad?.description}</p>
            </span>
            <hr className="border-gray-300 mt-2" />
            <div></div>
            <div className="flex mt-4 space-x-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {loadingUser ? (
            <MiniLoader />
          ) : (
            <div className="sm:w-[400px] w-full mt-3 px-4 bg-gray-100 py-4 h-[570px]">
              <div className="flex justify-around items-center bg-slate-50 p-2">
                <span>
                  <img
                    src={user?.logo}
                    alt="product"
                    className="h-24 w-24 rounded-full"
                  />
                </span>
                <span className="text-gray-500 flex flex-col">
                  <p className="text-lg font-bold">
                    {!user?.businessName ? user?.username : user?.businessName}
                  </p>
                  <span className="px-3 py-1.5 mt-2 text-xs text-cyan-800 bg-cyan-100 rounded-full border border-cyan-400 text-center">
                    Joined {user?.date}
                  </span>
                </span>
              </div>

              <div>
                <div className="text-center mt-4 space-y-8">
                  <p className="text-2xl font-bold text-gray-700">
                    contact seller
                  </p>
                  <button className="w-full px-6 py-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-400 inline-flex text-center justify-center" onClick={handleChat}>
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
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    <p className="ml-2">Chat seller</p>
                  </button>
                  <button className="w-full px-6 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 inline-flex text-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="ml-2">
                      <a
                        href={`https://wa.me/${user?.phoneNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleWhatsApp}
                      >
                        WhatsApp seller
                      </a>
                    </p>
                  </button>
                  {showContact ? (
                    <div className="flex justify-around items-center bg-slate-50 p-2 mt-3">
                      <button className="inline-flex justify-center items-center text-gray-400">
                        {user?.phoneNumber}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full px-6 py-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-400 inline-flex text-center justify-center"
                      onClick={handleContact}
                    >
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <p className="ml-2">Show Contact</p>
                    </button>
                  )}
                  <button className="w-full px-3 py-2.5 text-xs text-cyan-800 bg-cyan-100 rounded-md border border-cyan-400 inline-flex text-center justify-center">
                    More from seller
                  </button>
                </div>

                <div className="flex justify-around items-center bg-slate-50 p-2 mt-3">
                  <button className="inline-flex justify-center items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 stroke-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>{" "}
                    Report this Ad
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-5 px-2">
        <span className="font-bold text-2xl text-gray-600">Similar ads</span>

        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 mt-2">
          {loadingAds ? (
            <MiniLoader />
          ) : adsError ? (
            <div>{adsError}</div>
          ) : (
            ads.map((item, index) => (
              <>
                {ads.length === 0 && <span>hey</span>}
                <div
                  key={index}
                  className="grid-item shadow-md rounded cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Link to={`/listings/${item?._id}`}>
                      <img
                        src={item?.images[0]}
                        className="h-32 w-full"
                        alt="ad"
                      />
                    </Link>
                    <span className="text-sm text-gray-700 pt-2">
                      {item?.adName}
                    </span>
                    <span className="text-md text-orange-500 pb-2 font-bold">
                      KES {item?.price}
                    </span>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>{" "}
    </div>
  );
}

export default Product;

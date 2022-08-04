import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listAds } from "../redux/actions/adActions";
import MiniLoader from "../utils/MiniLoader";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import Sidebar from "./partials/Sidebar";
import WelcomeBanner from "./partials/dashboard/WelcomeBanner";
import DashboardAvatars from './partials/dashboard/DashboardAvatars';
import FilterButton from './partials/actions/FilterButton';
import DashboardCard01 from './partials/dashboard/DashboardCard01';
import DashboardCard02 from './partials/dashboard/DashboardCard02';
import DashboardCard03 from './partials/dashboard/DashboardCard03';
import Customers from './partials/dashboard/Customers';
import { listCustomers } from "../redux/actions/userActions";
import Ads from "./partials/dashboard/Ads";

function Dashboard() {
  const [status, setStatus] = React.useState("review");
  const [filteredAds, setFilteredAds] = React.useState([]);
  const dispatch = useDispatch();
  const { page } = useParams();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const adsList = useSelector((state) => state.adsList);
  const { ads, error: adsError, loading: loadingAds } = adsList;
  const [sidebarOpen, setSidebarOpen] = useState(false);
 

  useEffect(() => {
    dispatch(listAds({}));
    return () => {
      //
    };
  }, []);

  const myAds = ads?.filter((ad) => ad?.user === userInfo?._id);

  useEffect(() => {
    const fAds = myAds?.filter((ad) => ad?.status === status);
    setFilteredAds(fAds);

    return () => {
      //
    };
  }, [status]);

  return (
    <div className="flex h-screen ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
             
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white flex justify-center">
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden sm:block ml-2">Add view</span>
                </button>
              </div>
            </div>


            <div className="grid grid-cols-12 gap-6">
               {/* Line chart (Acme Plus) */}
               <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 ads={ads}/>
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 ads={ads}/>
           
              {/* Table (Top Channels) */}
              {/* <Customers /> */}
              </div>

              <div className="grid grid-cols-6 gap-6 mt-6">
              <Ads ads={ads}/>
</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

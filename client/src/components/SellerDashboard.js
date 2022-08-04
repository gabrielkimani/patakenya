import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DashContainer from "./seller/DashContainer";
import SellerSidebar from "./SellerSidebar";
import Notifications from "./seller/Notifications";
import Performance from "./seller/Performance";
import { useDispatch, useSelector } from "react-redux";
import { listAds } from "./redux/actions/adActions";
import MiniLoader from "./utils/MiniLoader";

function SellerDashboard() {
  const [status, setStatus] = React.useState("review");
  const [filteredAds, setFilteredAds] = React.useState([]);
  const dispatch = useDispatch();
  const { page } = useParams();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const adsList = useSelector((state) => state.adsList);
  const { ads, error: adsError, loading: loadingAds } = adsList;

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
  }, [status]);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {loadingAds ? (
          <MiniLoader />
        ) : (
          <div className="flex justify-between">
            <SellerSidebar />

            <div className="w-[960px] mt-3 px-2 shadow-md rounded py-4">
              {page === "my-ads" && (
                <>
                  <div className="bg-slate-50">
                    <div className="flex sm:justify-evenly justify-between items-center  p-4 w-full sm:w-3/4 mx-auto">
                      <button
                        className="sm:px-3 px-1 py-1.5 text-xs text-green-600 border-green-600 bg-purple-100 border hover:border-orange-400 rounded"
                        onClick={() => setStatus("online")}
                      >
                        Online (
                        {myAds?.filter((ad) => ad?.status === "online").length})
                      </button>
                      <button
                        className="px-3 py-1.5 text-xs text-orange-600 border-orange-600 bg-purple-100 border hover:border-orange-400 rounded"
                        onClick={() => setStatus("review")}
                      >
                        OnReview (
                        {myAds?.filter((ad) => ad?.status === "review").length})
                      </button>
                      <button
                        className="px-3 py-1.5 text-xs text-orange-800 border-orange-800 bg-purple-100 border hover:border-orange-400 rounded"
                        onClick={() => setStatus("expired")}
                      >
                        Expired (
                        {myAds?.filter((ad) => ad?.status === "expired").length}
                        )
                      </button>
                      <button
                        className="px-3 py-1.5 text-xs text-green-600 border-green-600 bg-purple-100 border hover:border-orange-400 rounded"
                        onClick={() => setStatus("rejected")}
                      >
                        Rejected (
                        {
                          myAds?.filter((ad) => ad?.status === "rejected")
                            .length
                        }
                        )
                      </button>
                    </div>
                  </div>
                  <DashContainer ads={filteredAds} />
                </>
              )}

              {page === "notifications" && <Notifications />}
              {page === "performance" && <Performance myAds={myAds} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../Images/logo2.png";
import EditMenu from "../EditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { listCustomers } from "../../../redux/actions/userActions";
import { Preloader, Puff } from "react-preloader-icon";

function DashboardCard01() {
  const customersList = useSelector((state) => state.customersList);
  const {
    customers,
    error: customersError,
    loading: loadingCustomers,
  } = customersList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCustomers());
    return () => {};
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          All customers
        </h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          Total
        </div>
        <div className="flex items-start">
          {loadingCustomers ? (
            <Preloader
              use={Puff}
              size={80}
              strokeWidth={7}
              strokeColor="#F3910B"
              duration={800}
            />
          ) : (
            <div className="text-3xl font-bold text-slate-800 mr-2">
              {customers?.length}
            </div>
          )}

          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            +49%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
      </div>
    </div>
  );
}

export default DashboardCard01;

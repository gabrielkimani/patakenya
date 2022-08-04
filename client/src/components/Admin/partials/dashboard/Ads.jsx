import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCustomers } from "../../../redux/actions/userActions";

function Ads({ ads }) {
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
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Ads</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Details</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Price</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Seller</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {ads?.map((ad) => {
                return (
                  <tr key={ad?._id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                          <img
                            className="rounded-full"
                            src={ad?.images[0]}
                            width="40"
                            height="40"
                            alt={ad?.adName}
                          />
                        </div>
                        <div className="font-medium text-slate-800">
                          {ad?.adName}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{ad?.description}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {ad?.price}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-md text-center">
                      {customers?.filter((customer) => {
                        return customer?._id === ad?.user;
                      }
                      ).map((customer) => {
                        return customer?.username;
                      } 
                      )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ads;

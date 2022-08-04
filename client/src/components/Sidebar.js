import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { categories } from "./utils/data";


function Sidebar() {
    const [query, setQuery] = React.useState("");
  const [count, setCount] = React.useState(2);
  const [climax, setClimax] = React.useState(false);
  const navigate = useNavigate();

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

      React.useEffect(() => {
        if (count === 2) {
          setClimax(false);
        }
    
        if (count >= counties.length) {
          setClimax(true);
        }
      }, [count, climax, counties]);
      const loadMore = () => {
        if (count !== counties.length) {
          setCount(counties.length);
        }
      };

    let adName = "all";
    let category = "all";
    let min = 0;
    let max = 0;
    let rating = 0;
    let order = "newest";
    let location = "all";
    let condition = "all";

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
    

  return (
      <div className="w-[350px]  py-4 shadow-md p-4 bg-black">
              <ul className="space-y-3">

                <li>
                  <input
                    type="text"
                    placeholder="Filter Ads"
                    value={adName}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
                   onChange={((e) => {navigate(getFilterUrl({adName: e.target.value}))})}
                  />
                  <button className='p-2 bg-orange-400'>search</button>
                </li>
  
                <li>
                  <span className="text-2xl text-gray-400 font-bold">
                    Categories
                  </span>
                </li>
  
                <li>
                  <ul className="space-y-2 w-full h-auto  rounded">
                    {categories.slice(0, 5).map((item, index) => (
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
                    <button className="w-full px-3 py-2.5 text-xs text-cyan-800 bg-cyan-100 rounded-md border border-cyan-400 inline-flex text-center justify-center">
                      More Categories
                    </button>
                  </ul>
                </li>
                <li>
                  <span className="text-2xl text-gray-400 font-bold">
                    Condition
                  </span>
                  <div className="mb-3 mt-3">
                    <select
                      className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 mt-2 border rounded-md focus:ring-1 focus:ring-orange-300 bg-white bg-clip-padding bg-no-repeat transition  ease-in-out
        m-0
        text-sm text-gray-400
     focus:bg-white focus:outline-none"
                      aria-label=".form-select-lg example"
                      value={condition}
                      onChange={(e) => {
                        navigate(getFilterUrl({ condition: e.target.value }));
                      }}
                    >
                      <option selected>Select Condition</option>
                      <option value="New">New</option>
                      <option value="Refurbished">Refurbished</option>
                      <option value="Used">Used</option>
                    </select>
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
                            {item.ads} ads
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
  
    
  )
}

export default Sidebar
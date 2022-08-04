import React from "react";

import PuffLoader from "react-spinners/PuffLoader";

function Loader({ message }) {
  return (
    <div className="flex items-center justify-center flex-col absolute top-0 left-0 right-0 w-full h-full z-99 bg-slate-900 bg-opacity-60">
      <PuffLoader color="#00FF00" loading={true} speedMultiplier={3} />
      <span className="text-center test-md text-green-400 font-bold">
        {message}
      </span>
    </div>
  );
}

export default Loader;

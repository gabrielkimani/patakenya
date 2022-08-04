import React from "react";
import { Preloader, Puff } from "react-preloader-icon";

function Loader() {
  return (
    <div className="flex items-center justify-center flex-col absolute top-0 left-0 right-0 w-full h-full z-99 bg-slate-900 bg-opacity-25">
      <Preloader
        use={Puff}
        size={80}
        strokeWidth={7}
        strokeColor="#F3910B"
        duration={800}
      />
      <span className="text-center test-sm text-orange-700 font-bold">Please wait...</span>
    </div>
  );
}

export default Loader;

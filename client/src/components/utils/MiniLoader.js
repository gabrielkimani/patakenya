import React from "react";
import { Preloader, Puff} from "react-preloader-icon";

function MiniLoader() {
  return (
    <div className="flex justify-center items-center bg-slate-100 bg-opacity-25 h-[400px]">
    <Preloader
        use={Puff}
        size={80}
        strokeWidth={7}
        strokeColor="#F3910B"
        duration={800}
      />
    </div>
  );
}

export default MiniLoader;

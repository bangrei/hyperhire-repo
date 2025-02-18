import { useState } from "react";

const SideMenuShimmer = () => {
  const [number, setNumber] = useState(10);
  return (
    <div className="w-full hidden md:flex flex-col gap-4 px-2">
      {[...Array(number)].map((_, index) => (
        <div
          key={index}
          className="px-8 pb-8 bg-slate-800 w-full min-h-8 animate-pulse duration-50 transition-all"
        ></div>
      ))}
    </div>
  );
};
export default SideMenuShimmer;

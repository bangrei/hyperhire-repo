"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import SideMenu from "./SideMenu";
import MainContent from "./MainContent";
import { setListMenu } from "@/store/slices/menuSlices";
import service from "@/service/service";
import Image from "next/image";
import SideMenuShimmer from "./SideMenuShimmer";
import LoadingWidget from "./LoadingWidget";

const AppContainer = () => {
  const dispatch = useAppDispatch();
  const [expand, setExpand] = useState(true);
  const allMenu = useAppSelector((state) => state.menu.allMenu);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const json = await service.getParents();
      const data = json.map((it: any) => it as Menu);
      dispatch(setListMenu(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:p-8 bg-white w-full h-full min-h-full overflow-hidden overflow-y-auto md:overflow-y-visible">
      <div className="rounded-xl p-6 md:p-0 md:border md:border-l-slate-300 w-full h-full md:bg-slate-50 flex flex-col md:flex-row md:gap-4">
        <div className="min-w-8 max-w-8 min-h-8 max-h-8 relative md:hidden cursor-pointer">
          <Bars3Icon
            className="text-slate-800"
            onClick={() => setExpand(!expand)}
          />
        </div>
        <div
          className={`${
            expand ? "max-w-[300px]" : "max-w-[90px]"
          } transition-all duration-300 flex w-full flex-col gap-8 rounded-xl md:overflow-hidden md:overflow-y-auto md:bg-slate-900`}
        >
          <div
            className={`w-full hidden md:flex md:text-white md:px-6 md:pt-6 ${
              expand ? "justify-between" : "md:justify-center"
            }`}
          >
            {expand && (
              <div className="md:flex md:items-center md:justify-center hidden w-14">
                <Image
                  className="object-contain max-h-[24px]"
                  src="/assets/logo.png"
                  alt="Hyperhire"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
              </div>
            )}
            <Bars3Icon
              className="w-6 cursor-pointer hover:md:opacity-80 text-slate-800 md:text-white"
              onClick={() => setExpand(!expand)}
            />
          </div>
          {loading && <SideMenuShimmer />}
          {!loading && (
            <SideMenu
              expanded={expand}
              onselectMenu={() => setExpand(!expand)}
            />
          )}
        </div>
        {loading && <LoadingWidget />}
        {!loading && <MainContent fetchMenu={fetchMenu} />}
      </div>
    </div>
  );
};

export default AppContainer;

"use client";
import { FolderIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MenuDropdown from "./MenuDropdown";
import ButtonAction from "./ButtonAction";
import FormComponent from "./FormComponent";
import TreeParent from "./TreeParent";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setListMenu, setActiveMenu } from "@/store/slices/menuSlices";
import service from "@/service/service";

interface Props {
  fetchMenu: Function;
}

const MainContent = (props: Props) => {
  const dispatch = useAppDispatch();
  const [expandAll, setExpandAll] = useState(true);
  const activeMenu = useAppSelector((state) => state.menu.activeMenu);
  const onSelection = (selection: Menu) => {
    console.log("selection", selection);
  };
  const updateActiveMenu = async (menu: Menu) => {
    const json = await service.getParents();
    const data = json.map((it: any) => it as Menu);
    dispatch(setListMenu(data));
    if (!menu.parentId) {
      dispatch(setActiveMenu(menu));
    } else {
      const findActiveMenu = (one: Menu) => {
        let item = data.find((it: Menu) => it.id == one.id);
        const findSubMenus = (menus: Menu[]) => {
          for (let i = 0; i < menus.length; i++) {
            findActiveMenu(menus[i]);
          }
        };
        if (!item) {
          return findSubMenus(one.subMenus);
        }
        dispatch(setActiveMenu(item!));
      };
      findActiveMenu(activeMenu!);
    }
  };
  const afterFormSubmitted = async (item: Menu) => {
    updateActiveMenu(item);
  };
  return (
    <div className="flex w-full flex-col gap-8 py-6 text-slate-800 overflow-hidden overflow-y-auto md:px-4">
      <div className="flex gap-1">
        <FolderIcon className="w-4 text-slate-400" />
        <span className="text-slate-700 text-sm">/</span>
        <span className="text-slate-700 text-sm">{activeMenu?.name}</span>
      </div>
      <div className="hidden md:flex gap-2 items-center">
        <div className="w-8 p-2 bg-blue-700 rounded-full">
          <Squares2X2Icon className="text-white" />
        </div>
        <span className="font-bold text-slate-800">{activeMenu?.name}</span>
      </div>

      <div className="flex gap-8 flex-col md:flex-row w-full">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-slate-800">Menu</span>
            <MenuDropdown
              items={activeMenu?.subMenus}
              onSelected={onSelection}
            />
          </div>
          <div className="flex gap-4">
            <ButtonAction
              name="Expand All"
              activeValue={!expandAll}
              action={() => setExpandAll(true)}
            />
            <ButtonAction
              name="Collapse All"
              activeValue={expandAll}
              action={() => setExpandAll(false)}
            />
          </div>
          <TreeParent expand={expandAll} />
        </div>
        <div className="flex-1 w-full">
          <FormComponent afterSubmit={afterFormSubmitted} />
        </div>
      </div>
    </div>
  );
};
export default MainContent;

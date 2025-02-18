"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import service from "@/service/service";

interface Props {
  onSelected: Function;
}
const MenuDropdown = (props: Props) => {
  const activeMenu = useAppSelector((state) => state.menu.activeMenu);
  const [selectedItem, setSelectedItem] = useState<Menu | null>(null);
  const [open, setOpen] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState<Menu[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectItem = (item: Menu | null) => {
    setOpen(false);
    setSelectedItem(item);
    props.onSelected(item);
  };
  const _toggleList = async () => {
    let isOpen = !open;
    setOpen(isOpen);
    if (!isOpen) return;
    const json = await service.getParents();
    const data = json.map((it: any) => it as Menu);
    collectList(data);
  };
  const outsideClickHandler = () => {
    const eventHandler = (event: MouseEvent) => {
      let ignore = false;
      if (
        dropdownRef.current &&
        dropdownRef.current!.contains(event.target as Node)
      ) {
        ignore = true;
      }
      if (!ignore) setOpen(false);
    };
    document.addEventListener("click", eventHandler);
    return () => document.removeEventListener("click", eventHandler);
  };
  const collectList = (data: Menu[]) => {
    let listMenu: Menu[] = [];
    const findSubMenus = (menus: Menu[]) => {
      for (let i = 0; i < menus.length; i++) {
        let one = menus[i];
        listMenu = [...listMenu, one];
        if (one.subMenus.length) {
          findSubMenus(one.subMenus);
        }
      }
    };
    for (let i = 0; i < data.length; i++) {
      let one = data[i];
      listMenu = [...listMenu, one];
      if (one.subMenus.length) {
        findSubMenus(one.subMenus);
      }
    }
    setDropdownMenu(listMenu);
  };
  useEffect(() => {
    setSelectedItem(null);
    outsideClickHandler();
  }, []);
  return (
    <div ref={dropdownRef} className="w-full flex flex-col relative">
      <div
        onClick={() => _toggleList()}
        className="cursor-pointer inline-flex gap-2 justify-between min-w-[300px] items-center px-3 py-2 border text-sm rounded-lg text-gray-500 bg-slate-100 hover:text-gray-700 transition ease-in-out duration-150"
      >
        <span>{activeMenu ? activeMenu.name : "Select"}</span>
        {open && <ChevronUpIcon className="w-4" />}
        {!open && <ChevronDownIcon className="w-4" />}
      </div>
      {dropdownMenu && (
        <div
          className={`w-full absolute top-10 z-10 bg-white pt-4 shadow-lg ${
            open
              ? "flex flex-col max-h-[300px] overflow-hidden overflow-y-auto"
              : "hidden"
          }`}
        >
          <div
            onClick={() => selectItem(null)}
            className="px-4 pb-4 cursor-pointer hover:text-blue-500 text-gray-500"
          >
            Select
          </div>
          {dropdownMenu.map((item) => {
            return (
              <div
                onClick={() => selectItem(item)}
                className="px-4 pb-4 cursor-pointer hover:text-blue-500"
                key={item.id}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;

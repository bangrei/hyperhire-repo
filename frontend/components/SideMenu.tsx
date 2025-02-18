"use client";

import { FolderIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import {
  FolderIcon as FolderIconActive,
  Squares2X2Icon as Squares2X2IconActive,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setMenuForm } from "@/store/slices/formSlices";
import { setActiveMenu } from "@/store/slices/menuSlices";

interface Props {
  expanded: boolean;
  onselectMenu: Function | undefined;
}

const SideMenu = (props: Props) => {
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => state.menu.allMenu);
  const [activeItem, setActiveItem] = useState<Menu | null>(null);
  const [selectedChild, setSelectedChild] = useState<Menu | null>(null);

  const _setForm = (payload: Menu) => {
    let it = {
      id: payload?.id || null,
      name: payload?.name || null,
      parentId: payload?.parentId || null,
      parent: payload?.parent || null,
      depth: payload?.depth || 0,
      subMenus: payload?.subMenus ? payload.subMenus : [],
      expanded: true,
    };
    dispatch(setMenuForm(it));
    dispatch(setActiveMenu(payload));
  };

  const clickParent = (item: Menu) => {
    if (activeItem?.id == item.id) {
      setActiveItem(null);
      setSelectedChild(null);
      dispatch(setMenuForm(null));
      dispatch(setActiveMenu(null));
    } else {
      setActiveItem(item);
      _setForm(item);
    }
  };
  const clickChild = (c: Menu) => {
    setSelectedChild(c);
    _setForm(c);
    let mobile = window.innerWidth <= 800;
    if (props.onselectMenu && mobile) props.onselectMenu();
  };

  return (
    <ul
      className={`md:flex md:flex-col md:p-4 md:w-full ${
        props.expanded
          ? "md:w-full md:static fixed z-50 max-h-screen shadow-lg left-6 right-6 bottom-0 top-14 md:bg-slate-900 bg-white"
          : "hidden"
      }`}
    >
      {menu?.map((p) => (
        <li
          key={p.id}
          className={`flex flex-col ${
            p.subMenus?.length ? "gap-4" : ""
          } py-4 cursor-pointer rounded-xl text-slate-500 ${
            activeItem?.id == p.id ? "md:text-white md:bg-slate-800 " : ""
          }`}
        >
          <div
            className="flex gap-4 hover:md:opacity-80 px-4"
            onClick={() => clickParent(p)}
          >
            {activeItem?.id == p.id && <FolderIconActive className="w-6" />}
            {activeItem?.id != p.id && <FolderIcon className="w-6" />}
            <span className={props.expanded ? "md:block" : "md:hidden block"}>
              {p.name}
            </span>
          </div>
          {p.subMenus && p.id == activeItem?.id && (
            <ul className="flex flex-col">
              {p.subMenus?.map((c) => (
                <li
                  key={c.id}
                  className={`flex gap-4 cursor-pointer p-4 rounded-xl ${
                    c.id == selectedChild?.id
                      ? "bg-lime-400 text-black"
                      : "text-slate-500 hover:opacity-80"
                  }`}
                  onClick={() => clickChild(c)}
                >
                  {c.id == selectedChild?.id && (
                    <Squares2X2IconActive className="w-6" />
                  )}
                  {c.id != selectedChild?.id && (
                    <Squares2X2Icon className="w-6" />
                  )}
                  <span
                    className={props.expanded ? "md:block" : "md:hidden block"}
                  >
                    {c.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
export default SideMenu;

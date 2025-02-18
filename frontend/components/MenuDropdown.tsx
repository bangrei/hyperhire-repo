"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

interface Props {
  items: Menu[] | undefined;
  onSelected: Function;
}
const MenuDropdown = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<Menu | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectItem = (item: Menu | null) => {
    setOpen(false);
    setSelectedItem(item);
    props.onSelected(item);
  };
  useEffect(() => {
    setSelectedItem(null);
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
  }, [props.items]);
  return (
    <div ref={dropdownRef} className="w-full flex flex-col relative">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer inline-flex gap-2 justify-between min-w-[300px] items-center px-3 py-2 border text-sm rounded-lg text-gray-500 bg-slate-100 hover:text-gray-700 transition ease-in-out duration-150"
      >
        <span>{selectedItem ? selectedItem.name : "Select"}</span>
        {open && <ChevronUpIcon className="w-4" />}
        {!open && <ChevronDownIcon className="w-4" />}
      </div>
      {props.items! && (
        <div
          className={`w-full absolute top-10 z-10 bg-white pt-4 shadow-lg ${
            open ? "flex flex-col" : "hidden"
          }`}
        >
          <div
            onClick={() => selectItem(null)}
            className="px-4 pb-4 cursor-pointer hover:text-blue-500 text-gray-500"
          >
            Select
          </div>
          {props.items!.map((item) => {
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

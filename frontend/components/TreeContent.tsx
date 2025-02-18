import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setMenuForm } from "@/store/slices/formSlices";

interface Props {
  content: Menu | null;
  expand: boolean;
  level: number;
}

const TreeContent = (props: Props) => {
  const dispatch = useAppDispatch();
  const [elem, setElem] = useState<Menu>();

  const _setElem = (el: any) => {
    setElem({ ...el, expanded: !el.expanded });
  };

  const _setForm = (payload: MenuForm) => {
    dispatch(setMenuForm(payload));
  };

  const addChild = (item: Menu) => {
    const it = {
      ...item,
      ...{
        parent: item,
        parentId: item.id,
        depth: (item.depth || 0) + 1,
        name: "",
        id: "",
      },
    } as MenuForm;

    _setForm(it);
  };

  const editItem = (item: Menu) => {
    if (!item.id) return;
    _setForm(item);
  };

  useEffect(() => {
    if (!props.content) return;
    var items = {
      ...props.content,
      ...{
        expanded: props.expand,
        subMenus: props.content.subMenus?.map((c) => {
          return { ...c, expanded: props.expand };
        }),
      },
    };
    setElem(items);
  }, [props]);

  return (
    <div
      className={`flex flex-col text-sm text-slate-600 border-l border-dotted relative ${
        elem && elem.expanded && elem.subMenus?.length > 0
          ? "border-slate-400"
          : "border-transparent"
      }`}
    >
      <div
        className={`flex items-center gap-2 bg-white md:bg-slate-50 ${
          elem && elem.subMenus?.length > 0 ? " -ml-2" : "ml-2"
        }`}
      >
        {elem && elem.subMenus?.length > 0 && (
          <div
            className="flex justify-center pt-1 cursor-pointer"
            onClick={() => _setElem(elem)}
          >
            {elem.expanded && <ChevronDownIcon className="w-4" />}
            {!elem.expanded && <ChevronUpIcon className="w-4" />}
          </div>
        )}
        <span
          className={`py-2 cursor-pointer ${
            elem && elem.subMenus?.length == 0 ? "pl-2" : ""
          }`}
          onClick={() => editItem(elem!)}
        >
          {elem?.name}
        </span>
        {elem && elem.depth! <= 3 && (
          <PlusCircleIcon
            className="w-6 cursor-pointer text-blue-600 hover:opacity-80"
            onClick={() => addChild(elem!)}
          />
        )}
      </div>
      <div className={`flex flex-col`}>
        {elem &&
          elem.subMenus?.length > 0 &&
          elem.expanded &&
          elem.subMenus?.map((el, index) => (
            <div
              className="flex flex-row items-stretch"
              key={`${index}-${el.id}`}
            >
              <div className="flex flex-col justify-stretch">
                <div
                  className={`w-8 h-[1.8rem] flex justify-center bg-white md:bg-slate-50 border-b border-dotted border-slate-400`}
                ></div>
                {elem.subMenus?.length == index + 1 && (
                  <div className="flex-1 -ml-1 bg-white md:bg-slate-50"></div>
                )}
              </div>
              <div className="flex flex-col pt-[0.6rem]">
                <TreeContent
                  content={el}
                  expand={el.expanded == true}
                  level={props.level + 1}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TreeContent;

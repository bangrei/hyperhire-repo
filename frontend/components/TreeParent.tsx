import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import TreeContent from "./TreeContent";

interface Props {
  expand: boolean;
}
const TreeParent = (props: Props) => {
  const activeMenu = useAppSelector((state) => state.menu.activeMenu);

  if (!activeMenu) return <div></div>;
  return <TreeContent content={activeMenu} expand={props.expand} level={0} />;
};
export default TreeParent;

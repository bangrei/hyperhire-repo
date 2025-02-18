interface Menu {
  id: string | null;
  name: string | null;
  parentId: string | null;
  parent: Menu | null;
  depth: number | null;
  subMenus: Menu[] | [];
  expanded: boolean;
}

interface MenuForm {
  id: string | null;
  name: string | null;
  parentId: string | null;
  parent: Menu | null;
  depth: number | null;
  subMenus: Menu[] | [];
  expanded: boolean;
}

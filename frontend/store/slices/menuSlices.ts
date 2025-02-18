import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  allMenu: Menu[] | [];
  activeMenu: Menu | null;
}

const initialState: MenuState = {
  allMenu: [],
  activeMenu: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setListMenu: (state, action: PayloadAction<Menu[] | []>) => {
      state.allMenu = action.payload;
    },
    setActiveMenu: (state, action: PayloadAction<Menu | null>) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setListMenu, setActiveMenu } = menuSlice.actions;
export default menuSlice.reducer;

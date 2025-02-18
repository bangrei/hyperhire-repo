import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  value: MenuForm | null;
}

const initialState: FormState = { value: null };

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setMenuForm: (state, action: PayloadAction<MenuForm | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setMenuForm } = formSlice.actions;
export default formSlice.reducer;

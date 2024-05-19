import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { [key: string]: { title: string; days: number } } = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    update: (
      state,
      {
        payload: { id, title, days },
      }: PayloadAction<{ id: number; title: string; days: number }>,
    ) => {
      if (days === 0) delete state[id];
      else state[id] = { title, days };
    },
    remove: (state, { payload: id }: PayloadAction<number>) => {
      delete state[id];
    },
    clear: (state) => {
      for (const key in state) {
        delete state[key];
      }
    },
  },
});

export const actions = { ...cartSlice.actions };
export const reducer = cartSlice.reducer;

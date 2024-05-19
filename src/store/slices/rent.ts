import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { [key: string]: number } = {};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    add: (
      state,
      {
        payload: cart,
      }: PayloadAction<{ [key: string]: { title: string; days: number } }>,
    ) => {
      for (const item of Object.entries(cart)) {
        state[item[0]] = new Date().getTime() + 86400000 * item[1].days;
      }
    },
    check: (state, { payload: id }: PayloadAction<number>) => {
      if (state[id] && new Date().getTime() > state[id]) delete state[id];
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

export const actions = { ...rentSlice.actions };
export const reducer = rentSlice.reducer;

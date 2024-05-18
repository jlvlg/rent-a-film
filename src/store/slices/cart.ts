import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MovieDto } from "../../models/movie";

const initialState: { [key: string]: MovieDto & { days: number } } = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (
      state,
      {
        payload: { movie, days },
      }: PayloadAction<{ movie: MovieDto; days: number }>,
    ) => {
      if (days === 0) delete state[movie.id!];
      else state[movie.id!] = { ...movie, days };
    },
  },
});

export const actions = { ...cartSlice.actions };
export const reducer = cartSlice.reducer;

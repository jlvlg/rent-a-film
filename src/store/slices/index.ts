import { combineReducers } from "@reduxjs/toolkit";
import * as cart from "./cart";
import * as rent from "./rent";

export const reducer = combineReducers({
  cart: cart.reducer,
  rent: rent.reducer,
});

export const actions = {
  cart: cart.actions,
  rent: rent.actions,
};

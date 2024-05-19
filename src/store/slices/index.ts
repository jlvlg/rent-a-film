import * as cart from "./cart";
import * as rent from "./rent";

export const reducer = {
  cart: cart.reducer,
  rent: rent.reducer,
};

export const actions = {
  cart: cart.actions,
  rent: rent.actions,
};

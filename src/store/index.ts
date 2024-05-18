import {
  Action,
  ThunkAction,
  TypedStartListening,
  configureStore,
} from "@reduxjs/toolkit";
import {
  useDispatch as reduxDispatch,
  useSelector as reduxSelector,
} from "react-redux";
import { actions, reducer } from "./slices";

const store = configureStore({
  reducer,
});

const useDispatch = reduxDispatch.withTypes<StoreDispatch>();
const useSelector = reduxSelector.withTypes<StoreState>();

const Store = {
  store,
  useDispatch,
  useSelector,
  actions,
};
export default Store;

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export type StartListening = TypedStartListening<StoreState, StoreDispatch>;
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action
>;

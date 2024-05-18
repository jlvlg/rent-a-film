import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as reduxDispatch,
  useSelector as reduxSelector,
} from "react-redux";
import { actions, reducer } from "./slices";

const store = configureStore({
  reducer,
});

type StoreState = ReturnType<typeof store.getState>;
type StoreDispatch = typeof store.dispatch;

const useDispatch = reduxDispatch.withTypes<StoreDispatch>();
const useSelector = reduxSelector.withTypes<StoreState>();

const Store = {
  store,
  useDispatch,
  useSelector,
  actions,
};
export default Store;

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
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { actions, reducer } from "./slices";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

const useDispatch = reduxDispatch.withTypes<StoreDispatch>();
const useSelector = reduxSelector.withTypes<StoreState>();

const Store = {
  store,
  persistor: persistStore(store),
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

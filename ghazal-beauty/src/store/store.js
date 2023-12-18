import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const reducers = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
    thunk,
  ],
});

export const persistor = persistStore(store);

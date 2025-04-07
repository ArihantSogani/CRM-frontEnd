import { configureStore } from "@reduxjs/toolkit";
import user from "./authSlice";
import order from "./orderSlice"
import loading from "./LoadingSlice";
import stock from "./stocksSlice";

const store = configureStore({
  reducer: {
    user,
    order,
    loading,
    stock
  },
});

export default store;

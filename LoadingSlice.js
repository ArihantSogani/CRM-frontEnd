import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingTrue: (state) => {
      state.loading = true;
    },
    setLoadingFalse: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoadingFalse, setLoadingTrue } = LoadingSlice.actions;

export default LoadingSlice.reducer;

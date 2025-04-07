import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  isCompany: false,
  company: null,
};

export const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, company } = action.payload;
      if (!user && company !== null) {
        state.company = company;
        state.isAuth = true;
        state.isCompany = true;
        return;
      } else if (user === null) {
        return (state.isAuth = false);
      } else {
        state.company = company;
        state.isCompany = false;
        state.user = user;
        state.isAuth = true;
      }
    },
    setLogout: (state, action) => {
      state.isAuth = false;
      state.user = null;
      state.company = null;
      state.isCompany = false;
    },
  },
});

export const { setAuth, setLogout } = AuthSlice.actions;

export default AuthSlice.reducer;

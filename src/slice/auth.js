import { createSlice } from "@reduxjs/toolkit";
import { SetItem } from "../helpers/localeStorage";

const initialState = {
  isLoading: false,
  isLogged: false,
  user: null,
  error: null,
};

const authReduce = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccessfull: (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.user = action.payload;
      state.error = null;
      SetItem("token", action.payload.token);
    },
    signUserFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutAction: (state) => {
      state.user = null;
      state.isLogged = false;
    },
  },
});

export const {
  signUserStart,
  signUserSuccessfull,
  signUserFailed,
  logoutAction,
} = authReduce.actions;
export default authReduce.reducer;

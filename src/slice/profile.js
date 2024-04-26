import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLooked: false,
  user: null,
  following: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    modalStart: (state, action) => {
      state.user = action.payload;
    },
    modalVisible: (state) => {
      state.isLooked = true;
    },
    modalInvisible: (state) => {
      state.isLooked = false;
    },
    modalLogout: (state) => {
      state.user = null;
    },
    followMe: (state) => {
      state.following = true;
    },
    unFollowMe: (state) => {
      state.following = false;
    },
  },
});

export const {
  modalVisible,
  modalInvisible,
  modalStart,
  modalLogout,
  followMe,
  unFollowMe,
} = profileSlice.actions;
export default profileSlice.reducer;

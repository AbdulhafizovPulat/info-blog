import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/auth";
import ArticleReducer from "../slice/article";
import ProfileReducer from "../slice/profile";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    article: ArticleReducer,
    profile: ProfileReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

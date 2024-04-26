import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  articles: [],
  article: null,
  error: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticleStart: (state) => {
      state.isLoading = true;
    },
    getArticleSuccess: (state, action) => {
      state.isLoading = false;
      state.articles = action.payload;
    },
    getArticleFailed: (state) => {
      state.isLoading = false;
      state.error = "Error";
    },
    getArticleDetailStart: (state) => {
      state.isLoading = true;
    },
    getArticleDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.article = action.payload;
    },
    getArticleDetailFailed: (state) => {
      state.isLoading = false;
      state.error = "error";
    },
    createArticleStart: (state) => {
      state.isLoading = true;
    },
    createArticleSuccess: (state) => {
      state.isLoading = false;
    },
    createArticleFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailed,
  getArticleDetailStart,
  getArticleDetailSuccess,
  getArticleDetailFailed,
  createArticleStart,
  createArticleSuccess,
  createArticleFailed,
} = articleSlice.actions;
export default articleSlice.reducer;

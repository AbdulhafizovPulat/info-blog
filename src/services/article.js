import axios from "./api";

const ArticleServices = {
  getArticle: async () => {
    const { data } = await axios.get("/articles");
    return data;
  },

  getArticleDetail: async (slug) => {
    const { data } = await axios.get(`/articles/${slug}`);
    return data;
  },
  createArticle: async (article) => {
    const { data } = await axios.post("/articles", { article });
    return data;
  },
  deleteArticle: async (slug) => {
    const { data } = await axios.delete(`articles/${slug}`);
    return data;
  },
  putArticle: async (slug, article) => {
    const { data } = await axios.put(`/articles/${slug}`, { article });
    return data;
  },
};

export default ArticleServices;

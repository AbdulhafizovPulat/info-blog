import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createArticleFailed,
  createArticleStart,
  createArticleSuccess,
  getArticleDetailFailed,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import ArticleServices from "../services/article";
import { Form } from "../ui";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const { article } = await ArticleServices.getArticleDetail(slug);
      setTitle(article.title);
      setDescription(article.description);
      setBody(article.body);
      dispatch(getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailFailed());
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, []);

  const FormSubmit = async (e) => {
    e.preventDefault();
    dispatch(createArticleStart());
    const article = { title, description, body };
    try {
      await ArticleServices.putArticle(slug, article);
      navigate("/");
      dispatch(createArticleSuccess());
    } catch (error) {
      dispatch(createArticleFailed(error));
    }
  };

  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    FormSubmit,
  };

  return (
    <div className="text-center">
      <h4 className="mb-5">Edit article</h4>
      <Form {...formProps} />
    </div>
  );
};

export default EditArticle;

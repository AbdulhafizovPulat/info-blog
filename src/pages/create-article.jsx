import { useState } from "react";
import { Form } from "../ui";
import ArticleServices from "../services/article";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createArticleFailed,
  createArticleStart,
  createArticleSuccess,
} from "../slice/article";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const FormSubmit = async (e) => {
    e.preventDefault();
    dispatch(createArticleStart());
    const article = {
      title,
      body,
      description,
    };
    try {
      await ArticleServices.createArticle(article);
      navigate("/");
      dispatch(createArticleSuccess());
    } catch (error) {
      dispatch(createArticleFailed());
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
      <h4 className="mb-5">Create article</h4>
      <Form {...formProps} />
    </div>
  );
};

export default CreateArticle;

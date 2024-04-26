import { useNavigate, useParams } from "react-router-dom";
import ArticleServices from "../services/article";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleDetailFailed,
  getArticleDetailStart,
  getArticleDetailSuccess,
} from "../slice/article";
import moment from "moment";
import Loader from "../ui/loader";

const ArticleDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { article, isLoading } = useSelector((state) => state.article);
  const navigate = useNavigate();

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const { article } = await ArticleServices.getArticleDetail(id);
      dispatch(getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailFailed());
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    article !== null && (
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="py-5">
          <button
            className="btn btn-outline-dark mb-4"
            onClick={() => navigate("/")}
          >
            {"<-back"}
          </button>
          <h5 className="display-4 fw-bold">{article.title}</h5>
          <p className="col-md-8 fs-4">{article.description}</p>
          <p className="fs-5">{article.body}</p>
          <div className="d-flex justify-content-between">
            <p className="fw-bold">{article.author.username}</p>
            <p className="text-body-secondary">
              <span className="fw-bold">Created at: </span>
              {moment(article.createdAt).format("DD MMMM, YYYY")}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default ArticleDetail;

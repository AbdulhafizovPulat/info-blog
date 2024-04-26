import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../ui";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getArticleStart, getArticleSuccess } from "../slice/article";
import ArticleServices from "../services/article";

const Main = () => {
  const { articles, isLoading } = useSelector((state) => state.article);
  const { isLogged, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getArticle = async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleServices.getArticle();
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandle = async (slug) => {
    try {
      await ArticleServices.deleteArticle(slug);
      getArticle();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      {isLoading || (loading && <Loader />)}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mb-3">
        {articles.map((card) => (
          <div className="col" key={card.slug}>
            <div className="card shadow-sm h-100">
              <svg
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
              </svg>
              <div className="card-body">
                <p className="card-text fw-bold">{card.title}</p>
                <p className="card-text">{card.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate(`/articles/${card.slug}`)}
                  >
                    View
                  </button>
                  {isLogged && user.username === card.author.username && (
                    <>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={() => navigate(`/article-edit/${card.slug}`)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteHandle(card.slug)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
                <small className="text-body-secondary text-capitalize">
                  {card.author.username}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;

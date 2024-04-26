import { Route, Routes } from "react-router-dom";
import {
  Main,
  Register,
  Login,
  Navbar,
  ArticleDetail,
  ArticleCreate,
  ArticleEdit,
} from "./pages";
import AuthServices from "./services/auth";
import { useDispatch, useSelector } from "react-redux";
import { signUserSuccessfull } from "./slice/auth";
import { useEffect } from "react";
import { GetItem } from "./helpers/localeStorage";
import ModalProfile from "./ui/modal";

function App() {
  const dispatch = useDispatch();
  const { isLooked } = useSelector((state) => state.profile);
  const getUser = async () => {
    try {
      const response = await AuthServices.getUser();
      dispatch(signUserSuccessfull(response.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = GetItem("token");
    if (token) {
      getUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      {isLooked && <ModalProfile />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/article-create" element={<ArticleCreate />} />
          <Route path="/article-edit/:slug" element={<ArticleEdit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { Link, useNavigate } from "react-router-dom";
import { logo } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { RemoveItem } from "../helpers/localeStorage";
import { logoutAction } from "../slice/auth";
import { modalLogout, modalStart, modalVisible } from "../slice/profile";
import ProfileServices from "../services/profile";

const Navbar = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    RemoveItem("token");
    navigate("/login");
    dispatch(logoutAction());
    dispatch(modalLogout());
  };

  const profileHandler = async () => {
    try {
      const { data } = await ProfileServices.getProfileInfo(user.username);
      dispatch(modalStart(data.profile));
    } catch (error) {
      console.log(error);
    }
    dispatch(modalVisible());
    document.body.style.overflow = "hidden";
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container mt-3">
        <Link to={"/"}>
          <img
            src={logo}
            style={{
              width: 60,
              height: 30,
              objectFit: "cover",
            }}
            alt="artel"
          />
        </Link>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          {isLogged ? (
            <>
              {/* <span className="me-3 py-2 link-body-emphasis text-decoration-none">
                {user.username}
              </span> */}
              <Link
                className="me-3 py-2 link-body-emphasis text-decoration-none btn btn-dark"
                to={"/article-create"}
              >
                <span style={{ color: "white" }}>Create</span>
              </Link>
              <button
                className="btn btn-outline-primary me-3"
                onClick={profileHandler}
              >
                Profile
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="me-3 py-2 link-body-emphasis text-decoration-none"
                to={"/register"}
              >
                Register
              </Link>
              <Link
                className="me-3 py-2 link-body-emphasis text-decoration-none"
                to={"/login"}
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

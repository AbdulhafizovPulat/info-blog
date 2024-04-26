import { useState, useEffect } from "react";
import { logo } from "../constants";
import { Input } from "../ui";
import { useSelector, useDispatch } from "react-redux";
import {
  signUserStart,
  signUserSuccessfull,
  signUserFailed,
} from "../slice/auth";
import AuthServices from "../services/auth";
import { SigningError } from ".";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isLogged } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthServices.loginUser(user);
      dispatch(signUserSuccessfull(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailed(error.response.data.errors));
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return (
    <form className="w-25 container text-center">
      <img
        src={logo}
        style={{
          width: 70,
          height: 50,
          objectFit: "cover",
        }}
        alt="artel"
      />
      <h1 className="h3 mb-3 fw-normal">Please Login</h1>

      <div className="d-flex flex-column gap-3">
        <Input
          label={"email adress"}
          type={"email"}
          value={email}
          setValue={setEmail}
        />
        <Input
          label={"password"}
          type={"password"}
          value={password}
          setValue={setPassword}
        />

        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "Login"}
        </button>
        <SigningError />
      </div>
    </form>
  );
};

export default Login;

import axios from "./api";

const AuthServices = {
  registerUser: async (user) => {
    const { data } = await axios.post("/users", { user });
    return data;
  },
  loginUser: async (user) => {
    const { data } = await axios.post("/users/login", { user });
    return data;
  },
  getUser: async () => {
    const { data } = await axios.get("/user");
    return data;
  },
};

export default AuthServices;

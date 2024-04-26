import axios from "./api";

const ProfileServices = {
  async getProfileInfo(username) {
    const response = await axios.get(`/profiles/${username}`);
    return response;
  },
  async postFollow(username) {
    const { data } = await axios.post(`/profiles/${username}/follow`);
    return data;
  },
  async deleteFollow(username) {
    const { data } = await axios.delete(`/profiles/${username}/follow`);
    return data;
  },
};

export default ProfileServices;

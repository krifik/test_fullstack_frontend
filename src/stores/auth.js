import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: {},
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    GET_USER: (state) => state.user,
  },
  actions: {
    checkToken() {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      return new Promise((resolve, reject) => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/user`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    login(credential) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/login`, {
            email: credential.email,
            password: credential.password,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});

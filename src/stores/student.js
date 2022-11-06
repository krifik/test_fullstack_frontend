import axios from "axios";
import { defineStore } from "pinia";

export const useStudentStore = defineStore({
  id: "student",
  state: () => ({
    student: {},
    students: {},
  }),
  getters: {
    GET_STUDENT: (state) => state.student,
    GET_STUDENTS: (state) => state.students,
  },
  actions: {
    getAllDataStudent() {
      return new Promise((resolve, reject) => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/students`)
          .then((res) => {
            this.students = res.data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAllDataStudentWithLimit(limit) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/students?limit=${limit}`)
          .then((res) => {
            this.students = res.data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAllDataStudentWithSort(sort) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/students?sort=${sort.sortType}&order=${sort.sortOrder}&limit=${sort.limit}`)
          .then((res) => {
            this.students = res.data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getAllDataStudentWithPage(page, limit) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/students?page=${page}&limit=${limit}`)
          .then((res) => {
            this.students = res.data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getStudentById(id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/students/${id}`)
          .then((res) => {
            this.student = res.data.data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    storeDataStudent(student) {
      const formData = new FormData();
      student.date_of_birth = new Date(student.date_of_birth);
      student.date_of_birth instanceof Date ? (student.date_of_birth = new Date(student.date_of_birth).toISOString()) : (student.date_of_birth = "");
      formData.append("name", student.name);
      formData.append("avatar_url", student.avatar_url);
      formData.append("gender", student.gender);
      formData.append("dob", student.date_of_birth);
      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/students`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    searchData(key) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/students?search=${key}`)
          .then((res) => {
            this.students = res.data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteStudentById(id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/students/${id}`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateStudentById(id, student) {
      const formData = new FormData();
      student.date_of_birth = new Date(student.date_of_birth);
      student.date_of_birth instanceof Date ? (student.date_of_birth = new Date(student.date_of_birth).toISOString()) : (student.date_of_birth = "");
      formData.append("name", student.name);
      formData.append("avatar_url", student.avatar_url);
      formData.append("gender", student.gender);
      formData.append("dob", student.date_of_birth);
      return new Promise((resolve, reject) => {
        axios
          .put(`${import.meta.env.VITE_API_URL}/students/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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

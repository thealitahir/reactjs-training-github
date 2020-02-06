import axios from "axios";
import { URL } from "../global.js";

const Services = {
  postComment: payload => {
    return axios
      .post(`${URL}posts/${payload.id}/comments`, payload)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: error };
      });
  },

  getComments: payload => {
    return axios
      .get(`${URL}posts/${payload}/comments?sortBy=createdAt&order=desc`)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: error };
      });
  },

  deleteComments: payload => {
    return axios
      .delete(`${URL}posts/${payload.id}/comments/${payload.comment_id}`)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: error };
      });
  },

  editComment: payload => {
    return axios
      .put(`${URL}posts/${payload.id}/comments/${payload.comment_id}`, payload)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: error };
      });
  },

  getPosts: payload => {
    return axios
      .get(`${URL}posts${payload.postParams.params}`)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: error };
      });
  },

  searchPost: payload => {
    return axios
      .get(`${URL}posts${payload.params}`)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: error };
      });
  }
};

export default Services;

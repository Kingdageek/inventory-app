import Api from "../Api";
import { CORE_URL } from "../../config/appConfig";

const baseEndpoint = `/api/v1/articles`;

export const fetchArticles = async (callback) => {
  let response = null;
  let endpoint = baseEndpoint;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .get(endpoint)
    .then((res) => {
      if (res) {
        let { data } = res;
        console.log(res);
        if (res.status === 200) {
          response = data;
        } else {
          response = data;
        }
        return callback(response);
      }
    })
    .catch((error) => {
      console.log(error);
      const { data, status } = error.response;
      return callback({ ...data });
    });
};

export const deleteArticle = async (articleId, callback) => {
  let response = null;
  let endpoint = `${baseEndpoint}/${articleId}`;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .delete(endpoint)
    .then((res) => {
      if (res) {
        let { data } = res;
        console.log(res);
        if (res.status === 204) {
          response = true;
        } else {
          response = data;
        }
        return callback(response);
      }
    })
    .catch((error) => {
      console.log(error);
      const { data, status } = error.response;
      return callback({ ...data });
    });
};

export const storeArticle = async (articleData, callback) => {
  let response = null;
  let endpoint = baseEndpoint;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .post(endpoint, articleData)
    .then((res) => {
      if (res) {
        let { data } = res;
        console.log(res);
        if (res.status === 201) {
          response = data;
        } else {
          response = data;
        }
        return callback(response);
      }
    })
    .catch((error) => {
      console.log(error);
      const { data, status } = error.response;
      return callback({ ...data });
    });
};

export const editArticle = async (articleId, articleData, callback) => {
  let response = null;
  let endpoint = `${baseEndpoint}/${articleId}`;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .patch(endpoint, articleData)
    .then((res) => {
      if (res) {
        let { data } = res;
        console.log(res);
        if (res.status === 200) {
          response = data;
        } else {
          response = data;
        }
        return callback(response);
      }
    })
    .catch((error) => {
      console.log(error);
      const { data, status } = error.response;
      return callback({ ...data });
    });
};

import Api from "../Api";
import { CORE_URL } from "../../config/appConfig";

const baseEndpoint = `/api/v1/categories`;

export const fetchCategories = async (callback) => {
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

export const deleteCategory = async (categoryId, callback) => {
  let response = null;
  let endpoint = `${baseEndpoint}/${categoryId}`;
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

export const storeCategory = async (categoryData, callback) => {
  let response = null;
  let endpoint = baseEndpoint;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .post(endpoint, categoryData)
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

export const editCategory = async (categoryId, categoryData, callback) => {
  let response = null;
  let endpoint = `${baseEndpoint}/${categoryId}`;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .patch(endpoint, categoryData)
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
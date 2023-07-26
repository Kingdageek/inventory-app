import Api from "../Api";
import { CORE_URL } from "../../config/appConfig";

const baseEndpoint = `/api/v1/items`;

export const fetchItems = async (callback) => {
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

export const deleteItem = async (itemId, callback) => {
  let response = null;
  let endpoint = `${baseEndpoint}/${itemId}`;
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

export const storeItem = async (itemData, callback) => {
  let response = null;
  let endpoint = baseEndpoint;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .post(endpoint, itemData)
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

export const editItem = async (itemId, itemData, callback) => {
  let response = null;
  let endpoint = `${baseEndpoint}/${itemId}`;
  // console.log(AuthHeader());
  return Api(CORE_URL)
    .patch(endpoint, itemData)
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

import axios from "axios";
import { getHeaders } from "../utils/helper";
import endpoints from "./endpoints";

export const addTransactionApi = async (data) => {
  const callResponse = await axios({
    url: endpoints.transaction,
    method: "POST",
    headers: getHeaders(),
    data,
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};

export const getTrasactionApi = async (params) => {
  const callResponse = await axios({
    url: endpoints.transaction,
    method: "get",
    headers: getHeaders(),
    params
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};

export const updateTrasactionFieldApi = async (data,params) => {
  const callResponse = await axios({
    url: endpoints.transaction,
    method: "PATCH",
    headers: getHeaders(),
    data,
    params
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};

export const deleteTransactionApi = async (data) => {
  const callResponse = await axios({
    url: endpoints.transaction,
    method: "DELETE",
    headers: getHeaders(),
    data,
  })
    .then((response) => response.data)
    .catch((err) => ({
      status: 0,
      response: err.response,
      code: err.response.status,
    }));

  return callResponse;
};

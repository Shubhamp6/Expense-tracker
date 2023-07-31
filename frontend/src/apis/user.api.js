import axios from "axios";
import { getHeaders } from "../utils/helper";
import endpoints from "./endpoints";

export const getUserAndSystemDataApi = async (data) => {
  const callResponse = await axios({
    url: endpoints.userAndSystemFetchByToken,
    method: "get",
    headers: getHeaders(),
    params:data
  })
    .then(response => response.data)
    .catch(err => ({status:0,response:err.response,code:err.response.status}));

  return callResponse;
};


export const getUserApi = async params => {
  const callResponse = await axios({
    url: endpoints.userBase,
    method: "get",
    headers: getHeaders(),
    params,
  })
    .then(response => response.data)
    .catch(err => ({status:0,response:err.response,code:err.response.status}));

  return callResponse;
};

export const getUserByIdApi = async params => {
  const callResponse = await axios({
    url: endpoints.userById,
    method: "get",
    headers: getHeaders(),
    params,
  })
    .then(response => response.data)
    .catch(err => ({status:0,response:err.response,code:err.response.status}));

  return callResponse;
};


export const addUserApi = async data => {
  const callResponse = await axios({
    url: endpoints.userBase,
    method: "POST",
    headers: getHeaders(),
    
    data,
  })
    .then(response => response.data)
    .catch(err => ({status:0,response:err.response,code:err.response.status}));

  return callResponse;
};

export const updateUserField = async data => {
  const callResponse = await axios({
    url: endpoints.userBase,
    method: "PATCH",
    headers: getHeaders(),
    data,
  })
    .then(response => response.data)
    .catch(err => ({status:0,response:err.response,code:err.response.status}));

  return callResponse;
};
export const updateUserPass = async data => {
  const callResponse = await axios({
    url: endpoints.userPassword,
    method: "PATCH",
    headers: getHeaders(),
    data,
  })
    .then(response => response.data)
    .catch(err => ({status:0,response:err.response,code:err.response.status}));

  return callResponse;
};

export const updateUserState = async data => {
  const callResponse = await axios({
    url: endpoints.updateUserState,
    method: "PATCH",
    headers: getHeaders(),
    data,
  })
    .then(response => response.data)
    .catch(err => ({status:0,response:err.response,code:err.response.status}));

  return callResponse;
};




export default getUserAndSystemDataApi
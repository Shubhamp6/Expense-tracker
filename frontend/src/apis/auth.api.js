import axios from "axios";
import { refreshToken } from "../utils/helper";

import endpoints from "./endpoints";

export const signInApi = async data => {
  console.log(endpoints.signIn);
  const callResponse = await axios({
    url: endpoints.signIn,
    method: "post",
    data,
  })
    .then(response => response.data)
    .catch(err => (err.response ? ({status:0,response:err.response,code:err.response.status}) : {}));
  return callResponse;
};

export const resetTokenApi = async () => {
  const callResponse = await axios({
    url: endpoints.resetToken,
    method: "post",
    data: {
      refresh_token: refreshToken.get(),
    },
  })
    .then(response => response.data)
    .catch(err => (err.response ? ({status:0,response:err.response,code:err.response.status}) : {}));
  return callResponse;
};

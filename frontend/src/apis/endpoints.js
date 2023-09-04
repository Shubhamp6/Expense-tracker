const mode = process.env.REACT_APP_APP_MODE;
let domain = "";
switch (mode) {
  case "ip":
    domain = "http://172.20.10.5:8000/";
    break;
  case "production":
    domain = process.env.REACT_APP_PRODUCTION_URL;
    break;
  case "local":
    domain = "http://localhost:8000/expense-tracker/";
    break;
  case "development":
    domain = process.env.REACT_APP_DEVELOPMENT_URL;
    break;
  default:
    domain = "http://172.20.10.5:8000/";
}

export default {
  signIn: `${domain}api/auth/login`,
  resetToken: `${domain}api/auth/reset-token`,
  userAndSystemFetchByToken: `${domain}api/user/fetch-by-token`,
  userBase: `${domain}api/user/`,
  userById: `${domain}api/user/fetch-by-id`,
  userPassword: `${domain}api/user/password`,
  category: `${domain}api/category`,
  transaction: `${domain}api/transaction`,
};

// const mode = process.env.REACT_APP_APP_MODE;
const mode = "local"
let domain = "";

switch (mode) {
  case "ip":
    domain = "http://192.168.0.110:8000/";
    break;
  case "production":
    domain = "https://expense-tracker-backend-production-5ce8.up.railway.app/expense-tracker/";
    break;
  case "local":
    domain = "https://expense-tracker-backend-production-5ce8.up.railway.app/expense-tracker/";
    break;
  case "development":
    domain = process.env.REACT_APP_DEVELOPMENT_URL;
    break;
  default:
    domain = process.env.REACT_APP_DEVELOPMENT_URL;
}

export default {
  signIn: `${domain}api/auth/login`,
  resetToken: `${domain}api/auth/reset-token`,
  userAndSystemFetchByToken: `${domain}api/user/fetch-by-token`,
  userBase: `${domain}api/user/`,
  userPassword: `${domain}api/user/password`,
  category: `${domain}api/category`,
  transaction: `${domain}api/trasaction`,
};

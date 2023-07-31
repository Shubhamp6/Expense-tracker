const dotenv = require("dotenv");
const express = require("express");
const auth = require("./src/routes/auth.routes");
const users = require("./src/routes/user.routes");
const category = require("./src/routes/category.routes");
const transaction = require("./src/routes/transaction.routes");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const dbConfig = require("./src/config/db.config");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const tokenVerifier = require("./src/middleware/tokenVerifiers.middleware");
const apiResponseHelper = require("./src/utils/apiResponse.helper");
mongoose.set("strictQuery", true);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieparser());

process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log("Shutting Down the Server");
  process.exit(1);
});
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
// app.use('/visitPhotos', express.static('visitPhotos'));

//CONNECT DATABASE

mongoose
  .connect(dbConfig.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json({ limit: process.env.BODY_PARSER_LIMT }));
app.use(bodyParser.urlencoded({ extended: true, limit: "150mb" }));

app.use("/expense-tracker/api/auth", auth);
app.use("/expense-tracker/api/user", users);
app.use("/expense-tracker/api/category", tokenVerifier, category);
app.use("/expense-tracker/api/transaction", tokenVerifier, transaction);

app.use("/", (req, res) =>
  apiResponseHelper.notFoundResponse(res, "OOPS! wrong page!")
);

app.listen(process.env.PORT, () => {
  console.log("Started the server at " + process.env.PORT);
});

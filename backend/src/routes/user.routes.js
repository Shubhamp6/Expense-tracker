const express = require("express");
const multer = require("multer");

const UpdateUserController = require("../contoller/UserController/UpdateUser.controller");
const CreateUesrController = require("../contoller/UserController/Register.controller");

const DeleteUserController = require("../contoller/UserController/DeleteUser.controller");
const tokenVerifier = require("../middleware/tokenVerifiers.middleware");

const userRoutes = express();

userRoutes.post("/", CreateUesrController);
userRoutes.patch("/",tokenVerifier, UpdateUserController);
userRoutes.delete("/",tokenVerifier, DeleteUserController);

module.exports = userRoutes;

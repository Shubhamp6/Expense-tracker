const express = require("express");
const CreateTransactionController = require("../contoller/TransactionController/CreateTransactionController.controller");
const UpdateTransactionController = require("../contoller/TransactionController/UpdateTransactionController.controller");
const DeleteTransactionController = require("../contoller/TransactionController/DeleteTransactionController.controller");
const FetchTransactionController = require("../contoller/TransactionController/FetchTransactionController.controller");

const transactionRoutes = express();
transactionRoutes.post("/", CreateTransactionController);
transactionRoutes.patch("/", UpdateTransactionController);
transactionRoutes.delete("/", DeleteTransactionController);
transactionRoutes.get("/", FetchTransactionController);

module.exports = transactionRoutes;

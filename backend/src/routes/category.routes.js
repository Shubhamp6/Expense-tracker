const express = require("express");
const CreateCategoryController = require("../contoller/CategoryController/CreateCategory.controller");
const UpdateCategoryController = require("../contoller/CategoryController/UpdateCategory.controller");
const DeleteCategoryController = require("../contoller/CategoryController/DeleteCategory.controller");
const FetchCategoriesController = require("../contoller/CategoryController/FetchCategories.controller");

const categoryRoutes = express();
categoryRoutes.post("/", CreateCategoryController);
categoryRoutes.patch("/", UpdateCategoryController);
categoryRoutes.delete("/", DeleteCategoryController);
categoryRoutes.get("/", FetchCategoriesController);

module.exports = categoryRoutes;

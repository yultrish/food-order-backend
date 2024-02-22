import express from "express";
import Category from "../controllers/category.js";
import isLoggedIn from "../middleware/isLogin.js";

const categoryRoute = express.Router();
categoryRoute.post("/addCategory", Category.createCategory);
categoryRoute.get("/categories", Category.getCategories);
categoryRoute.get("/category/:id", Category.getCategory);
categoryRoute.put("/updateCategory/:id", isLoggedIn, Category.updateCategory);
categoryRoute.delete("/deleteCategory/:id", isLoggedIn, Category.deleteCategory);
categoryRoute.delete("/deleteAllCategories/", isLoggedIn, Category.deleteAllCategories);

export default categoryRoute;

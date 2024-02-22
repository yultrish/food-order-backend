import Meal from "../controllers/meal.js";
import isLoggedIn from "../middleware/isLogin.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../config/fileUpload.js";
import express from "express";
const mealRoute = express.Router();

mealRoute.post("/addMeal", Meal.createMeal);
mealRoute.get("/meals", Meal.getMeals);
mealRoute.get("/meal/:id", Meal.getMeal);
mealRoute.put("/mealUpdate/:id", isLoggedIn, Meal.updateMeal);
mealRoute.delete("/delete/:id", isLoggedIn, Meal.deleteMeal);
mealRoute.delete("/deleteAllMeals", isLoggedIn, Meal.deleteAllMeals);

export default mealRoute;

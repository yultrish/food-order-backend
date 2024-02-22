import Meal from "../model/meal.js";
import Category from "../model/category.js";
import multer from "multer";

const createMeal = async (req, res) => {
  try {
    const { name, description, category, price, totalQty, filename } =
      req.body;
    const mealExist = await Meal.findOne({ name });
    if (mealExist) {
      return res.status(409).json({ message: "Meal already exists" });
    }

    const categoryFound = await Category.findOne({ name: category });
    console.log(categoryFound)
    if (!categoryFound) {
      return res.status(404).json({
        message:
          "Category not found. Please create the category first or check the category name",
      });
    }

    const meal = new Meal({
      name,
      description,
      category,
      totalQty,
      price,
      images: `http://localhost:3080/uploads/${filename}`,
    });
    const mealSaved = await meal.save();

    categoryFound.meals.push(mealSaved._id);
    await categoryFound.save();

    // return res.status(201).json({
    //   message: "Meal created successfully",
    //   mealSaved,
    // });
    return res.status(201).send(mealSaved);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMeals = async (req, res) => {
  console.log(req.query);
  let mealExistQuery = Meal.find();
 

  const meals = await mealExistQuery;
  // return res.status(201).json({ message: "all meals fetched successfully", meals });
  res.send(meals);
};

const getMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id);
  
    if (!meal) {
      return res.status(404).json({
        message: "meal not found",
      });
    }
    return res.status(201).json({
      message: "meal fetched successfully",
      meal,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateMeal = async (req, res) => {
  const { name, description, category, sizes, user, price, totalQty, brand } =
    req.body;
  try {
    const { id } = req.params;
    const meal = await Meal.findByIdAndUpdate(
      id,
      { name, description, category, sizes, user, price, totalQty, brand },
      { new: true }
    );
    if (!meal) {
      res.status(404).json({
        message: "meal not found",
      });
    }
    return res.status(201).json({ message: "meal updated successfully", meal });
  } catch (error) {
    console.log(error);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findByIdAndDelete(id);
    if (!meal) {
      res.status(404).json({
        message: "meal not found",
      });
    }
    return res.status(201).json({ message: "meal deleted successfully", meal });
  } catch (error) {
    console.log(error);
  }
};

const deleteAllMeals = async (req, res) => {
  try {
    const meals = await Meal.deleteMany({});

    if (!meals) {
      return res.status(404).json({
        message: "No meals found to delete",
      });
    }

    return res.status(200).json({
      message: "All meals deleted successfully",
      meals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
  deleteAllMeals,
};

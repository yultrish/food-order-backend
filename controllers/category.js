import Category from "../model/category.js";

const createCategory = async (req, res) => {
  const { name, filename, user } = req.body;
  const userId = req.UserAuthId;

  try {
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      return res.status(409).json({ message: "category already exist" });
    }
    
      const category = new Category({ name, user:userId, images: `http://localhost:3080/uploads/${filename}`  });
    const categorySaved = await category.save();
    return res.status(201).send(categorySaved);
  } catch (error) {
    console.log(error)
  }
};

const getCategories = async (req, res) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    // return res.status(201).json({ message: "fetched category successfully", category });
    res.send(category);
  } catch (error) {
    console.log(error);
  }
};

const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { name });
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    // return res.status(201).send(category);
    res
      .status(201)
      .json({ message: "category updated successfully", category });
  } catch (error) {
    console.log(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    return res
      .status(201)
      .json({ message: "category deleted successfully", category });
  } catch (error) {}
};

const deleteAllCategories = async (req, res) => {
  try {
    const category = await Category.deleteMany({});
    if (!category) {
      return res.status(404).send("no categories available");
    }
    return res.status(201).send(category);
  } catch (error) {
    console.log(error)
  }
};
export default {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};

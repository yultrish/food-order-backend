import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import getToken from "../utils/getToken.js";
import verifyToken from "../utils/verifyToken.js";

const registerUser = async (req, res) => {
  const { email, firstName, lastName, fullName, password, address } = req.body;
  try {
    if (!email && !firstName && !lastName && !fullName && !password) {
      return res.status(401).json({ message: "all fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      firstName,
      lastName,
      fullName,
      password: hashPassword,
      address
    });

    const newUserSaved = await newUser.save();
    return res.status(201).json({
      message: "user reqistered successfully",
      newUserSaved,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  // console.log(req.UserAuthId)
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(401).json({ message: "all fields are required" });
    }

    const foundUser = await User.findOne({ email });
    if(!foundUser){
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      foundUser && foundUser.password
    );
    if (!comparePassword){
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(foundUser?._id);
    if (!foundUser && !comparePassword) {
      console.log(foundUser, token)
      return res
        .status(401)
        // .json({ message: "login successfully", foundUser, token });
        .json({ message: "error" });

      
    } else {
      return res.status(201).json({ message: "login successfully", foundUser, token });
      // return res.status(500).json({ message: "invalid login details" });
    }
  } catch (error) {
    res.status(500).json({ message: "server cannot be found" });
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const token = getToken(req);
    const verified = verifyToken(token);
    console.log(verified);
    res.send(token)
  } catch (error) {}
};

const updateShippingAddress = async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    postalCode,
    Province,
    country,
    phone,
  } = req.body;
  const user = await User.findByIdAndUpdate(
    req.UserAuthId,
    {
      shippingAdress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        Province,
        country,
        phone,
      },
      hasShippingAddress: true,
    },
    { new: true }
  );
  res.status(201).json({
    message: "user shipping address updated successfully",
    user,
  });
};

const deleteUsers = async (req, res) => {
  try {
    const user = await User.deleteMany({});
    if (!user) {
      res.status(404).json({ message: "users not found" });
    }
    res.status(201).json({ message: "users deleted successfully", user });
  } catch (error) {
    console.log(error);
  }
};

export default {
  registerUser,
  loginUser,
  getUser,
  updateShippingAddress,
  deleteUsers,
};

import express from "express"
import User from "../controllers/user.js"
import isLoggedIn from "../middleware/isLogin.js"
const userRoute = express.Router()
userRoute.post("/newUser", User.registerUser)
userRoute.post("/user", User.loginUser)
userRoute.get("/users", User.getUser)
userRoute.put("/update/shipping/Address", isLoggedIn, User.updateShippingAddress)
userRoute.delete("/deleteUsers", isLoggedIn, User.deleteUsers)


export default userRoute



import Order from "../controllers/order.js";
import isLoggedIn from "../middleware/isLogin.js";
import User from "../controllers/user.js";
import express from "express";
const OrderRoute = express.Router();
OrderRoute.post("/newOrder", isLoggedIn, Order.createOrder);
OrderRoute.delete("/deleteAllOrders", isLoggedIn, Order.deleteAllOrders);
OrderRoute.get("/getAllOrders", isLoggedIn, Order.getAllorders);

export default OrderRoute;

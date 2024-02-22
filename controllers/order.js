import Order from "../model/order.js";
import User from "../model/user.js";
import Meal from "../model/meal.js";

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, totalPrice, user } = req.body;
  // console.log(orderItems, shippingAddress, totalPrice)
  try {
    const userAuth = await User.findById(req.UserAuthId);
    const userId = req.UserAuthId;
    if(!orderItems){
      res.status(401).json({message:"no order items"})
    }
    console.log(req.UserAuthId)
    console.log(userAuth?._id);
    console.log({ orderItems, shippingAddress, totalPrice});
    console.log(orderItems.length);

    if (orderItems.length == 0) {
      return res.status(400).json({ message: "No order items provided" });
    }
    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      totalPrice,
    });
    console.log(order);
    const orderSaved = await order.save();
    console.log(orderSaved);
    userAuth.orders.push(order?._id);
    await userAuth.save();

    const meals = await Meal.find({ _id: { $in: orderItems } });
    console.log(meals);
    orderItems.map(async (order) => {
      const meal = meals?.find((meal) => {
        return meal?._id.toString() === order?._id.toString();
      });
      if (meal) {
        meal.totalSold += order.totalQtyBuying || 0;;
        await meal.save();
      }else{
        return meal.totalSold
      }
    });
    return res
      .status(201)
      .json({ message: "orders created successfully", orderSaved, user });
  } catch (error) {
    console.log(error);
  }
};

export const getAllorders = async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json({
    success: true,
    message: "All orders",
    orders,
  });
};

const deleteAllOrders = async (req, res) => {
  try {
    const orders = await Order.deleteMany({});

    if (!orders) {
      return res.status(404).json({
        message: "No orders found to delete",
      });
    }

    return res.status(200).json({
      message: "All orders deleted successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  createOrder,
  deleteAllOrders,
  getAllorders,
};

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const randomText = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumber = Math.floor(1000 + Math.random() * 9000);
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    orderNumber: {
      type: String,
      default: randomText + randomNumber,
    },
    paymentStatus: {
      type: String,
      default: "not paid",
    },
    paymentMethod: {
      type: String,
      default: "not specified",
    },
    currency: {
      type: String,
      default: "not specified",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

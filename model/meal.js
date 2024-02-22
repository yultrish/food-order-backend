import mongoose from "mongoose";
const Schema = mongoose.Schema;
const mealSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
  
    images: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

mealSchema.virtual("qtyLeft").get(function () {
  const meal = this;
  return meal.totalQty - meal.totalSold;
});

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;

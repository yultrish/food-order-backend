import express from "express"
import morgan from "morgan"
import ConnectedDb from "./config/db.js"
import userRoute from "./routers/userRouter.js"
import mealRoute from "./routers/mealRoute.js"
import categoryRoute from "./routers/category.js"
import OrderRoute from "./routers/orderRoute.js"
import imageRoute from "./routers/imageRoute.js"
import cors from "cors"
import Stripe from "stripe"
import handleError from "./middleware/error.js"
ConnectedDb()


const app = express()
app.use(express.static("public"));
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({origin:"*"}))
app.use("/api", userRoute)
app.use("/v1", mealRoute)
app.use("/c1", categoryRoute)
app.use("/d1", OrderRoute)
app.use("/images", imageRoute)
app.get("/", (req, res)=>{
    res.send("hello")
})

const PORT = process.env.PORT || 3090

app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`)
})


import express from "express"
const imageRoute = express.Router()
import upload from "../config/fileUpload.js";
import uploadProductImage from "../controllers/imageFile.js";

imageRoute.post("/upload/image", upload.single('file'), uploadProductImage)

export default imageRoute
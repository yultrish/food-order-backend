import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
const conntectionString = process.env.MONGO_URI
const ConnectedDb = async ()=>{
    try {
    let connected = await mongoose.connect(conntectionString)
        if(connected){
            console.log(`mongo db connected`)
        }
    } catch (error) {
       console.log(error) 
    }
}

export default ConnectedDb
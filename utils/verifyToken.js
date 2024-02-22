import JWT, { decode } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const verifyToken = (token)=>{
    return JWT.verify(token, process.env.JWT_KEY, (err, decoded)=>{
        if (err){
            return false
        }else{
            return decoded
        }
    })
}

export default verifyToken
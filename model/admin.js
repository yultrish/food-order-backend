import mongoose from "mongoose";
const Schema = mongoose.Schema
const adminSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    }, 
    orders:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Order"
       }
    ],
    isAdmin:{
        type:Boolean,
        default: false
    },
    hasShippingAddress:{
        type:Boolean,
        default:false
    },
    shippingAdress:{
        firstName:{
            type: String
        },
        lastName:{
            type: String
        },
        address:{
            type:String,
        },
        city:{
            type:String,
        },
        postalCode:{
            type: String
        },
        Province:{
            type: String
        },
        country:{
            type: String
        },
        phone:{
            type: String
        }
    }
},{
    timestamps: true,
})

const Admin = mongoose.model("Admin", adminSchema)
export default Admin
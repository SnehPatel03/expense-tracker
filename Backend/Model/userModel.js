import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname :{
        type:String,
        required: true
    },
    profile:{
       type:String
      
    },
    email : {
        type:String,
        required:true,
        unique:true,
        select:false
    },
    password :{
        type:String,
        required:true
    },
     token: {
    type: String,
  },
})

const User = mongoose.model("User", userSchema)
export default User
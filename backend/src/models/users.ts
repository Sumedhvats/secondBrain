import mongoose from "mongoose";
const users = new mongoose.Schema(
    {
        username:{type:String,require:true,unique:true},
        password:{type:String,require:true}

    }
)
const userModel = mongoose.model("User",users);
export default userModel;
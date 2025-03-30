import mongoose from "mongoose";
const link = new  mongoose.Schema({
    hash:{type:String, require:true},
    userId:{type:mongoose.Types.ObjectId,ref:"User", require:true}
})
const linkModel= mongoose.model("Link",link)
module.exports(linkModel)
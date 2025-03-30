import mongoose from "mongoose";
const link = new  mongoose.Schema({
    hash:{type:String, require:true},
    userId:{type:mongoose.Types.ObjectId,ref:"User", require:true}
})
const linkModel= mongoose.model("Link",link)
export default module.exports(linkModel)
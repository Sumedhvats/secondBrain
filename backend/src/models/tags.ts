import mongoose from "mongoose";
const tags = new  mongoose.Schema({
    title:{ type:String,require:true }
})
const tagsModel= mongoose.model("Tags",tags)
export default tagsModel;
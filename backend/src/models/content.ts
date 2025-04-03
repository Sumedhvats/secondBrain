    import mongoose from "mongoose";
const contentTypes = ['image', 'video', 'article', 'audio','tweet','todo']; // Extend as needed
const content = new mongoose.Schema(
    {
        link:{type:String},
        type:{type:String,enum:contentTypes,require:true},
        title:{type:String,require:true},
        tags:[{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
        userId:{type:mongoose.Types.ObjectId, ref:'User', require:true
        }
       


    }
)
const contentModel = mongoose.model("Content",content);
export default contentModel;
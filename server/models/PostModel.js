const mongoose= require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        // date:{
        //     type:Date,
        //     required:true
        // },
        user:{
            type:mongoose.Types.ObjectId, 
            ref:"User",
            required:true
        },
        // user:{
        //     type:String, 
        //     required:true
        // },
    },
    { timestamps: true }
)

const PostModel = mongoose.model("Post", postSchema)

module.exports =  PostModel
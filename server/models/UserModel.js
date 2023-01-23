const { Schema, model,mongoose } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type:String,
            required:true
        },
        email: {
            type:String,
            required:true,
            unique:true
        },
        password: {
            type:String,
            required:true,
            minLngth:5,
        },
        posts: [{ 
            type:mongoose.Types.ObjectId, 
            ref:"Post" 
        }]  
        // posts: [{ 
        //     type:String              
        // }]   
    },

    { timestamps: true }
)


const UserModel= model("User",userSchema)
//users named Collection is created in db 
module.exports = UserModel
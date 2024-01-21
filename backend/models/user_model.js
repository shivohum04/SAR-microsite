import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        phone_no:{
            type:Number,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        usercount:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);
export const user = mongoose.model('user',userSchema);
 
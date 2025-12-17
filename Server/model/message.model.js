import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: String,
        required: true  //we get clerkID to identify who is sender 
    },

     receverId:{
        type: String,
        required: true  //we get clerkID to identify who is recever 
    },

    content: {
        type: String,
        required: true
    }
},{timestamps:true})

export const Messages = mongoose.model("Message", messageSchema)
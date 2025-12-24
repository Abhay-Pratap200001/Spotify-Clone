import { asynHandler } from "../lib/asyncHandler.js";
import { User } from "../model/user.model.js";

export const getAllUsers = asynHandler(async(req, res) => {
   try {
     const currentUserId = req.auth.userId 
     const users = await User.find({clerKId: {$ne: currentUserId}})
     res.status(200).json(users)
   } catch (error) {
    console.log("Failed to get User error in getAllUsers in user.controller");
    throw new Error(500,"Internal Server error");
   }
})
import { clerkClient } from "@clerk/express";
import { ApiError } from "../lib/apiError.js";

// middleware for authentication
export const protectRouter = async(req, res, next) => {
    if (!req.auth.userId){ //req.auth.userId come from clerk 
        res.status(401).json({message: 'Unauthorized -- you have to login'})
        return
    }   
    next()
}


// middlewarwe for admin route
export const requireAdmin = async(req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId)
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress
        if (!isAdmin) {
            return res.status(403).json({message: 'Unauthorized -- you are not admin'})
        }
    } catch (error){
        console.log("error in admin controller", error);
        throw new ApiError(500, "Internal server error",);
    }
}


import { clerkClient } from "@clerk/express";

export const protectRouter = async(req, res, next) => {
    if (!req.auth.userId){ //req.auth.userId come from clerk 
        res.status(401).json({message: 'Unauthorized -- you have to login'})
        return
    }   
    next()
}

export const requireAdmin = async(req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId)
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress
        if (!isAdmin) {
            return res.status(403).json({message: 'Unauthorized -- you are not admin'})
        }
    } catch (error){}
}


import express from "express";
import { protectRouter } from "../middleware.js/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";
const router = express.Router()

router.get('/like', protectRouter, getAllUsers)

export default router
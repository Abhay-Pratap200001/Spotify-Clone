import express from "express";
import { protectRouter, requireAdmin } from "../middleware.js/auth.middleware.js";
import { getStat } from "../controllers/stat.controller.js";


const router = express.Router();

router.get("/", protectRouter, requireAdmin, getStat);

export default router;

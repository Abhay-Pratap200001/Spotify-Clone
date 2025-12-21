import express from "express";
import { createSong} from "../controllers/admin.controller.js";
import { protectRouter, requireAdmin } from "../middleware.js/auth.middleware.js";
const router = express.Router()

router.post('/songs', protectRouter, requireAdmin, createSong)

export default router
import express from "express";
import { protectRouter, requireAdmin } from "../middleware.js/auth.middleware.js";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controllers/song.controller.js";
const router = express.Router()

router.get("/", protectRouter, requireAdmin, getAllSongs)
router.get("/features", getFeaturedSongs)
router.get("/made-for-you", getMadeForYouSongs)
router.get("/features", getTrendingSongs)



export default router
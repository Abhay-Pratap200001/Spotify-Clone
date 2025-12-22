import express from "express";
import { createAlbum, createSong, deleteAlbum, deleteSong, checkAdmin} from "../controllers/admin.controller.js";
import { protectRouter, requireAdmin } from "../middleware.js/auth.middleware.js";
const router = express.Router()

router.post('/check', protectRouter, requireAdmin, checkAdmin)


router.post('/songs', protectRouter, requireAdmin, createSong)
router.delete('/songs/:id', protectRouter, requireAdmin, deleteSong)

router.post('/albums', protectRouter, requireAdmin, createAlbum)
router.delete('/albums/:id', protectRouter, requireAdmin, deleteAlbum)




export default router
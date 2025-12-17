import express from "express";
const router = express.Router()

router.get("/", (req, res) => {
    res.send("stats Route")
})

export default router
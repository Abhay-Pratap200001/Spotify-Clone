import express from "express";
const router = express.Router()

router.get("/", (req, res) => {
    res.send("albums Route")
})

export default router
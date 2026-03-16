import express from "express"
import newsRoutes from "../routes/news.routes.js"

const router = express.Router();

router.use("/news", newsRoutes)

export default router
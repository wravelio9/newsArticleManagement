import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import logger from "./src/middleware/logger.js";
import router from "./src/routes/index.js";
import notfound from "./src/middleware/notfound.js";
import errorHandler from "./src/middleware/error.js";
import upload from "./src/middleware/upload.js";

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
    res.json({message: `API`});
})

app.use(logger)
app.set("view engine", "ejs")
app.use('/images', express.static('images'));

// // Use routes
app.use("/api", router) 

// Use error handler
app.use(notfound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})




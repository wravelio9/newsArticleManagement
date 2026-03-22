import express from "express"
import upload from "../middleware/upload.js" 
import NewsController from "../controller/news.controller.js"
import authenticateToken from "../middleware/authMiddleware/authenticate.js"

const router = express.Router();

//Upload Gambar Thummbnail
router.get("/upload", (req, res, next) => {
        res.render("upload")
    })

router.post("/upload", upload.single('image'), (req, res, next) => {
    res.send("Images uploaded")
})

// Search Berita
router.get('/search', authenticateToken, NewsController.searchNews)    

// Melihat daftar berita
router.get("/", authenticateToken, NewsController.getAllNews);

// Menambah berita
router.post("/", authenticateToken, NewsController.createNews);

// Publish berita
router.put('/publish/:id', authenticateToken, NewsController.publishNews);

// Edit berita
router.put("/:id", authenticateToken, NewsController.updateNews);

// Menghapus berita
router.delete("/:id", authenticateToken, NewsController.deleteNews);



export default router;
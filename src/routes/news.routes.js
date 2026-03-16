import express from "express"
import upload from "../middleware/upload.js" 
import NewsController from "../controller/news.controller.js"

const router = express.Router();

router.get("/upload", (req, res, next) => {
        res.render("upload")
    })

router.post("/upload", upload.single('image'), (req, res, next) => {
    res.send("Images uploaded")
})

// Search Berita
router.get('/search', NewsController.searchNews)    

// Melihat daftar berita
router.get("/", NewsController.getAllNews);

// Menambah berita
router.post("/", NewsController.createNews);

// Publish berita
router.put('/publish/:id', NewsController.publishNews);

// Edit berita
router.put("/:id", NewsController.updateNews);

// Menghapus berita
router.delete("/:id", NewsController.deleteNews);



export default router;
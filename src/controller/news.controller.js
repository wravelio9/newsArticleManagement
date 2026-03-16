import prisma from "../config/database.js";
import newsService from "../service/news.service.js";
import { createNewsSchema } from "../validator/news.validator.js";

class NewsController {
    // Controller untuk melihat daftar berita
    static async getAllNews(req, res, next) {
        try {
            const news = await newsService.getAllNews();
            res.status(200).json({ data: news });
        } catch (error) {
            next(error);
        }
    }

    // Controller untuk menambahkan berita
    static async createNews(req, res, next) {
        try {
            const { error, value } = createNewsSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const news = await newsService.createNews(value);
            res.status(201).json({ data: news });
        } catch (error) {
            next(error);
        }
    }

    // Controller untuk edit berita
    static async updateNews(req, res, next) {
        try {
            const { error, value } = createNewsSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const news = await newsService.updateNews(req.params.id, value);
            res.status(200).json({  data: news });
        } catch (error) {
            next(error);
        }
    }

    //Controller untuk menghapus berita
    static async deleteNews(req, res, next) {
        try {
            const news = await newsService.deleteNews(req.params.id);
            res.status(200).json({message: `Deleted`});
        } catch (error) {
            next(error);
        }
    }


    //Controller untuk publish berita
    static async publishNews(req, res, next) {
        try {
            const news = await newsService.publishNews(req.params.id)

            res.status(200).json({
                message: "News published successfully",
                data: news
            })
        } catch (error) {
            next(error)
        }
    }


    //Controller untuk search berita
    static async searchNews(req, res, next) {
        const { title } = req.query
        const formattedTitle = title.replace(/-/g, ' ')

        try {
            const news = await newsService.searchNews(formattedTitle)
            

            res.status(200).json({
                message: "News fetched successfully",
                data: news
            })
        } catch (error) {
            next(error)
        }
    }
}

export default NewsController;
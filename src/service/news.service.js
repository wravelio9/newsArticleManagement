import prisma from "../config/database.js";
import NewsRepository from "../repository/news.repository.js";

class newsService{
    // Service for Get All News
    static async getAllNews(){
        const news = await NewsRepository.getAllNews();
        
        if(!news || news.length === 0) {
            const error = new Error("There is no post here");
            error.status = 404;
            throw error;    
        }

        return news;
    }

    // Service for Create new News
    static async createNews(data){
        const news = await NewsRepository.createNews(data); 
        return news;  
    }

    //Service for Update new News
    static async updateNews(id, data){
        const pid = parseInt(id)
        const news = await NewsRepository.updateNews(pid, data);

        if(!news) {
            const error = new Error(`There is no news with id ${pid}.`)
            error.status = 404;
            throw error;
        }

        return news;
    }

    //Service untuk menghapus berita
    static async deleteNews(id) {
        const pid = parseInt(id)
        return NewsRepository.deleteNews(pid)
    }


    //Service untuk publish berita
    static async publishNews(id) {
        const pid = parseInt(id)

        const news = await NewsRepository.publishNews(pid)

        if (!news) {
            const error = new Error(`There is no news with id ${pid}.`)
            error.status = 404;
            throw error;
        }

        return news
    }

    // Service for Search News
    static async searchNews(title){
        const news = await NewsRepository.searchNews(title)

        if (!title) {
            throw new Error("Title is required")
        }

        if (news.length === 0) {
            throw new Error("News not found")
        }

        return news
    }
}

export default newsService;
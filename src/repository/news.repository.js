    import prisma from "../config/database.js";

    class NewsRepository {
        //Repository untuk melihat daftar berita
        static async getAllNews() {
            return prisma.news.findMany();
        }

        //Repository untuk menambahkan berita
        static async createNews(data) {
            return prisma.news.create({data});
        }

        //Repository untuk edit berita
        static async updateNews(id, data) {
            return prisma.news.update({where: {id}, data})
        }

        //Repository untuk menghapus berita
        static async deleteNews(id) {
            await prisma.news.findUniqueOrThrow({ where: { id } });
            return prisma.news.delete({ where: { id } });
        }

        //Repository untuk publish berita
        static async publishNews(id) {
            return prisma.news.update({
                where: { id },
                data: { published: true }
            })
        }

        //Repository untuk search berita
        static async searchNews(title) {
            return await prisma.news.findMany({
                where: { title: { contains: title }, published: true }
            })
        }
    }

    export default NewsRepository;
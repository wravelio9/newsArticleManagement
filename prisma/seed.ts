import { PrismaClient, Prisma } from "@prisma/client";
import 'dotenv/config'

const prisma = new PrismaClient()

const newsData: Prisma.NewsCreateInput[] = [
    {
        title: "Title number one",
        content: "This is number one content",
        author: "John Doe",
        thumbnail: "www.google.com",
        published: false
    },
    {
        title: "Title number two",
        content: "This is number two content",
        author: "Jane Doe",
        thumbnail: "www.google.com",
        published: false
    },
    {
        title: "Title number three",
        content: "This is number three content",
        author: "Yandy",
        thumbnail: "www.google.com",
        published: false
    },
    {
        title: "Title number four",
        content: "This is number four content",
        author: "Soetardji",
        thumbnail: "www.google.com",
        published: true
    },
    {
        title: "Title number five",
        content: "This is number five content",
        author: "Kartonegara",
        thumbnail: "www.google.com",
        published: false
    },
]

async function main() {
    for (const u of newsData) {
        await prisma.news.create({ data: u })
    }
    console.log("Seeding completed!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

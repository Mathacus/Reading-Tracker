import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.book.deleteMany()

    const book1 = await prisma.book.create({
        data: {
            title: "Rich Dad Poor Dad",
            totalPages: 390,
            readPages: 111,
            completed: false
        }
    })

    const book2 = await prisma.book.create({
        data: {
            title: "The Subtle Art of Not Giving a F*ck",
            totalPages: 225,
            readPages: 225,  // Completed book
            completed: true
        }
    })

    const book3 = await prisma.book.create({
        data: {
            title: "Atomic Habits",  // Different book to avoid duplicates
            totalPages: 320,
            readPages: 75,
            completed: false
        }
    })

    const book4 = await prisma.book.create({
        data: {
            title: "Think and Grow Rich",
            totalPages: 238,
            readPages: 238,  // Another completed book
            completed: true
        }
    })

    console.log('Database seeded with books:', { book1, book2, book3, book4 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
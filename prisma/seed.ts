import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    // Clear existing data (order matters due to foreign key constraints)
    await prisma.readingSession.deleteMany()
    await prisma.book.deleteMany()

    const book1 = await prisma.book.create({
        data: {
            title: "Rich Dad Poor Dad",
            totalPages: 390,
            readPages: 111,
            completed: false,
            readingSessions: {
                create: [
                    { day: new Date('2024-09-15'), content: "Started reading about financial literacy..." },
                    { day: new Date('2024-09-16'), content: "Learned about assets vs liabilities..." },
                    { day: new Date('2024-09-17'), content: "Understanding the cash flow quadrant..." },
                ]
            }
        }
    })

    const book2 = await prisma.book.create({
        data: {
            title: "The Subtle Art of Not Giving a F*ck",
            totalPages: 225,
            readPages: 225,
            completed: true,
            readingSessions: {
                create: [
                    { day: new Date('2024-08-01'), content: "Introduction to choosing what matters..." },
                    { day: new Date('2024-08-02'), content: "The feedback loop from hell..." },
                    { day: new Date('2024-08-03'), content: "You are not special..." },
                    { day: new Date('2024-08-04'), content: "The value of suffering..." },
                    { day: new Date('2024-08-05'), content: "Finished - great insights on priorities!" },
                ]
            }
        }
    })

    const book3 = await prisma.book.create({
        data: {
            title: "Atomic Habits",
            totalPages: 320,
            readPages: 75,
            completed: false,
            readingSessions: {
                create: [
                    { day: new Date('2024-09-20'), content: "The four laws of behavior change..." },
                    { day: new Date('2024-09-22'), content: "Making habits obvious and attractive..." },
                ]
            }
        }
    })

    const book4 = await prisma.book.create({
        data: {
            title: "Think and Grow Rich",
            totalPages: 238,
            readPages: 238,
            completed: true,
            readingSessions: {
                create: [
                    { day: new Date('2024-07-10'), content: "The power of desire and faith..." },
                    { day: new Date('2024-07-11'), content: "Autosuggestion and specialized knowledge..." },
                    { day: new Date('2024-07-12'), content: "Organized planning and decision making..." },
                    { day: new Date('2024-07-13'), content: "Completed - the mastermind principle is powerful!" },
                ]
            }
        }
    })

    console.log('Database seeded with books and reading sessions:', { book1, book2, book3, book4 })
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
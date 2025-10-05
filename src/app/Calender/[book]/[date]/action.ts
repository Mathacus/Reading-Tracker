"use server";

import prisma from "../../../../../lib/prisma";

export async function saveContent(bookTitle: string, date: Date, content: string){
    try{
        await prisma.readingSession.update({
            where: {
                bookTitle_day: {
                    bookTitle,
                    day: date
                },
            },
            data: {
                content: content,
            },
        });

    } catch (error) {
        console.error("Error saving content: ", error);
        throw new Error("Failed to save content");
    }
}

export async function getContent(bookTitle: string, date: Date) {
    try {
        await prisma.readingSession.findUnique({
            where: {
                bookTitle_day: {
                    bookTitle: bookTitle,
                    day: date
                }
            }
        });

    } catch (error) {
        console.error("Error getting content", error);
        throw new Error("Failed to retrieve content");
    }
}
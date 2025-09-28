import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {title, totalPages} = body
        
        if (!title || typeof title !== 'string' || title === ''){
            console.log("ERROR WITH STRING", title)
            console.log(typeof title)
            return NextResponse.json(
                {error: 'Title is required'},
                {status: 400 }
            )
        }

        if(!totalPages || typeof totalPages !== 'number' || totalPages <= 0) {
            console.log("ERROR WITH NUMBER")
            return NextResponse.json(
                {error: 'Total pages must be greater than 0'},
                {status: 400}
            )
        }

        const newBook = await prisma.book.create({
            data: {
                title,
                totalPages,
                readPages: 0,
                completed: false
            }
        })

        return NextResponse.json(newBook, {status: 201})

    } catch (error) {
        console.error('Error creating book:', error)
        return NextResponse.json(
            {error: ' Failed to create book'},
            {status: 500}
        )
    }
}
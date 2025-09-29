import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await context.params;

        const book = await prisma.book.findUnique({
            where: { id: Number(id) },
        });

        if(!book) {
            return NextResponse.json(
                {error: 'Item not found'},
                {status: 404}
            );
        }

        return NextResponse.json(book);
    } catch (error) {
        return NextResponse.json(
            {error: 'item not found'},
            {status: 500}
        )
    }
}

import DocumentArea from "@/app/components/DocumentArea";
import prisma from "../../../../../lib/prisma";
import Link from "next/link";

type Props = {
    params: {book: string; date: string};
}

export default async function DateDisplay({params}:Props) {
    const resolvedParams = await params;
    const book = decodeURIComponent(resolvedParams.book);
    const rawDate = decodeURIComponent(resolvedParams.date);

    const [day, month, year] = rawDate.split("-").map(Number);
    
    const response = await prisma.readingSession.upsert({
        where: {
            bookTitle_day: {
                bookTitle: book,
                day: new Date(year, month, day)
            }
        },
        update: {},
        create: {
            bookTitle: book,
            day: new Date(year, month, day),
            content: ""
        }
    });

    const currentContent = await prisma.readingSession.findUnique({
        where: {
            bookTitle_day: {
                bookTitle: book,
                day: new Date(year, month, day)
            }
        }
    });

    const retrievedBook = await prisma.book.findUnique({
        where: {
            title: book
        }
    });

    return (
        <div>
          <header className="border-b border-gray-200 bg-white w-full">
            <div className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
            <Link href="/">
                <span className="text-xl sm:text-2xl font-bold">B👀kTracker</span>
            </Link>
            </div>
            <div>
            <Link href={`/books/${retrievedBook?.id}`}>
                <span className="text-gray-600 text-5xl font-bold">{book}</span>
            </Link>
            </div>
            <div>
                <span className="text-gray-600 text-5xl font-bold">{rawDate}</span>
            </div>
        </div>

       
      </header>
       <div>
            <DocumentArea bookTitle={book} date={new Date(year, month, day)} currentContent={currentContent?.content || ""}/>
        </div>
        </div>
      
    );
}
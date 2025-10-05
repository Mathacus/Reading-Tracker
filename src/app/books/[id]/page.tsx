import Calender from "@/app/components/Calender";
import prisma from "../../../../lib/prisma";
import Link from "next/link";

type Props = {
    params: {id: string};
};

export default async function Home({params}: Props) {
    const {id} = await params;

    const book = await prisma.book.findUnique({
            where: { id: Number(id) },
    });

    if(!book) {
       throw new Error("Failed to load book");
    }

    
return (
    <>
    <div className="">
        <header className="border-b border-gray-200 bg-white w-full">
        <div className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
            <Link href="/">
                <span className="text-xl sm:text-2xl font-bold">B👀kTracker</span>
            </Link>
            </div>
            <div>
                <span className="text-gray-600 text-5xl font-bold">{book.title}</span>
            </div>
            <div>
                <span className="text-lg font-semibold text-gray-900 border p-2 rounded-xl">{`${book.readPages}/${book.totalPages}`}</span>
            </div>
        </div>
      </header>
        <div>
            <Calender bookTitle={book.title}/>
        </div>
    </div>
    </>
);
}
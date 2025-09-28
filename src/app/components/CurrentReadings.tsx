import prisma from "../../../lib/prisma"

export default async function CurrentReadings() {

    const books = await prisma.book.findMany({
        where: {
            completed: false
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="mb-8">
        {books.map((book) => (
        <div key={book.id} className="bg-gray-100 rounded-lg p-4 mb-4 w-full">
            <div className="flex justify-between items-start gap-2 mb-3">
              <h3 className="text-sm sm:text-base font-medium text-gray-900 flex-1 min-w-0">
                {book.title}
              </h3>
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap flex-shrink-0 bg-gray-200 p-1 rounded-lg">
                {`${book.readPages}/${book.totalPages}`}
              </span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div 
                className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(book.readPages/book.totalPages) * 100}%` }}
              />
            </div>
        </div>
        ))}
        </div>
    )
}
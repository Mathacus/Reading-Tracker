import CurrentReadings from "./CurrentReadings"
import ReadBooks from "./ReadBooks"
import NewBook from "./NewBook"

export default function BookDisplay() {
    return (
      <main className="px-4 py-6 max-w-7xl mx-auto w-full">
        <div className='flex justify-between pb-2'>
            <h2 className="text-gray-700 text-lg p-2">Reading</h2>
            <NewBook />
        </div>
        {/* Reading Section */}
        <CurrentReadings />
        {/* Read Section */}
        <ReadBooks />
      </main>
    )
}
import BookDisplay from "./components/BookDisplay";
import CurrentReadings from "./components/CurrentReadings";
import ReadBooks from "./components/ReadBooks";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white w-full">
        <div className="px-4 py-4 max-w-7xl mx-auto">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-xl sm:text-2xl font-bold">B👀kTracker</span>
            </Link>
            </div>
        </div>
      </header>
        {/* Main Content */}
      <BookDisplay />
    </div>
  );
};
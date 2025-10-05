"use client";
import { useState} from "react";
import Link from "next/link";

type CalenderProps = {
  bookTitle: string;
}

export default function Calender({ bookTitle }: CalenderProps) {

    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth() + 1;

    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"][month-1];

    const getMonthLengths = (year: number) => {
      const isLeap = (year % 4 === 0 && year % 100 != 0) || (year % 400 === 0);
      return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };

    const monthLength = getMonthLengths(year)[month-1];
    
    const incrementDate = () => {
        setCurrentDate(new Date(year, month + 1, 0));
    };

    const decrementDate = () => {
        setCurrentDate(new Date(year, month - 1, 0));
    };

return (
    <>
    <div className="flex items-center justify-between px-4 py-6 max-w-7xl mx-auto w-full">
      <div>
      <p className="text-lg text-gray-700">{`${monthName} ${year}`}</p>
      </div>
      <div className="flex gap-2">
        <button className="text-2xl font-bold text-gray-700 hover:text-gray-900 px-2" onClick={decrementDate}>{"◀"}</button>
        <button className="text-2xl font-bold text-gray-700 hover:text-gray-900 px-2" onClick={incrementDate}>{"▶"}</button>
      </div>
    </div>
    <div className="grid grid-cols-7 gap-0 px-4 max-w-7xl mx-auto w-full">
      {
       [...Array(monthLength)].map((x,i) => (
        <Link key={`${i + 1}-${month}-${year}`} href={`/Calender/${bookTitle}/${`${i + 1}-${month}-${year}`}`}>
        <div key={i} className="border border-gray-500 aspect-square relative bg-gray-100">
          <span className="absolute bottom-1 right-2 text-xs text-gray-900">{`${i + 1}-${month}-${year}`}</span>
        </div>
        </Link>
       ))
      }
    </div>
    </>
);
}
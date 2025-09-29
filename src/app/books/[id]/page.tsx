'use client'
import { useEffect, useState, use} from "react"

type Props = {
    params: Promise<{id: string}>
};

type PulledData = {
    id: number
    title: string
    totalPages: number
    readPages: number
    completed: boolean
    createdAt: Date
    updatedAt: Date
}

export default function Home({params}: Props) {
    const {id} = use(params);

    const [pulledData, setPulledData] = useState<PulledData | null>(null);

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

    const monthLength = currentDate.getDate();

    const incrementDate = () => {
        setCurrentDate(new Date(year, month + 1, 0));
    }

    const decrementDate = () => {
        setCurrentDate(new Date(year, month - 1, 0));
    }

    const getData = async () => {
        const response = await fetch(`/api/books/${id}`)
        return response.json()
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();
            setPulledData(response)
        }
        fetchData();
    }, [])
    
return (
    <>
    <div className="flex items-center justify-between m-2">
        <div>
            <h1>B👀kTracker</h1>
            <h2>{pulledData?.title}</h2>
            <h2>{`${pulledData?.readPages}/${pulledData?.totalPages}`}</h2>
        </div>
      <div>
      <p className="text-6xl">{`${monthName} ${year}`}</p>
      </div>
      <div className="">
        <button className="text-6xl" onClick={decrementDate}>{"<"}</button>
        <button className="text-6xl" onClick={incrementDate}>{">"}</button>
      </div>
    </div>
    <div className="grid grid-cols-5 m-2">
      {
       [...Array(monthLength)].map((x,i) => (
        <div key={i} className="border relative p-32">
          <span className="absolute bottom-1 right-1 text-s">{`${i + 1}-${month}-${year}`}</span>
        </div>
       ))
      }
    </div>
    </>
)
}
'use client'
import { useState } from "react"

type DataForForm = {
    title: string,
    totalPages: number
}

export default function NewBook() {

    const [showPopup, setShowPopup] = useState(false)

    const sendData = async (formData: DataForForm) => {
            try{
                const response = await fetch('/api/books/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })

                const newBook = await response.json()

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

            } catch(error) {
                console.log("Failed to send data to api", error)
            }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        const title = formData.get('title') as string
        const totalPages = formData.get('totalPages') as string
        const dataFromForm = {'title': title, 'totalPages': Number(totalPages)}

        try {
            sendData(dataFromForm)
        } catch(error){
            console.log("Failed to send data", error)
        }

        setShowPopup(false)
    }
    
return (
    <>
        <button 
            className="text-lg text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap hover:bg-gray-200 rounded-lg p-2 font-semibold" 
            onClick={() => setShowPopup(true)}
        >
            Track a new book
        </button>
        {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-opa">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto border">
                    <h1 className="text-lg font-medium text-gray-900 mb-6">What book do you want to track?</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input name="title" type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Pages</label>
                            <input name="totalPages" type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"/>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button 
                                type="button"
                                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg p-2 font-medium transition-colors"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="flex-1 bg-gray-500 text-white hover:bg-gray-600 rounded-lg p-2 font-medium transition-colors"
                            >
                                Track Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}     
    </>
)
}

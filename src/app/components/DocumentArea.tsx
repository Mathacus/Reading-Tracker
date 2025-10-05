"use client";
import { useState } from "react";
import { saveContent} from "../Calender/[book]/[date]/action";

type PageProps = {
    bookTitle: string,
    date: Date,
    currentContent: string
}

export default function DocumentArea({bookTitle, date, currentContent}: PageProps) {
    
    const [editing, setEdit] = useState(false);
    const [content, setContent] = useState(currentContent);

    const onSave = async () => {
        await saveContent(bookTitle, date, content);
    };

    return (
  <div className="max-w-3xl mx-auto p-6">
    <div>
        <h1 className="font-bold text-lg p-1">What did you learn?</h1>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      {!editing ? (
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[200px] p-4 text-gray-800 leading-relaxed border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        />
      )}
    </div>

    <div className="flex justify-center">
      {!editing ? (
        <button
          onClick={() => setEdit(true)}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
        >
          Edit
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit(false);
            onSave();
          }}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
        >
          Save
        </button>
      )}
    </div>
  </div>
);

}
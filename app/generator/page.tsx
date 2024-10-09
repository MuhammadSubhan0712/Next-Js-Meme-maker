"use client";
import Image from "next/image";
import { useState } from "react";
import { Laugh, Share2, SquarePen } from "lucide-react";

interface SingleData {
  id: string;
  url: string;
  box_count: number;
}

const Meme = ({ searchParams }: { searchParams: SingleData }) => {
  // State to store text inputs dynamically
  const [texts, setTexts] = useState<string[]>(Array(searchParams.box_count).fill(""));

  const [submit, setSubmit] = useState("Generate Your Meme");
  const [memeUrl, setMemeUrl] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    // Update the specific input field
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  const memeForm = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmit("Loading...");

    // Dynamically build text params based on box_count
    const textParams = texts
      .map((text, index) => (text ? `&text${index}=${text}` : ""))
      .join("");

    const response = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=M.Subhan&password=subhanformeme${textParams}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (data.success) {
      setMemeUrl(data.data.url);
    } else {
      alert("Error generating meme");
      setMemeUrl(null);
    }
    setSubmit("Generate Your Meme");
  };

  const handleEdit = () => {
    // Clear text inputs for editing
    setTexts(Array(searchParams.box_count).fill(""));
    setMemeUrl(null); // Reset the meme preview
  };

  const handleShare = () => {
    if (memeUrl) {
      navigator.clipboard.writeText(memeUrl);
      alert("Meme URL copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 to-purple-200 p-6">
      <div className="mb-6">
        <Image
          src={searchParams.url}
          alt="Meme Template"
          width={400}
          height={200}
          className="rounded-lg shadow-lg"
          unoptimized
        />
      </div>
      <form
        onSubmit={memeForm}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        {Array.from({ length: searchParams.box_count }).map((_, index) => (
          <input
            key={index}
            type="text"
            value={texts[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Enter Text ${index + 1}`}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
          />
        ))}
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded-sm"
        >
          {submit}
        </button>
      </form>
      {memeUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center">Generated Meme:</h2>
          <div className="flex justify-evenly">
            {[...Array(12)].map((_, index) => (
              <Laugh key={index} className="text-red-600" size={36} />
            ))}
          </div>
          <Image
            src={memeUrl}
            alt="Generated Meme"
            width={400}
            height={200}
            className="rounded-lg shadow-lg mt-2"
          />
          <div className="mt-4 flex justify-between gap-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md"
            >
              <SquarePen size={32} />
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md"
            >
              <Share2 size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meme;

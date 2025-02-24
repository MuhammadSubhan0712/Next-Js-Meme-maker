"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Laugh, Share2, SquarePen, SquareArrowLeft } from "lucide-react";

interface SingleData {
  id: string;
  url: string;
  box_count: number;
}

const Meme = ({ searchParams }: { searchParams: SingleData }) => {
  // State to store text inputs dynamically
  const [texts, setTexts] = useState<string[]>(
    Array(searchParams.box_count).fill("")
  );

  const username = process.env.NEXT_PUBLIC_IMGFLIP_USERNAME;
  const password = process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD;

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
      `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=${username}&password=${password}${textParams}`,
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
    // Clear text inputs for editing and reset the meme preview
    setTexts(Array(searchParams.box_count).fill(""));
    setMemeUrl(null);
  };

  const handleShare = () => {
    if (memeUrl) {
      navigator.clipboard.writeText(memeUrl);
      alert("Meme URL copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 min-h-screen bg-gradient-to-r from-pink-200 to-purple-200">
      <Link href={{ pathname: "../creator" }}>
        <SquareArrowLeft
          className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 transform transition-transform duration-300 ease-in-out hover:scale-125"
          size={44}
        />
      </Link>
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
        Meme Generator
      </h1>
      <div className="mb-6 max-w-full md:max-w-lg">
        <Image
          src={searchParams.url}
          alt="Meme Template"
          width={500}
          height={300}
          className="rounded-lg border-4 border-gray-700 shadow-lg w-full h-auto"
          unoptimized
        />
      </div>
      <form
        onSubmit={memeForm}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-4 md:p-6 rounded-lg shadow-lg">
        {Array.from({ length: searchParams.box_count }).map((_, index) => (
          <input
            key={index}
            type="text"
            value={texts[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Enter Text ${index + 1}`}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition w-full"
          />
        ))}
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded-sm transition-all">
          {submit}
        </button>
      </form>
      {memeUrl && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold text-center">Generated Meme:</h2>
          <div className="flex justify-evenly my-4">
            {[...Array(11)].map((_, index) => (
              <Laugh key={index} className="text-red-600" size={36} />
            ))}
          </div>
          <Image
            src={memeUrl}
            alt="Generated Meme"
            width={500}
            height={300}
            className="rounded-lg border-4 border-gray-700 shadow-lg w-full h-auto"
          />
          <div className="mt-4 flex justify-between gap-4">
            <button
              onClick={handleEdit}
              aria-label="Edit Meme"
              className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md transition-all">
              <SquarePen size={32} />
            </button>
            <button
              onClick={handleShare}
              aria-label="Share Meme"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md transition-all">
              <Share2 size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meme;

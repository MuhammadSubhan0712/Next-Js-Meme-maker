"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Laugh, Share2, SquarePen } from "lucide-react";
interface singleData {
  id: string;
  url: string;
  box_count: number;
}

const Meme = ({ searchParams }: { searchParams: singleData }) => {
  // Dynamic references for the text inputs
  const textRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [submit, setSubmit] = useState("Generate Your Meme");
  const [memeUrl, setMemeUrl] = useState<string | null>(null);

  const memeForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSubmit("Loading...");

    // Dynamically build text params based on box_count
    const textParams = textRefs.current
      .map((ref, index) => (ref?.value ? `&text${index}=${ref.value}` : ""))
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
    // Logic to edit meme (perhaps clear input fields and allow new input)
    textRefs.current.forEach((ref) => {
      if (ref) ref.value = ""; // Clear text inputs for editing
    });
    setMemeUrl(null); // Reset the meme preview
  };

  const handleShare = () => {
    if (memeUrl) {
      navigator.clipboard.writeText(memeUrl);
      alert("Meme URL copied to clipboard!");
    }
  };

  return (
    <>
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
          className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {Array.from({ length: searchParams.box_count }).map((_, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Enter Text ${index + 1}`}
              ref={(e) => (textRefs.current[index] = e)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            />
          ))}
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 hover:bg-blue-900 text-white rounded-sm">
            {submit}
          </button>
        </form>
        {memeUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center">
              Generated Meme:
            </h2>
            <div className="flex justify-evenly">
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
              <Laugh className="text-red-600" size={36} />
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
                className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md">
                <SquarePen size={32} />
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                <Share2 size={32} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Meme;

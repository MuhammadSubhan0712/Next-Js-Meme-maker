"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface singleData {
  id: string;
  url: string;
  box_count: number;
}

const Meme = ({ searchParams }: { searchParams: singleData }) => {
  // Refs for text inputs (set dynamically)
  const textInputs = useRef<(HTMLInputElement | null)[]>([]);

  const [submit, setSubmit] = useState("Generate");
  const [memeUrl, setMemeUrl] = useState<string | null>(null);

  const memeForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Check if all inputs are filled
    const inputsFilled = textInputs.current.every((input) => input?.value);
    if (!inputsFilled) {
      alert("Please enter all the text fields");
      return;
    }

    setSubmit("Loading...");

    // Construct query parameters from inputs
    const queryParams = textInputs.current
      .map((input, id) => `&text${id}=${input?.value}`)
      .join("");

    // API request to generate the meme
    const response = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=M.Subhan&password=subhanformeme${queryParams}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (data.success) {
      setMemeUrl(data.data.url); // Corrected property to get the meme URL
    } else {
      alert("Failed to generate meme");
      setMemeUrl(null);
    }
    setSubmit("Generate");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Meme Display */}
        <div className="mb-6">
          <Image
            src={searchParams.url}
            alt="meme"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Form Section */}
        <form
          onSubmit={memeForm}
          className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {/* Dynamic Input Fields based on box_count */}
          {Array.from({ length: searchParams.box_count }, (_, id) => (
            <input
              key={id}
              type="text"
              placeholder={`Enter Text ${id + 1}`}
              ref={(item) => (textInputs.current[id] = item)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            />
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            {submit}
          </button>
        </form>

        {/* Generated Meme Display */}
        {memeUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center">
              Generated Meme:
            </h2>
            <Image
              src={memeUrl}
              alt="Generated meme"
              width={400}
              height={300}
              className="rounded-lg shadow-lg mt-2"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Meme;

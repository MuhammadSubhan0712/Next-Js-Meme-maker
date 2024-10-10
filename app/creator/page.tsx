import Image from "next/image";
import Link from "next/link";
import { SquareArrowLeft } from "lucide-react";
const Memers = async () => {
  const res = await fetch("https://api.imgflip.com/get_memes")
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log("Error ==>", err));

  interface Data {
    url: string;
    id: number;
    box_count: number;
  }
  console.log("Memes ==>", res.data);

  return (
    <>
      <div className="min-h-screen py-8 bg-gradient-to-r from-pink-200 to-purple-200">
        <Link href={{ pathname: "./page.tsx" }}>
          <SquareArrowLeft
            className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 transform transition-transform duration-300 ease-in-out hover:scale-125"
            size={44}
          />
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Hello Memers
          </h1>

          {/* Meme Cards */}
          <div className="p-5 flex flex-wrap justify-around gap-8">
            {res ? (
              res.memes.map((item: Data) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-col items-center bg-white p-4 shadow-md rounded-lg w-64">
                    {/* Image Display */}
                    <Image
                      className="rounded-sm w-56 h-56 object-cover border-2 border-gray-300"
                      src={item.url}
                      alt={`Meme ${item.id}`}
                      width={300}
                      height={300}
                    />

                    {/* Generate Button */}
                    <Link
                      href={{
                        pathname: "../generator",
                        query: {
                          url: item.url,
                          id: item.id,
                          box_count: item.box_count,
                        },
                      }}>
                      <button className="mt-5 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">
                        Generate Your Meme
                      </button>
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-xl text-gray-600 mt-3">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Memers;

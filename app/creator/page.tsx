
import Image from 'next/image';
import Link from 'next/link';

const Memes = async() => {

    const res = await fetch('https://api.imgflip.com/get_memes')
    .then((res) => res.json())
    .then((res) =>res.data.memes)
    .catch((error) => console.log("Error ==>" , error)
    )

  interface Meme {
    url: string;
    id: number;
    box_count: number;
  }
const generator = "../generator"
  return (
    <>
      <div className="bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen p-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-3xl tracking-wider animate-pulse">
            Meme Generator
          </h1>
        </div>
        <div className="memes-grid">
          {res ? res.memes.map((item: Meme) => (
              <div key={item.id} className="meme-item">
                {/* Render Next.js Image component */}
                <Image
                  src={item.url}
                  alt={`image`}
                  width={300}
                  height={300}
                  className="rounded-lg transform hover:rotate-3 hover:scale-110 transition-all duration-500 ease-in-out shadow-3xl"
                />
            <Link href={generator}>
            <button className='btn btn-secondary text-xl px-3 py-2 mt-2 text-center'  >
             Generate Your Meme
            </button>
            </Link>

              </div>
            
            ))
           : (
            <p className="text-white text-center text-2xl">Loading memes...</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .memes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          justify-items: center;
          align-items: center;
        }
        .meme-item {
          perspective: 1000px;
        }
        .shadow-3xl {
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
        }
        .drop-shadow-3xl {
          text-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
        }
        .bg-gradient-to-r {
          background: linear-gradient(135deg, #7e5bef 0%, #f06191 100%);
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Memes;

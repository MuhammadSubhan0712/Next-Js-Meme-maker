
import Image from 'next/image';

const Memes = async() => {
   
    const res = await fetch('https://api.imgflip.com/get_memes')
    .then(( res => res.json))
    .then((res => res.data.memes))
    console.log("Memes ==> " , );
    
  interface Meme {
    url: string;
    id: string;
    box_count: number;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-purple-700 to-pink-500 min-h-screen p-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-3xl tracking-wider animate-pulse">
            Meme Generator
          </h1>
        </div>
        <div className="memes-grid">
          {/* Conditional rendering if data is available */}
          {data.length > 0 ? (
            data.map((item: Meme, index: number) => (
              <div key={item.id} className="meme-item">
                {/* Render Next.js Image component */}
                <Image
                  src={item.url}
                  alt={`Meme ${index}`}
                  width={300}
                  height={300}
                  className="rounded-lg transform hover:rotate-3 hover:scale-110 transition-all duration-500 ease-in-out shadow-3xl"
                />
              </div>
            ))
          ) : (
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

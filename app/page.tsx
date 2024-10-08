"use client";
import Link from "next/link";
const App = () => {
  return (
    <>
      <div className="bg">
        <div className="text-center">
          <p className="text-5xl outline-8 outline-black font-extrabold text-white drop-shadow-lg mb-12 tracking-wider animate-bounce">
            Let's Have Some Fun!
          </p>

          <Link href={{ pathname: "./creator" }}>
            <button className="btn-3d text-xl transition-transform transform hover:scale-110 duration-300 ease-in-out text-white bg-gradient-to-l from-teal-700 to-indigo-700 px-8 py-4 rounded-full shadow-lg hover:shadow-2xl">
              Click Me
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .btn-3d {
          perspective: 1000px;
          position: relative;
          transform-style: preserve-3d;
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-3d:hover {
          transform: rotateX(15deg) rotateY(10deg) scale(1.1);
          box-shadow: 0 25px 35px rgba(0, 0, 0, 0.4);
        }

        .bg {
          background: linear-gradient(
            135deg,
            rgba(36, 198, 220, 1) 0%,
            rgba(81, 74, 157, 1) 100%
          );
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .text-white {
          text-shadow: 3px 6px 4px rgba(0, 0, 0, 0.6);
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

export default App;

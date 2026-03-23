import React, { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import { getImageURL } from "../services/api";

const HeroSection = () => {
  const { trendingMovies, loading } = useMovies();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featureMovies = trendingMovies.slice(0, 5);

  // ✅ FIX: move this up before using it
  const currentMovies = featureMovies[currentSlide];

  useEffect(() => {
    if (loading || featureMovies.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % featureMovies.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [loading, featureMovies.length]);

  if (loading || featureMovies.length === 0 || !currentMovies) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-neutral-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-neutral-400">កំពុងបើកភាពយន្ត ...</p>
        </div>
      </div>
    );
  }

  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Movies Backdrop */}
      <div
        className={`absolute inset-0 bg-no-repeat bg-center bg-cover md:bg-cover bg-neutral-900 transition-all
        duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage: currentMovies?.backdrop_path
            ? `url(${getImageURL(currentMovies.backdrop_path)})`
            : "none",
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-linear-to-r from-neutral-900 via-neutral-900/70
        to-neutral-900/20"
        />
        <div className="absolute inset-0 bg-linear-to-r from-neutral-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center z-10 container mx-auto px-4">
        <div className="p-10 max-w-3xl">
          {/* Movies info */}
          <div
            className={`transition-all duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span
                className="bg-purple-500/90 text-white text-xs font-semibold px-2
               py-1 rounded-sm"
              >
                លក្ខណ:ពិសេស
              </span>

              {currentMovies.vote_average > 0 && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  <span>{formatRating(currentMovies.vote_average)}</span>
                </div>
              )}

              <span className="text-neutral-400">.</span>
              <span className="text-neutral-400 text-sm">
                {currentMovies.release_date?.substring(0, 4) || "N/A"}
              </span>

              {currentMovies.adult && (
                <>
                  <span className="text-neutral-400">.</span>
                  <span className="text-neutral-300 bg-neutral-700 text-xs px-11.5 py-0.5">
                    18+
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentMovies.title}
            </h1>

            <p
              className="text-neutral-300 text-base md:text-lg mb-8 line-clamp-3
            md:line-clamp-4 max-w-2xl"
            >
              {currentMovies.overview}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3
              rounded-lg font-medium flex items-center gap-2 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4.445-7.168A1 1 0 007 12h1v-2a1 1 0 10-2 0v.832l-.445-.445a1 1 0 00-1.414 1.414l2.121 2.121a1 1 0 001.414 0l2.121-2.121a1 1 0 00-1.414-1.414L8 10.832V12h1a1 1 0 100-2H7a1 1 0 00-1 1v.832z"
                  />{" "}
                </svg>
                មេីលឥឡូវនេះ
              </button>
              <button
                className="bg-neutral-800/80 hover:bg-neutral-700/80 text-white px-6
              py-3 rounded-lg flex items-center gap-2 transition-all border border-neutral-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                បន្ថែមក្នុងបញ្ជីតាមដាន
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
        {featureMovies.map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-8 bg-purple-500"
                  : "w-4 bg-neutral-600/50"
              }`}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;

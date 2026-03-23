/* eslint-disable no-unused-vars */
import { Subscript } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { getImageURL } from "../services/api";
import { useMovies } from "../context/MovieContext";

const MovieSlider = ({ title, movies, subtitle = "" }) => {
  const sliderRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const { openMoviesDetails } = useMovies() || {};

  const scroll = (direction) => {
    if (isScrolling) return;
    setIsScrolling(true);
    const { current } = sliderRef;
    const scrollAmount =
      direction === "left"
        ? -current.clientWidth * 0.75
        : current.clientWidth * 0.75;
    current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  const handleMovieClick = (movieId) => {
    openMoviesDetails(movieId);
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="py-12" id="">
      <div className="container mx-auto px-4">
        <div className="flex items-baseline justify-between mb-8">
          <div className="text-2xl md:text-3xl font-bold text-white">
            <h2>{title}</h2>
            {/* Conditional Rendering */}
            {subtitle && (
              <p className="text-neutral-400 text-sm mt-3">{subtitle}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white
                            transition-all"
              aria-label="Scroll left"
              onClick={() => scroll("left")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white
                            transition-all"
              aria-label="Scroll right"
              onClick={() => scroll("right")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Movie Slider */}
        <div className="relative">
          <div
            className="flex space-x-4 overflow-x-hidden scrollbar-hide pb-4 snap-x"
            ref={sliderRef}
            style={{ scrollBehavior: "none", msOverflowStyle: "none" }}
          >
            {/* Conditional Rendering */}
            {movies.map((movie) => {
              return (
                <div
                  className="min-w-[200px] md:min-w-[240px] snap-start relative group cursor-pointer"
                  key={movie.id}
                  onMouseEnter={() => setHoveredMovieId(movie.id)}
                  onMouseLeave={() => setHoveredMovieId(null)}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className="rounded-lg overflow-hidden bg-neutral-800">
                    <div className="relative aspect-2/3">
                      <img
                        src={getImageURL(movie.poster_path, "w500")}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-all duration-300
                                  group-hover:scale-110 group-hover:opacity-35"
                      />

                      {/* Hover Overlay */}
                      <div
                        className={`absolute inset-0 bg-linear-to-t from-neutral-900/90
                                    via-neutral-900/40 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100
                                    transition-all duration-300`}
                      >
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-yellow-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-yellow-400 text-sm font-medium">
                                {formatRating(movie.vote_average)}
                              </span>
                            </div>
                            <span className="text-neutral-400 text-sm">
                              {movie.release_date?.substring(0, 4) || "N/A"}
                            </span>
                          </div>
                          <button
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white
                                          py-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8  8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                                   1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              />
                            </svg>
                            មើលព័ត៏មានលម្អិត
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Movie Info */}
                  <div className="mt-3">
                    <h3 className="text-white text-sm font-medium truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c-.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.811l-2.8 2.034a1 1 0 000 1.64l2.8 2.034c.783.57.38 1.811-.588 1.811h-3.462a1 1 0 00-.95.69l-1.07 3.292c-.3.921-1.603.921-1.902 0l-1.07-3.292a1 1 0 00-.95-.69H3.637c-.969 0-1.371-1.24-.588-1.811l2.8-2.034a1 1 0 000-1.64l-2.8-2.034c-.783-.57-.38-1.811.588-1.811h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-neutral-400 text-xs">
                          {formatRating(movie.vote_average)}
                        </span>
                      </div>
                      <span className="text-neutral-500 text-xs">
                        {movie.release_date?.substring(0, 4) || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieSlider;

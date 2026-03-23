import React from "react";
import HeroSection from "./HeroSection";
import MovieSlider from "./MovieSlider";
import GenreSection from "./GenreSection";
import Movie_Details from "./Movie_Details";
import { useMovies } from "../context/MovieContext";

const MovieContext = () => {
  const {
    trendingMovies,
    popularMovies,
    topRatedMovies,
    selectMovieId,
    closeMoviesDetails,
    error,
  } = useMovies();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M6.938 4h10.124c1.54 0 2.502 1.667 1.732 3L13.732 19c-.77 1.333-2.694 1.333-3.464 0L5.206 7c-.77-1.333.192-3 1.732-3z"
            />
          </svg>

          <h2 className="text-2xl font-bold mt-4">Error Loading Movies</h2>

          <p className="mt-2 text-neutral-400">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection />
      <div className="bg-linear-to-b from-neutral-900 to-neutral-950">
        <MovieSlider
          title="រឿងក្នុងសប្តាហ៍នេះ"
          subtitle="បន្តធ្វើបច្ចុប្បន្នភាពជាមួយនឹងអ្វីដែលអ្នកគ្រប់គ្នាកំពុងមើល"
          movies={trendingMovies}
          id="trending"
        />
        <MovieSlider
          title="ភាពយន្តពេញនិយម"
          subtitle="ភាពយន្ត​ដែល​បាន​មើល​ច្រើន​បំផុត​នៅ​ពេល​នេះ"
          movies={popularMovies}
          id="popular"
        />
        <GenreSection />
        <MovieSlider
          title="ភាពយន្តដែលវាយតម្លៃខ្ពស់"
          subtitle="ភាពយន្តដែលវាយតម្លៃខ្ពស់បំផុតគ្រប់ពេលវេលា"
          movies={topRatedMovies}
          id="top-rated"
        />
      </div>
      {/* Conditonal Rendering */}
      {selectMovieId && (
        <Movie_Details movieId={selectMovieId} onClose={closeMoviesDetails} />
      )}
    </div>
  );
};

export default MovieContext;

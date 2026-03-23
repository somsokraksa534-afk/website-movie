import React, { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import  { useRef } from "react";
import { fetchMoviesByGenre, getImageURL } from "../services/api";

const GenreSection = () => {
  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;
  
  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const { genres, loading, openMoviesDetails } = useMovies();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loadingGenreMovies, setLoadingGenreMovies] = useState(false);

  useEffect(() => {
    if (!loading && genres.length > 0) {
      setSelectedGenre(genres[0]);
    }
  }, [loading, genres]);

  useEffect(() => {
    const loadGenreMovies = async () => {
      if (!selectedGenre) return;

      setLoadingGenreMovies(true);

      const movies = await fetchMoviesByGenre(selectedGenre.id); // ✅ FIX

      setGenreMovies(movies.slice(0, 8));
      setLoadingGenreMovies(false);
    };

    loadGenreMovies();
  }, [selectedGenre]);

  if (loading || !selectedGenre) {
    return (
      <section className="py-12 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  const formatRating = (rating) => {
    return (Math.round(rating * 10) / 10).toFixed(1);
  };

  return (
    <section className="py-12 bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          រកមើលតាមប្រភេទ
        </h2>

        {/* Genre Tabs */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="mb-8 overflow-x-auto pb-2 scrollbar-hide cursor-grab"
        >
          <div className="flex space-x-2 w-max">
            {genres.slice(0, 10).map((gen) => (
              <button
                key={gen.id}
                onClick={() => setSelectedGenre(gen)}
                className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                  selectedGenre?.id === gen.id
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                {gen.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loadingGenreMovies ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          /* Movies Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {genreMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => openMoviesDetails(movie.id)}
                className="group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden bg-neutral-800">
                  <div className="aspect-[3/4]">
                    <img
                      src={getImageURL(movie.poster_path)}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-40"
                    />

                    {/* Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-400 flex items-center gap-1">
                          ⭐ {formatRating(movie.vote_average)}
                        </span>
                        <span className="text-neutral-300">
                          {movie.release_date?.substring(0, 4)}
                        </span>
                      </div>

                      <button className="mt-2 bg-purple-600 text-white py-2 rounded-md text-sm">
                        ▶️ មើលលម្អិត
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-2">
                  <h3 className="text-white text-sm truncate">{movie.title}</h3>
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
                      {movie.release_date?.substring(0, 4)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GenreSection;

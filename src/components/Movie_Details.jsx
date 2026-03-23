import React, { useEffect, useState } from "react";
import { fetchMovieDetails, getImageURL } from "../services/api";

const Movie_Details = ({ movieID, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMoviesDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const moviesData = await fetchMovieDetails(movieID);
        setMovie(moviesData);
      } catch (err) {
        console.error("Failed to load movie details, please try again.", err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    if (movieID) {
      getMoviesDetails();
    }
  }, [movieID]);

  if (!movieID) return null;

  const formatRunTime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatRating = (rating) => {
    return rating ? (Math.round(rating * 10) / 10).toFixed(1) : "N/A";
  };

  const formatRevenue = (revenue) => {
    if (!revenue) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(revenue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/90 backdrop-blur-sm">
      {/* MODAL BOX */}
      <div className="relative w-full max-w-5xl bg-neutral-800 rounded-xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* CLOSE BUTTON (STICKY) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
        >
          ✕
        </button>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-96 text-center">
              <div>
                <h2 className="text-xl font-bold text-white">
                  បរាជ័យក្នុងការផ្ទុកព័ត៌មានលម្អិតភាពយន្ត
                </h2>
                <p className="mt-2 text-neutral-400">{error}</p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
                >
                  បិទ
                </button>
              </div>
            </div>
          ) : movie ? (
            <>
              {/* BACKDROP */}
              <div className="relative h-72 md:h-96 w-full">
                {movie.backdrop_path ? (
                  <img
                    src={getImageURL(movie.backdrop_path)}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700"></div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
              </div>

              <div className="p-6 md:p-8">
                <div className="md:flex gap-8 -mt-32 md:-mt-48 relative">
                  {/* POSTER */}
                  <div className="w-32 md:w-64 shrink-0 mb-4 md:mb-0">
                    <div className="rounded-lg overflow-hidden shadow-lg border border-neutral-700">
                      {movie.poster_path ? (
                        <img
                          src={getImageURL(movie.poster_path, "w500")}
                          alt={movie.title}
                          className="w-full h-auto"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-neutral-700 flex items-center justify-center">
                          <span className="text-neutral-500">
                            មិនមានផ្ទាំងរូបភាពទេ
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold">
                      {movie.title}
                      {movie.release_date && (
                        <span className="text-neutral-400 ml-2">
                          ({movie.release_date.substring(0, 4)})
                        </span>
                      )}
                    </h1>

                    {/* META */}
                    <div className="flex flex-wrap gap-3 mt-3 text-sm items-center">
                      {movie.vote_average > 0 && (
                        <span>⭐ {formatRating(movie.vote_average)}</span>
                      )}
                      {movie.runtime > 0 && (
                        <span>{formatRunTime(movie.runtime)}</span>
                      )}
                      {movie.release_date && <span>{movie.release_date}</span>}
                    </div>

                    {/* OVERVIEW */}
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold mb-2">
                        ទិដ្ឋភាពទូទៅ
                      </h2>
                      <p className="text-neutral-300">
                        {movie.overview || "No overview available"}
                      </p>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-6 flex gap-3">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                        <a
                          href={`https://www.imdb.com/title/${movie.imdb_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4.445-7.168A1 1 0 007 12h1v-2a1 1 0 10-2 0v.832l-.445-.445a1 1 0 00-1.414 1.414l2.121 2.121a1 1 0 001.414 0l2.121-2.121a1 1 0 00-1.414-1.414L8 10.832V12h1a1 1 0 100-2H7a1 1 0 00-1 1v.832z"
                            />
                          </svg>
                          មេីលឥឡូវនេះ
                        </a>
                      </button>
                      <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        បន្ថែមទៅបញ្ជីមើល
                      </button>
                    </div>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="mt-10 grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      ព័ត៌មានលម្អិត
                    </h2>
                    <div className="space-y-3 text-sm text-neutral-300">
                      {movie.production_companies &&
                        movie.production_companies.length > 0 && (
                          <div className="text-neutral-400 text-sm mb-1">
                            <h3 className="text-neutral-400 text-sm mb-1">
                              ក្រុមហ៊ុនផលិតកម្ម
                            </h3>
                            <p className="text-white">
                              {movie.production_companies
                                ?.map((company) => company.name)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      {movie.production_countries &&
                        movie.production_countries.length > 0 && (
                          <div className="text-neutral-400 text-sm mb-1">
                            <h3 className="text-neutral-400 text-sm mb-1">
                              ប្រទេសផលិតកម្ម
                            </h3>
                            <p className="text-white">
                              {movie.production_countries
                                ?.map((countries) => countries.name)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      {movie.spoken_languages &&
                        movie.spoken_languages.length > 0 && (
                          <div className="text-neutral-400 text-sm mb-1">
                            <h3 className="text-neutral-400 text-sm mb-1">
                              ភាសា
                            </h3>
                            <p className="text-white">
                              {movie.spoken_languages
                                ?.map((languages) => languages.english_name)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      {movie.budget > 0 && (
                        <p>ថវិកា: {formatRevenue(movie.budget)}</p>
                      )}
                      {movie.revenue > 0 && (
                        <p>ចំណូល: {formatRevenue(movie.revenue)}</p>
                      )}
                      {movie.status && <p>ស្ថានភាព: {movie.status}</p>}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">ការវាយតម្លៃ</h2>
                    {movie.vote_average > 0 ? (
                      <div className="flex items-center">
                        <div className="w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center mr-4">
                          <span className="text-3xl font-bold">
                            {formatRating(movie.vote_average)}
                          </span>
                        </div>

                        <div>
                          <p className="text-neutral-300">
                            From {movie.vote_count.toLocaleString()} votes
                          </p>

                          <div className="w-full bg-neutral-700 rounded-full h-2.5 mt-2">
                            <div
                              className="bg-purple-600 h-2.5 rounded-full"
                              style={{
                                width: `${(movie.vote_average / 10) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-neutral-400">មិនមានការវាយតម្លៃទេ។</p>
                    )}
                    <div className="mt-6 space-y-3">
                      {movie.homepage && (
                        <a
                          href={movie.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded transition-all"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-5 w-5 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m0 0a9 9 0 01-9-9m9 9c2.5-2.5 4-6.5 4-9s-1.5-6.5-4-9m0 18c-2.5-2.5-4-6.5-4-9s1.5-6.5 4-9m9 9H3"
                            />
                          </svg>
                          គេហទំព័រផ្លូវការ
                        </a>
                      )}

                      {movie.imdb_id && (
                        <a
                          href={`https://www.imdb.com/title/${movie.imdb_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2.5 inline-flex items-center px-4 py-2 rounded transition-colors bg-yellow-700 hover:text-yellow-200 text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5 mr-2"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path d="M3 12h18" />
                            <path d="M12 3c3 3 3 15 0 18" />
                            <path d="M12 3c-3 3-3 15 0 18" />
                          </svg>
                          មើលនៅលើគេហទំព័រ
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Movie_Details;

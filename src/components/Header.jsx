import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { getImageURL, searchMovies } from "../services/api";

const Header = () => {
  const { openMoviesDetails } = useMovies();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const result = await searchMovies(searchQuery);
          setSearchResult(result ? result.slice(0, 5) : []);
        } catch (error) {
          console.log("Error Searching Movies : ", error);
        } finally {
          setIsSearching(false);
          setShowSearchResult(true);
        }
      } else {
        setSearchResult([]);
        setShowSearchResult(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 2 && searchResult.length > 0) {
      setShowSearchResult(true);
    }
  };

  const handleClickOutSide = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target) 
    ) {
      setShowSearchResult(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleMovieSelect = (movieId) => {
    openMoviesDetails(movieId);
    setShowSearchResult(false);
    setSearchQuery("");
  };

  return (
    <header
      className={`flex w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-evenly">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-purple-500 font-bold font-Poppins text-3xl">
                Raksa <span className="text-white">Cinema</span>
              </span>
            </a>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-purple-400">
              ទំព័រដើម
            </Link>
            <Link to="/about" className="text-white hover:text-purple-400">
              អំពីយើង
            </Link>
            <Link to="/contact" className="text-white hover:text-purple-400">
              ទំនាក់ទំនង
            </Link>
          </nav>
          {/* Desktop Search */}
          <div
            className="md:block hidden relative search-container"
            ref={searchContainerRef}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="ស្វែងរករឿង ..."
                className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              {/* Conditional Rendering */}
              {isSearching ? (
                <div className="absolute top-2 right-3">
                  <svg
                    className="w-4 h-4 absolute right-3 text-neutral-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 absolute right-6 top-2 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>

            {/* Search Results */}
            {showSearchResult && searchResult.length > 0 && (
              <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg">
                {searchResult.map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleMovieSelect(movie.id)}
                    className="flex p-3 w-full hover:bg-neutral-700"
                  >
                    {movie.poster_path ? (
                      <img
                        src={getImageURL(movie.poster_path)}
                        className="w-10 h-10 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center text-xs">
                        គ្មានរូបភាព
                      </div>
                    )}

                    <div className="ml-3">
                      <p>{movie.title}</p>
                      <p className="text-xs">
                        {movie.release_date?.split("-")[0] || "N/A"}
                        {/* ✅ FIX */}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {/* Conditional Rendering */}
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile Navigation Conditional Rendering */}
        {isMobileMenuOpen && (
          <div className="mt-4 pb-4 space-y-4 md:hidden">
            <Link
              to="/"
              className="block text-white hover:text-purple-400 transition-all font-medium font-KantumruyPro"
            >
              ទំព័រដើម
            </Link>
            <Link
              to="/about"
              className="block text-white hover:text-purple-400 transition-all font-medium font-KantumruyPro"
            >
              អំពីយើង
            </Link>
            <Link
              to="/contact"
              className="block text-white hover:text-purple-400 transition-all font-medium font-KantumruyPro"
            >
              ទំនាក់ទំនង
            </Link>
            <div
              className="relative mt-3 search-container"
              ref={searchContainerRef}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="ស្វែងរករឿង ...."
                className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              {/* Condtional Rendering */}
              {isSearching ? (
                <div className="absolute right-3 top-2">
                  <svg
                    className="w-4 h-4 text-neutral-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {/* Else */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 absolute right-3 top-2 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 absolute right-3 top-2 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              {/* Mobile Search Result Conditional Rendering */}
              {showSearchResult && searchResult && searchResult.length > 0 && (
                <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <ul className="divide-y divide-neutral-700">
                    {/* Map method */}
                    {searchResult.map((movie) => {
                      return (
                        <li className="hover:bg-neutral-700">
                          <button
                            onClick={() => handleMovieSelect(movie.id)}
                            className="flex items-center p-3 w-full text-left"
                          >
                            <div className="w-10 h-14 bg-neutral-700 rounded-full overflow-hidden shrink-0">
                              {/* Conditional Rendering */}
                              {movie.poster_path ? (
                                <img
                                  src={getImageURL(movie.poster_path, "w92")}
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                  គ្មានរូបភាព
                                </div>
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-white truncate">
                                {movie.title}
                              </p>
                              <p className="text-xs text-neutral-400">
                                {movie.release_date?.split("-")[0] || "N/A"}
                              </p>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {/* Conditional Rendering */}
              {showSearchResult &&
                searchQuery.trim().length > 2 &&
                (!searchResult || searchResult.length === 0) &&
                !isSearching && (
                  <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-4 text-center text-neutral-400 text-sm">
                      មិនមានភាពយន្តដែលត្រូវស្វែងរក ...
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

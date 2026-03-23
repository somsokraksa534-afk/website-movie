import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchGenres,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
} from "../services/api";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Footer from "../components/Footer";

const MoviesContext = createContext();
export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectMovieId, setSelectMovieId] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // setLoading(true);
        const [trending, popular, topRated, genrelist] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchGenres(),
        ]);

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setTopRatedMovie(topRated);
        setGenres(genrelist);
      } catch (err) {
        console.log("Error Fetching movie data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, []);

  const openMoviesDetails = (movieId) => {
    setSelectMovieId(movieId);
    document.body.style.overflow = "hidden";
  };

  const closeMoviesDetails = () => {
    setSelectMovieId(null);
    document.body.style.overflow = "";
  };

  return (
    <MoviesContext
      value={{
        trendingMovies,
        popularMovies,
        topRatedMovies,
        genres,
        loading,
        error,
        selectMovieId,
        openMoviesDetails,
        closeMoviesDetails,
        About,
        Contact,
        Footer
      }}
    >
      {children}
    </MoviesContext>
  );
};

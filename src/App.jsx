import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import MovieContext from "./components/MovieContext";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { MoviesProvider, useMovies } from "./context/MovieContext";
import Movie_Details from "./components/Movie_Details";

const AppContent = () => {
  const { selectMovieId, closeMoviesDetails } = useMovies();

  return (
    <div className="min-h-screen text-white">
      <Header />

      <main>
        <MovieContext />
        <Outlet />
        {/* ✅ Modal works now */}
        {selectMovieId && (
          <Movie_Details movieID={selectMovieId} onClose={closeMoviesDetails} />
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

const App = () => {
  return (
    <MoviesProvider>
      <AppContent />
    </MoviesProvider>
  );
};

export default App;

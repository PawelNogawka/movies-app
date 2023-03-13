import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from './hooks/useAuthContext'

import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import Signup from "./pages/signup/Signup";
import Login from './pages/login/Login'
import Navbar from "./components/Navbar";
import FavouriteMovies from './pages/favouriteMovies/FavouriteMovies'


function App() {

  const {user} = useAuthContext()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList path="movie/now_playing" title="now playing movies" />} />
         <Route path="/movies/popular" element={<MovieList path="movie/popular" title="popular movies" />} />
         <Route path="/movies/top_rated" element={<MovieList path="movie/top_rated" title="top rated movies" />} />
         <Route path="/movies/upcoming" element={<MovieList path="movie/upcoming" title="upcoming movies" />} />
         <Route path="/movies/favourites" element={!user ? <Navigate to='/' /> : <FavouriteMovies title="favourite movies" />}/>
         <Route path="/movies/search/:searchTerm" element={<MovieList path="search/movie" search/>} />
         <Route path="/movie/:id" element={<MovieDetails/>} />
         <Route path="/signup" element={user ? <Navigate to='/' /> : <Signup />} />
         <Route path="/signin" element={user ? <Navigate to='/' /> : <Login />}/>

      </Routes>
    </>
  );
}

export default App;

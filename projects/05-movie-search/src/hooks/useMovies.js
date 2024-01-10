import { useState } from "react";
import withoutResults from "../mocks/no-results.json";
// https://www.omdbapi.com/?apikey=4287ad07&s=${movie}

export function useMovies({search}) {
  const [responseMovies, setResponseMovies] = useState([]);
  const movies = responseMovies.Search;

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    type: movie.Type,
    year: movie.Year,
    poster: movie.Poster,
  }));

  const getMovies = ()=>{
    if(search){
      fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${search}`)
      .then((response) => response.json())
      .then((data) => setResponseMovies(data))
    } else{
      setResponseMovies(withoutResults)
    }
  }

  return { movies: mappedMovies, getMovies };
}

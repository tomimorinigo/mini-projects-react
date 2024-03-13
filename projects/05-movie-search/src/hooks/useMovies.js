import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";
// https://www.omdbapi.com/?apikey=4287ad07&s=${movie}

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const previousSearch = useRef(search);

  const getMovies = useCallback( 
    async ({search}) => {
      if (search === previousSearch.current) return;
      try {
        setLoading(true);
        previousSearch.current = search;
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? movies.sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovies, loading };
}

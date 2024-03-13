import "./App.css";
import { Movies } from "./components/Movies.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useSearch } from "./hooks/useSearch.js";
import { useState, useCallback } from "react";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({search, sort});

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({search})
  };

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search});
    }, 300)
  , []
  );

  const handleChange = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(" ")) return;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  }

  return (
    <div className="page">
      <header>
        <h1>Movie Search Engine</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="Movie name"
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  );
}

export default App;

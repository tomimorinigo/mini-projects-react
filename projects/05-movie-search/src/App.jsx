import "./App.css";
import { Movies } from "./components/Movies.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useSearch } from "./hooks/useSearch.js";

function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({search});

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies()
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(" ")) return;
    updateSearch(newSearch);
  };

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
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
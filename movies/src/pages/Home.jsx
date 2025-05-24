import '../css/Home.css';
import { MovieCard } from '../components/MovieCard';
import { useState, useEffect, useReducer } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';

// useReducer para manejar searchQuery
function searchQueryReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return action.payload;
    default:
      return state;
  }
}

export function Home() {
  const [searchQuery, dispatchSearchQuery] = useReducer(searchQueryReducer, '');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError('Failed to load movies...');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery) return;

    setLoading(true);

    if (loading) return;

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError('Failed to search movies...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) =>
            dispatchSearchQuery({ type: 'SET_QUERY', payload: e.target.value })
          }
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error ?? <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

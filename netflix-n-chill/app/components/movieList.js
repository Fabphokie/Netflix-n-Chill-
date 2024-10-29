// MovieList.jsx
import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from react-spinners

const MovieList = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/id/10716');
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#FFFFFF" size={50} /> {/* Show loading spinner */}
      </div>
    );
  }

  if (!movie) {
    return <p className="text-center text-white">Movie details could not be retrieved.</p>;
  }

  // Ensure properties exist and access them safely
  const seasons = Array.isArray(movie.seasons) ? movie.seasons.length : 0; // Adjust if seasons is an array
  const genres = Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'; // Adjust if genres is an array

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <img
          className="w-full h-auto rounded-md"
          src={movie.image}
          alt={`${movie.title} poster`}
        />
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
          <p className="text-gray-300 mt-2">Seasons: {seasons}</p>
          <p className="text-gray-300">Last Updated: {movie.updated}</p>
          <p className="text-gray-300">Genres: {genres}</p>
          <p className="text-gray-400 mt-2">
            {showFullDescription ? movie.description : `${movie.description.slice(0, 100)}...`}
          </p>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-4 text-blue-500 hover:underline"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;

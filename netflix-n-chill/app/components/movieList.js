// MovieList.jsx
import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from react-spinners
import { useRouter } from 'next/router'; // Import useRouter for navigation

const MovieList = () => {
  const [movies, setMovies] = useState([]); // Initialize with an array for multiple movies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track any fetch errors
  const [showFullDescription, setShowFullDescription] = useState(null); // Track which movie's description to show
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows'); // Ensure this endpoint returns a list of movies
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovies(data); // Assuming data is an array of movies
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchMovies();
  }, []);

  const handleSelectShow = async (showId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`); // Fetch detailed show data
      if (!response.ok) {
        throw new Error('Failed to fetch detailed show data');
      }
      const data = await response.json();
      router.push({
        pathname: '/MoviePreview', // Navigate to MoviePreview page
        query: { showId: showId, data: JSON.stringify(data) }, // Pass showId and data as query parameters
      });
    } catch (error) {
      console.error('Error fetching detailed show data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#FFFFFF" size={50} /> {/* Show loading spinner */}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Display error message
  }

  if (!movies.length) {
    return <p className="text-center text-white">No movies available.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {movies.map((movie, index) => (
        <div key={movie.id} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mb-4">
          <img
            className="w-full h-auto rounded-md"
            src={movie.image || '/path/to/fallback-image.jpg'} // Fallback image
            alt={`${movie.title} poster`}
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
            <p className="text-gray-300 mt-2">Seasons: {Array.isArray(movie.seasons) ? movie.seasons.length : 0}</p>
            <p className="text-gray-300">Last Updated: {new Date(movie.updated).toLocaleDateString()}</p>
            <p className="text-gray-300">Genres: {Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}</p>
            <p className="text-gray-400 mt-2">
              {showFullDescription === index ? movie.description : `${movie.description.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => setShowFullDescription(showFullDescription === index ? null : index)}
              className="mt-4 text-blue-500 hover:underline"
            >
              {showFullDescription === index ? 'Show less' : 'Show more'}
            </button>
            <button
              onClick={() => handleSelectShow(movie.id)} // Navigate to detailed show data on button click
              className="mt-4 text-blue-500 hover:underline"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;

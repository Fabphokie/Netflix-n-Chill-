'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import Image from 'next/image';

const MovieList = ({ searchQuery = '' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#FFFFFF" size={50} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!movies.length) {
    return <p className="text-center text-white">No movies available.</p>;
  }

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      {filteredMovies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mb-4"
        >
          <Image
            className="w-full h-auto rounded-md"
            src={movie.image || '/path/to/fallback-image.jpg'}
            alt={`${movie.title} poster`}
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
            <p className="text-gray-300 mt-2">
              Seasons: {Array.isArray(movie.seasons) ? movie.seasons.length : 0}
            </p>
            <p className="text-gray-300">
              Last Updated: {new Date(movie.updated).toLocaleDateString()}
            </p>
            <p className="text-gray-300">
              Genres:{' '}
              {Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}
            </p>
            <p className="text-gray-400 mt-2">
              {expandedDescriptions[movie.id]
                ? movie.description
                : `${movie.description.slice(0, 100)}...`}
            </p>
            <button
              onClick={() =>
                setExpandedDescriptions((prev) => ({
                  ...prev,
                  [movie.id]: !prev[movie.id],
                }))
              }
              className="mt-4 text-blue-500 hover:underline"
            >
              {expandedDescriptions[movie.id] ? 'Show less' : 'Show more'}
            </button>
            <button
              onClick={() => {
                // Store data in localStorage to avoid large query strings
                localStorage.setItem('selectedMovie', JSON.stringify(movie));
                router.push(`/MoviePreview?showId=${movie.id}`);
              }}
              className="mt-4 ml-4 text-blue-500 hover:underline"
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

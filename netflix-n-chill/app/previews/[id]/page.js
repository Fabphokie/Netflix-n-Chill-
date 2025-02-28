'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ProfilePreview() {
  const params = useParams();
  const profileId = params.id;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        if (!response.ok) throw new Error('Failed to fetch movie previews');
        const data = await response.json();
        setMovies(data.slice(0, 6)); // Show 6 movie previews
      } catch (error) {
        console.error('Error fetching movies:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col bg-black min-h-screen items-center text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Profile {profileId}</h1>
      <p className="text-lg mb-6">
        This is the preview page for Profile {profileId}.
      </p>

      {/* Back Button */}
      <Link href="/" passHref>
        <button className="bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200 mb-6">
          Back to Home
        </button>
      </Link>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center min-h-32">
          <ClipLoader color="#FFFFFF" size={40} />
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Movie Previews */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => {
                localStorage.setItem('selectedMovie', JSON.stringify(movie));
                router.push(`/MoviePreview?showId=${movie.id}`);
              }}
            >
              <img
                className="w-full h-48 object-cover rounded-md"
                src={movie.image || '/fallback-image.jpg'}
                alt={movie.title}
              />
              <h3 className="text-xl font-bold mt-2">{movie.title}</h3>
              <p className="text-gray-300">{movie.genres.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

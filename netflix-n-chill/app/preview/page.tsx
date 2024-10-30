// pages/previews.js
"use client";
import { useState } from 'react';
import Link from 'next/link';
import MovieList from '../components/MovieList'; 

export default function Previews() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center bg-black">
      <h1 className="text-white text-4xl mb-8">Movie Previews</h1>

      {/* Back to Profiles Link */}
      <Link href="/" passHref>
        <h1 className="text-blue-500 mt-4 cursor-pointer">Back to Profiles</h1>
      </Link>

      {/* Movie List Component */}
      <div className="w-full p-4">
        <MovieList searchQuery={searchQuery} />
      </div>
    </div>
  );
}

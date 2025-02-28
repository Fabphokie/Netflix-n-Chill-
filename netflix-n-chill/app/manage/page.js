'use client';

import Link from 'next/link';

export default function ManageProfiles() {
  return (
    <div className="flex flex-col bg-black min-h-screen items-center justify-center text-white">
      <h1 className="text-6xl mb-8">Manage Profiles</h1>

      <p className="text-lg mb-4">
        Here you can add, edit, or remove profiles.
      </p>

      <Link href="/" passHref>
        <button className="bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

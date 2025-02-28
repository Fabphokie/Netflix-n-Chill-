'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePreview() {
  const params = useParams();
  const profileId = params.id;

  return (
    <div className="flex flex-col bg-black min-h-screen items-center justify-center text-white">
      <h1 className="text-6xl mb-4">Profile {profileId}</h1>
      <p className="text-lg mb-6">
        This is the preview page for Profile {profileId}.
      </p>

      <Link href="/" passHref>
        <button className="bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

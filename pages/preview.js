

import Link from 'next/link';

export default function Previews() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-white text-4xl mb-8">Movie Previews</h1>
      {/* Add movie preview content here */}
      <Link href="/" passHref>
        <h1 className="text-blue-500 mt-4">Back to Profiles</h1>
      </Link>
    </div>
  );
}

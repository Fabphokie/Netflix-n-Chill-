'use client'; // Ensure this directive is present

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function ProfileCard({ profile }) {
  return (
    <Link href={`/preview`} passHref>
      <div
        className="cursor-pointer bg-black p-4 rounded-lg text-white flex flex-col items-center justify-center w-48 h-64" // Fixed dimensions for uniformity
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            window.location.href = `/previews/${profile.id}`;
          }
        }}
      >
        <Image
          src={profile.image || '/default-image.png'}
          alt={profile.name}
          width={150} 
          height={150} 
          className="rounded-full border-4 border-gray-200 mb-2" // Use mb-2 for spacing below the image
          onError={(e) => (e.currentTarget.src = '/default-image.png')}
        />
        <h3 className="text-center mt-2 text-xl font-semibold">{profile.name}</h3>
      </div>
    </Link>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

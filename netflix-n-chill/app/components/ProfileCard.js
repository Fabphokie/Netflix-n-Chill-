'use client'; // Ensure this directive is present

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function ProfileCard({ profile }) {
  return (
    <Link href={`/previews/${profile.id}`} passHref>
      <div
        className="cursor-pointer bg-black p-4 rounded-lg text-white flex flex-col items-center justify-center w-48 h-64 transition-transform transform hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-white" 
        role="button"
        tabIndex={0}
      >
        <Image
          src={profile.image || '/default-image.png'}
          alt={profile.name}
          width={150} 
          height={150} 
          className="mb-2" 
          onError={(e) => (e.currentTarget.src = '/default-image.png')}
        />
        <h3 className="text-center mt-2 text-xl font-normal transition-all duration-200 hover:font-semibold">{profile.name}</h3>
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

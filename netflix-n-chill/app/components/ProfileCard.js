'use client'; // Ensure this directive is present

import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link
import PropTypes from 'prop-types';

export default function ProfileCard({ profile }) {
  return (
    <Link href={`/preview`} passHref>
      <div
        className="cursor-pointer bg-black p-4 rounded-lg text-white"
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
          width={200}
          height={200}
          className="square-full border-4 border-gray-200"
          onError={(e) => e.currentTarget.src = '/default-image.png'}
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

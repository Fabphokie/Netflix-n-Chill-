// pages/index.js
'use client';

import ProfileCard from '../app/components/ProfileCard';

export default function Home() {
  const profiles = [
    { name: 'Profile 1', image: '/Darling.jpg' },
    { name: 'Profile 2', image: '/Mmaphokeng.jpg' },
    { name: 'Profile 3', image: '/smile.jpg' },
    { name: 'Profile 4', image: '/kids.jpg' },
  ];

  return (
    <div bg-black >
      {profiles.map(profile => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>

  );
}

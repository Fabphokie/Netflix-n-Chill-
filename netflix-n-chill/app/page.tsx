// pages/index.js
'use client';

import ProfileCard from '../app/components/ProfileCard';

export default function Home() {
  const profiles = [
    { id: '1', name: 'Profile 1', image: '/Darling.jpg' },
    { id: '2', name: 'Profile 2', image: '/Mmaphokeng.jpg' },
    { id: '3', name: 'Profile 3', image: '/kids.jpg' },
    { id: '4', name: 'Profile 4', image: '/kids.jpg' },
  ];

  return (
    <div className="flex bg-black min-h-screen items-center justify-center">
      <div className="flex space-x-4">
        {profiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}

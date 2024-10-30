// pages/index.js
'use client';

import ProfileCard from '../app/components/ProfileCard';

export default function Home() {
  const profiles = [
    { id: '1', name: 'Profile 1', image: '/Darling.jpg' },
    { id: '2', name: 'Profile 2', image: '/Mmaphokeng.jpg' },
    { id: '3', name: 'Profile 3', image: '/Darling.jpg' },
    { id: '4', name: 'Profile 4', image: '/Mmaphokeng.jpg' },
  ];

  return (
    <div className="flex flex-col bg-black min-h-screen items-center justify-center text-white">
      <h1 className="text-6xl mb-8">Who's watching?</h1>
      
      <div className="flex space-x-4">
        {profiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}

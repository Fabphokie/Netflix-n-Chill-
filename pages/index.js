

import ProfileCard from '../components/ProfileCard';

export default function Home() {
  const profiles = [
    { name: 'Profile 1', image: '/Darling.jpg' },
    { name: 'Profile 2', image: '/kids.jpg' },
    { name: 'Profile 3', image: '/Mmaphokeng.jpg' },
    { name: 'Profile 4', image: '/smile.jpg' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-white text-4xl mb-8">Who's watching?</h1>
      <div className="grid grid-cols-2 gap-8">
        {profiles.map((profile) => (
          <ProfileCard key={profile.name} profile={profile} />
        ))}
      </div>
    </div>
  );
}

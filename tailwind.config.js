// tailwind.config.js

module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          netflixRed: '#e50914',
          netflixDark: '#141414',
        },
      },
    },
    plugins: [],
  };
  
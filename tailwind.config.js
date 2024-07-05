import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text: '#eeeaf1',
        background: '#130f17',
        primary: '#B8A4C5',
        secondary: '#6A4344',
        accent: '#A99178',
        'bar-color': 'rgba(0, 0, 0, .15)',
      },
      easing: {
        'super-ease-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    tailwindScrollbar({ nocompatible: true }),
  ],
};

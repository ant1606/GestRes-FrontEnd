/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        18: '4.5rem'
      }
    }
  },
  plugins: [],
  safelist: [
    'bg-blue-400',
    'bg-emerald-600',
    'bg-green-400',
    'bg-indigo-700',
    'bg-lime-600',
    'bg-orange-500',
    'bg-pink-400',
    'bg-purple-600',
    'bg-red-700',
    'bg-rose-600',
    'bg-sky-600',
    'bg-teal-500',
    'bg-yellow-400',
    'bg-gray-900',
    'bg-blue-500',
    'bg-green-800',
    'bg-gray-300',
    'text-gray-50',
    'text-gray-900'
  ]
};

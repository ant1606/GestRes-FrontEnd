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
    'bg-blue-500',
    'bg-blue-400',
    'bg-emerald-600',
    'bg-gray-300',
    'bg-gray-700',
    'bg-gray-900',
    'bg-green-400',
    'bg-green-800',
    'bg-indigo-700',
    'bg-lime-600',
    'bg-orange-500',
    'bg-pink-400',
    'bg-purple-600',
    'bg-red-500',
    'bg-red-700',
    'bg-rose-600',
    'bg-sky-600',
    'bg-teal-500',
    'bg-yellow-200',
    'bg-yellow-400',
    'text-gray-500',
    'text-gray-50'
  ]
};

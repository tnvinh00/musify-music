/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },
      backgroundColor: {
        layout: '#172a46',
        main: '#061641',
      },
      height: {
        'layout': 'calc(100vh - 8rem - 54px)',
        'layout-2': 'calc(100vh - 13rem)',
        'lyric': 'calc(100vh - 6rem)',
      },
      maxHeight: {
        'layout': 'calc(100vh - 8rem - 54px)',
      },
      backgroundImage: {
        slider: 'linear-gradient(rgb(37 99 235), rgb(37 99 235))',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    }
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    animation: {
      'skew-scroll': 'skew-scroll 20s linear infinite',
    },
    keyframes: {
      'skew-scroll': {
        '0%': {
          transform:
            'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)',
        },
        '100%': {
          transform:
            'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)',
        },
      },
    },
  },
};
export const plugins = [];
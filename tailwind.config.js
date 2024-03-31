import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            screens:{
              xs: '280px'
            },
            backgroundImage: {
              "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
              "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
              liliana: {
                primary: '#fa3b7e',
                secondary: '#8f5bbd',
                third: '#faaea6',
                background: '#f1f1f1',
              }
            },
            fontFamily: {
              Poppins:'Poppins',
              Opensans: 'Open Sans',
              Roboto: 'Roboto'
            }
          },
        },
    plugins: [forms],
};

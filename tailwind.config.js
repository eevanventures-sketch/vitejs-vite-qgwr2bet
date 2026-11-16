/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      theme: {
            extend: {
                    colors: {
                              navy: {
                                          50: '#eef2f9',
                                                    100: '#d6e0f0',
                                                              200: '#adc1e1',
                                                                        500: '#1e3a6e',
                                                                                  700: '#13294b',
                                                                                            800: '#0f1e3d',
                                                                                                      900: '#091329',
                              },
                    },
                          fontFamily: {
                                    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                          },
            },
      },
        plugins: [],
};

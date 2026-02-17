/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-hanken-grotesk)', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                accent: {
                    orange: '#f97316',
                    purple: '#a855f7',
                    indigo: '#6366f1',
                    green: '#10b981',
                    red: '#ef4444',
                    cyan: '#06b6d4',
                    teal: '#14b8a6',
                },
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1.5rem',
                    sm: '2rem',
                    lg: '3rem',
                },
                screens: {
                    '2xl': '1440px',
                },
            },
            boxShadow: {
                'custom-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'custom-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'custom-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                'custom-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            },
        },
    },
    plugins: [],
};

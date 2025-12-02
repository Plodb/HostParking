import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#6a0dad',
                accent: '#ffcc00',
                text: '#1a1a1a',
                bg: '#f5f5ff',
            },
        },
    },
    plugins: [],
}

export default config

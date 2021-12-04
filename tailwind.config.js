module.exports = {
	purge: ['.//pages/**/*.{ts,tsx}', './components/**/*.{ts.tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		backgroundColor: (theme) => ({
			...theme('colors'),
			spotify: '#18D860',
		}),
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};

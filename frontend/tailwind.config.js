/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			'corporate',
			// {
			// 	dark: {
			// 		...require('daisyui/src/colors/themes')['[data-theme=dark]'],
			// 		'base-100': '#191919',
			// 	},
			// },
		],
	},
}

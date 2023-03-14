/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/colors/themes')['[data-theme=light]'],
					primary: '#128f8b',
					'primary-focus': '#027d7a',
					'primary-content': '#FFFFFF',
					secondary: '#04b1ab',
				},
			},
		],
	},
}

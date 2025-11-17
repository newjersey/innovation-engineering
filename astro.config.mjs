// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'OOI Engineering',
			customCss: [
				// Fontsource files for to regular, semi-bold, and bold font weights.
				"@fontsource/public-sans/latin.css",
				"@fontsource/public-sans/latin-italic.css",
				"./src/styles/custom.css",
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/newjersey/innovation-engineering' }],
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Self',
					autogenerate: { directory: 'self' },
				},
			],
		}),
	],
});

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'

// https://astro.build/config
export default defineConfig({
	site: 'https://newjersey.github.io',
	base: "/innovation-engineering",
	integrations: [
		starlight({
			plugins: [starlightLinksValidator()],
			title: 'OOI Engineering',
			logo: {
				src: './src/assets/robot.png',
			},
			customCss: [
				// Fontsource files for to regular, semi-bold, and bold font weights.
				"@fontsource/public-sans/latin.css",
				"@fontsource/public-sans/latin-italic.css",
				"./src/styles/custom.css",
			],
			components: {
				MarkdownContent: './src/components/MarkdownContent.astro',
			},
			lastUpdated: true,
			editLink: {
				baseUrl: 'https://github.com/newjersey/innovation-engineering/edit/main/',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/newjersey/innovation-engineering' }],
			sidebar: [
				{
					label: 'Meta',
					autogenerate: { directory: 'meta' },
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Tools we use',
					autogenerate: { directory: 'tech-recommendations' },
				},
				{
					label: 'Onboarding',
					autogenerate: { directory: 'onboarding' },
				},
			],
		}),
	],
});

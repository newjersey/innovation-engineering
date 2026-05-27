// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

// https://astro.build/config
export default defineConfig({
  site: "https://newjersey.github.io",
  base: "/innovation-engineering",
  redirects: {
    "/guides/claude-code-bedrock/": "/guides/development/claude-code-bedrock/",
  },
  integrations: [
    starlight({
      plugins: [starlightLinksValidator()],
      title: "NJIA Engineering",
      logo: {
        src: "./src/assets/robot.png",
      },
      customCss: [
        // Fontsource files for to regular, semi-bold, and bold font weights.
        "@fontsource/public-sans/latin.css",
        "@fontsource/public-sans/latin-italic.css",
        "./src/styles/custom.css",
      ],
      components: {
        MarkdownContent: "./src/components/MarkdownContent.astro",
      },
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/newjersey/innovation-engineering/edit/main/",
        head: [{ tag: "meta", attrs: { name: "robots", content: "noindex, nofollow" } }],
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/newjersey/innovation-engineering",
        },
      ],
      sidebar: [
        {
          label: "Meta",
          items: [{ autogenerate: { directory: "meta" } }],
        },
        {
          label: "Guides",
          items: [
            {
              label: "Getting Started",
              collapsed: false,
              items: [{ autogenerate: { directory: "guides/getting-started" } }],
            },
            {
              label: "Agency Collaboration",
              collapsed: true,
              items: [{ autogenerate: { directory: "guides/agency-collaboration" } }],
            },
            {
              label: "Development",
              collapsed: true,
              items: [{ autogenerate: { directory: "guides/development" } }],
            },
            {
              label: "Github Actions",
              collapsed: true,
              items: [{ autogenerate: { directory: "guides/github-actions" } }],
            },
            {
              label: "Monitoring & Analytics",
              collapsed: true,
              items: [{ autogenerate: { directory: "guides/monitoring" } }],
            },
          ],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
        {
          label: "Tools we use",
          items: [{ autogenerate: { directory: "tech-recommendations" } }],
        },
        {
          label: "Onboarding",
          items: [{ autogenerate: { directory: "onboarding" } }],
        },
      ],
    }),
  ],
});

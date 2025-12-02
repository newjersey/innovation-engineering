# NJ OOI Engineering Wiki

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

This site is the document hub for the NJ OOI Engineering Wiki

Deployed at: https://newjersey.github.io/innovation-engineering/

## Contributing

All engineers are encouraged to contribute and make improvements to existing documentation as they see fit.

### QUICK LINKS
- [Add a new guide](https://github.com/newjersey/innovation-engineering/new/main/src/content/docs/guides)
- [Add a new reference doc](https://github.com/newjersey/innovation-engineering/new/main/src/content/docs/reference)

### Process
1. Create a branch
2. Migrate your document to a `.md`/`.mdx` file in `src/content/docs`
3. Commit and push, create a PR. Post the PR to `#engineering-all` and tag an engineering director and a fellow engineer for review 
4. Rebase and merge to main
5. When you merge to main, GitHub Pages will automatically re-deploy the site.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


# NJ Innovation Authority Engineering Wiki

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

The document hub for the NJ Innovation Authority engineering team. Guides, references, and shared
knowledge for building and maintaining our projects.

Deployed at: <https://newjersey.github.io/innovation-engineering/>

## Table of Contents

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Linting and formatting](#linting-and-formatting)
5. [Claude Code skills](#claude-code-skills)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)
9. [Disclaimer](#disclaimer)

## Architecture

This site is built as a static documentation site using Astro and the Starlight theme, deployed via
GitHub Pages.

### Built With

- [Astro](https://astro.build/) - Static site framework
- [Starlight](https://starlight.astro.build/) - Documentation theme for Astro
- [Biome](https://biomejs.dev/) - Code formatter and linter for JS/TS/CSS
- [markdownlint](https://github.com/DavidAnson/markdownlint) - Markdown linter
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) - Pre-commit hooks

## Installation

```bash
# Clone this repository
git clone https://github.com/newjersey/innovation-engineering

# Go into the repository
cd innovation-engineering

# Install dependencies
pnpm install
```

## Usage

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm run dev`         | Starts local dev server at `localhost:4321`      |
| `pnpm start`           | Starts local dev server at `localhost:4321`      |
| `pnpm run build`       | Build your production site to `./dist/`          |
| `pnpm run preview`     | Preview your build locally, before deploying     |
| `pnpm run format`      | Format source files with Biome                   |
| `pnpm run lint:md`     | Lint all markdown files with markdownlint         |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Linting and formatting

**Code** (JS/TS/CSS/Astro) is formatted by [Biome](https://biomejs.dev/). Run `pnpm run format` to
format all source files.

**Markdown** is linted by [markdownlint](https://github.com/DavidAnson/markdownlint). Run
`pnpm run lint:md` to check all content files. The configuration in `.markdownlint.jsonc` is
tailored for Starlight (no h1 in body, MDX component support, admonition compatibility).

### Pre-commit hooks

[Husky](https://typicode.github.io/husky/) runs
[lint-staged](https://github.com/lint-staged/lint-staged) on every commit:

- **Biome** checks staged `.ts`, `.mjs`, `.astro`, `.css` files
- **markdownlint** checks staged `.md` and `.mdx` files

If you need to skip hooks for a specific commit (e.g., a work-in-progress), use `git commit --no-verify`.

## Claude Code skills

This project includes [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skills for
common wiki authoring tasks. Run them from Claude Code with the `/` prefix.

| Skill | Description |
| :-------------- | :---------- |
| `/new-doc` | Scaffold a new wiki document. Recommends the correct Diataxis doc type (guide vs. reference), proposes a filename and location, and generates a structured starting point with cross-links. |
| `/review-doc` | Review a document for Diataxis alignment, style guide adherence, cross-linking opportunities, and sensitive content. Reports findings by severity. |
| `/expand-stub` | Flesh out a WIP stub into a more complete page. Proposes an outline appropriate for the doc type and generates draft content or a skeleton with guiding questions. |
| `/cross-link` | Find missing cross-link opportunities between a document and the rest of the wiki. Suggests specific links with correct paths and placement. |

## Contributing

All engineers are encouraged to contribute and make improvements to existing documentation as they
see fit.

### Quick Links

- [Add a new guide](https://github.com/newjersey/innovation-engineering/new/main/src/content/docs/guides)
- [Add a new reference doc](https://github.com/newjersey/innovation-engineering/new/main/src/content/docs/reference)

### Process

See the [adding docs](https://github.com/newjersey/innovation-engineering/meta/adding-docs/) page
for all info!

### General Workflow

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT license. For more information, see [LICENSE](LICENSE).

## Contact

If you want to get in touch with the NJIA team, please email us at
[team@innovation.nj.gov](mailto:team@innovation.nj.gov).

### Join the NJ Innovation Authority!

If you are excited to design and deliver modern policies and services to improve the lives of all
New Jerseyans, you should
[join the New Jersey Innovation Authority](https://innovation.nj.gov/join.html)!

## Disclaimer

This project utilizes certain tools and technologies for development purposes. The inclusion of
these tools does not imply endorsement or recommendation. Users are encouraged to evaluate the
suitability of these tools for their own use.

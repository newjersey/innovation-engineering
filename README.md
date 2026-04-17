# NJ Innovation Authority Engineering Wiki

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

The document hub for the NJ Office of Innovation engineering team. Guides, references, and shared
knowledge for building and maintaining our projects.

Deployed at: https://newjersey.github.io/innovation-engineering/

## Table of Contents

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)
6. [Contact](#contact)
7. [Disclaimer](#disclaimer)

## Architecture

This site is built as a static documentation site using Astro and the Starlight theme, deployed via
GitHub Pages.

### Built With

- [Astro](https://astro.build/) - Static site framework
- [Starlight](https://starlight.astro.build/) - Documentation theme for Astro
- [Biome](https://biomejs.dev/) - Code formatter and linter

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
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

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

If you want to get in touch with the Office of Innovation team, please email us at
[team@innovation.nj.gov](mailto:team@innovation.nj.gov).

### Join the Office of Innovation!

If you are excited to design and deliver modern policies and services to improve the lives of all
New Jerseyans, you should
[join the New Jersey State Office of Innovation](https://innovation.nj.gov/join.html)!

## Disclaimer

This project utilizes certain tools and technologies for development purposes. The inclusion of
these tools does not imply endorsement or recommendation. Users are encouraged to evaluate the
suitability of these tools for their own use.

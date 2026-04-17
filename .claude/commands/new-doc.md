You are helping create a new document for the NJIA Engineering Wiki, a Starlight site using the Diataxis framework.

## Document types

Our wiki uses two Diataxis doc types, plus additional sections:

- **Guide** (`src/content/docs/guides/<subcategory>/`): Action-oriented, walks through steps of a process to achieve a single task. Digressions or explanations should be extracted into reference docs. Subcategories: `getting-started`, `agency-collaboration`, `development`, `github-actions`, `monitoring`.
- **Reference** (`src/content/docs/reference/`): Consulted as a source of truth. Not step-by-step. Describes what something IS, not how to do it.
- **Tech Recommendations** (`src/content/docs/tech-recommendations/`): Our position on specific tools and technologies.
- **Onboarding** (`src/content/docs/onboarding/`): Sequential onboarding materials, numerically prefixed.
- **Meta** (`src/content/docs/meta/`): About the wiki itself.

## Conventions

- **Frontmatter**: `title` (required, sentence case), `description` (optional), `wip: true` (optional, for stubs or incomplete docs)
- **File naming**: kebab-case. Numeric prefix (e.g., `01-`) only when ordering matters within a folder.
- **Headers**: Use `##` (h2) and below only — the page title is the h1. Sentence case. Emojis welcome at the start of h2 headers for visual distinction.
- **Links**: Internal links must use the `/innovation-engineering/` base path prefix. Link text must be descriptive and make sense out of context (accessibility requirement).
- **Private content**: For sensitive information, create a wiki entry with keywords for searchability and link to a Google Doc instead of embedding the content. See `reference/cloud-usage-policy.md` as an example.
- **Principle before practice**: State the "why" before the "how" when relevant.

## Your task

Ask the user what they want to document. Then:

1. **Recommend the document type** with reasoning based on the Diataxis criteria above. The key question: "Is this something consulted as a source of truth, or does it walk through steps of a process?"
2. **Propose a filename and location** following kebab-case naming in the correct directory.
3. **Ask clarifying questions**: Is the content complete or should it be marked WIP? Is any of it sensitive (Google Doc pattern needed)?
4. **Generate the file** with appropriate frontmatter and structure:
   - For **guides**: Include "Before you begin" prerequisites if applicable, numbered steps as h2 sections, expected outcomes, and a "Troubleshooting" section if relevant. Reference `guides/development/claude-code-bedrock.md` as a structural exemplar.
   - For **reference**: Organize by concern with a clear purpose/goals section. Reference `reference/code-review.md` or `reference/estimation.md` as structural exemplars.
   - For **tech recommendations**: Include what the tool is, why we chose it, how we use it, and links to relevant setup guides.
5. **Suggest cross-links** to related existing wiki pages.

Always generate valid frontmatter and ensure the document passes markdownlint (h2+ only, no skipped heading levels, no bare URLs).

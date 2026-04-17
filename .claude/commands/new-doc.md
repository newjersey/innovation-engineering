You are helping create a new document for the NJIA Engineering Wiki, a Starlight site that organizes content using the [Diataxis framework](https://diataxis.fr/). For background on how our wiki applies Diataxis, see `src/content/docs/meta/0-principles.md`.

## Diataxis document types

Diataxis splits documentation into four types based on what the reader needs. Understanding the distinctions helps you write the right kind of doc — and helps the reader find what they're looking for.

### Tutorial — learning-oriented

A tutorial walks a newcomer through a complete experience to build confidence and familiarity. The reader doesn't yet know what questions to ask — you're guiding them. The outcome is *learning*, not just a finished task.

- Tone: "Follow along and you'll have X working by the end."
- Example: "Build and deploy your first NJ app"
- Structure: learning goal, prerequisites, guided steps building toward a working result, "what you've learned" recap.
- Key test: could someone with zero context follow this from start to finish?

### How-To Guide — task-oriented

A how-to guide gives practical steps to achieve a specific real-world goal. The reader already knows what they want to do — they just need to know *how*. Digressions or background context should be extracted into Explanation or Reference docs.

- Tone: "How to deploy to staging."
- Example: "How to set up AWS CLI with SSO"
- Structure: prerequisites ("Before you begin"), numbered steps, expected outcomes, troubleshooting.
- Key test: is every section directly serving the task at hand?
- Folder: `src/content/docs/guides/<subcategory>/` (subcategories: `getting-started`, `agency-collaboration`, `development`, `github-actions`, `monitoring`)

### Reference — information-oriented

A reference doc is consulted as a source of truth. It's dry, accurate, and structured by the subject matter (not by the reader's journey). Think policy documents, glossaries, checklists, and working agreements.

- Tone: factual, no narrative arc.
- Example: "Code review guidelines", "Glossary", "Launch checklist"
- Structure: organized by concern — goals/purpose, the content by topic, related links.
- Key test: would someone look this up to check a fact, not to learn how to do something?
- Folder: `src/content/docs/reference/`

### Explanation — understanding-oriented

An explanation discusses the "why" — broader context, trade-offs, history, and conceptual background. It helps the reader build a mental model, not complete a task.

- Tone: "Here's why we made this choice and what the alternatives were."
- Example: "Why we chose Next.js over Remix", "How our i18n strategy works"
- Structure: context/motivation, the concept explained, trade-offs or alternatives, links to related guides and reference docs.
- Key test: does this help someone *understand* rather than *do*?

### Additional sections (not Diataxis types)

- **Tech Recommendations** (`src/content/docs/tech-recommendations/`): Our position on specific tools and technologies. These often blend Reference and Explanation.
- **Onboarding** (`src/content/docs/onboarding/`): Sequential onboarding materials, numerically prefixed.
- **Meta** (`src/content/docs/meta/`): About the wiki itself.

> **Note:** Our wiki currently emphasizes How-To Guides and Reference. Tutorial and Explanation docs don't have dedicated folders yet — recommend placement based on the content (e.g., a tutorial might live in `guides/getting-started/`, an explanation might live in `tech-recommendations/` or `reference/`).

## Conventions

- **Frontmatter**: `title` (required, sentence case), `description` (optional), `wip: true` (optional, for stubs or incomplete docs)
- **File naming**: kebab-case. Numeric prefix (e.g., `01-`) only when ordering matters within a folder.
- **Headers**: Use `##` (h2) and below only — the page title is the h1. Sentence case. Emojis welcome at the start of h2 headers for visual distinction.
- **Links**: Internal links must use the `/innovation-engineering/` base path prefix. Link text must be descriptive and make sense out of context (accessibility requirement).
- **Private content**: For sensitive information, create a wiki entry with keywords for searchability and link to a Google Doc instead of embedding the content. See `reference/cloud-usage-policy.md` as an example.
- **Principle before practice**: State the "why" before the "how" when relevant.

## Your task

Ask the user what they want to document. Then:

1. **Recommend the document type** with reasoning. Use these differentiating questions:
   - Is this for *learning something new* (tutorial) or *getting a specific thing done* (guide)?
   - Is this for *looking something up* (reference) or *understanding why* (explanation)?
   Explain your reasoning so the user understands the Diataxis distinction.
2. **Propose a filename and location** following kebab-case naming in the correct directory.
3. **Ask clarifying questions**: Is the content complete or should it be marked WIP? Is any of it sensitive (Google Doc pattern needed)?
4. **Generate the file** with appropriate frontmatter and structure:
   - For **tutorials**: Learning goal, prerequisites, guided steps building toward a working result, "what you've learned" summary. Each step should produce a visible result so the reader knows they're on track.
   - For **guides**: "Before you begin" prerequisites, numbered steps as h2 sections, expected outcomes, troubleshooting. Reference `guides/development/claude-code-bedrock.md` as a structural exemplar.
   - For **reference**: Organize by concern with a clear purpose/goals section. Reference `reference/code-review.md` or `reference/estimation.md` as structural exemplars.
   - For **explanation**: Context/motivation, the concept explained clearly, trade-offs or alternatives considered, links to related guides and reference docs.
   - For **tech recommendations**: What the tool is, why we chose it, how we use it, and links to relevant setup guides.
5. **Suggest cross-links** to related existing wiki pages. Cross-links between Diataxis types are especially valuable (e.g., a guide should link to the reference it draws on; an explanation should link to the guide that applies the concept).

Always generate valid frontmatter and ensure the document passes markdownlint (h2+ only, no skipped heading levels, no bare URLs).

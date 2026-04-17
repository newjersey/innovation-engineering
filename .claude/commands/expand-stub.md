You are helping expand a WIP stub document in the NJIA Engineering Wiki into a more complete page.

## Context

This wiki encourages stubs and WIPs over tracking issues — surfacing incomplete documents helps note gaps and encourage filling them. Your job is to help take a stub from placeholder to useful content.

## Document types (determined by location)

- `guides/` → **How-To Guide**: Action-oriented, step-by-step process for a single task
- `reference/` → **Reference**: Consulted as a source of truth, organized by concern
- `tech-recommendations/` → **Tech Recommendation**: Tool/technology position with rationale
- `onboarding/` → **Onboarding**: Sequential learning material

## Your task

If the user specifies a file, read it. If not, search for all documents with `wip: true` in frontmatter and present them as options.

Then:

1. **Read the existing content** — stubs vary from empty (just a title) to partially outlined.
2. **Determine the doc type** from its directory path.
3. **Propose a structured outline** appropriate for the doc type:
   - **Guides**: "Before you begin" prerequisites, numbered step sections (h2), expected outcomes per step, "Troubleshooting" if relevant. Reference `guides/development/claude-code-bedrock.md` as a model.
   - **Reference**: Purpose/goals section, content organized by concern, related links. Reference `reference/code-review.md` or `reference/estimation.md` as models.
   - **Tech Recommendations**: What it is, why we chose it, how we use it, setup guide links.
4. **Ask the user** what information they can provide now vs. what needs to be filled in later.
5. **Generate expanded content** — draft real content where the topic is clear, or create a detailed skeleton with guiding questions (as comments or placeholder text) where domain knowledge is needed.
6. **Identify cross-link opportunities** to existing wiki pages.

## Conventions

- Headers: h2+ only, sentence case, emojis welcome at start of h2
- Links: `/innovation-engineering/` prefix for internal links, descriptive text
- Principle before practice: state "why" before "how"
- Remove `wip: true` only when the user considers the content sufficient. Per wiki guidelines, "sufficient" means more than just an outline — it should have real content, even if the document will continue evolving.

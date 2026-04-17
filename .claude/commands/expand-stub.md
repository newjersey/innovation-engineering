You are helping expand a WIP stub document in the NJIA Engineering Wiki into a more complete page. For background on how our wiki applies Diataxis, see `src/content/docs/meta/0-principles.md`.

## Context

This wiki encourages stubs and WIPs over tracking issues — surfacing incomplete documents helps note gaps and encourage filling them. Your job is to help take a stub from placeholder to useful content.

## Diataxis document types

The [Diataxis framework](https://diataxis.fr/) splits documentation into four types. Understanding which type this stub is helps you propose the right structure.

- **Tutorial** — learning-oriented. Walks a newcomer through a complete experience to build confidence. The reader doesn't yet know what questions to ask — you're guiding them. *"Follow along and you'll have X working."*
- **How-To Guide** — task-oriented. Practical steps to achieve a specific real-world goal. The reader already knows what they want to do. Focused, no digressions. *"How to deploy to staging."*
- **Reference** — information-oriented. Consulted as a source of truth. Dry, accurate, structured by the subject matter (not by the reader's journey). *"Code review policy", "Glossary."*
- **Explanation** — understanding-oriented. Discusses the "why" — context, trade-offs, history, conceptual background. Helps the reader build a mental model. *"Why we chose Next.js over Remix."*

### Mapping to wiki folders

- `guides/` → typically a **How-To Guide**
- `reference/` → typically **Reference**
- `tech-recommendations/` → often blends **Reference** and **Explanation**
- `onboarding/` → may be **Tutorial** (guided learning) or **Reference** (setup checklists)

Our wiki currently emphasizes How-To Guides and Reference, but all 4 types are valid. If a stub's content doesn't match the type implied by its folder, flag that to the user.

## Your task

If the user specifies a file, read it. If not, search for all documents with `wip: true` in frontmatter and present them as options.

Then:

1. **Read the existing content** — stubs vary from empty (just a title) to partially outlined.
2. **Determine the doc type** from its directory path and content. If the content doesn't match the type implied by its location, mention that.
3. **Propose a structured outline** appropriate for the doc type:
   - **Tutorial**: Learning goal, what you'll build/achieve, prerequisites, guided steps with checkpoints (each step should produce a visible result), "what you've learned" recap. Think guided lesson with a tangible outcome.
   - **How-To Guide**: "Before you begin" prerequisites, numbered step sections (h2), expected outcomes per step, "Troubleshooting" if relevant. Reference `guides/development/claude-code-bedrock.md` as a model.
   - **Reference**: Purpose/goals section, content organized by concern, related links. Reference `reference/code-review.md` or `reference/estimation.md` as models.
   - **Explanation**: Motivation/problem ("why does this matter?"), concept walkthrough, trade-offs or alternatives, links to related guides and reference docs.
   - **Tech Recommendations**: What it is, why we chose it, how we use it, setup guide links.
4. **Ask the user** what information they can provide now vs. what needs to be filled in later.
5. **Generate expanded content** — draft real content where the topic is clear, or create a detailed skeleton with guiding questions (as comments or placeholder text) where domain knowledge is needed.
6. **Identify cross-link opportunities** to existing wiki pages. Cross-links between Diataxis types are especially valuable (e.g., a guide should link to the reference it draws on).

## Conventions

- Headers: h2+ only, sentence case, emojis welcome at start of h2
- Links: `/innovation-engineering/` prefix for internal links, descriptive text
- Principle before practice: state "why" before "how"
- Remove `wip: true` only when the user considers the content sufficient. Per wiki guidelines, "sufficient" means more than just an outline — it should have real content, even if the document will continue evolving.

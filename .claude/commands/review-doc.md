You are reviewing a document in the NJIA Engineering Wiki for quality, Diataxis alignment, and adherence to team conventions. For background on how our wiki applies Diataxis, see `src/content/docs/meta/0-principles.md`.

## Diataxis document types

The [Diataxis framework](https://diataxis.fr/) splits documentation into four types. Each has a distinct purpose, and content that drifts from its type becomes harder for readers to use.

- **Tutorial** — learning-oriented. Walks a newcomer through a complete experience to build confidence. Guided, hand-holding, every step produces a visible result. *"Follow along and you'll have X working."*
- **How-To Guide** — task-oriented. Practical steps to achieve a specific real-world goal. Assumes the reader knows what they want to do. Focused and free of digressions. *"How to deploy to staging."*
- **Reference** — information-oriented. Consulted as a source of truth. Dry, accurate, structured by the subject matter. *"Code review policy", "Glossary."*
- **Explanation** — understanding-oriented. Discusses the "why" — context, trade-offs, history. Helps the reader build a mental model. *"Why we chose Next.js over Remix."*

Our wiki currently emphasizes How-To Guides (`guides/`) and Reference (`reference/`). Tutorial and Explanation are also valid types — they just don't have dedicated folders yet.

## Style rules

- **Headers**: h2+ only (title is the h1). Sentence case. No skipped levels. Emojis at the start of h2 are welcome for visual distinction.
- **Links**: Descriptive text that makes sense out of context (not "click here" or bare URLs). Internal links must use `/innovation-engineering/` prefix.
- **Principle before practice**: "Why" before "how" when relevant.
- **Private content**: No team member names (use roles/teams instead). No information about NJ internal systems or state IT operations. Sensitive content should use the keywords + Google Doc link pattern.
- **Stubs**: Documents with minimal content should have `wip: true` in frontmatter. Documents with sufficient content should not.

## Your task

Read the document the user specifies (or the most recently modified doc if none specified). Then review it against this checklist:

1. **Diataxis alignment**: Is it in the right folder for what it is? Does the content match its type?
   - A **guide** that spends paragraphs explaining *why* before getting to steps → extract the context into an explanation doc.
   - A **reference** doc that reads like step-by-step instructions → it might be a guide.
   - A **tutorial** that lists facts without guiding the reader through an experience → it's drifting into reference.
   - An **explanation** that gives numbered steps to follow → it's drifting into a how-to guide.
2. **Digression detection**: Are there sections that belong in a different doc type? Long "why" sections in a guide should be explanations; procedural steps in a reference should be guides.
3. **Structure quality**: Are sections appropriate for the doc type? Is there a logical flow?
4. **Link text quality**: Is link text meaningful and accessible, not just "not empty"?
5. **Cross-linking opportunities**: Scan existing wiki pages for related content that should be linked. Cross-links between Diataxis types are especially valuable (a guide should link to the reference it draws on; an explanation should link to the guide that applies the concept).
6. **Sensitive content check**: Names, internal systems, credentials, or details that should use the Google Doc pattern.
7. **Header formatting**: Sentence case, no h1 in body, no skipped levels, proper hierarchy.
8. **WIP status**: Should this doc have `wip: true`? Or should it be removed?

Report findings organized by severity:

- **Must-fix**: Violations of style rules, sensitive content, broken structure
- **Should-fix**: Diataxis misalignment, poor link text, missing cross-links
- **Suggestion**: Improvements that would strengthen the doc but aren't required

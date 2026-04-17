You are reviewing a document in the NJIA Engineering Wiki for quality, Diataxis alignment, and adherence to team conventions.

## Diataxis rules for this wiki

- **Guides** (`guides/`) are action-oriented: focused on a single task and how to achieve it. Digressions or explanations should be extracted into reference documents.
- **Reference** docs (`reference/`) are consulted as a source of truth. They describe what something IS, not walk through steps.
- If a guide contains long explanatory sections, recommend extracting them to a reference doc and cross-linking.
- If a reference doc reads like a step-by-step tutorial, recommend converting it to a guide.

## Style rules

- **Headers**: h2+ only (title is the h1). Sentence case. No skipped levels. Emojis at the start of h2 are welcome for visual distinction.
- **Links**: Descriptive text that makes sense out of context (not "click here" or bare URLs). Internal links must use `/innovation-engineering/` prefix.
- **Principle before practice**: "Why" before "how" when relevant.
- **Private content**: No team member names (use roles/teams instead). No information about NJ internal systems or state IT operations. Sensitive content should use the keywords + Google Doc link pattern.
- **Stubs**: Documents with minimal content should have `wip: true` in frontmatter. Documents with sufficient content should not.

## Your task

Read the document the user specifies (or the most recently modified doc if none specified). Then review it against this checklist:

1. **Diataxis alignment**: Is it in the right folder for what it is? Does a guide actually walk through steps? Does a reference doc serve as a source of truth?
2. **Digression detection**: Are there explanatory sections in a guide that should be a separate reference doc?
3. **Structure quality**: Are sections appropriate for the doc type? Is there a logical flow?
4. **Link text quality**: Is link text meaningful and accessible, not just "not empty"?
5. **Cross-linking opportunities**: Scan existing wiki pages for related content that should be linked.
6. **Sensitive content check**: Names, internal systems, credentials, or details that should use the Google Doc pattern.
7. **Header formatting**: Sentence case, no h1 in body, no skipped levels, proper hierarchy.
8. **WIP status**: Should this doc have `wip: true`? Or should it be removed?

Report findings organized by severity:

- **Must-fix**: Violations of style rules, sensitive content, broken structure
- **Should-fix**: Diataxis misalignment, poor link text, missing cross-links
- **Suggestion**: Improvements that would strengthen the doc but aren't required

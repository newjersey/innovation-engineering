You are helping improve cross-linking in the NJIA Engineering Wiki. Cross-linking makes content more discoverable and helps readers find related information.

## Your task

Read the document the user specifies. Then scan the other wiki pages in `src/content/docs/` to find topical overlaps.

For each concept, tool, process, or term mentioned in the target document that is covered by another wiki page, suggest a cross-link.

## Rules

- Links use the format: `[descriptive text](/innovation-engineering/path/to/page/)`
- Link text must be descriptive and make sense out of context (accessibility requirement)
- Prefer inline links at the first meaningful mention of a concept, not every occurrence
- For pages with many outbound link opportunities, suggest a "See also" section at the bottom with the remaining links
- Don't over-link: one link per concept is enough
- Check the glossary (`reference/glossary.md`) for terms that should link there
- When suggesting where to place a link, quote the sentence and show where the link would go

## Output format

For each suggestion, provide:

1. **The related page**: title and path
2. **Where to link**: the sentence in the target doc where it fits, with the link inserted
3. **Why**: brief explanation of the relationship

Also flag any "orphan" pages you notice — pages that have no inbound links from the target document's section and probably should.

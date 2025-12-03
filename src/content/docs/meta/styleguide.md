---
title: Content & style guide
description: Styles for docs
---

## ✍️ Content formatting

- Use [header hierarchy rules](https://dequeuniversity.com/checklists/web/headings) appropriately. Markdown body should use `##` (`h2`) headers and onward, because the page title is the `h1`. Do not skip header levels.
- Document titles and headers should be sentence-case with appropriate capitalization for proper nouns (_"How to set up VSCode"_ not _"How To Set Up VSCode"_)
- Follow [link accessibility rules](https://dequeuniversity.com/tips/link-text), including: use link text that makes sense out of context
- Using emojis in `h2` headers is welcome, for whimsy and visual distinction. If you do, add them at the beginning of the header, and ensure it makes sense in context of the text.
- Use a spell-checker to ensure typos are not committed to the repo.
- Because this is a GitHub pages site, all internal links in the markdowns need to be prefaced with the repo name `/innovation-engineering`. There's a link-checker that runs on PRs to validate these are correct.
- When using an uncommonly-used term, add it to our [glossary](/innovation-engineering/reference/glossary).

## 🔐 Private content

Per [our default-to-open principle](/innovation-engineering/onboarding/2-principles/#openpublic-by-default-closedprivate-when-necessary), this wiki is publicly accessible. For any information that should not be publicly visible, create a wiki entry here, and provide a link to a Google doc instead. In the wiki markdown file, include a list of several keywords. This will facilitate maximum searchability within the wiki as a source-of-truth for finding content even when private. 

An example of this pattern of keywords + link to Google Doc is our [Cloud usage policy](/innovation-engineering/reference/cloud-usage-policy).

Bear in mind the following guidelines for public information:
- Avoid using team member names specifically. We recommend referencing by team/role instead ("the engineering directors", "the tech ops team", "the CCM team")
- Do not expose information about NJ internal systems or the operations of the state IT department
- When in doubt, ask your engineering directors!

## 📁 Folders 

We do not nest folders. We only use top-level folders with no subfolders. Heavily nested structures make information more difficult to find, make nesting inconsistent, and introduce more cognitive overhead in deciding where to place a doc.

## 🏷️ Naming

Name files using [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case). When you want documents to appear in a certain order in the sidebar, prefix the name with a number such as `0-`, for example `0-principles.md`.
---
title: Adding and updating docs
description: Process for adding and requesting
---

## Updating documents

Clone the [GitHub repo](https://github.com/newjersey/innovation-engineering) and edit the Markdown files to make changes to a doc. All docs also have a direct "Edit page" link at the bottom, which takes you directly to the editor on GitHub.

- **Make a PR when making a substantial change** such as significant rewording, reorganizing, or adding content to a doc.
- **Make a direct edit to `main` when making minor changes** such as editing for grammar, spelling, or clarity. 

When making a PR, follow our [code review guidelines](/innovation-engineering/reference/code-review/) to request review from 2 reviewers. Post review requests in the `#engineering-all` channel on Slack.

## Adding new documents

The same guidelines for PRs as above apply when adding new documents.

### Stubs and WIPs

**We always prefer a stub or work-in-progress (WIP) document over tracking issues or to-do items.** This is a living wiki. We want to surface incomplete documents to note what is being searched for and encourage filling in gaps.


A stub or WIP document can be as empty or thorough as you need it to be. It is perfectly appropriate to have an empty document with just a header. This documents a gap or need and serves as a living reminder to follow through on document creation.

The more content you can add to a WIP, the better. If possible, leave an outline (such as h2 and h3 headers) to indicate the type of content you'd like to see covered.

Use the `wip` tag in a document front-matter to add a work-in-progress indicator to a document. For example: 

```
---
title: Adding and updating
wip: true
---
```

**Remove the `wip` tag once a document is no longer a stub.** Note that this is different from "when the document is finished". This wiki is intended to be a living guide that is always able updating and changing as we grow and change. Documents are never finished. 

We recommend being liberal in removing the `wip` tag once the document has sufficient content. "Sufficient" is hard to define. If the doc is empty or just an outline, that's obvious. If it has content but you still want to call it a WIP, please put a note at the top of the file indicating what it still needs in order to elevate it from WIP status.

### Transferring Google Docs

Many of our current docs live in Google Drive. Some of the work of filling out our wiki is transferring previous canonical docs into this wiki instead. In order to preserve historic docs in their previous form, do not delete transferred docs. Instead, add a [deprecation warning](https://docs.google.com/document/d/1I6j0XX69cAVq-AJAXYkcfrJVPfnVNSkdPe_PxG_EdW0/edit?tab=t.0) to the top of the doc with a link to the new content. Please use purple for this (to distinguish from the red BizX deprecation color).


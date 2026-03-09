---
title: Cross-agency collaboration tools
---

There can be technical and tooling barriers when collaborating with other agencies

We do have some entirely unsolved tooling limitations, namely:

- Unable to @-mention people on shared Microsoft Online documents

See [this thread for conversation and considerations](https://njcio.slack.com/archives/C081SRUNN2U/p1765564663581579).

## Outlook calendar availability

## Microsoft Teams group chat

## Sharing documents

### Sharepoint

"can't see who has permissions to files or folders in Sharepoint"

Understanding permissions has been difficult

### OneDrive

## Github

Agencies often have separate GH instances. Getting access to the agency GH instance may require getting agency email accounts.

In the long term, the repo should definitely live in the agency instance.

- If migrating later in the project
  - It can be harder to migrate the repo fully including PRs and issues (see [https://github.com/newjersey/dol-gh-enterprise-migration-scripts](https://github.com/newjersey/dol-gh-enterprise-migration-scripts) and [https://github.com/github/gh-gei](https://github.com/github/gh-gei)). There is the work of running the scripts and commands, but also the permissions work of getting the necessary access requirements on both repos for the migration.
  - GH Actions and GH “Apps” may need to be re-permissioned and reconfigured
- If using the agency GH instance earlier in the project,
  - Any GH admin things (e.g. setting up branch protection, adding renovatebot) will need to go through the agency GH admin
  - If the repo is private, not sure how to do PR reviews with OOI engineers in general
  - Not sure if an agency GH instance can connect to the OOI AWS Innov-Res-Dev account. As of writing, see [\[DRAFT\] AWS Amplify Usage Policy](https://docs.google.com/document/d/1dN5EZtw0ndEsn6xfQTSNd4iAr_aRIaqOYMVLxJPLsu8/edit?tab=t.0#heading=h.6v367cjsmrxh) for agency account amplify restrictions.

Github collaboration with agencies is an open question being explored by Doula and HR1 Medicaid projects.

### Setting up ssh keys for two GitHub accounts

### Migrating a Gihub repo to a different organization

### Limitations

issue auto-close (maybe we just needed to set this up)

slack integrations
pickaroo
github live slack message

## OOI Powerpoint slides template

## Set up and installation on agency machines

wip
No admin. Can't install stuff. Can't install extensions, Needs to push out via software center etc., not sure how going to push nvm

also, the node options

e.g. "can't @ people in a doc" vs "i have two calendars t

## Other limitations that have yet to be solved

### We have not figured out how to @-mention people on shared Microsoft Online documents

hmm yeah i think the "get a DHS email" solution really depends on the tradeoffs between frustrations then, it sounds like?

e.g. "can't @ people in a doc" vs "i have two calendars that are not synced up" (the latter honestly sounds worse given how many meetings we have)

### Microsoft Online is not as online-first as Google Workspace

undo online is finicky

slow

integrations with extensions

Less likely for engineers, but the presence of local copies means that heavy edits to a word doc can cause the file to branch into two copies

### Screen annotations on Teams

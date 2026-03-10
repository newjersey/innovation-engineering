---
title: Cross-agency collaboration tools
---

There can be technical and tooling barriers when collaborating with other agencies. For instance, agencies might be on a different Microsoft tenant. Here are some solutions we found for working around these.

See [this thread for additional conversation and considerations](https://njcio.slack.com/archives/C081SRUNN2U/p1765564663581579).

## Outlook calendar availability

You may not be able to add the calendars of "external" users. However, you should be able to view their calendar availability via the "Scheduler" / "Scheduling Assistant" view.

1. Create a new meeting, and add your desired attendees
2. In the expanded meeting dialog, there should either be
   - A button next to the time input that says "Schedule"
   - Or, a tab near the top left that says "Scheduling Assistant"
     ![location of "Schedule" / "Scheduling Assistant"](../../../../assets/outlook-calender-availability.png)
3. Click on "Schedule" / "Scheduling Assistant". The view should show availability the people invited to the meeting.

## Microsoft Teams group chat

Live chat communication can be a lot smoother than emailing back and forth. Agency partners do not have Slack access, and use Microsoft Teams instead.

Creating a Teams meeting creates a chat, but these chats can get clogged with meeting chatter. Additionally, access to the chat can get messed up when attendees decline the meeting invite. Instead, we recommend creating group chat(s) with agency partners, as follows:

1. Follow these [instructions to create a group chat](https://support.microsoft.com/en-us/office/create-a-group-chat-in-microsoft-teams-free-556d9323-75f4-4cbe-ba49-e65d7d8d53a8#id0ejd=desktop)
   - When adding agency partners, make sure to add the account tagged as `External`, and _not_ the one tagged as `Guest`
     ![invite the "External" account, not "Guest"](../../../../assets/teams-invite-external-user.png)
2. Follow the [same instructions page](https://support.microsoft.com/en-us/office/create-a-group-chat-in-microsoft-teams-free-556d9323-75f4-4cbe-ba49-e65d7d8d53a8#id0ejd=desktop) to name the group
3. You can [create a section in Teams](https://support.microsoft.com/en-us/office/reorder-the-chat-and-channels-list-in-microsoft-teams-964d8358-53c3-4200-8cb1-5e9c5091031e) to organize these chats above any meeting chats

Make sure to configure notifications as desired for messages on Teams.

## Sharing documents

Agency partners do not have Google accounts, and do not have access to Google Drive or Google Workspace.

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

### Teams calls do not allow screen annotations while controlling the shared screen

Microsoft teams has a tool to enable people to draw and annotate on a shared screen.

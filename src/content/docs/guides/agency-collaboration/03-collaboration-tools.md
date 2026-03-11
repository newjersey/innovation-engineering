---
title: Cross-agency collaboration tools
---

There can be technical and tooling barriers when collaborating with other agencies. For instance, agencies might be on a different Microsoft tenant. Here are some solutions we found for working around these.

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

### Joint access to a repository

Agencies often have separate GitHub instances. Some may use GitHub Enterprise accounts that are accessed via Microsoft SSO and partitioned from the public GitHub space. For instance, it is likely not possible to add your public-GitHub Innovation account to an agency repository, or to add an agency GitHub Enterprise user to a repository in https://github.com/newjersey.

However, an agency with GitHub Enterprise SSO accounts should be able to add your @oit.nj.gov accounts as guest users to their GitHub instance. (Note that for some people, their @oit.nj.gov is different from their @innovation.nj.gov email). If the agency is unable to add your OIT accounts, you may have to get an agency email accounts.

We also suggest requesting repository read access to engineers who would do PR reviews.

### When should the repository be in the agency GitHub

In the long term, the repository should definitely live in the agency GitHub instance, so that the agency partner has ownership over the project.

In the short term, there are some benefits to having a repository under https://github.com/newjersey:

1. Making it easier for other people at NJIA to find your project repository, and making your code available when engineers search within the `https://github.com/newjersey` project
1. Being able to [request reviews via Pickaroo](https://newjersey.github.io/innovation-engineering/guides/action-pickaroo/)
1. If agency-owned AWS accounts for the project have not yet been provisioned, or you would prefer to try thing out in NJIA's AWS account, it might be easier/make more sense to use NJIA's AWS accounts if the repo also lives in https://github.com/newjersey.
1. We have an engineering principle of being [open/public by default and closed/private when necessary](https://docs.google.com/document/d/1G3Vx0J5zwTqrKF7iyej_KtBHF__rf7wrL_5RZ6rnJgw/edit?tab=t.0#heading=h.b0umhm4n3ckq), in the interest of transparency and knowledge sharing. We thus prefer keeping repositories open source. However, some agencies may have a blanket policy of keeping all repositories private.
1. GitHub configurations that require organizational admins (e.g. adding apps like renovatebot, AWS integration) will have to go through the agency's GitHub admin(s), instead of NJIA Tech Ops. Depending on the permissions granted for the repository, configurations that require repository admin (e.g. setting up branch protection) may also have to go throuh the agency's GitHub admins.

However, migrating a repository later in a project can come with some downsides:

1. Needing to do the migration at all
2. Need to re-premission reconfigure any applications, e.g. renovatebot, AWS integrations
3. Most engineers don't have admin access to repositories in https://github.com/newjersey. However, you might be granted admin access to your repository in the agency account. So you might actually have more control and permissions on the agency repository, e.g. to add branch protections, change settings, or adjust access levels without having to go through NJIA Tech Ops.

### Migrating a Gihub repo to a different organization

### Setting up ssh keys for two GitHub organizations

See [working in multiple Github Orgs](https://newjersey.github.io/innovation-engineering/guides/development/working-in-multiple-github-orgs/).

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

See [this thread for additional conversation and considerations](https://njcio.slack.com/archives/C081SRUNN2U/p1765564663581579).

### We have not figured out how to @-mention people on shared Microsoft Online documents

One option is to get an agency email account. However, a separate account means a separate calendar that is not synced with your NJIA calendar.

### Microsoft Online is not as online-first as Google Workspace

undo online is finicky

slow

integrations with extensions

Less likely for engineers, but the presence of local copies means that heavy edits to a word doc can cause the file to branch into two copies

### Teams calls do not allow screen annotations while controlling the shared screen

Microsoft teams has a tool to enable people to draw and annotate on a shared screen.

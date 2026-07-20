---
title: Set up Claude Desktop
description:
  Configure the Claude desktop app to use Amazon Bedrock as its inference
  backend so credentials and usage stay in your AWS account.
---

This guide shows you how to set up the Claude desktop app for third-party
(3P) inference through Amazon Bedrock, so credentials and usage stay in your
AWS account instead of an Anthropic consumer account.

You need to have requested access to an AWS account in order to use this
tool, which means you will have needed to complete your state cybersecurity
training.

:::caution

Claude Desktop is not a supported tool or service, and while AWS itself is a
procured platform, Claude Desktop is not a procured tool. Support for this
tool by Tech Ops or other engineers is limited, and you may run into issues
with this tool.

Access to this tool should be considered _preliminary_ and under general
guidelines for _pilot tools and services_: tentative approval for use of the
tool may be removed at any time, and access may be conditional based on
survey responses, cost approvals from your director or the finance team, and
other factors.

If you would like to see Claude Desktop become a procured service, please
speak with your director.

:::

## Before you begin

Confirm:

- You know which AWS account will fund your work:
  - `Innov-Dev` for BizX
  - `Innov-RES-Dev` for ResX engineering
  - `Innov-RES-Sandbox` for ResX product, content, or design work
- You have a budget in mind for your AI spend on that account.

If you're looking for the analogous CLI setups instead, see
[Configure Claude Code](/innovation-engineering/guides/development/claude-code-bedrock/)
or [Configure Codex](/innovation-engineering/guides/development/codex/).

---

## Step 1: Open a Platform Access ticket

Go to [newjersey/internal-ops](https://github.com/newjersey/internal-ops),
scroll down to **Platform Access**, and click it to open a new ticket. In the
ticket:

- Identify the AWS account that will support your work (see
  [Before you begin](#before-you-begin)).
- Give yourself a budget for AI spend.

:::note

If you don't already have access to the AWS account you named, you'll be
provisioned with access to it as part of this request.

:::

## Step 2: Install Homebrew and Claude Desktop

While your access request is pending, install [Homebrew](https://brew.sh) and
Claude Desktop through its Homebrew cask:

```zsh
brew install --cask claude
```

## Step 3: Set up AWS SSO

Complete
[Set up AWS CLI with SSO](/innovation-engineering/guides/development/aws-sso/)
to authenticate to AWS. Name your profile after the AWS account you selected
in Step 1 (e.g. `Innov-RES-Dev`), per the profile-naming guidance in that
guide.

Verify you can authenticate before continuing:

```zsh
aws sts get-caller-identity --profile <your-profile>
```

## Step 4: Install the managed configuration profile

Once your AWS access is provisioned, the Tech Ops team will share a
`.mobileconfig` file (macOS) or `.reg` file (Windows) with you. This profile
points Claude Desktop at Amazon Bedrock using the provider, endpoint, and
credential values for your AWS account.

:::note[Tech Ops]

The current `.mobileconfig` and `.reg` files are kept in
[this Google Drive folder](https://drive.google.com/drive/u/0/folders/1bGb3U9D7dHDuqmS6OPQiXdkzdnxrfSMq).
To generate new ones (e.g. for other AWS accounts, or with different model
identifiers), follow Anthropic's
[Installation and setup](https://claude.com/docs/third-party/claude-desktop/installation)
and
[Configuration reference](https://claude.com/docs/third-party/claude-desktop/configuration)
docs.

:::

:::note

Installing and applying the profile, and general day-to-day use of Claude
Desktop, is covered by Anthropic's own documentation, not this guide. Start
with
[Claude Desktop on 3P: Overview](https://claude.com/docs/third-party/claude-desktop/overview),
then follow
[Installation and setup](https://claude.com/docs/third-party/claude-desktop/installation)
to apply the profile Tech Ops shared with you. See
[Sources](#sources) below for more of Anthropic's Claude 3P documentation.

:::

## Daily use

Each day you want to use Claude Desktop:

1. Open a terminal and re-authenticate: `aws sso login --profile <your-profile>`.
2. Open the Claude desktop app and confirm it can communicate with AWS (send
   a test message).

For AWS SSO issues (login failures, missing config values, expired
sessions), see
[Set up AWS CLI with SSO: Troubleshooting](/innovation-engineering/guides/development/aws-sso/#troubleshooting).

## Reporting usage

- **Each day**, report your Claude usage to a spreadsheet you keep for this
  purpose.
- **Each month**, share your total usage and your budget (set in
  [Step 1](#step-1-open-a-platform-access-ticket)) with the finance team.

---

## Sources

For installing and using Claude Desktop on 3P, see Anthropic's documentation:

- [Overview](https://claude.com/docs/third-party/claude-desktop/overview)
- [Installation and setup](https://claude.com/docs/third-party/claude-desktop/installation)
- [Configuration reference](https://claude.com/docs/third-party/claude-desktop/configuration)
- [Telemetry and egress](https://claude.com/docs/third-party/claude-desktop/telemetry)

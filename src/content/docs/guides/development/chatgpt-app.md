---
title: Configure ChatGPT app
description:
  Configure the ChatGPT desktop app to use Amazon Bedrock as its model
  provider through the local Codex configuration.
---

This guide shows you how to use the ChatGPT desktop app with Amazon Bedrock
through its local Work/Codex integration, so credentials and usage stay in
your AWS account instead of using an OpenAI consumer account or API key for
model requests.

Complete [Configure Codex](/innovation-engineering/guides/development/codex/)
before following this guide. The Codex guide is the source of truth for AWS
access, Bedrock model configuration, and general troubleshooting. This guide
covers the additional configuration needed by the ChatGPT desktop app.

You need to have requested access to an AWS account in order to use this tool,
which means you will have needed to complete your state cybersecurity
training.

:::caution

ChatGPT app and its local Work/Codex integration are not supported tools or
services. While AWS itself is a procured platform, ChatGPT app is not a
procured tool. Support for this tool by Tech Ops or other engineers is
limited, and you may run into issues with it.

Access to this tool should be considered _preliminary_ and under general
guidelines for _pilot tools and services_: tentative approval for use of the
tool may be removed at any time, and access may be conditional based on survey
responses, cost approvals from your director or the finance team, and other
factors.

If you would like to see this tool become a procured service, please speak
with your director.

:::

## Before you begin

Confirm:

- You have completed [Set up AWS CLI with SSO](/innovation-engineering/guides/development/aws-sso/)
  and can authenticate to AWS.
- You have completed the setup in
  [Configure Codex](/innovation-engineering/guides/development/codex/).
- Homebrew is installed (`brew --version`).
- You know which AWS account will fund your work and have a budget in mind
  for your AI spend.

This guide targets the macOS ChatGPT desktop app. It does not configure the
ordinary ChatGPT conversation surface.

## Step 1: Install ChatGPT app

Install the official ChatGPT desktop app with Homebrew:

```zsh
brew install --cask chatgpt
```

If ChatGPT app is already installed, continue to the next step.

## Step 2: Configure the AWS profile for ChatGPT app

The ChatGPT desktop app may not inherit AWS environment variables from your
shell. Add the AWS profile and Bedrock Region to the user-level Codex
environment file:

```zsh
mkdir -p ~/.codex
```

Create or edit `~/.codex/.env`:

```text
AWS_PROFILE=<profile-name>
AWS_REGION=us-east-2
```

Replace `<profile-name>` with the AWS SSO profile you configured in the Codex
guide, such as `Innov-Dev` or `Innov-RES-Dev`.

Do not put access keys, secret keys, or session tokens in this file. The
configured AWS SSO profile should provide credentials through your local AWS
configuration and SSO cache.

:::caution[Choose the billing profile deliberately]

`AWS_PROFILE` determines which AWS account pays for model usage in the
ChatGPT desktop app. The app reads one user-level profile from `~/.codex/.env`,
so this setup is intended for one active billing source at a time.

To change billing sources later, edit `AWS_PROFILE` in `~/.codex/.env` and
fully restart ChatGPT app. Switching profiles is possible, but it is not as
convenient as passing a different `AWS_PROFILE` value when starting Codex from
a terminal.

:::

## Step 3: Authenticate with AWS SSO

Log in to the profile configured in `~/.codex/.env`:

```zsh
aws sso login --profile <profile-name>
```

Verify that the profile points to the AWS account you intend to use:

```zsh
aws sts get-caller-identity --profile <profile-name>
```

Expected result: AWS prints the account ID and role ARN for the profile that
will fund and authorize your Bedrock requests.

For AWS SSO issues, see
[Set up AWS CLI with SSO: Troubleshooting](/innovation-engineering/guides/development/aws-sso/#troubleshooting).

## Step 4: Restart ChatGPT app and test

Fully quit ChatGPT app and reopen it so the desktop process reads the updated
`~/.codex/.env` file.

Open the local Work/Codex surface and send a test message, such as:

> Reply with exactly: chatgpt-app-ok

Expected result: the app returns `chatgpt-app-ok` without an AWS
authentication, Region, or model access error.

If the request fails:

1. Confirm `AWS_PROFILE` in `~/.codex/.env` matches the profile that passed
   `aws sts get-caller-identity`.
2. Run `aws sso login --profile <profile-name>` again.
3. Fully quit and reopen ChatGPT app.
4. Recheck the Bedrock model and Region configuration in
   [Configure Codex](/innovation-engineering/guides/development/codex/).

## Daily use

Each day you want to use ChatGPT app with Bedrock:

1. Re-authenticate if your AWS SSO session has expired:
   `aws sso login --profile <profile-name>`.
2. Open ChatGPT app.
3. Use the local Work/Codex surface and confirm that requests succeed.

If you change the AWS profile or Region in `~/.codex/.env`, fully restart
ChatGPT app before sending another message.

## Sources

For the shared Codex and Bedrock setup, see
[Configure Codex](/innovation-engineering/guides/development/codex/).

For the ChatGPT desktop app's Amazon Bedrock integration, see the official
[Amazon Bedrock documentation for ChatGPT Work and Codex](https://learn.chatgpt.com/docs/amazon-bedrock).

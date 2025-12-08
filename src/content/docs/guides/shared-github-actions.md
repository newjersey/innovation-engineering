---
title: Shared GitHub Action workflows
description: A collection of documentation for our shared workflows
---

We have a group of shared GitHub Actions unsed to host commonly used workflows to improve the efficiency of your projects.

View the [innovation-shared-actions repository (internal)](https://github.com/newjersey/innovation-shared-actions).

## Slack notification

This is a GitHub Actions workflow that sends notifications to Slack channels. It supports posting a primary message and an optional threaded follow-up message. Repositories within the same GitHub organization can call this workflow to standardize Slack notifications across teams.

### How it works

The Slack Notification workflow wraps the official `slackapi/slack-github-action@v2` integration. It sends:

1. A primary Slack message to a specified channel
2. An optional threaded message using the timestamp of the first message

It calls Slack’s chat.postMessage API method under the hood. Read more at the [Slack action notification](https://docs.slack.dev/tools/slack-github-action/sending-techniques/sending-data-slack-api-method/).

### Requirements

#### Repo must be in the same organization

This workflow consumes an organization-level secret. GitHub only allows access to shared workflow secrets if the calling repository is in the same GitHub org.

#### Add the Slack notification bot to your Slack channel

Slack will block messages unless the bot is a member of the channel.

To add the bot:

1. Open the Slack channel
2. Add "Notification Bot" to the channel
3. Ensure the bot appears in the channel’s integrations list

If you need to make changes to the Slack bot or need to access the key directly, reach out to Tech Ops so you can be added as a collaborator.

#### Required secret: SLACK_OAUTH_TOKEN

The workflow expects a secret named: `SLACK_OAUTH_TOKEN` (this is already installed)

This is configured as an organization secret, accessible to any repo using the workflow.

### Inputs

| Name             | Required | Type   | Description                          |
|------------------|----------|--------|--------------------------------------|
| `channel_id`     | Yes      | string | Slack channel ID (ex: `C09Q34G9HMX`).|
| `message`        | Yes      | string | Main message posted to the channel.  |
| `thread_message` | No       | string | Optional threaded message.           |

### Using this workflow in your repository

Create a new workflow file, e.g. `.github/workflows/notify.yml`:

```yaml
name: 'Notify Slack'

on:
    workflow_dispatch: ## replace this with how you want to trigger the notification

jobs:
    request-pr-review:
        uses: newjersey/innovation-shared-actions/.github/workflows/slack.yml@main
        with:
            channel_id: C09Q34G9HMX
            message: "Something cool happened!"
            thread_message: "And everything is great!" # optional
        secrets: inherit
```

### References for the Slack notification workflow

- [Slack notification workflow](https://github.com/newjersey/innovation-shared-actions/blob/main/.github/workflows/slack.yml)
- [Example notification implementation](https://github.com/newjersey/njwds/blob/main/.github/workflows/pr-review.yml#L13)
- [Example Slack notification](https://njcio.slack.com/archives/C09Q36G9HMX/p1763758012713669)
- [Slack app (access required)](https://api.slack.com/apps/A09QJADPX32/general)

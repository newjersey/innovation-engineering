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

| Name             | Required | Type   | Description                           |
| ---------------- | -------- | ------ | ------------------------------------- |
| `channel_id`     | Yes      | string | Slack channel ID (ex: `C09Q34G9HMX`). |
| `message`        | Yes      | string | Main message posted to the channel.   |
| `thread_message` | No       | string | Optional threaded message.            |

### Using this workflow in your repository

Create a new workflow file, e.g. `.github/workflows/notify.yml`:

```yaml
name: "Notify Slack"

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

## Pickaroo Auto Request Reviewers

A common workflow at the office is to request a couple random reviews from engineers that are part of the broader initiative (i.e. ResX or BizX), but are external to the given project. You can use this action to accomplish this!

### How it Works

This GitHub Action selects and assigns PR reviewers from GitHub groups.

The Pickaroo action at `.github/actions/pickaroo/action.yml` will randomly select reviewers from the included team(s) who are collaborators on the repository, ignoring anyone in the excluded team(s). It will not pick the PR author, and will not pick anyone who has already been requested for review.

It might, however, pick people who have already submitted a review (this is an edge case to polish).

### Requirements

- Install the [OOI Pull Request Github App](https://github.com/apps/ooi-pull-request-app) in your repository. This might require creating a [Tech-Ops ticket](https://github.com/newjersey/internal-ops/issues/new/choose)!

### Inputs and Secrets

| Name                  | Required | Type   | Description                                                                                                                           |
| --------------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `include-teams`       | Yes      | string | The github teams to pick reviewers from (space delimited) Must be a [New Jersey GitHub Team](https://github.com/orgs/newjersey/teams) |
| `exclude-teams`       | No       | string | The github teams to exclude reviewers from (space delimited)                                                                          |
| `number-of-reviewers` | No       | string | The number of reviewers to select, defaults to 1                                                                                      |
| `token`               | Yes      | string | Github token with org:teams:read and repo:pull_requests:write permissions.                                                            |

### Using this workflow in your repository

Create a new workflow file, e.g. `.github/workflows/request-reviewers.yml`. You likely don't want to auto-request reviewers for _every_ pull request, so you'll want to create a workflow separate from your primary 'CI' workflow, and trigger it based on labels:

```yaml
name: Pickaroo Reviewers

on:
  pull_request:
    types: ["labeled"]

jobs:
  request-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    if: contains(github.event.pull_request.labels.*.name, 'request-review')

    steps:
      - uses: actions/checkout@v6
        # you need this action to create a token using a Github App
      - name: Generate GitHub App Token
        id: generate_token
        uses: actions/create-github-app-token@29824e69f54612133e76f7eaac726eef6c875baf # v2.2.1
        with:
          app-id: "2454947"
          private-key: ${{ secrets.OOI_PULL_REQUEST_APP }}
      - name: Pickaroo Reviewers
        uses: newjersey/innovation-shared-actions/.github/actions/pickaroo@main
        with:
          include-teams: "innovation-engineering"
          exclude-teams: "my-project-team some-other-team" # multiple teams are space-delimited
          number-of-reviewers: 2
          token: ${{ steps.generate_token.outputs.token }}
```

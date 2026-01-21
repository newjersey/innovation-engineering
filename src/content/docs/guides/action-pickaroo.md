---
title: GH Action - Request reviewers with Pickaroo
description: Using either a workflow or an action to automate pull request reviewers with Slack notifications
---

We have a collection of GitHub Actions that can be used to implement common Workflows to improve the efficiency of your projects. Alongside these Actions are also pre-configured Workflows that implement the most common of these, for your convenience.

View the [innovation-shared-actions repository (internal)](https://github.com/newjersey/innovation-shared-actions).

## Pickaroo reviewers workflow

A common workflow at the office is to request a couple random reviews from engineers that are part of the broader initiative (i.e. ResX or BizX), but are external to the given project. This workflow automates that process and sends a Slack notification to a given channel, tagging the selected reviewers.

### How it works

The Pickaroo Reviewers workflow provides a complete solution for automated PR review assignment:

1. Randomly selects reviewers from specified GitHub teams and/or individual users and assigns them to the PR.
   - in addition to the exclude filters, it filters out any potential reviewers whose slack status shows as Sick, OOO, or on leave.
2. Maps the selected reviewers to their Slack user id's so they can be tagged in a Slack message.
3. Sends a formatted Slack message of the PR details, and mentions the reviewers in a threaded message.
   - supports re-selecting additional reviewers on subsequent runs and tagging new reviewers in the same thread.
4. Conveniently removes any labels that were added to the PR in in order to trigger the workflow run
5. Supports a `show` parameter (see our guidance on [Ship/Show/Ask](/innovation-engineering/reference/code-review)) to simply notify the given channel and skip selecting reviewers.

The results look something like this:
![A slack message thread created by the Pickaroo Workflow to notify PR reviewers](/src/assets/pickaroo-example.webp)

### Requirements

#### Install the OOI Pull Request GitHub App

- Install the [OOI Pull Request Github App](https://github.com/apps/ooi-pull-request-app) in your repository. This might require creating a [Tech-Ops ticket](https://github.com/newjersey/internal-ops/issues/new/choose)!

#### Repo must be in the same organization

This workflow consumes organization-level secrets. GitHub only allows access to shared workflow secrets if the calling repository is in the same GitHub org.

#### Add the Slack notification bot to your Slack channel

Slack will block messages unless the bot is a member of the channel.

To add the bot:

1. Open the Slack channel
2. Add "Notification Bot" to the channel
3. Ensure the bot appears in the channel's integrations list

#### Required secrets

The workflow expects these secrets (already configured at the organization level):

- `OOI_PULL_REQUEST_APP` - Private key for the GitHub App
- `SLACK_OAUTH_TOKEN` - Slack OAuth token for sending messages

### Inputs

| Name                  | Required | Type    | Description                                                                                                                           |
| --------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `include_teams`       | No       | string  | The github teams to pick reviewers from (space delimited) Must be a [New Jersey GitHub Team](https://github.com/orgs/newjersey/teams) |
| `exclude_teams`       | No       | string  | The github teams to exclude reviewers from (space delimited)                                                                          |
| `include_users`       | No       | string  | Individual GitHub usernames to include (space delimited)                                                                              |
| `exclude_users`       | No       | string  | Individual GitHub usernames to exclude (space delimited)                                                                              |
| `number_of_reviewers` | No       | number  | The number of reviewers to select, defaults to 1                                                                                      |
| `number_of_repicks`   | No       | number  | The number of reviewers to select on subsequent runs of pickaroo, defaults to 1                                                       |
| `show`                | No       | boolean | If true, only post a Slack message without selecting reviewers                                                                        |
| `channel_id`          | Yes      | string  | The Slack Channel ID to notify                                                                                                        |

| `show`

### Using this workflow in your repository

Create a new workflow file, e.g. `.github/workflows/request-reviewers.yml`. You likely don't want to auto-request reviewers for _every_ pull request, and especially not every update, so you'll want to create a workflow separate from your primary 'CI' workflow, and trigger it based on labels:

```yaml
name: Pickaroo Reviewers

on:
  pull_request:
    types: ["labeled"]

jobs:
  pr-review:
    if: contains(github.event.pull_request.labels.*.name, 'pr-review')
    uses: newjersey/innovation-shared-actions/.github/workflows/pickaroo.yml@main
    with:
      include_teams: "innovation-engineering"
      exclude_teams: "my-project-team some-other-team" # multiple items are space-delimited
      include_users: "specific-user another-user"
      exclude_users: "some_non-dev_user_included_in_the_above_teams"
      number_of_reviewers: 2
      channel_id: "C09Q34G9HMX"
    secrets: inherit
  pr-show:
    if: contains(github.event.pull_request.labels.*.name, 'pr-show')
    uses: newjersey/innovation-shared-actions/.github/workflows/pickaroo.yml@main
    with:
      show: true
      channel_id: "C09Q34G9HMX"
    secrets: inherit
```

## Pickaroo action

For more complex workflows or custom integrations, you can use the underlying Pickaroo action directly. This gives you control over the reviewer selection process, however this isn't recommended as there are many other features of the pickaroo workflow other than just review selection that you'll miss out on, and you'll be stuck with maintaining your own version. If the existing workflow doesn't fit your needs, suggest an improvement in #engineering-all!

### How it works

The Pickaroo action handles the core reviewer selection logic:

1. It creates a combined list of potential reviewers that are members of the included teams / users, and omits users that are part of the excluded teams/members, authored the PR, or have already had a review requested.
2. Optionally also filters out users based on their slack statuses of OOO, sick, or on leave.
3. Randomly selects the specified number of reviewers
4. Adds them as requested reviewers to the pull request
5. Outputs the selected reviewers for use in subsequent workflow steps

### Requirements

#### GitHub Token with proper permissions

You'll need a GitHub token with:

- `org:teams:read` permissions (to read team memberships)
- `repo:pull_requests:write` permissions (to assign reviewers)

This is typically provided by the OOI Pull Request GitHub App which, just as with the above workflow, you'll need installed in your repository.

### Inputs

| Name                   | Required | Type   | Description                                                                                                             |
| ---------------------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `include_teams`        | No       | string | The github teams to pick reviewers from (space delimited)                                                               |
| `exclude_teams`        | No       | string | The github teams to exclude reviewers from (space delimited)                                                            |
| `include_users`        | No       | string | Individual GitHub usernames to include (space delimited)                                                                |
| `exclude_users`        | No       | string | Individual GitHub usernames to exclude (space delimited)                                                                |
| `number_of_reviewers`  | No       | string | The number of reviewers to select, defaults to "1"                                                                      |
| `token`                | Yes      | string | Github token with org:teams:read and repo:pull_requests:write permissions                                               |
| `github_slack_mapping` | No       | string | A JSON map of github usernames to Slack IDs. Used to filter out reviewers that are out of office based on Slack status. |
| `slack_token`          | No       | string | Required if you provide a value to `github_slack_mapping`                                                               |

### Outputs

| Name        | Description                                           |
| ----------- | ----------------------------------------------------- |
| `reviewers` | Space-delimited string of selected reviewer usernames |

### Using this action in your repository

```yaml
name: Custom Reviewer Assignment

on:
  pull_request:
    types: ["labeled"]

jobs:
  assign-reviewers:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    if: contains(github.event.pull_request.labels.*.name, 'request-review')
    outputs:
      reviewers: ${{ steps.external-reviewers.outputs.reviewers }} ${{ steps.internal-reviewers.outputs.reviewers }}

    steps:
      - uses: actions/checkout@v6

      - name: Generate GitHub App Token
        id: generate_token
        uses: actions/create-github-app-token@29824e69f54612133e76f7eaac726eef6c875baf # v2.2.1
        with:
          app-id: "2454947"
          private-key: ${{ secrets.OOI_PULL_REQUEST_APP }}

      - name: Select Internal Reviewers
        id: internal-reviewers
        uses: newjersey/innovation-shared-actions/.github/actions/pickaroo@main
        with:
          include_teams: "my-project-team"
          number_of_reviewers: 1
          token: ${{ steps.generate_token.outputs.token }}

      - name: Select External Reviewers
        id: external-reviewers
        uses: newjersey/innovation-shared-actions/.github/actions/pickaroo@main
        with:
          include_teams: "innovation-engineering"
          exclude_teams: "my-project-team"
          number_of_reviewers: 2
          token: ${{ steps.generate_token.outputs.token }}

  notify-slack:
    needs: assign-reviewers
    if: needs.assign-reviewers.outputs.reviewers != ''
    uses: newjersey/innovation-shared-actions/.github/workflows/slack.yml@main
    with:
      channel_id: "C09Q34G9HMX"
      message: "[ <${{ github.event.pull_request.html_url }}|PR Review> ] ${{ github.event.repository.name }} - #${{ github.event.pull_request.number }}: ${{ github.event.pull_request.title }}"
      thread_message: "Hey ${{ needs.assign-reviewers.outputs.reviewers }}! Please review the above pull request 🙏"
    secrets: inherit
```

### References

- [Pickaroo workflow](https://github.com/newjersey/innovation-shared-actions/blob/main/.github/workflows/pickaroo.yml)
- [Pickaroo action](https://github.com/newjersey/innovation-shared-actions/blob/main/.github/actions/pickaroo/action.yml)
- [OOI Pull Request GitHub App](https://github.com/apps/ooi-pull-request-app)

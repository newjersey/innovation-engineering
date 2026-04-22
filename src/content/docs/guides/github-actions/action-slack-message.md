---
title: Send a Slack message
description: Using either a workflow or an action to send Slack messages from GitHub Actions
---

We have a collection of GitHub Actions that can be used to implement common Workflows to improve the efficiency of your projects. Alongside these Actions are also pre-configured Workflows that implement the most common of these, for your convenience.

View the [innovation-shared-actions repository (internal)](https://github.com/newjersey/innovation-shared-actions).

## Slack notification workflow

This is a GitHub Actions workflow that sends notifications to Slack channels. It supports posting a primary message and an optional threaded follow-up message. Repositories within the same GitHub organization can call this workflow to standardize Slack notifications across teams.

### How it works

The Slack Notification workflow wraps our custom `slack-message` action, which calls the Slack API directly. It sends:

1. A primary Slack message to a specified channel
2. An optional threaded message using the timestamp of the first message

It calls Slack's `chat.postMessage` API method under the hood. Read more at the [Slack API docs](https://api.slack.com/methods/chat.postMessage).

### Requirements

#### Repo must be in the same organization

This workflow consumes an organization-level secret. GitHub only allows access to shared workflow secrets if the calling repository is in the same GitHub org.

#### Add the Slack notification bot to your Slack channel

Slack will block messages unless the bot is a member of the channel.

To add the bot:

1. Open the Slack channel
2. Add "Notification Bot" to the channel
3. Ensure the bot appears in the channel's integrations list

If you need to make changes to the Slack bot or need to access the key directly, reach out to Tech Ops so you can be added as a collaborator.

#### Required secret: SLACK_OAUTH_TOKEN

The workflow expects a secret named: `SLACK_OAUTH_TOKEN` (this is already installed)

This is configured as an organization secret, accessible to any repo using the workflow.

### Inputs

The workflow accepts all the same inputs as the action (see below), minus `token` which is handled automatically via the org secret.

| Name                  | Required | Type   | Description                                                                           |
| --------------------- | -------- | ------ | ------------------------------------------------------------------------------------- |
| `channel_id`          | Yes      | string | Slack channel ID (ex: `C09Q34G9HMX`).                                                 |
| `message`             | \*       | string | Main message posted to the channel. Required unless `message_ts` is provided.         |
| `message_ts`          | No       | string | Timestamp of an existing message to update and/or reply to in thread.                 |
| `thread_message`      | No       | string | Optional threaded message.                                                            |
| `username`            | No       | string | Display name to post the main message as.                                             |
| `avatar_url`          | No       | string | Avatar image URL for the main message. Takes priority over `avatar_emoji`.            |
| `avatar_emoji`        | No       | string | Slack emoji for the main message avatar (e.g. `:kangaroo:`).                          |
| `thread_username`     | No       | string | Display name to post the threaded message as.                                         |
| `thread_avatar_url`   | No       | string | Avatar image URL for the threaded message. Takes priority over `thread_avatar_emoji`. |
| `thread_avatar_emoji` | No       | string | Slack emoji for the threaded message avatar.                                          |

:::note
One or both of `message` or `message_ts` must be provided. When `message_ts` is provided without `message`, the action will thread a reply to the existing message instead of posting a new one. When both are provided, the main `message`'s content will be updated, and any provided `thread_message` will also be sent.
:::

:::caution
The `username`, `avatar_url`, `thread_username` and `thread_avatar_url` parameters give the ability to impersonate _real_ users. This should only ever be done when the running of the workflow is triggered by the person themself--in other words, it should _never_ be a surprise to someone that a Slack App is sending a message on their behalf.
:::

### Outputs

| Name         | Description                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `message_ts` | Timestamp of the main message sent. Can be used to send later messages in a thread and/or update the main message's content. |

### Using this workflow in your repository

Create a new workflow file, e.g. `.github/workflows/notify.yml`:

```yaml
name: "Notify Slack"

on:
  workflow_dispatch: ## replace this with how you want to trigger the notification

jobs:
  notify-slack:
    uses: newjersey/innovation-shared-actions/.github/workflows/slack.yml@main
    with:
      channel_id: C09Q34G9HMX
      message: "Something cool happened!"
      thread_message: "And everything is great!" # optional
    secrets: inherit
```

## Slack message action

If you find yourself limited by it, instead of using the above workflow you can use the underlying Action directly. This gives you a bit more composability for building more complex workflows.

### How it works

The action handles:

1. Sending a primary message to a Slack channel
2. Updating an existing message (when `message_ts` is provided along with `message`)
3. Optionally sending a threaded reply using the timestamp from the first message
4. Returning the message timestamp for potential use in subsequent steps
5. Optionally impersonating a user by overriding the bot's display name and avatar

### Requirements

#### Slack OAuth Token

You'll need access to a Slack OAuth token with the necessary permissions to post messages. Likely, the organization secret `SLACK_OAUTH_TOKEN` will be sufficient, if not, you'll need to create another Slack Bot or request additional permissions for the existing one.

#### Bot must be added to the channel

Same requirement as the workflow - the Slack bot must be a member of the target channel.

### Inputs

All inputs can alternatively be provided as `CAPITAL_CASE` environment variables (e.g., `CHANNEL_ID`, `MESSAGE`). Environment variables take priority over action inputs, which makes this action flexible for use in multi-step workflows where values are computed in earlier steps and written to `$GITHUB_ENV`.

| Name                  | Required | Type   | Description                                                                                    |
| --------------------- | -------- | ------ | ---------------------------------------------------------------------------------------------- |
| `channel_id`          | Yes      | string | Slack channel ID (ex: `C09Q34G9HMX`).                                                          |
| `message`             | \*       | string | Main message posted to the channel. Required unless `message_ts` is provided.                  |
| `message_ts`          | No       | string | Timestamp of an existing message to update and/or reply to in thread.                          |
| `thread_message`      | No       | string | Optional threaded message.                                                                     |
| `token`               | Yes      | string | Slack OAuth token.                                                                             |
| `username`            | No       | string | Display name to post the main message as.                                                      |
| `avatar_url`          | No       | string | Avatar image URL for the main message. Takes priority over `avatar_emoji`.                     |
| `avatar_emoji`        | No       | string | Slack emoji for the main message avatar (e.g. `:kangaroo:`). Ignored when `avatar_url` is set. |
| `thread_username`     | No       | string | Display name to post the threaded message as.                                                  |
| `thread_avatar_url`   | No       | string | Avatar image URL for the threaded message. Takes priority over `thread_avatar_emoji`.          |
| `thread_avatar_emoji` | No       | string | Slack emoji for the threaded message avatar. Ignored when `thread_avatar_url` is set.          |

:::note
One or both of `message` or `message_ts` must be provided. When `message_ts` is provided without `message`, `thread_message` must be provided and the action will thread a reply to the existing message instead of posting a new one. When both are provided, the main `message`'s content will be updated, and any provided `thread_message` will also be sent.
:::

:::caution
The `username`, `avatar_url`, `thread_username` and `thread_avatar_url` parameters give the ability to impersonate _real_ users. This should only ever be done when the running of the workflow is triggered by the person themself--in other words, it should _never_ be a surprise to someone that a Slack App is sending a message on their behalf.
:::

### Outputs

| Name         | Description                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `message_ts` | Timestamp of the main message sent. Can be used to send later messages in a thread and/or update the main message's content. |

### Using this action in your repository

```yaml
name: "Custom Slack Workflow"

on:
  workflow_dispatch:

jobs:
  custom-notification:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Send Slack message
        id: slack
        uses: newjersey/innovation-shared-actions/.github/actions/slack-message@main
        with:
          channel_id: C09Q34G9HMX
          message: "Build completed successfully!"
          thread_message: "All tests passed"
          token: ${{ secrets.SLACK_OAUTH_TOKEN }}

      - name: Use message timestamp
        run: |
          echo "Message sent at: ${{ steps.slack.outputs.message_ts }}"
```

#### Using environment variables instead of inputs

When your message content is computed dynamically (e.g., from a previous step), you can set environment variables instead of passing inputs directly:

```yaml
- name: Build message
  run: |
    echo "MESSAGE=Deploy of ${{ github.sha }} succeeded" >> "$GITHUB_ENV"
    echo "CHANNEL_ID=C09Q34G9HMX" >> "$GITHUB_ENV"
    echo "TOKEN=${{ secrets.SLACK_OAUTH_TOKEN }}" >> "$GITHUB_ENV"

- name: Send Slack message
  uses: newjersey/innovation-shared-actions/.github/actions/slack-message@main
```

#### Impersonating a user

```yaml
- name: Send as deploy author
  uses: newjersey/innovation-shared-actions/.github/actions/slack-message@main
  with:
    channel_id: C09Q34G9HMX
    message: "I just deployed to production!"
    username: "jviall"
    avatar_url: "https://avatars.githubusercontent.com/u/12345"
    thread_message: "Details in the thread"
    thread_username: "Deploy Bot"
    thread_avatar_emoji: ":rocket:"
    token: ${{ secrets.SLACK_OAUTH_TOKEN }}
```

### References

- [Slack notification workflow](https://github.com/newjersey/innovation-shared-actions/blob/main/.github/workflows/slack.yml)
- [Slack message action](https://github.com/newjersey/innovation-shared-actions/blob/main/.github/actions/slack-message/action.yml)
- [Example notification implementation](https://github.com/newjersey/njwds/blob/main/.github/workflows/pr-review.yml#L13)
- [Example Slack notification](https://njcio.slack.com/archives/C09Q36G9HMX/p1763758012713669)
- [Slack API: chat.postMessage](https://api.slack.com/methods/chat.postMessage)
- [Slack app (access required)](https://api.slack.com/apps/A09QJADPX32/general)

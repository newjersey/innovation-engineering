---
title: GH Action - Lookup Slack users by Github username
description: Using an action to find the NJIA slack users associated with the given github usernames
---

We have a collection of GitHub Actions that can be used to implement common Workflows to improve the efficiency of your projects. Alongside these Actions are also pre-configured Workflows that implement the most common of these, for your convenience.

View the [innovation-shared-actions repository (internal)](https://github.com/newjersey/innovation-shared-actions).

## Slack User Lookup Action

This github action can be used to find the Slack users associated with a list of GitHub usernames. It's intended to utilize an org-level variable in GitHub that stores the mappings of GitHub usernames to Slack user IDs.

### How it works

The action simply receives a list of github usernames and for any matches inside the provided mapping, returns a correctly formatted slack mention for use in another action, such as the [Send Slack Message](/innovation-engineering/guides/action-slack-message). For any usernames that it doesn't find a match for, it returns them separately, untouched. For convenience it also outputs all matched and unmatched usernames as a formatted, comma-delimited string.

### Inputs

| Name                   | Required | Type   | Description                                                                                                                                                                           |
| ---------------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `github_usernames`     | Yes      | string | Space-delimited string of GitHub users to lookup.                                                                                                                                     |
| `github_slack_mapping` | Yes      | string | A raw JSON string that represents a mapping of GitHub username keys to Slack User ID values. Most of the time you'll want to use our preconfigured org variable, `GH_SLACK_USER_MAP`. |

### Outputs

| Name               | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| `slack_users`      | JSON array of Slack user IDs that were matched                                                           |
| `github_users`     | JSON array of GitHub usernames that couldn't be matched                                                  |
| `formatted_string` | Comma-separated string of formatted mentions (Slack users as <@ID>, unmatched GitHub users as @username) |

### Using this action in your repository

```yaml
name: "Custom Slack Workflow"

on:
  workflow_dispatch:

jobs:
  custom-notification:
    runs-on: ubuntu-latest
    steps:
      - name: Send Slack message
        id: slack-lookup
        uses: newjersey/innovation-shared-actions/.github/actions/lookup-slack-users@main
        with:
          github_usernames: "jviall aloverso"
          github_slack_mapping: ${{ vars.GH_SLACK_USER_MAP }}

      - name: Format the output
        id: format
        shell: bash
        run: |
          # Build formatted string with mentions
          SLACK_MENTIONS=$(echo "$SLACK_USERS" | jq -r -s '(.[0] | map("<@" + . + ">")) | join(", ")')
          echo "slack_mentions=$SLACK_MENTIONS" >> $GITHUB_OUTPUT

      - name: Use the result in a slack message with mentions
        id: send-slack-message
        uses: newjersey/innovation-shared-actions/.github/actions/slack-message@main
        with:
          channel_id: C09Q34G9HMX
          message: "These are all the Slack users I found: ${{ steps.format.outputs.slack_mentions }}"
          thread_message: "And here's everyone, matched or not: ${{ steps.slack-lookup.outputs.formatted_string}}. So easy to use cause I didn't have to format them myself!"
          token: ${{ secrets.SLACK_OAUTH_TOKEN }}
```

### References for the Slack notification workflow

- [Slack notification workflow](https://github.com/newjersey/innovation-shared-actions/blob/main/.github/workflows/slack.yml)
- [Slack message action](https://github.com/newjersey/innovation-shared-actions/blob/main/.github/actions/slack-message/action.yml)
- [Example notification implementation](https://github.com/newjersey/njwds/blob/main/.github/workflows/pr-review.yml#L13)
- [Example Slack notification](https://njcio.slack.com/archives/C09Q36G9HMX/p1763758012713669)
- [Slack app (access required)](https://api.slack.com/apps/A09QJADPX32/general)

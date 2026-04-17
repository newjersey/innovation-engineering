---
title: Configure Claude Code
description:
  Use Amazon Bedrock as the Claude Code backend so credentials stay in your AWS
  account (SSO/IAM) instead of using an Anthropic API key.
---

This guide shows you how to use Amazon Bedrock as the Claude Code backend so
credentials stay in your AWS account (SSO/IAM), instead of using an Anthropic
API key.

You need to have requested access to an AWS account in order to use this tool, which means you will have needed to complete your state cybersecurity training.

:::caution

Claude Code is not a supported tool or service, and while AWS itself is a procured platform, Claude Code is not a procured tool. Support for this tool by Tech Ops or other engineers is limited, and you may run into issues with this tool, especially if you're not on Claude Code's stable branch.

Access to this tool should be considered _preliminary_ and under general guidelines for _pilot tools and services_: tentative approval for use of the tool may be removed at any time, and access may be conditional based on survey responses, cost approvals from your director or the finance team, and other factors.

If you would like to see Claude or Claude Code become a procured service, please speak with your director.

:::

## Before you begin

Confirm:

- Claude Code is installed (`claude --version`)
  - Install via Homebrew if not installed (`brew install --cask claude-code`)
- You can authenticate to AWS. (If you haven't set up AWS SSO yet, follow
  [Set up AWS CLI with SSO](/innovation-engineering/guides/development/aws-sso/) first.)

For a full list of supported environment variables and settings keys, see
[Amazon Bedrock configuration reference](https://docs.anthropic.com/en/docs/claude-code/bedrock).

---

## Step 1: Set required variables

Claude Code needs:

- `CLAUDE_CODE_USE_BEDROCK=1`
- `AWS_REGION` (do not rely on `~/.aws/config` defaults)

### Recommended: `~/.claude/settings.json`

You will create or edit `~/.claude/settings.json` as part of Step 2. Each
authentication method below includes the complete file with these two variables
already included alongside any credential-specific variables.

### Quick test: shell env (zsh)

```zsh
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
```

Expected result: new `claude` processes inherit these variables.

## Step 2: Authenticate to AWS (choose one)

:::note

**Credential precedence:** If `AWS_ACCESS_KEY_ID` /
`AWS_SECRET_ACCESS_KEY` are set in your environment, they typically override
profile-based credentials (`AWS_PROFILE`). Unset them if you want `AWS_PROFILE`
to take effect.

:::

### Recommended: AWS CLI SSO profile (IAM Identity Center)

Complete [Set up AWS CLI with SSO](/innovation-engineering/guides/development/aws-sso/) if you
haven't already. Once you have a working SSO profile (you can verify with
`aws sts get-caller-identity --profile <your-profile>`), continue below.

1. **Point Claude Code at your SSO profile.** Add `AWS_PROFILE` to
   `~/.claude/settings.json` (user-level, applies to all projects):

   ```json
   {
     "env": {
       "CLAUDE_CODE_USE_BEDROCK": "1",
       "AWS_REGION": "us-east-1",
       "AWS_PROFILE": "ui-dev"
     }
   }
   ```

   Replace `ui-dev` with whatever you named your profile during SSO setup.

   :::caution
   Your `AWS_PROFILE` determines which AWS account is billed. If you work on
   multiple projects with different funding sources, **do not hardcode a single
   profile here**. Instead, set `AWS_PROFILE` in each project's
   `.claude/settings.json`. See [Working across multiple AWS accounts](#working-across-multiple-aws-accounts-recommended) below.
   :::

2. (Optional) Add an auth refresh command to automatically re-authenticate
   when the session expires:

   ```json
   {
     "env": {
       "CLAUDE_CODE_USE_BEDROCK": "1",
       "AWS_REGION": "us-east-1",
       "AWS_PROFILE": "ui-dev"
     },
     "awsAuthRefresh": "aws sso login --profile $AWS_PROFILE"
   }
   ```

   If you still see `ExpiredTokenException`, run the `aws sso login ...`
   command manually and retry.

#### Working across multiple AWS accounts (recommended)

This is the recommended setup for most engineers. Use **project-level
settings** to set the right profile per repo instead of changing your
user-level config each time.

Create a `.claude/settings.json` file in the root of each project repo:

```json
{
  "env": {
    "AWS_PROFILE": "ui-dev"
  }
}
```

Project-level settings are merged with your user-level
`~/.claude/settings.json`, so you only need to override the values that
differ. A typical setup looks like:

| File                           | Contains                                                             |
| ------------------------------ | -------------------------------------------------------------------- |
| `~/.claude/settings.json`      | `CLAUDE_CODE_USE_BEDROCK`, `AWS_REGION` (shared across all projects) |
| `<repo>/.claude/settings.json` | `AWS_PROFILE` (specific to this project's AWS account)               |

This way, Claude Code automatically picks up the correct account when you
open a project, so there's no manual switching needed.

:::tip

To quickly check which profile Claude Code is using, run `/config` inside
Claude Code, or check `echo $AWS_PROFILE` in a terminal.

:::

Expected result: Claude Code can make Bedrock requests without auth errors.

---

### Alternative: Static IAM credentials (service user / CI)

Use this when you can't do interactive SSO.

:::note

Prefer short-lived role credentials in CI when possible.

:::

1. Create an IAM policy (example starting point):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "AllowInvoke",
         "Effect": "Allow",
         "Action": [
           "bedrock:InvokeModel",
           "bedrock:InvokeModelWithResponseStream"
         ],
         "Resource": [
           "arn:aws:bedrock:*:*:foundation-model/*",
           "arn:aws:bedrock:*:*:inference-profile/*",
           "arn:aws:bedrock:*:*:application-inference-profile/*"
         ]
       }
     ]
   }
   ```

   Tighten `Resource` (and optionally add conditions) for least privilege.

2. Create credentials and store them in `~/.aws/credentials`:

   ```ini
   [bedrock-claude]
   aws_access_key_id = AKIA...
   aws_secret_access_key = ...
   ```

3. Reference the profile from Claude Code:

   ```json
   {
     "env": {
       "CLAUDE_CODE_USE_BEDROCK": "1",
       "AWS_REGION": "us-east-1",
       "AWS_PROFILE": "bedrock-claude"
     }
   }
   ```

4. Verify:

   ```zsh
   aws sts get-caller-identity --profile bedrock-claude
   ```

Expected result: STS works for the profile you configured, and Claude Code can
invoke Bedrock.

---

### Fallback: Temporary session credentials from the AWS access portal (copy/paste)

Use this for a quick start without configuring the AWS CLI.

1. Sign in to your AWS access portal start URL (example:
   `https://njoitaws.awsapps.com/start`).
2. Select an account + role, then find the short-term access keys.
3. Export them in your current shell:

   ```zsh
   export AWS_ACCESS_KEY_ID=ASIA...
   export AWS_SECRET_ACCESS_KEY=...
   export AWS_SESSION_TOKEN=...
   ```

4. Verify:

   ```zsh
   aws sts get-caller-identity
   ```

:::note

Session lifetime varies by organization settings (commonly 1-12 hours).
When it expires, re-copy credentials or switch to the SSO profile path.

:::

Expected result: STS succeeds, and Claude Code can authenticate until the
session expires.

---

### Optional: Bedrock API key (if enabled in your org)

Use this only if your organization has enabled Bedrock API keys and you
understand the tradeoffs vs IAM.

1. In the AWS console, go to **Amazon Bedrock > API keys** and create a key
   (it's typically shown only once).
2. Set `AWS_BEARER_TOKEN_BEDROCK`:

   ```json
   {
     "env": {
       "CLAUDE_CODE_USE_BEDROCK": "1",
       "AWS_REGION": "us-east-1",
       "AWS_BEARER_TOKEN_BEDROCK": "your-api-key"
     }
   }
   ```

:::caution

Avoid storing bearer tokens in shared dotfiles or version-controlled
repos.

:::

Expected result: Claude Code can authenticate using the bearer token.

---

## Step 3: Confirm Claude Code works

1. Restart Claude Code (required after changing `~/.claude/settings.json`).
2. Launch `claude` and send a test message, for example:

   > Which state is the Garden State? Answer in one sentence.

   A successful response is a short factual answer. Auth or region errors
   indicate a configuration problem. See Troubleshooting below.

Expected result: you receive a normal model response (no region/auth/access
errors).

---

## Step 4 (optional): Pin a specific model

By default, Claude Code will pick a model automatically. Anthropic
[recommends model pinning](https://code.claude.com/docs/en/amazon-bedrock#4-pin-model-versions)
when using Bedrock, because Claude may attempt to use models that aren't yet
available in Bedrock.

### Recommended: Pin requests to a specific model

1. Find the model you'd like to use, using the following command:

   ```zsh
   aws bedrock list-inference-profiles \
      --query "inferenceProfileSummaries[?contains(inferenceProfileId, 'us.anthropic')].inferenceProfileId" \
      --output table
   ```

   :::note

   The `us.` prefix selects the US cross-region inference profile. Even
   with `AWS_REGION=us-east-1` set, Bedrock may route requests to other US
   regions to balance load. If your data residency requirements restrict traffic
   to a single region, confirm cross-region inference is acceptable with your
   AWS account team before using these profiles.

   :::

2. Set `ANTHROPIC_MODEL` to that value:

   ```json
   {
     "env": {
       "ANTHROPIC_MODEL": "us.anthropic.claude-sonnet-4-6"
     }
   }
   ```

Expected result: Claude Code consistently uses the pinned model.

### Alternative: Override specific model versions for different tool calls

You can also pin specific model versions. This can be useful because Claude uses
specific models for some tool calls - for example, Web Fetch uses Haiku, so you
may wish to tell Claude to use a specific Haiku version for those calls, while
using a different Sonnet version for regular chat completions. For example:

```json
{
  "env": {
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "us.anthropic.claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "us.anthropic.claude-haiku-4-5"
  }
}
```

Expected result: Claude Code uses the specified models for their respective
calls.

---

## Troubleshooting

For AWS SSO issues (login failures, missing config values, expired sessions),
see [Set up AWS CLI with SSO: Troubleshooting](/innovation-engineering/guides/development/aws-sso/#troubleshooting).

| Symptom                                              | Likely cause                                                                                                                 | Fix                                                                                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `aws sso login` succeeds but Claude Code still fails | The profile you logged in with doesn't match `AWS_PROFILE` in `~/.claude/settings.json`, or stale env vars are overriding it | Confirm `AWS_PROFILE` value matches your profile name exactly. Run `env \| grep AWS_` to check for overriding env vars; unset any you find. |
| Region error on startup                              | `AWS_REGION` isn't set (or isn't being picked up)                                                                            | Set `AWS_REGION` in `~/.claude/settings.json` or your shell env; restart `claude`                                                           |
| `AccessDeniedException` invoking a model             | Missing IAM permission and/or model access not granted in Bedrock console                                                    | Confirm IAM includes `bedrock:InvokeModel` (and streaming if needed); check Bedrock console model access/approvals for your account/region  |
| Every message fails immediately                      | Incorrect `ANTHROPIC_MODEL` value or mismatched region/model                                                                 | Remove `ANTHROPIC_MODEL` to test; then re-add using a cross-region inference profile ID (e.g. `us.anthropic.claude-sonnet-4-6`)             |
| `/login` / `/logout` doesn't behave as expected      | Bedrock uses AWS auth, not an Anthropic API key login flow                                                                   | Use AWS auth (`aws sso login`, profiles, IAM creds) instead                                                                                 |

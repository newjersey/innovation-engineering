---
title: Configure Claude Code
description:
  Use Amazon Bedrock as the Claude Code backend so credentials stay in your AWS
  account (SSO/IAM) instead of using an Anthropic API key.
---

This guide shows you how to use Amazon Bedrock as the Claude Code backend so
credentials stay in your AWS account (SSO/IAM), instead of using an Anthropic
API key.

## Before you begin

Confirm:

- Claude Code is installed (`claude --version`)
  - Install via Homebrew if not installed (`brew install --cask claude-code`)
- Your AWS identity can authenticate (SSO or IAM credentials)
- AWS CLI is installed (required for the recommended SSO path)
  - Install via Homebrew if not installed (`brew install awscli`)

For a full list of supported environment variables and settings keys, see
[Amazon Bedrock configuration reference](https://docs.anthropic.com/en/docs/claude-code/bedrock).

---

## Step 1 — Set required variables

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

## Step 2 — Authenticate to AWS (choose one)

:::note **Credential precedence:** If `AWS_ACCESS_KEY_ID` /
`AWS_SECRET_ACCESS_KEY` are set in your environment, they typically override
profile-based credentials (`AWS_PROFILE`). Unset them if you want `AWS_PROFILE`
to take effect. :::

### Recommended: AWS CLI SSO profile (IAM Identity Center)

1. Create an SSO profile:

   ```zsh
   aws configure sso
   ```

   The CLI walks you through several prompts:

   | Prompt                                         | What to enter                                                      |
   | ---------------------------------------------- | ------------------------------------------------------------------ |
   | `SSO session name`                             | Any name you'd like (e.g. `njoitaws`)                              |
   | `SSO start URL`                                | Our org's access portal URL (`https://njoitaws.awsapps.com/start`) |
   | `SSO region`                                   | `us-east-1`                                                        |
   | `SSO registration scopes [sso:account:access]` | Press **Enter** to accept the default                              |

   After browser-based login, the CLI lists available AWS accounts — **select
   your project-specific account**. Then pick the role you want to use (if you
   have access to multiple roles; otherwise, it'll choose for you).

   Finally, set local profile defaults:

   | Prompt                      | What to enter                         |
   | --------------------------- | ------------------------------------- |
   | `CLI default client Region` | `us-east-1`                           |
   | `CLI default output format` | Press **Enter** to accept the default |

2. Verify the profile was written to `~/.aws/config`:

   ```ini
   [default]
   region = us-east-1
   output = json
   sso_session = njoitaws
   sso_account_id = (the account ID you selected)
   sso_role_name = (your role in that account)

   [sso-session njoitaws]
   sso_start_url = https://njoitaws.awsapps.com/start
   sso_region = us-east-1
   sso_registration_scopes = sso:account:access
   ```

3. Log in:

   ```zsh
   aws sso login --profile default
   ```

4. Point Claude Code at the profile by adding `AWS_PROFILE`:

   ```json
   {
     "env": {
       "CLAUDE_CODE_USE_BEDROCK": "1",
       "AWS_REGION": "us-east-1",
       "AWS_PROFILE": "bedrock-sso"
     }
   }
   ```

5. (Optional) Add an auth refresh command to automatically re-authenticate when
   the session expires:

   ```json
   {
     "env": {
       "CLAUDE_CODE_USE_BEDROCK": "1",
       "AWS_REGION": "us-east-1",
       "AWS_PROFILE": "bedrock-sso"
     },
     "awsAuthRefresh": "aws sso login --profile default"
   }
   ```

   If you still see `ExpiredTokenException`, run the `aws sso login ...` command
   manually and retry.

6. Verify AWS auth:

   ```zsh
   aws sts get-caller-identity --profile default
   ```

Expected result: `aws sts get-caller-identity` returns your role ARN, and Claude
Code can make Bedrock requests without auth errors.

---

### Alternative: Static IAM credentials (service user / CI)

Use this when you can't do interactive SSO.

:::note Prefer short-lived role credentials in CI when possible. :::

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

:::note Session lifetime varies by organization settings (commonly 1–12 hours).
When it expires, re-copy credentials or switch to the SSO profile path. :::

Expected result: STS succeeds, and Claude Code can authenticate until the
session expires.

---

### Optional: Bedrock API key (if enabled in your org)

Use this only if your organization has enabled Bedrock API keys and you
understand the tradeoffs vs IAM.

1. In the AWS console, go to **Amazon Bedrock → API keys** and create a key
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

:::caution Avoid storing bearer tokens in shared dotfiles or version-controlled
repos. :::

Expected result: Claude Code can authenticate using the bearer token.

---

## Step 3 — Confirm Claude Code works

1. Restart Claude Code (required after changing `~/.claude/settings.json`).
2. Launch `claude` and send a test message — for example:

   > Which state is the Garden State? Answer in one sentence.

   A successful response is a short factual answer. Auth or region errors
   indicate a configuration problem — see Troubleshooting below.

Expected result: you receive a normal model response (no region/auth/access
errors).

---

## Step 4 (optional) — Pin a specific model

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

   :::note The `us.` prefix selects the US cross-region inference profile. Even
   with `AWS_REGION=us-east-1` set, Bedrock may route requests to other US
   regions to balance load. If your data residency requirements restrict traffic
   to a single region, confirm cross-region inference is acceptable with your
   AWS account team before using these profiles. :::

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

| Symptom                                         | Likely cause                                                              | Fix                                                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Region error on startup                         | `AWS_REGION` isn't set (or isn't being picked up)                         | Set `AWS_REGION` in `~/.claude/settings.json` or your shell env; restart `claude`                                                          |
| `ExpiredTokenException`                         | Your SSO session or temporary credentials expired                         | Run `aws sso login --profile …` again, or re-copy portal credentials                                                                       |
| `AccessDeniedException` invoking a model        | Missing IAM permission and/or model access not granted in Bedrock console | Confirm IAM includes `bedrock:InvokeModel` (and streaming if needed); check Bedrock console model access/approvals for your account/region |
| `AWS_PROFILE` seems ignored                     | Explicit access-key env vars are taking precedence                        | `unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN` and relaunch `claude`                                                    |
| Every message fails immediately                 | Incorrect `ANTHROPIC_MODEL` value or mismatched region/model              | Remove `ANTHROPIC_MODEL` to test; then re-add using a cross-region inference profile ID (e.g. `us.anthropic.claude-sonnet-4-6`)            |
| `/login` / `/logout` doesn't behave as expected | Bedrock uses AWS auth, not an Anthropic API key login flow                | Use AWS auth (`aws sso login`, profiles, IAM creds) instead                                                                                |

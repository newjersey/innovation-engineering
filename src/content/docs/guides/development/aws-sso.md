---
title: Set up AWS CLI with SSO
description:
  Configure AWS CLI profiles using IAM Identity Center so you can authenticate
  to AWS accounts without long-lived credentials.
---

This guide walks you through setting up AWS CLI SSO profiles using IAM Identity
Center (formerly AWS SSO). Once configured, these profiles can be used by any
tool that reads AWS credentials: Claude Code, Terraform, the AWS CLI itself,
etc.

## Before you begin

Confirm:

- AWS CLI is installed (`aws --version`)
  - **macOS (Homebrew):** `brew install awscli`
  - **Linux/WSL (apt):** `sudo apt update && sudo apt install awscli`
- You have access to an AWS account through IAM Identity Center (ask your
  director or Tech Ops if you're unsure)

---

## Step 1: Run `aws configure sso`

:::tip[Migrating from IAM credentials?]

If you've previously used AWS with long-lived IAM access keys or temporary
credentials (e.g. for Terraform, CLI scripts, or other tools), you likely have
an existing `~/.aws/credentials` file and/or a `~/.aws/config` that doesn't
include SSO configuration. **That's fine; SSO and IAM credentials can coexist
in the same config files as separate profiles.**

However, two things commonly trip people up:

1. **Manually editing `~/.aws/config` instead of running `aws configure sso`.**
   The SSO config requires _two_ linked blocks: a `[profile ...]` block _and_
   a `[sso-session ...]` block. If you only add one (e.g. you put
   `sso_start_url` on the profile but don't create the session block), `aws sso
login` will fail with: `Missing the following required SSO configuration
values: sso_start_url, sso_region`. The easiest fix is to let `aws configure
sso` generate both blocks for you.

2. **Environment variables from a previous setup overriding your profile.**
   If `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` are set in your shell
   (check with `env | grep AWS_`), they take precedence over profile-based SSO
   credentials. Unset them before proceeding: `unset AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN`.

:::

Run the interactive SSO setup (do not manually edit `~/.aws/config`):

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

After browser-based login, the CLI lists available AWS accounts. **Select
your project-specific account**. Then pick the role you want to use (if you
have access to multiple roles; otherwise, it'll choose for you).

Finally, set local profile defaults:

| Prompt                      | What to enter                                        |
| --------------------------- | ---------------------------------------------------- |
| `CLI default client Region` | `us-east-1`                                          |
| `CLI default output format` | Press **Enter** to accept the default                |
| `CLI profile name`          | **Use the AWS account name** (see naming note below) |

:::note[Profile naming]

Name each profile after the AWS account it connects to (e.g.
`Innov-RES-Dev`, `Innov-RES-Sandbox`, `Innov-Dev`). This makes it immediately
clear which account you're targeting when you run commands or configure
tools, especially if you work across multiple accounts.

Avoid naming your SSO profile `default`. A `default` profile is frictionless to
use accidentally from other tools or scripts, and the name tells you
nothing about which account it points to.

:::

---

## Step 2: Verify your config file

Open `~/.aws/config` and confirm it contains _both_ a profile block _and_ a
matching `sso-session` block. The example below uses the profile name `ui-dev`; yours will match the name you chose in the previous step:

```ini
[profile ui-dev]
region = us-east-1
output = json
sso_session = njoitaws
sso_account_id = 123456789012
sso_role_name = AdministratorAccess

[sso-session njoitaws]
sso_start_url = https://njoitaws.awsapps.com/start
sso_region = us-east-1
sso_registration_scopes = sso:account:access
```

**Both blocks are required.** The profile block references the session by
name (`sso_session = njoitaws`), and the `[sso-session njoitaws]` block
contains the actual SSO endpoint details. If either block is missing or
the names don't match, `aws sso login` will fail.

You can also verify programmatically:

```zsh
# Should print the sso_start_url; if it prints nothing, the config is wrong
aws configure get sso_start_url --profile ui-dev
```

---

## Step 3: Log in and verify

Log in:

```zsh
aws sso login --profile ui-dev
```

This opens your browser for authentication. Once you approve, the CLI
caches temporary credentials locally.

Verify:

```zsh
aws sts get-caller-identity --profile ui-dev
```

You should see your role ARN and account ID in the output.

---

## Adding more accounts

If you have access to multiple AWS accounts, run `aws configure sso` once for
each account. Each run creates a new `[profile ...]` block in `~/.aws/config`,
but they all share the same `[sso-session njoitaws]` block. You only need to
authenticate through the browser once per session.

For example, after setting up two accounts your config might look like:

```ini
[profile ui-dev]
region = us-east-1
sso_session = njoitaws
sso_account_id = 123456789012
sso_role_name = AdministratorAccess

[profile dol-prod]
region = us-east-1
sso_session = njoitaws
sso_account_id = 987654321098
sso_role_name = ReadOnlyAccess

[sso-session njoitaws]
sso_start_url = https://njoitaws.awsapps.com/start
sso_region = us-east-1
sso_registration_scopes = sso:account:access
```

Switch between accounts by passing `--profile` to any AWS CLI command:

```zsh
aws sts get-caller-identity --profile ui-dev
aws sts get-caller-identity --profile dol-prod
```

---

## Troubleshooting

| Symptom                                                                              | Likely cause                                                                                                                                                                                 | Fix                                                                                                 |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `Missing the following required SSO configuration values: sso_start_url, sso_region` | `~/.aws/config` is missing the `[sso-session ...]` block, or the profile's `sso_session` name doesn't match. Common when config was hand-edited instead of generated by `aws configure sso`. | Run `aws configure sso` to regenerate both blocks. See Step 2 for the required two-block structure. |
| `ExpiredTokenException`                                                              | Your SSO session expired                                                                                                                                                                     | Run `aws sso login --profile …` again                                                               |
| `AWS_PROFILE` seems ignored                                                          | Explicit access-key env vars (`AWS_ACCESS_KEY_ID`, etc.) are taking precedence                                                                                                               | `unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN` and retry                         |

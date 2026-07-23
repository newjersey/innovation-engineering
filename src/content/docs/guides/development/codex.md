---
title: Configure Codex
description: Configure OpenAI's Codex as a coding assistant through Amazon Bedrock as a model provider.
---

This guide shows you how to use Amazon Bedrock as the Codex backend so
credentials stay in your AWS account (SSO/IAM), instead of using an OpenAI API
key.

You need to have requested access to an AWS account in order to use this tool,
which means you will have needed to complete your state cybersecurity training.

:::caution

Codex is not a supported tool or service, and while AWS itself is a procured
platform, Codex is not a procured tool. Support for this tool by Tech Ops or
other engineers is limited, and you may run into issues with this tool.

Access to this tool should be considered _preliminary_ and under general
guidelines for _pilot tools and services_: tentative approval for use of the
tool may be removed at any time, and access may be conditional based on survey
responses, cost approvals from your director or the finance team, and other
factors.

If you would like to see Codex (via OpenAI) become a procured service, please speak with
your director.

:::

## Before you begin

Confirm:

- You have completed
  [Set up AWS CLI with SSO](/innovation-engineering/guides/development/aws-sso/)
  and can authenticate to AWS
  (`aws sts get-caller-identity --profile <profile-name>`).
- Homebrew is installed (`brew --version`)
- Codex is installed (`codex --version`)
  - Install via Homebrew if not installed (`brew install --cask codex`)

If you are looking for the analogous Claude Code setup, see
[Configure Claude Code](/innovation-engineering/guides/development/claude-code-bedrock/).

---

## Step 1: Configure Codex for Bedrock

Create or edit `~/.codex/config.toml`:

```toml
model = "openai.gpt-5.6-sol"
model_provider = "amazon-bedrock"

[model_providers.amazon-bedrock.aws]
region = "us-east-2"
```

:::note[Checking available Bedrock models]

Use the AWS CLI to inspect the OpenAI models and inference profiles that are
visible to your AWS profile in `us-east-2`:

```shell
AWS_PROFILE=<profile-name> aws bedrock list-foundation-models \
  --region us-east-2 \
  --by-provider OpenAI \
  --query 'modelSummaries[].{modelId:modelId,modelName:modelName,status:modelLifecycle.status}' \
  --output table
```

```shell
AWS_PROFILE=<profile-name> aws bedrock list-inference-profiles \
  --region us-east-2 \
  --query 'inferenceProfileSummaries[?contains(inferenceProfileId, `openai`) || contains(inferenceProfileName, `OpenAI`) || contains(inferenceProfileName, `GPT`)].{id:inferenceProfileId,name:inferenceProfileName,status:status}' \
  --output table
```

The Codex Bedrock path can expose OpenAI model IDs through Bedrock even when
they do not appear in the standard Bedrock catalog output. If
`openai.gpt-5.6-sol` is missing from the AWS command output, test the Codex
runtime path directly:

```shell
AWS_PROFILE=<profile-name> codex exec --ephemeral \
  -m openai.gpt-5.6-sol \
  -c 'model_provider="amazon-bedrock"' \
  "Reply with exactly: model-ok"
```

Expected result: Codex starts with `provider: amazon-bedrock`, uses
`model: openai.gpt-5.6-sol`, and returns `model-ok`. This command makes a real
model request, so it may incur minimal Bedrock usage.

:::

## Step 2: Authenticate with AWS SSO

Complete
[Set up AWS CLI with SSO](/innovation-engineering/guides/development/aws-sso/)
if you haven't already. Once you have a working SSO profile, log in:

```shell
aws sso login --profile <profile-name>
```

Verify the profile:

```shell
aws sts get-caller-identity --profile <profile-name>
```

Expected result: STS prints the AWS account ID and role ARN for the profile you
intend to use with Codex.

:::note

**Credential precedence:** If `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` are
set in your environment, they typically override profile-based credentials
(`AWS_PROFILE`). Unset them if you want `AWS_PROFILE` to take effect.

:::

## Step 3: Start Codex

Start Codex with the AWS profile you want to bill and authorize:

```shell
AWS_PROFILE=<profile-name> codex
```

For example, to use a profile named `Innov-RES-Dev`:

```shell
AWS_PROFILE=Innov-RES-Dev codex
```

Inside Codex, open `/status` and confirm the model provider is
`amazon-bedrock`. Then send a test message, for example:

> What is the airspeed velocity of an unladen swallow?

Expected result: you receive a normal model response with no region, auth, or
model access errors.

---

## Current preferred `config.toml`

### Amazon Bedrock

The minimal config above is enough to get started. This is our current
preferred `~/.codex/config.toml` reference for engineers using Bedrock:

```toml
# For Amazon Bedrock:
model = "openai.gpt-5.6-sol"
model_provider = "amazon-bedrock"
model_reasoning_effort = "high"
personality = "pragmatic"
sandbox_mode = "workspace-write"
timeout_ms = 180000

[sandbox_workspace_write]
network_access = true

[model_providers.amazon-bedrock.aws]
region = "us-east-2"
```

:::note

With `sandbox_mode = "workspace-write"`, Codex can edit files in the active
workspace. The `[sandbox_workspace_write]` setting allows network access inside
that sandbox so Codex can install dependencies, fetch package metadata, and run
ordinary project checks that need the network.

:::

### Azure Foundry

:::caution

We don't normally provision Azure accounts unless your project requires it. Please ask Tech Ops
before configuring Codex for use with Azure Foundry accounts.

:::

This is our current
preferred `~/.codex/config.toml` reference for engineers using Azure Foundry:

```toml
# For Azure OpenAI:
# model = "gpt-5.5"
# model_provider = "azure"
#
# [model_providers.azure]
# name = "Azure OpenAI"
# base_url = "https://<your-azure-openai-resource>.openai.azure.com/openai/v1"
# env_key = "AZURE_OPENAI_API_KEY"
# wire_api = "responses"
```

Then in your `~/.codex/.env`, you'll need to set the API key:

```shell
export AZURE_OPENAI_API_KEY=<your-azure-foundry-key>
```

## Sources

For the official Bedrock setup, see
[Use Codex with Amazon Bedrock](https://developers.openai.com/codex/amazon-bedrock).
For current OpenAI model guidance, see
[Using GPT-5.6](https://developers.openai.com/api/docs/guides/latest-model).
For more detail on Codex settings, see
[Codex configuration basics](https://developers.openai.com/codex/config-basic).
For more detail on sandbox and network behavior, see
[Sandbox and approvals](https://developers.openai.com/codex/agent-approvals-security#sandbox-and-approvals).
AWS also announced the setup in
[Get started with OpenAI GPT-5.5, GPT-5.4 models, and Codex on Amazon Bedrock](https://aws.amazon.com/blogs/aws/get-started-with-openai-gpt-5-5-gpt-5-4-models-and-codex-on-amazon-bedrock/).

## Troubleshooting

For AWS SSO issues (login failures, missing config values, expired sessions),
see
[Set up AWS CLI with SSO: Troubleshooting](/innovation-engineering/guides/development/aws-sso/#troubleshooting).

| Symptom                                  | Likely cause                                                                                           | Fix                                                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `ExpiredTokenException`                  | Your SSO session expired                                                                               | Run `aws sso login --profile <profile-name>` again                                                                                |
| Codex uses the wrong AWS account         | The profile passed to `AWS_PROFILE` is not the account you expected                                    | Run `aws sts get-caller-identity --profile <profile-name>` and restart Codex with the correct `AWS_PROFILE=<profile-name> codex`  |
| `AWS_PROFILE` seems ignored              | Explicit access-key env vars (`AWS_ACCESS_KEY_ID`, etc.) are taking precedence                         | Run `env \| grep AWS_`, then unset stale values with `unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN`            |
| `AccessDeniedException` invoking a model | Missing IAM permission and/or model access not granted in Bedrock                                      | Confirm IAM includes Bedrock invoke permissions and check Bedrock model access for the AWS account and Region                     |
| Region or model availability error       | The configured model is not available in the configured Region                                         | Confirm `openai.gpt-5.6-sol` works in `us-east-2`, or adjust `model` and `region` based on the Bedrock model availability list    |
| `/status` does not show `amazon-bedrock` | Codex is not reading the expected `~/.codex/config.toml`, or `model_provider` is missing or misspelled | Confirm the config file is saved at `~/.codex/config.toml`, then restart Codex and check `/status` again                          |

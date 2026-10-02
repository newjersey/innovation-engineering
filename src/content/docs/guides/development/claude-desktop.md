---
title: Set up Claude Desktop
description:
  Install Claude Desktop on macOS or Windows and sign in to AWS to use Claude
  models through Amazon Bedrock.
---

This guide shows you how to install Claude Desktop and connect it to Amazon
Bedrock using your AWS account, so credentials and usage stay in your AWS
account instead of an Anthropic consumer account.

You will install the app, apply a configuration file shared by Tech Ops, and
sign in to AWS through your browser. You do not need to install the AWS CLI or
set up an AWS CLI profile.

You are responsible for installing the configuration file on your computer and
keeping it up to date. Tech Ops provides the files but does not install them for
you automatically through mobile device management (MDM).

You need to have requested access to an AWS account in order to use this tool,
which means you will have needed to complete your state cybersecurity training.

:::caution

Claude Desktop is not a supported tool or service, and while AWS itself is a
procured platform, Claude Desktop is not a procured tool. Support for this tool
by Tech Ops or other engineers is limited, and you may run into issues with this
tool.

Access to this tool should be considered _preliminary_ and under general
guidelines for _pilot tools and services_: tentative approval for use of the
tool may be removed at any time, and access may be conditional based on survey
responses, cost approvals from your director or the finance team, and other
factors.

If you would like to see Claude Desktop become a procured service, please speak
with your director.

:::

:::danger[Be prepared to troubleshoot independently]

Claude Desktop can be difficult to set up and use, even when you follow these
instructions correctly. It's not designed for third-party inference from AWS as
the primary login mechanism, it's not designed to work with Zscaler, and most of
all, each computer it's installed on will have a unique setup for which this
guide cannot fully account.

While these steps should work, this guide cannot cover every warning, error,
configuration problem, or unexpected side effect.

For example, on Windows PCs managed by the Office of Information Technology,
Zscaler’s inspection of encrypted traffic can cause certificate errors that
prevent Claude Desktop from establishing secure network connections.

Proceed only if you are comfortable troubleshooting independently. Tech Ops may
not have capacity to support networking issues, Model Context Protocol server
installation, project setup, or other Claude Desktop troubleshooting.

:::

:::note[Fable 5 requires a ZDR exemption]

Fable 5 and 5.1 are available on Bedrock for NJIA use under an Enterprise
Frontier Safeguards (EFS) zero-data-retention exemption through **December 31,
2026**.

After that date, traffic is retained with automated safety monitoring (no human
review). Re-confirm conformance with NJ AI guidelines before then.

:::

## Before you begin

Confirm:

- You know which AWS account will fund your work:
  - `Innov-Dev` for BizX
  - `Innov-RES-Dev` for ResX engineering
  - `Innov-RES-Sandbox` for ResX product, content, or design work or general
    NJIA usage
- You have a budget in mind for your AI spend on that account.
- You know whether your computer runs macOS or Windows.

If you're looking for the analogous CLI setups instead, see
[Configure Claude Code](/innovation-engineering/guides/development/claude-code-bedrock/)
or [Configure Codex](/innovation-engineering/guides/development/codex/).

---

## Step 1: Request access and your configuration file

Go to [newjersey/internal-ops](https://github.com/newjersey/internal-ops),
scroll down to **Platform Access**, and click it to open a new ticket. In the
ticket:

- Identify the AWS account that will support your work (see
  [Before you begin](#before-you-begin)).
- Give yourself a budget for AI spend.
- State whether you use macOS or Windows.

:::note

If you don't already have access to the AWS account you named, you'll be
provisioned with access to it as part of this request.

:::

Tech Ops will share a Google Drive link to the configuration file that matches
your AWS account, your role level, and your operating system:

| Operating system | Configuration file |
| ---------------- | ------------------ |
| macOS            | `.mobileconfig`    |
| Windows          | `.reg`             |

Save this link. You will use it again to download updated configuration files.
If the file doesn't match your AWS account, role level, or operating system, ask
Tech Ops for the correct link.

:::note[Tech Ops]

The configuration files are generated with the
[claude-desktop-config-generator](https://github.com/newjersey/claude-desktop-config-generator)
tool. Follow its README to regenerate the files for an AWS account, for example
when new model identifiers are available, then upload them to Google Drive and
share each user the link that matches their AWS account, role level, and
operating system.

:::

## Step 2: Install Claude Desktop

You can install the app while your access request is pending. Finish
[Step 3](#step-3-install-your-configuration) before you open the app and sign
in.

### macOS

1. Go to [claude.com/download](https://claude.com/download) and download the
   macOS installer.
2. Open the downloaded `.dmg` file.
3. Drag **Claude** to **Applications**.

If you already use [Homebrew](https://brew.sh), you should install Claude
Desktop from a terminal instead:

```zsh
brew install --cask claude
```

### Windows

1. Go to [claude.com/download](https://claude.com/download) and download the
   Windows installer for your computer.
2. Open the downloaded installer and follow the prompts.

Use the `.msix` installer if the download page offers a choice. Anthropic's
`.msix` package includes Cowork support, and the older `.exe` installer does
not.

## Step 3: Install your configuration

Download the configuration file from the Google Drive link Tech Ops shared with
you.

If Claude Desktop is open, fully quit it before you continue. Closing the window
may leave the app running.

### macOS

1. Open the downloaded `.mobileconfig` file. This adds the profile to System
   Settings but doesn't install it yet.
2. Open **System Settings** and go to the Profiles list:
   - You can find this in **General**, then **Device Management**.
3. In the **Downloaded** section, double-click **Claude Desktop Third-Party
   Inference**.
4. Review the profile, then select **Install**. Enter your Mac password if
   you're asked.
5. Confirm the profile now appears in the list of installed profiles.

If an earlier version of this profile is installed, the new one replaces it.

### Windows

1. Sign in to the Windows user account you will use to run Claude Desktop.
2. Open the downloaded `.reg` file.
3. Confirm the prompts to add the settings to the registry.
4. Confirm that Windows reports the settings were added successfully.

The file configures Claude Desktop for the current Windows user only. If you use
Claude Desktop from another Windows user account, repeat this step there.

## Step 4: Sign in to AWS and test Claude

1. Open Claude Desktop.
2. Select **Sign in with AWS**. Claude opens the AWS sign-in page in your
   browser.
3. Sign in to AWS with your work Microsoft account (@oit.nj.gov).
4. Compare the eight-letter code shown in your browser with the code shown in
   Claude Desktop. If they match, approve the request.
5. Return to Claude Desktop and wait for sign-in to finish.
6. Pick a model and send a short test message, such as "Reply with: setup
   complete."

Setup is complete when Claude replies without an authentication or access error.
The test message uses Amazon Bedrock and counts toward your AWS usage.

If Claude Desktop shows the standard Claude sign-in screen instead of **Sign in
with AWS**, see
[Claude doesn't offer AWS sign-in](#claude-doesnt-offer-aws-sign-in).

---

## Sign in again when your session expires

When Claude Desktop prompts you to sign in again:

1. Select the sign-in button in the prompt. Claude opens the AWS sign-in page in
   your browser.
2. Sign in to AWS if you're asked.
3. Compare the eight-letter code shown in your browser with the code shown in
   Claude Desktop. If they match, approve the request.
4. Return to Claude Desktop and continue your work.

You don't need to use a terminal or run any AWS CLI commands.

## Update your configuration to access new models

Install the latest configuration file when Tech Ops tells you about an update or
when a model you expect is missing from the model picker.

1. Open the Google Drive link Tech Ops shared with you.
2. Download a fresh copy of the configuration file.
3. Fully quit Claude Desktop.
4. Install the file using the steps in
   [Step 3](#step-3-install-your-configuration). On macOS, the new profile
   replaces the one you installed before.
5. Open Claude Desktop and sign in to AWS if you're asked.
6. Check that the model you expect appears in the model picker.

Updating the Claude Desktop app does not update the configuration file you
installed. Fable 5 won't appear in Claude Desktop until you install a
configuration file that includes it, for instance.

If your link no longer works, or the latest file still doesn't include a model
you expect, ask Tech Ops for an updated link. Include your AWS account, role
level, and operating system.

## Report your usage

- **Each day**, report your Claude usage to a spreadsheet you keep for this
  purpose.
- **Each month**, share your total usage and your budget (set in
  [Step 1](#step-1-request-access-and-your-configuration-file)) with the finance
  team.

---

## Troubleshooting

### Claude doesn't offer AWS sign-in

1. Fully quit and reopen Claude Desktop.
2. Check that your configuration is installed:
   - **macOS:** confirm that **Claude Desktop Third-Party Inference** appears in
     the installed profiles list in System Settings.
   - **Windows:** confirm that you imported the `.reg` file while signed in to
     the same Windows user account you use to run Claude Desktop.
3. Download the latest configuration file from your Google Drive link and
   install it again.
4. If the problem continues,
   [generate a diagnostic report](#generate-a-diagnostic-report) and send it to
   Tech Ops.

### The verification code expired or doesn't match

Don't approve the request. Return to Claude Desktop, start sign-in again to get
a new code, and compare it with the one in your browser.

### AWS sign-in works, but Claude reports an access error

Check that your configuration file matches the AWS account and role Tech Ops
assigned to you. If it does, contact Tech Ops with the file name and the error
message.

### A model is missing

Follow
[Update your configuration to access new models](#update-your-configuration-to-access-new-models).
If the model is still missing, contact Tech Ops with the model name and the name
of your configuration file.

### Generate a diagnostic report

1. In Claude Desktop, go to **Help**, then **Troubleshooting**, then **Generate
   Diagnostic Report**. On Windows, open the application menu to find **Help**.
2. Select **Export to file** and save the report.
3. When you contact Tech Ops, include your operating system, the name of your
   configuration file, the error message, and the steps you already tried.
   Attach the report if Tech Ops asks for it.

The report contains configuration state, application logs, and environment
details. It does not include conversation content.

---

## Related documentation

- Anthropic:
  [Claude Desktop on 3P: Overview](https://claude.com/docs/third-party/claude-desktop/overview)
- Anthropic:
  [Installation and setup](https://claude.com/docs/third-party/claude-desktop/installation)
- Anthropic:
  [Deploy Claude Desktop on 3P with Amazon Bedrock](https://claude.com/docs/third-party/claude-desktop/bedrock)
- Anthropic:
  [Configuration reference](https://claude.com/docs/third-party/claude-desktop/configuration)
- Anthropic:
  [Telemetry and egress](https://claude.com/docs/third-party/claude-desktop/telemetry)
- Apple:
  [Use configuration profiles to standardize settings on Mac computers](https://support.apple.com/guide/mac-help/configuration-profiles-standardize-settings-mh35561/mac)

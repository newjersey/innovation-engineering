---
title: Set up Renovate
description: Configure Renovate dependency updates for a repository.
---

Use this guide to set up Renovate for a repository in the
`github.com/newjersey` organization. Renovate will open dependency update pull
requests, group non-major updates, and automerge low-risk development
dependency updates after CI passes.

## Step 1: Add the Renovate configuration

Create `renovate.json5` at the repository root:

```json5
// Renovate configuration for NJIA projects.
// Documentation: https://docs.renovatebot.com/configuration-options/
//
// This config provides sensible defaults for NJIA repositories.
// Extend or override these settings as your project's needs evolve.
{
  $schema: "https://docs.renovatebot.com/renovate-schema.json",

  // Base presets:
  // - config:recommended - Renovate's recommended defaults (includes dependency dashboard)
  // - :semanticCommits - uses fix:/chore: prefixes (matches our conventional commits)
  // - :pinVersions - locks to exact versions for reproducible installs
  // - group:allNonMajor - bundles minor + patch updates into a single PR
  extends: [
    "config:recommended",
    ":semanticCommits",
    ":pinVersions",
    "group:allNonMajor",
  ],

  // Labels applied to every Renovate PR for straightforward filtering.
  labels: ["dependencies", "renovate"],

  // Limit concurrent PRs to avoid overwhelming reviewers.
  prConcurrentLimit: 5,

  // Run outside business hours to minimize disruption.
  schedule: ["after 8pm and before 8am on weekdays", "every weekend"],

  packageRules: [
    {
      // Automerge minor and patch updates for devDependencies.
      // These are tooling-only (prettier, husky, lint-staged) and low-risk.
      // CI must pass before merge - Renovate respects branch protection rules.
      matchDepTypes: ["devDependencies"],
      matchUpdateTypes: ["minor", "patch"],
      automerge: true,
    },
  ],
}
```

## Step 2: Remove Dependabot version updates

If the repository has `.github/dependabot.yml`, remove it in the same pull
request.

Deleting `.github/dependabot.yml` disables Dependabot version update pull
requests. This prevents Renovate and Dependabot from opening duplicate routine
dependency update pull requests.

## Step 3: Open a Tech Ops request

Open a [general internal-ops ticket](https://github.com/newjersey/internal-ops/issues/new?assignees=&labels=general%2Crequest&projects=newjersey%2F16&template=request_general.yaml&title=%5BGeneral%5D%3A+Enable+Renovate+for+%5BREPOSITORY%5B)
for the repository settings that require admin access.

Use this request title:

```text
[General]: Enable Renovate for [REPOSITORY]
```

Use this request body:

```text
We would like to use Renovate for dependency updates on REPOSITORY_URL.

Could Tech Ops please:

1. Enable Renovate for REPOSITORY_URL.
2. Disable Dependabot security updates for REPOSITORY_URL.
3. Keep Dependabot alerts enabled.

We are adding a `renovate.json5` configuration in the repository and removing
`.github/dependabot.yml` if it exists, so Dependabot version update pull requests
should be disabled separately from Dependabot security updates.
```

If the team also wants Dependabot alerts disabled, replace item 3 with:

```text
3. Disable Dependabot alerts for REPOSITORY_URL.
```

:::note

Dependabot security updates are controlled by repository or organization
security settings. They can still run even when `.github/dependabot.yml` has
been removed.

:::

## Step 4: Merge the repository pull request

After the Renovate configuration pull request is reviewed and Tech Ops has
enabled Renovate, merge the pull request into the repository's default branch.

Renovate reads configuration from the default branch, so the file must be
merged before Renovate can use the settings.

## Step 5: Confirm Renovate is working

After Renovate is enabled and `renovate.json5` is on the default branch, check
the repository for Renovate activity.

You may see:

- A Dependency Dashboard issue.
- A pull request that pins broad dependency ranges such as `latest` to exact
  versions.
- A grouped pull request for non-major dependency updates.
- Individual pull requests for major dependency updates.

Minor and patch updates for `devDependencies` can automerge, but only after
required CI checks and branch protection rules pass.

## Troubleshooting

### Renovate and Dependabot are both opening pull requests

Check whether `.github/dependabot.yml` still exists. If it does, remove it to
disable Dependabot version update pull requests.

If Dependabot is opening security update pull requests, ask Tech Ops to confirm
that Dependabot security updates are disabled for the repository.

### Renovate has not opened anything

Confirm that:

- Tech Ops enabled Renovate for the repository.
- `renovate.json5` is merged into the default branch.
- The repository has dependency updates available.

### Renovate is not automerging eligible updates

Check the pull request status. Automerge can be blocked by failing CI checks,
branch protection rules, required reviews, or Renovate permissions.

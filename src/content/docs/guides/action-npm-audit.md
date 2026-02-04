---
title: GH Action - npm vulnerability audit
description: A reusable workflow to easily check for vulnerabilities in npm packages
---

This reusable GitHub Actions workflow runs npm audit and fails the job when vulnerabilities at or above a configured severity level are detected. It is intended to be used as a shared CI security check across repositories.

## What this workflow does

- Checks out the repository
- Sets up Node.js using either:
	- a version file (e.g. .nvmrc), or
	- a literal Node version (e.g. 20)
- Installs dependencies using npm ci
- Runs npm audit and fails the job if vulnerabilities meet or exceed the configured severity

This workflow is designed to be consumed by other workflows via workflow_call.

## Usage

Call this workflow from another repository in the organization:

```
jobs:
  npm-audit:
    uses: newjersey/innovation-shared-actions/.github/workflows/npm-audit.yml@main
    with:
      node-version: ".nvmrc"
      audit-level: "high"
```

## Inputs

### `node-version`

- Type: string
- Required: No
- Default: .nvmrc

Specifies the Node.js version to use. This input supports two formats:

- A file path (for example .nvmrc or .node-version)
	- The workflow will read the Node version from the file.
- A literal version number
	- Examples: 20, 20.11.1

#### Examples:

```
with:
  node-version: ".nvmrc"
```
```
with:
  node-version: "20"
```

### `audit-level`

- Type: string (critical | high | moderate | low)
- Required: No
- Default: critical

The minimum vulnerability severity that will cause the job to fail.

#### Example:

```
with:
  audit-level: "high"
```

## Outputs

### `audit_failed`

- Description: Indicates whether the npm audit step failed
- Values: success or failure

This output can be used to trigger downstream jobs, such as Slack notifications.

#### Example:

```
jobs:
  slack-alert:
    needs: dependency-check
    if: ${{ needs.dependency-check.outputs.audit_failed == 'failure' }}
    uses: newjersey/innovation-shared-actions/.github/workflows/npm-audit.yml@main
      with:
        node-version: ".nvmrc"
        audit-level: "high"
```

## Failure behavior

- The workflow fails the job when vulnerabilities at or above the configured audit-level are found.
- This allows calling workflows to:
	- block merges
	- fail CI checks
	- trigger alerts (Slack, email, etc.)

## Why this is a reusable workflow (not an action)

This check is implemented as a reusable workflow because it represents a job-level CI policy, not a single step. It involves multiple steps (checkout, Node setup, dependency install, audit) and must fail the workflow in a way that downstream jobs can reliably detect.

Reusable workflows provide:

- Clear failure semantics
- Easy composition with other jobs (e.g. Slack alerts)
- Consistent security enforcement across repositories
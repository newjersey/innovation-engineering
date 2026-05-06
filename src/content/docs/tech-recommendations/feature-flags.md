---
title: Feature flags
description: How and when we use feature flags in our stack
---

Feature flags allow us to change application behavior at runtime without redeploying code. In our stack, we use [AWS AppConfig](https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html) to manage these changes safely, whether that's rolling out a new feature, limiting exposure, or quickly turning something off if it causes issues.

At a high level, feature flags help separate deployment (shipping code) from release (exposing functionality), which gives us much more control over risk. [View this example AppConfig implementation for guidance within React](https://github.com/timwright12/example-aws-appconfig/).

## When to use feature flags

Feature flags are most useful when you need a level of control or reversibility that a normal deployment doesn't provide. Use flags when you need controlled, reversible changes. For example:

- Gradual roll outs (releasing to a percentage of users before full launch)
- Kill switches (quickly disabling a feature causing issues)
- Decoupled deploy vs release (shipping code without immediately exposing it)
- Environment-specific behavior (safely testing in staging or limited production cohorts)
- Simple targeting (enabling for internal users, beta groups, or regions)

## When not to use feature flags

Not every toggle should be a feature flag. In fact, overusing them can make the system harder to reason maintain. Avoid using feature flags for to following:

- Permanent configuration (use environment variables or config files instead)
- Short-lived development toggles (prefer local flags or mocks during development)
- Core business logic branching (flags should not define fundamentally different code paths long-term)
- Highly coupled UI logic (excessive flags in UI code can create hard-to-test states)
- Anything you won't clean up (if there's no plan to remove it, don't add a flag)
- As a substitute for proper testing (flags shouldn't compensate for inadequate QA)

## Best practices

- Default to a safe state of `false` for features that are incomplete
- Every flag should have a clear lifecycle and purpose
- Use clear naming in your flags
- Each flag should be as close the feature it is toggling a possible; avoid wrapping too much functionality in a flag.
- Clean up flags regularly; unless you're using a killswitch flag, most types should not be long-lived in the code. Clean them up when your done.

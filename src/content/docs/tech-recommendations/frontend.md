---
title: Frontend
---

:::note

Always use the [starter repo template](https://github.com/newjersey/innovation-repo-template) when starting a new project. It provides consistent cross-project defaults for repo structure, configuration for linting and formatting, PR templates, and other starter config.

:::

## Language

- **We use React as our frontend library.**
We do not use Angular, Vue, etc. There may sometimes be a reason to use pure vanilla JS and not use a frontend framework at all; that’s fine. In general, talk to the team and engineering directors before making a choice besides React.

- **TypeScript should be used over plain JavaScript.**
Static typing can be philosophically considered a form of testing: it provides immediate, useful feedback as to whether the code written satisfies the defined constraints.

## React frameworks

- Use **Vite** when building a Single-Page Application (SPA), using `create-vite-app`
- Use **Next.js** when you need a full-stack framework and/or server-side components
- Use **Astro** for content-centric static pages.

Talk to the team and engineering directors before making a choice besides these three frameworks.

## Testing

### Unit tests

Use **React Testing Library** and **vitest** for frontend unit testing.

Install the following:

- `@testing-library/dom`
- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `jest-environment-jsdom`

### End-to-end tests

Use **Playwright** for end-to-end testing on new projects. Visit the [ProfileNJ e2e testing decision doc](https://github.com/newjersey/profile-nj/blob/09d8afc3eca2c50451cdaefbf1e61048821a73df/docs/decisions/2026-02-10-e2e-testing-framework.md) for details on the justification.

However, many older projects still use Cypress.

If using Cypress, add an [upload-artifact step](https://github.com/actions/upload-artifact?tab=readme-ov-file#upload-an-entire-directory), so that you can view screenshots if the CI fails in ways that you can't reproduce

```yaml
- name: Upload screenshots
  uses: actions/upload-artifact@v6
  if: failure()
  with:
    name: cypress-screenshots
    path: cypress/screenshots
```

### Accessibility testing

For a11y testing, consider setting up Axe for [Playwright](https://playwright.dev/docs/accessibility-testing).

In the project Readme include how to run tests, and how to run one specific test in one specific file. This is technically part of test framework doc, but has been TIL for multiple people.

## Additional pages

We have dedicated page for guidance on the following components of frontend development:

- [Design system](/innovation-engineering/tech-recommendations/design-system/)
- [Linting & formatting](/innovation-engineering/tech-recommendations/linting-formatting/)
- [Translation & internationalization](/innovation-engineering/tech-recommendations/i18n/)
- [Feedback Widget](/innovation-engineering/tech-recommendations/feedback-widget/)

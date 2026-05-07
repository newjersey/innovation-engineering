---
title: Frontend
wip: true
---

## Language

React - Unless there’s a very good reason, we use React on our team over other frontend frameworks (Angular, Vue, etc). There may sometimes be a reason to use pure vanilla JS and not use a frontend framework at all; that’s fine.

TypeScript - Static typing can be philosophically considered a form of testing - it provides immediate, useful feedback as to whether the code written satisfies the defined constraints. We have a strong preference that TypeScript is used over plain JavaScript.

## React frameworks

- create-vite-app for Single-Page Applications (SPAs)
- Next.js for server-side rendered applications
- Astro for content-centric static pages

## Testing

### Unit tests

Use React Testing Library and install the following:

- `@testing-library/dom`
- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `jest-environment-jsdom`

### End-to-end tests

We recommend **Playwright** for end-to-end testing. Visit the [ProfileNJ e2e testing decision doc](https://github.com/newjersey/profile-nj/blob/09d8afc3eca2c50451cdaefbf1e61048821a73df/docs/decisions/2026-02-10-e2e-testing-framework.md) for details on the justification.

However, we used to use Cypress more commonly, and many older projects still use Cypress.

If using Cypress, add an [upload-artifact step](https://github.com/actions/upload-artifact?tab=readme-ov-file#upload-an-entire-directory), so that you can view screenshots if the CI fails in ways that you can't reproduce

```yaml
- name: Upload screenshots
  uses: actions/upload-artifact@v6
  if: failure()
  with:
    name: cypress-screenshots
    path: cypress/screenshots
```

## Other

TODO: Feedback widget

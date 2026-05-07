---
title: Frontend
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

  - ```yaml
      - name: Upload screenshots
        uses: actions/upload-artifact@v6
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots
      ```

### Accessibility testing

For a11y testing, consider setting up Axe for [Playwright](https://playwright.dev/docs/accessibility-testing) or [Cypress](https://www.npmjs.com/package/cypress-axe).

In the project Readme include how to run tests, and how to run one specific test in one specific file. This is technically part of test framework doc, but has been TIL for multiple people.

## Design System

[NJWDS](https://office-of-innovation.gitbook.io/njwds), the New Jersey design system

For React apps, also add the https://github.com/trussworks/react-uswds component library

For non-React, include the USWDS Javascript: https://designsystem.digital.gov/documentation/getting-started-for-developers/


## Code Quality

Linting, e.g. https://github.com/newjersey/dol-ui-ivr-wrapper/blob/main/eslint.config.ts

Prettier (see [this starter repo](https://github.com/newjersey/innovation-repo-template))


## Other

Feedback widget

English and Spanish content integration using SmartCat as the TMS

[OOI Translation Process](https://docs.google.com/document/d/1y_VD6Mp4BHLxWKSD2jWzRReMa4wE9uReGnGmgW1x6iU/edit?usp=sharing)

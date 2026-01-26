---
title: Frontend
wip: true
---

## Language

React - Unless there’s a very good reason, we use React on our team over other frontend frameworks (Angular, Vue, etc). There may sometimes be a reason to use pure vanilla JS and not use a frontend framework at all; that’s fine. 

TypeScript - Static typing can be philosophically considered a form of testing - it provides immediate, useful feedback as to whether the code written satisfies the defined constraints. We have a strong preference that TypeScript is used over plain JavaScript.

## React Frameworks

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

- Cypress is recommended, or more commonly used
    - Make sure to add an [upload-artifact step](https://github.com/actions/upload-artifact?tab=readme-ov-file#upload-an-entire-directory) with `path: cypress/screenshots`, so that you can at least view screenshots if the CI fails in ways that you can't reproduce. 
- Some folks have used Playwright

## Other

Feedback widget

English and Spanish content integration using SmartCat as the TMS

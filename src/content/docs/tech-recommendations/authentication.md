---
title: Authentication
description: Which sign-in options we use for applications, and how to choose between them
---

Building sign-in from scratch can have problematic downsides, and we have better
tools available to us for user authentication and authorization. We can connect
applications to an existing identity provider, so that people sign in with an
account they already have, we don't store their passwords, and we do not take on
the burden of ensuring accounts are kept secure against state standards, like
with multi-factor authentication, password complexity, and more.

We recommend **MyNewJersey** for most applications. **Microsoft Entra** is a
narrower alternative for applications used only by state employees.

## Our recommendation

| Option                                          | Use it for                                                                                                 | Status      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| [MyNewJersey](#mynewjersey-recommended)         | Applications for the public, state employees, or both, and applications whose users span multiple agencies | Recommended |
| [Microsoft Entra](#microsoft-entra-alternative) | Applications used only by state employees whose accounts are all in one tenant that we can work with       | Alternative |

Future authentication options may become available. This page will be updated
when they do.

## MyNewJersey (recommended)

MyNewJersey is the State's shared sign-in service. It is the option the State's
IT office prefers for State applications, and it is how most State applications
are set up.

Use MyNewJersey when:

- Members of the public will use your application. Microsoft Entra, as the
  State uses it, doesn't cover the general public.
- Your users work for different agencies or departments, including agencies
  outside the executive branch.
- You expect the application to be offered to other agencies later. Adding a
  new group of users doesn't require changing how the application signs people
  in.

How it works for your users:

- Access is granted in MyNewJersey, not in your application. People designated
  as **Role Managers** add each user, and each user receives an invitation code
  by email to enter in MyNewJersey. After that, the application appears in the
  user's MyNewJersey portal.
- Some applications also offer self-registration for users who aren't already
  authorized to access your application.

What to plan for:

- MyNewJersey supports SAML and OpenID Connect (OIDC). Its OIDC implementation
  is not compatible with most OAuth 2.0-conforming clients, so a standard OIDC
  library or managed service may not work with it without changes. Check
  compatibility early, before you commit to a library or service.
- Your application, or an identity service you put in front of it, handles the
  whole integration. You don't get the built-in integration that Entra gives
  an application already running in Azure.

To get started, follow
[Onboard an application with MyNewJersey](/innovation-engineering/guides/development/onboard-mynewjersey/).

## Microsoft Entra (alternative)

Microsoft Entra is the State's employee directory. Applications that sign users
in with Entra use OpenID Connect (OIDC), and Entra can provide a user's name,
email address, and other profile details.

Consider Entra when **all** of these are true:

- Every user is a state employee.
- All users have accounts in a single Entra tenant, or can be given guest
  accounts in it.
- The audience is small, or limited to one department.
- MyNewJersey would add effort without adding value. For example, the
  application already runs in Azure, or the software you're deploying only
  supports standards-conformant OAuth 2.0.

What to plan for:

- **Everyone who signs in must exist in the same tenant.** Users from outside
  that tenant need guest accounts, which are usually added one at a time. This
  takes time and can require approvals from other organizations. It also creates
  ongoing support work for the State's IT office and for the product team, so
  think hard before choosing Entra if your audience may grow.
- **It is harder to extend.** Reaching more departments or agencies later means
  adding their users to the tenant, or moving to MyNewJersey.
- **Access is managed through an Entra group.** Only Tech Ops can change the
  app registration or its associated access group membership.

To get started, follow
[Request Microsoft Entra authentication for an application](/innovation-engineering/guides/development/onboard-entra/).

## Working with the State's IT office

Both options involve the State's IT office. **All coordination with those teams
goes through Tech Ops.** Don't contact them directly or file your own
tickets. Open an internal-ops ticket instead, and Tech Ops will coordinate
onboarding with the right teams.

## What this recommendation doesn't cover

Choosing a provider is one decision. These are separate and are not covered here:

- **Authorization.** Authentication tells you who a user is. Your application
  still decides what that user may do.
- **Your backend.** Protecting the sign-in screen doesn't protect your API. Any
  API reachable from the internet must verify who is calling it. A shared API
  key is an interim measure, not a substitute.
- **Session management.** Your backend, or a service such as
  [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-saml-idp.html),
  keeps the user signed in after the identity provider confirms who they are.
  See the [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

---
title: Request Microsoft Entra authentication for an application
description: Prepare your application and work with Tech Ops to set up Microsoft Entra sign-in
---

Use this guide to set up Microsoft Entra sign-in for an application. You
prepare the details and Tech Ops arranges the app registration with the State's
IT office.

[MyNewJersey](/innovation-engineering/tech-recommendations/authentication/#mynewjersey-recommended)
is our default recommendation. Use Entra only when it fits, as described in
[Authentication](/innovation-engineering/tech-recommendations/authentication/#microsoft-entra-alternative).

## Before you begin

Confirm:

- Every user is a state employee with an account in a tenant we can work with.
- Your application can sign users in with OpenID Connect (OIDC). For an
  introduction, see
  [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc).
- Your application has a URL that Entra can send users back to after they sign
  in (a redirect URL, also called a callback URL) for each environment.

:::note

Do not contact the State's IT office directly or file your own tickets. All
coordination goes through Tech Ops, including any ServiceNow tickets.

:::

## Step 1: Decide the access model

Decide the following as a team before you ask for anything. Changing them
afterward means repeating part of the process.

- **Environments.** Decide whether development and production each get their
  own registration. Separate registrations let you restrict development to a
  named list of people while production is open to everyone in the tenant.
- **Who gets access.** For each environment, choose between a **named list of
  users** and **everyone in the tenant**. Tech Ops can maintain the named list
  after the initial setup.
- **Which tenant your users belong to.** Everyone who signs in must be in a
  single tenant, and things get tricky if they are in a different tenant than
  your user. Users from other organizations may need guest accounts, or you may
  need a guest account in their tenant. These take time and can require
  approval from other organizations, so raise it early.

## Step 2: Choose names

The State's IT office requires app registration and group names to begin with
the agency name. For us, that is `Innov-` or `Innovation-`.

Pick one name for each environment, for example:

```text
Innov-Application-Dev
Innov-Application-Prod
```

## Step 3: Gather your redirect URLs

List the exact redirect URL for every environment, including any local
development URLs. Entra only returns users to URLs that were registered, so a
mismatched URL causes sign-in to fail. The
[Microsoft documentation on redirect URIs](https://learn.microsoft.com/en-us/entra/identity-platform/reply-url)
describes the restrictions.

## Step 4: Open a Tech Ops request

Open a [general internal-ops ticket](https://github.com/newjersey/internal-ops/issues/new?assignees=&labels=general%2Crequest&projects=newjersey%2F16&template=request_general.yaml&title=%5BGeneral%5D%3A+Set+up+Entra+authentication+for+%5BAPPLICATION%5D)
asking Tech Ops to set up Entra authentication.

Use this request title:

```text
[General]: Set up Entra authentication for [APPLICATION]
```

Use this request body:

```text
We would like to use Microsoft Entra authentication for APPLICATION.

Application name(s) in Entra: ...
Environments: ...
Redirect URL for each environment: ...
Who should have access in each environment: named list (attached) / everyone in the tenant
Tenant and any users outside it: ...
Availability to meet about app registration (if needed): ...

Could Tech Ops please arrange the app registration, enterprise application, and
group, and let us know when it's ready?
```

## Step 5: Wait for setup

Tech Ops requests the setup on your behalf. The State's IT office creates:

- A **group** that holds the users who may sign in.
- An **app registration** that identifies your application and holds its
  redirect URLs.
- An **enterprise application** that controls who may use it.

The IT office may contact Tech Ops with questions, and may ask to meet to
discuss the app registration. Tech Ops involves you if this is the case.

Only Tech Ops receives administrative access to the app registration. To change
redirect URLs or access, ask Tech Ops through a new internal-ops ticket.

## Step 6: Connect your application

When setup is done, Tech Ops passes along the details your application needs to
connect. Your application requests OpenID Connect details from Entra to read
the user's name, email address, and any other profile information you need.

The [Microsoft guide to signing in users from a web app](https://learn.microsoft.com/en-us/entra/identity-platform/scenario-web-app-sign-user-overview)
describes the flow. Your backend (if separate from your main user-facing
application) should manage sessions and authorization. If it has its own
public API, that API must also verify who is calling it. Consider a service
such as [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html)
if you don't want to build this yourself.

## Step 7: Prepare a support guide for the State's IT office

Your users may contact the State's IT office when they can't sign in. Prepare a
short support guide that tells the IT office who to refer these requests to and
what to say to users.

The agency partner or product manager writes the guide, and Tech Ops passes it
to the IT office. Cover:

- Who owns the application and how to reach them.
- Who to contact for sign-in problems, and who to contact for registration changes.
- Who to contact to add a user or change a user's access.

## Verify

Setup is complete when:

- A user in the correct group can sign in to each environment and your
  application receives the profile details it needs.
- A user outside the group is denied, where you restricted access to a named list.
- Your application shows a useful error message when authentication fails.
- The support guide has been shared with the State's IT office.

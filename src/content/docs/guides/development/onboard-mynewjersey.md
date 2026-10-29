---
title: Onboard an application with MyNewJersey
description: Prepare your application and work with Tech Ops to add it to MyNewJersey
---

Use this guide to add sign-in with MyNewJersey to an application. You prepare
the details and Tech Ops coordinates onboarding with the MyNewJersey team.

For help deciding whether MyNewJersey is the right option, see
[Authentication](/innovation-engineering/tech-recommendations/authentication/).

## Before you begin

Confirm:

- You've read the [authentication recommendation](/innovation-engineering/tech-recommendations/authentication/)
  and MyNewJersey fits your users.
- You know who the application's users are and which environments need sign-in
  (for example, development and production).
- You can reach someone on the team who can later act as a Role Manager for the
  application besides Tech Ops or Engineering Directors.

:::note

Do not contact the MyNewJersey team directly or file your own tickets with
them. All coordination goes through Tech Ops.

:::

## Step 1: Decide how users get access

Decide the following as a team before you ask for anything:

- **Who the users are.** Members of the public, state employees, or both, and
  which agencies they come from.
- **How they gain access.** In most cases, Role Managers add each user and the
  user enters an invitation code. There's an optional self-registration endpoint
  that may be available for your use as well.
- **Who the Role Managers are.** Name the people on the team or in the partner
  agency who will add and remove users. Tech Ops and Engineering Directors are
  added as a Role Manager as well.
- **Which environments need MyNewJersey.** Decide whether development and
  production use separate integrations or whether non-production environments
  use another approach.

## Step 2: Choose a protocol and check compatibility

MyNewJersey supports two protocols:

- **SAML 2.0**, an older protocol based on XML. See the
  [OASIS SAML technical overview](https://www.oasis-open.org/committees/download.php/27819/sstc-saml-tech-overview-2.0-cs-02.pdf)
  and the [OWASP SAML Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SAML_Security_Cheat_Sheet.html).
- **OpenID Connect (OIDC)**, a newer protocol built on OAuth 2.0. See the
  [OpenID Connect Core specification](https://openid.net/specs/openid-connect-core-1_0.html)
  and [WorkOS's introduction to OIDC](https://workos.com/guide/oidc).

[Microsoft's SAML and OIDC comparison](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/saml-vs-oidc-decision-guide)
explains the differences between them.

:::caution[MyNewJersey's OIDC is not standard]

MyNewJersey's OIDC implementation is incompatible with most OAuth 2.0-conforming
clients. A standard OIDC library, framework plugin, or managed service may fail
even though it follows the specification correctly.

Before you choose a library or service, confirm that it works with
MyNewJersey, and test early. Ask Tech Ops if you aren't sure.

:::

If you're connecting through a managed service, its documentation will describe
the setup for your chosen protocol:

- [Amazon Cognito with a SAML identity provider](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-saml-idp.html)
- [Amazon Cognito with an OIDC identity provider](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-oidc-idp.html)

Cognito is one example. You can also handle the integration in your own
application.

## Step 3: Open a Tech Ops request

Open a [general internal-ops ticket](https://github.com/newjersey/internal-ops/issues/new?assignees=&labels=general%2Crequest&projects=newjersey%2F16&template=request_general.yaml&title=%5BGeneral%5D%3A+Onboard+%5BAPPLICATION%5D+to+MyNewJersey)
to ask Tech Ops to coordinate onboarding.

Use this request title:

```text
[General]: Onboard [APPLICATION] to MyNewJersey
```

Use this request body:

```text
We would like to onboard APPLICATION to MyNewJersey.

Application purpose: ...
Intended users: ...
Environments: ...
Protocol: SAML or OIDC
Application URLs for each environment: ...
Proposed Role Managers: ...
Access model: Role Manager invitation / public self-registration

Could Tech Ops please coordinate onboarding with the MyNewJersey team and
add Tech Ops and Engineering Directors as Role Managers?
```

If you don't know a detail yet, say so. Tech Ops will help work it out.

## Step 4: Join the onboarding conversation

Tech Ops arranges a conversation with the MyNewJersey team. Come with the
information from the ticket, and be ready to answer questions about your
application's integration.

After the conversation, the MyNewJersey team gives Tech Ops the details your
application needs to connect. Tech Ops shares them with you.

## Step 5: Confirm Role Manager access

Tech Ops and the people your team designated should both have Role Manager
privileges for the application. Role Managers add users, who receive invitation
codes and then see the application in their MyNewJersey portal.

## Step 6: Prepare a support guide for the State's IT office

Your users may contact the State's IT office when they can't sign in, or when
something about their registration needs to change. Prepare a short support
guide that tells the IT office who to refer these requests to and what to say
to users.

The agency partner or product manager writes the guide, and Tech Ops passes it
to the IT office. Cover:

- Who owns the application and how to reach them.
- Who to contact for sign-in problems, and who to contact for registration changes.
- Who to contact to add a user or change a user's access.

## Verify

Onboarding is complete when:

- A user added by a Role Manager can accept their invitation code, sign in, and
  reach your application from MyNewJersey.
- Your application correctly handles a user who fails to sign in, and shows a
  useful error message.
- The support guide has been shared with the State's IT office.
- Tech Ops and your designated people have Role Manager privileges.

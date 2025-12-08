---
title: Responsibilities
description: What we do as engineers
---

As a software engineer on a cross-functional team, you are responsible for:

## Software development and delivery

- Determining how best to prioritize and deliver new features, in collaboration with your PM and the rest of your team.
- Automated quality checks, including an automated test suite and a CI/CD pipeline.
- Version control management, including setting up your GitHub repository and all integrations.
- Software delivery, including production deployments and managing the prod environment, secrets, and any associated DevOps tasks.
- Clean coding practices, including modularity, good variable naming, clean coding conventions, and readable, maintainable code. You should always code as though someone brand-new is going to have to join the team and work in your code starting tomorrow.

## Security

- Managing secrets in a safe, secure way, including during production deployments as well as for local development. See [secrets page](/innovation-engineering/tech-recommendations/secrets) below for more information.
- Setting up any data storage, API connections, or integrations in a way that follows data security best practices. This includes understanding and implementing encyrption and access control for sensitive data and PII.
- Working with the state IT department (OIT) to manage firewalls and access control for your application.
- Keeping your ecosystem up-to-date with package updates.
- Be aware and mindful that any openly accessible project tools should not contain information about “internal government affairs” (such as names of our partners, agencies/departments, personally identifiable information about people, internal tools, and the like). This includes not just code but also commit messages, project management trackers, and any other publicly available tool. See our [public repo guidelines](/innovation-engineering/guides/public-private-repo) for more

The [cybersecurity page](/innovation-engineering/reference/cybersecurity) is your best starting point for our current cybersecurity processes and recommendations.

## Accessibility

State and local governments are required by the ADA to conform to WCAG 2.1 level AA standards. You can find the [NJ-specific accessibility rules for websites here](https://nj.gov/it/wphub/accessibility/).

- Automated a11y testing should be used on any project with a frontend that we can change. (If it’s a vendor frontend, we should manually test and report issues to the vendor.) Many OOI teams use Deque’s axe tool or a library based on it in integration or e2e tests
- Automated tools [can only catch ~70% of issues](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/). They cannot detect usability problems (nonsensical headers, alt text that is too long, etc). Therefore:
  - Accessibility issues should also be flagged and fixed in code review
  - Engineers, designers, and PMs should also do a manual accessibility check whenever they are reviewing front-end changes
- Coordinate and work with outside accessibility testers as needed who are experts in usage of screen readers and similar accessible software tools (talk to your director for contacts).
- The ADA applies to workplaces, too – not just our public-facing projects. We should keep accessibility in mind as we choose vendors, write documents, present our work, and build internal tools.

The [accessibility page](/innovation-engineering/reference/accessibility) is your best starting point for our current accessibility resources and recommendations.

## Documentation

- Keep useful notes on how to set-up, run, test, and contribute to your codebase, even if you are the only engineer working on it. That may not be the case forever. 
- Tests are the best way to document code.
- We have an [Innovation Repo Template](https://github.com/newjersey/innovation-repo-template) that (along with other shared cross-project config) gives guidelines on starting a README and what should be included in it. 

## Software quality

- Remember that we are creating software not just for the problem at hand, but also as a model of how software can be built in the government. Think of your open-source repo as a model that others could and may be looking at for guidance and as an example of “how to do it right”.

## Cross-functional technical responsibility

- You are a software engineer on a cross-functional team, and you are responsible for representing the voice of technical feasibility to your team.
- You are responsible for being an active member of a team that follows user-centered design principles. You should always be putting the user first in everything you do - that is not just the responsibility of PMs and designers.
- You are responsible for taking ownership of product stewardship, and having an opinion on the trajectory of the product. You are not a coding vessel that the PM dictates requirements to. You are a fully-functioning member of a team of equals.
- You will need to communicate with a variety of stakeholders across various practices, from government agencies to partners to vendors, and more. You are responsible for communicating our needs (whole team or engineering team) and our objectives clearly and succinctly, and without technical jargon. You will need to be able to communicate the what and why of what you’re building, not just the how. 

## Working with state agency partners
- We are privileged as an office to be able to work fully remotely, and the majority of our agency partners do not have the same privilege. **Do not flaunt your remote work-from-home status.**
    - Don’t bring up that you live in another state unless you are explicitly asked (obviously, don’t lie)
    - [Not Required] Consider blurring your video background when on a Teams call with agency stakeholders.
    - When on a call with external/agency stakeholders, consider dressing business-casual (wear a nice shirt).
- We have access to several tools and collaboration cloud platforms that agency partners cannot and do not use. Again, we want to maximize collaboration and de-emphasize our unique status when working with agency partners.
    - Partners do not have/use Google. Do not link them to Google Drive documents - copy the contents into a Microsoft Office365 document instead if you need them to have access. (It’s okay to show Google docs and decks when screensharing)
    - Partners do not have/use Zoom. Use Microsoft Teams for calls with agency stakeholders.
    - Partners do not have/use Slack. Expect to communicate with them using email or Microsoft Teams.
- Exercise common sense when interacting and communicating with stakeholders
    - Communication with particularly high-level stakeholders (commissioners, for example) needs to be vetted with Office leadership.
    - Be aware of the context in how we have communicated with someone in the past and what they may or may not be aware of in working with OOI. It’s your responsibility to seek out this context as you engage in communications with stakeholders.
    - Talk to your engineering director or OOI's Chief Operating Office about how to best describe the OOI and how we exist within state government to a new stakeholder or partner.


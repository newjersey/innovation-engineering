---
title: How to kick off a new project
---

_Note: Depending on your project, some of these activities may not be relevant, and that’s okay\!_

The principle behind these suggestions is derived from employing a “deploy on day one” mindset. That is, what can we be doing as engineers alongside discovery work, so that if the project recommends continued work with a specific solution path, how can we get as close as possible to deploying _something_ on day one and iterating towards the ongoing solution path? This mindset is why we recommend prioritizing key questions that will shape technical considerations and doing some basic development work not tied to a specific solution. For technical details on setting up a skeleton app, see [Tools We Use](https://newjersey.github.io/innovation-engineering/tech-recommendations/0-overview/).

Note: Don’t worry too much about whether you feel you are starting too early on development work ahead of a validated product roadmap. These activities will not go to waste; if the team pivots or chooses not to engage, your work here can be reused for future projects or serve as valuable learning experience for you anyways.

## Agency Technical Discovery

- **Identify technical stakeholders and build relationships.** Have your stakeholders introduce you to the necessary technical owners, and schedule introductory meetings.
  - NOTE: Ensure you are going through the correct channels when working with stakeholders, technical or otherwise. If you are ever uncertain, loop in your initiative director and/or your functional director to help gain context on any pre-existing relationships or context that may exist between NJIA and your stakeholders.

- **Identify key technical systems** within the agency that relate to the domain or scope of your project. Start to understand who controls these and the process for updating or integrating with them.

- **Get access to systems** within the agency, potentially looping in our Tech Ops team for help. Often this takes time, and kicking it off early can help drastically. The sooner you start, the better\!

## Technical Exploration & Proof-of-Concept

What specific problems are unique to your domain and problem ecosystem? What potential technical solutions might you need to leverage to address these?

- **Identify specific areas of technical unknowns.** Depending on the needs, identify key parts of a potential technical workflow and how you could build a proof-of-concept to de-risk some of those areas.

  Examples:
  - Does your problem area involve a lot of PDF reading and writing? What JS libraries can you use to read a PDF? To write to a PDF?

  - Does it leverage data from state agencies that is only available via a large, complex CSV file? How will you load the relevant CSV data into your app? How will it be served to the user?

  One recommended path is to do problem & solution brainstorming. Then, you can pull out common issues or technical unknowns that are shared across multiple problem areas, and use that to guide technical exploration.

- **Develop proof-of-concept code** that leverages the explorations and demonstrates a basic flow that proves feasibility of a particular solution and allows you to learn more about how the unknowns will work.

## Agency Data Integration

Will your problem space likely require **access to agency-controlled data**, such as on one of their internal servers or on-premise databases? How will you connect to this data?

- Is there a cloud-based API available? Can you build a proof-of-concept connection between your application and the API?

- Is there an API available only with the Garden State Network (GSN)? If so, can you build a proof-of-concept connection leveraging a firewall (or similar) between the agency and our deployment environment?

- Is the data available only in a certain agency cloud environment? If so, can we deploy on the same environment to set up access, and can you prove this connection?

- Will you be connecting to sensitive data or systems and information available only via a state laptop? If so, you should loop in Tech Ops ASAP to ensure your hardware is requested and configured to be working effectively. (You can also look into whether our AWS workspace will satisfy your needs)

You and your team should also be asking non-technical data questions, such as:

- What legal compliance will be necessary and how can that be surfaced up-front?

- Who at the agency is responsible for helping with and answering the legal questions?

- How can we find the line between discomfort / risk-aversion and true legal issues? Who at the agency can help us navigate this?

## Agency Cloud Infrastructure

- Work with technical stakeholders to **understand the cloud-based infrastructure** where any products / solutions developed are likely to live in the long term within the agency (Agency-controlled AWS tenant? OIT AWS tenant? Azure tenant?)

- Production applications should be deployed on agency infrastructure, not NJIA infrastructure.

- If necessary, start working with your technical stakeholders to request the hosting resources necessary, working with the Tech Ops team if needed to help facilitate these conversations.
  - All engineers on the project AND NJIA Engineering Directors should have admin to the relevant accounts. If the account will be billed to Innovation, the OOI Tech Ops team should also have access.
    - Detailed instructions can be found in [\[DRAFT\] Innovation Cloud Usage Policy](https://docs.google.com/document/d/1uvNjk2MR9ZOw_MK_XGLDHcM3t8URMdUKQbBXpPJWh3s/edit?usp=sharing)

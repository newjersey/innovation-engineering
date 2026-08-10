---
title: Threat Modeling
description: Guidelines for performing threat modeling on NJIA applications
wip: false
---


**Definition**: the process of examining a system to look for weaknesses and vulnerabilities. It is a cyclical activity and should involve all or most of a team (not just engineers). Performing threat modeling will improve your architecture, system security, and will make you a better engineer by exposing you to common (and uncommon!) vulnerabilities and how to mitigate them.

## When to Perform Threat Modeling

Throughout the software development lifecycle: design, implementation, testing, and deployment, as well as after any security incident has occurred.

## Common Terms

**Asset** - Anything worth protecting: user data, infrastructure, credentials, model outputs, etc.

**Actor** - Any individual associated with the system such as a user or attacker. Attackers are also known as "bad actors" or "threat actors".

**Control** - A functional behavior and capability of a system, usually as a safeguard or countermeasure for managing risk and mitigating threats in a system

**Trust** Boundary - Where data crosses from one level of trust to another. Example:  user → app → database → third party

**Entry** Point - Any place data or a user can get into the system, such as an API, a form, or an uploaded document

**Threat** - Anything that could cause an asset to be exposed, altered, or made unavailable

**Threat** event - When an adversary attempts (successfully or not) to exploit a vulnerability

**Weakness** - An underlying defect that modifies functionality or allows incorrect access to data

**Exploitability** - A measure of how easily an attacker can take advantage of a weakness

**Vulnerability** - A weakness that is expoitable by an actor

**Severity** - A measure of the damage potential and "blast radius" from a vulnerability

**Loss** - Reduced functionality or loss of data as a result of a threat event

**Risk** - The combination of the value of a potential target with the likelihood of successful exploitation

## Core Properties to Secure Systems

Systems should be developed with these properties in mind.

**Confidentiality** - Data is accessible exclusively by those with appropriate rights and need-to-know

**Integrity** - The authenticity of data and operations is verifiable

**Availability** - Authorized actors can access systems and data as needed

 (These first 3 are commonly known as the "CIA triad" in cybersecurity)

**Privacy** - The right of protecting information from unauthorized 3rd parties

**Safety** - Predictable behavior that does not result in unacceptable risk of physical injury or of damage to the health of people, either directly, or indirectly as a result of damage to property or to the Environment. Consider exposure to criminal behavior that risks identity theft, fraud, and harassment.

## Fundamental Controls for Secure Systems

**Identification** - Assigning a unique identifier to actors in a system

**Authentication** - Requiring actors to prove their identity to a system, usually via a credential such as a password or token

**Authorization** - Granting appropriate privileges to an authenticated actor, often granted in terms of basic operations like read, write, and execute

**Logging** - Recording system events by actors, such as executing commands or accessing data

**Auditing** - The ability to review logging records that are well-formatted and resistant to tampering

## Guidelines for Effective Threat Modeling Exercises

### Exercise Meeting Goals

- Meet when the design has enough agreed-upon formation for a well-directed discussion, but not too late such that the design is fixed and identified threats cannot be resolved in time

- Invite teammates; different stakeholders will bring different perspectives

- Conduct meetings in a blame-free manner

- Especially when meeting with broader audiences, use system models that are easier to understand.

- Data-flow diagrams can be especially effective

- Don't focus for perfection; some security is better than no security

### Good System Models

Ensure a system model is:

- **Accurate** - all assets and behaviors are accounted for

- **Meaningful** - the model should be detailed enough to facilitate the discussion and find points of weakness

- **Living** - the model is updated as-needed as the system changes

### Basic Exercise Steps

1. **Identify objects**: assets, actors, data stores, etc. pertinent to the exercise

2. **Identify data flows between objects**: determine qualities of the flow such as direction, protocols, data classification and sensitivity

3. **Pick an asset of interest**: discuss details of an asset from step 2

4. **Identify system weaknesses and vulnerabilities**: using the "core properties of secure systems" list, identify potential violations of those principles

5. **Identify threats**: using the vulnerabilities from step 4, determine the liklihood of exploitation

6. **Determine exploitability**: identify routes an attacker could take to exploit threats from step 5. Good starting places are the OWASP Top 10 (see [Online Resources](#online-resources) below)

## Common Threat Modeling Frameworks

[The STRIDE Threat Model](https://learn.microsoft.com/en-us/previous-versions/commerce-server/ee823878(v=cs.20)?redirectedfrom=MSDN) - This one is probably the most useful for starting off a threat modeling exercise, especially with non-engineering participants

[MITRE ATT&CK](https://attack.mitre.org/resources/) - Provides detailed methods for threat actors to attack a system; useful for getting more details on technical mitigation strategies

[PASTA](https://drata.com/learn/risk/pasta-threat-modeling)- More high-level like STRIDE, but from the perspective of meeting business/organizational objectives as defined by executive leadership

### Privacy-centric Frameworks

[LINDDUN](https://linddun.org/) - provides a high-level categorization to identify data privacy threats

[PANOPTIC](https://ptmworkshop.gitlab.io/static/media/PANOPTIC-MTR-v1-Publicly-Released.8cfab26fce008793a041.pdf) - a more "bottom-up" approach than LINDDUN, PANOPTIC uses known privacy issues as a starting point to identify threats

## Additional Resources

### NJ-Specific

[New Jersey Cybersecurity & Communications Integration Cell (NJCCIC)](https://www.cyber.nj.gov/) - pronounced "NJ-kick," this is the NJ government's cybersecurity program. They can support threat modeling and will perform "red teaming," i.e. attempting to infiltrate or break your application (with your prior permission) to provide feedback on making it more secure.

[New Jersey Statewide Information Security Manual (SISM)](https://www.cyber.nj.gov/grants-and-resources/state-resources/statewide-information-security-manual-sism) - NJCCIC's guidebook for the state's cybersecurity posture and best-practices, with multiple references to threat modeling and other types of security and data privacy reviews.

### Online Resources

[Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/) - a quick read to establish the principles and values of threat modeling

[OWASP Top 10 2025](https://owasp.org/www-project-top-ten/) - good for discovering common vulnerabilities in web and cloud applications

[OWASP Top 10 2025 for LLMs](https://genai.owasp.org/llm-top-10/) - same as above, but for AI and agentic applications

[Common Vulnerabilities and Exposures (CVE)](https://www.cve.org/) - A collection of publicly-known IT issues. Multiple CVEs will map onto a single OWASP list item because CVEs describe individual technologies and/or methods of exploitation

[Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/) - a framework for rating the severity of IT vulnerabilities. A general understanding of the scoring method will help quantify risks from different vulnerabilities in our systems.

### Open-Source Tools

[OWASP Threat Dragon](https://github.com/OWASP/threat-dragon) - An application useful for drawing threat modeling diagrams and create threat lists for elements in that diagram.

[pytm](https://github.com/OWASP/PyTM) - A Python-based tool to generate a data flow diagram, sequence diagram, and relevant threats to a system.

### Books

[Threat Modeling - A Practical Guide for Development Teams](https://threatmodeling.dev/) by Izar Tarandach & Matthew J. Coles (much of this guide is based on sections of this book 😀)

[Threat Modeling - Designing for Security](https://shostack.org/books/threat-modeling-book) by Adam Shostack (a thorough overview of threat modeling from one of the co-creators of CVE and a former threat modeling lead at Microsoft)

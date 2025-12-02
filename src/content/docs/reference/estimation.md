---
title: Story estimation
description: How we estimate stories
---

## 🥅 Goals

There are a few reasons for estimating work:

1. **Help the product team with prioritization**. Understanding the complexity, risk, and level of
   effort for tasks can help the product team prioritize work and manage risk.

2. **Help engineers align on scope, not approach**. Both the story point value of a task and the
   associated justification are helpful ways to communicate to the engineer that ends up executing
   the task what the high-level approach is and what areas to watch out for. Even when the estimator
   and the implementer are the same person, the acceptance criteria developed from the analysis and
   planning process can help the person remember useful context if a task gets de-prioritized and
   isn’t worked on for a while.

- **Technique:** We intend to take notes on the technical estimation conversation (when the
  discussion seems to call for it) and leave them attached to the story, to better achieve this
  goal.

3. **Open a dialogue between product and engineering about story complexity.** If a story receives a
   higher estimation than the product folks expected, it’s a signal to start a conversation about
   whether the story could be simplified or split to still achieve value for the user.

## ⛔ Non-goals

There are other valid reasons for estimating work, but these are not explicit goals for us at the
moment.

1. **Time estimates**. Since we’re taking an XP approach to planning, our goal is not to attempt to
   predict precisely how long a ticket will take to finish, nor precisely how many tickets we will
   complete over a given sprint. Mixing time estimates with story points sets the wrong expectations
   for stakeholders and also incentivizes engineers to do stories that they are already good at
   doing because they can do them more quickly, which will hurt longer-term velocity (by creating
   knowledge silos). In contrast, focusing on complexity incentivizes engineers to figure out how to
   reduce complexity by picking up tasks in new parts of the codebase and stack and by sharing
   context with each other, which builds resilience.

2. **Individual-level capacity planning**. Our goal is not to quantify how many story points each
   engineer can do. There should be shared accountability for getting tasks done. Everyone should
   stay aware of all tasks in the sprint and prioritize supporting others to get tickets done,
   whether it is completing code reviews or helping troubleshoot and debug issues.

3. **A reflection of the quantity of work produced.** Velocity does not equal productivity. A
   consistent velocity is the best way to have accurate future predictions, and regularly
   retroactively changing story points leads to inaccurate representations of what we have done
   and/or will do.

## ⭐ Features

Feature stories are estimated because they provide user value. As a rule of thumb, changes that we
plan on seeking user feedback on, whether the users are external or internal, should be estimated.
Typically, users see this value-add immediately as work is marked done and pushed to production
regularly, where the feedback loop could begin.

If this feedback loop is blocked (i.e. a feature is completed but not deployed or deployment is
significantly delayed), the feature is not providing user value. It essentially creates a
mini-waterfall pattern of work. This scenario should be avoided. There is room for allowances, as we
are blocked by external parties or extraneous circumstances.

Feature stories may necessitate pre-factoring, which essentially involves the refactoring of the
code base to facilitate the smoother implementation of the feature story. Estimations will include
consideration for pre-factoring efforts. This is distinctly different from refactoring chores
covered in the following section.

## 🐞 ⚙️ Bugs, refactors, chores, spikes, design QA

We typically do not point these, not because they don't count as work or because they are hard to
estimate; the velocity impact is meant to be there and to be addressed in retro.

The other categories of stories are considered part of normal software product overhead—they emerge
over time, and are continual overhead and an ongoing cost of doing business. Velocity is meant to
estimate how much user-valued work can be completed each sprint, which lets us focus our planning on
user value, risk, and priorities. Therefore, these categories are not normally estimated.

These tickets might be a sign of (partially) incomplete acceptance criteria and thus allow us to
track and complete acceptance criteria after a ticket might have already been deployed to staging or
production and considered done. These tickets are also worked on and created by the DevOps engineer
as they attempt to support and streamline the codebase, thus increasing our velocity over time. If a
ticket feels like it should have points, we should ask ourselves if it’s a feature instead.

## 📏 Story point guides

Story points measure **complexity**, not **time**. For example, two tasks with the same level of
complexity can take different amounts of time depending on who’s working on it. Also, the complexity
of similar tasks can vary at different points of the project. For example, adding multilingual
support to a page can have higher complexity the first time we do it and lower complexity if we did
the same thing to a different page later on in the project.


Different teams are free to make their own decisions about story point tiers. The below references current sizing guides in use by different teams currently.

### BizX chore sizing

When refining dev-specific chores, we size them to compare relative effort and to
acknowledge we have reviewed them for pickup on a maintenance day like in Friday tasks. This is
their sizing breakdown:

| Tier        | Definition                                                                                                                                                                              | Example                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Extra Small | <ul><li>Trivial, localized changes requiring minimal effort</li><li>No testing challenges or deployment concerns</li><li>Can be completed in background time with no planning</li></ul> | Renaming a variable or fixing a typo in documentation                                                           |
| Small       | <ul><li>Contained to a single file or component</li><li>Straightforward with clear solution path</li><li>Minimal testing requirements</li></ul>                                         | Adding test coverage for an existing method or implementing a linter rule                                       |
| Medium      | <ul><li>Spans multiple files but within a single functional area</li><li>Requires some planning and careful execution</li><li>Moderate testing requirements</li></ul>                   | Refactoring a class to improve readability or replacing a deprecated API with a current alternative             |
| Large       | <ul><li>Impacts multiple components or systems</li><li>Requires careful planning and incremental approach</li><li>Comprehensive testing strategy needed</li></ul>                       | Migrating from one logging framework to another throughout the codebase                                         |
| Extra Large | <ul><li>Cross-cutting architectural changes</li><li>Significant risks to system stability</li><li>Would require multiple sprints if not broken down</li></ul>                           | Breaking a monolithic component into microservices or upgrading a major framework version with breaking changes |

### BizX story points

BizX uses Fibonacci numbers for estimating work. Here are some guidelines for what the story points mean:

| Points   | Definition                                                                                                                                                                                                                                                                                                   | Example                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 point  | <ul><li>Trivial change with no real complexity</li><li>No risk or unknowns</li></ul>                                                                                                                                                                                                                         | <ul><li>Text change, minor configuration update</li><li>Does not need acceptance criteria</li></ul>                                        |
| 2 points | <ul><li>Straightforward, well-understood work</li><li>Follows existing patterns</li><li>Functionality changes suggest writing or modifying at least one unit test</li></ul>                                                                                                                                  | <ul><li>Modifying a single component's behavior with clear boundaries</li><li>One acceptance criteria</li></ul>                            |
| 3 points | <ul><li>Straightforward but requires some thought or research</li><li>Some small unknowns but clear solution path</li></ul>                                                                                                                                                                                  | <ul><li>Modifying the behavior of 2-3 well-defined components</li><li>Two to three acceptance criteria</li></ul>                           |
| 5 points | <ul><li>Moderate complexity requiring significant technical design</li><li>Some research, learning, or prototyping required</li><li>Notable but manageable unknowns</li><li>Weak indicator this user story should be broken down into smaller vertical slices of user valuable for agile feedback.</li></ul> | <ul><li>Cross-cutting concerns across multiple components</li><li>Many acceptance criteria, AC with multiple personas</li></ul>            |
| 8 points | <ul><li>High complexity work with significant unknowns</li><li>Substantial research needed</li><li>Strong indicator this user story should be broken down. Avoid starting 8-point work if possible unless your team has decided this is the most agile way to deliver value.</li></ul>                       | <ul><li>Work that touches many system components or requires deep architectural changes</li><li>Many complex acceptance criteria</li></ul> |

### ResX story points

This framing is based off of the following article: [How we estimate user stories](https://medium.com/modern-agile/how-we-estimate-user-stories-f345fd384474#.wmy0te9m2)

Note that in this guide, the “understanding” is from the team’s perspective, not an individual’s.

1 point
What: we understand exactly what needs to be done
How: we understand exactly how to do it
2 points
What: we understand exactly what needs to be done
How: needs a little thinking or experimentation to figure out how to do it
4 points
What: we mostly understand what needs to be done
How: we kind of understand how to do it (unless we’re way off base)

| Points | Definition | 
| ------ | ---------- |
| 1 point | <ul><li><b>What</b>: we understand exactly what needs to be done</li><li><b>How</b>: we understand exactly how to do it</li></ul> |
| 2 points | <ul><li><b>What</b>: we understand exactly what needs to be done</li><li><b>How</b>: needs a little thinking or experimentation to figure out how to do it</li></ul> |
| 4 points | <ul><li><b>What</b>: we mostly understand what needs to be done</li><li><b>How</b>: we kind of understand how to do it (unless we’re way off base)</li></ul> |
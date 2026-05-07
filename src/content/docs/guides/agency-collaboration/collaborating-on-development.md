---
title: Collaborating on development
---

## GitHub

### Joint access to a repository

Agencies may have their own GitHub instance. Some may use GitHub Enterprise accounts that are accessed via Microsoft SSO and partitioned from the public GitHub space. For instance, may not be possible to add your public-GitHub Innovation account to an agency repository, or to add an agency GitHub Enterprise user to a repository in <https://github.com/newjersey>.

However, an agency with GitHub Enterprise SSO accounts should be able to add your @oit.nj.gov accounts as guest users to their GitHub instance. If the agency is unable to add your OIT accounts, you may have to get an agency email accounts.

We suggest:

1. Start a conversation to learn whether the agency has their own GitHub instance, and if so who would have admin access, and how accounts are provisioned (e.g. Enterprise SSO)
1. If the agency has GitHub Enterprise, they could [create an organization within the enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-organizations-in-your-enterprise/adding-organizations-to-your-enterprise) to isolate collaboration with NJIA from other projects.
1. Request access for people on the project, by requesting to add your @oit.nj.gov accounts as [guest users within the organization](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/enabling-guest-collaborators).
   - Note that for some people who joined NJIA earlier, their @oit.nj.gov email may be different from their @innovation.nj.gov email.
   - We also suggest requesting repository read access for NJIA engineers who would do PR reviews.

### When should the repository be in the agency GitHub

If the agency has a GitHub instance, in the long term the repository should definitely live in the agency instance so that the agency has ownership over the project.

In the short term, there are some benefits to having a repository under <https://github.com/newjersey> :

1. Integrating with our Slack, so that you and reviewers can get live slack notifications on pull request conversations
1. Being able to [request reviews via Pickaroo](/innovation-engineering/guides/github-actions/action-pickaroo/)
1. Making your project code discoverable for people at NJIA, and making your code available when engineers search within the `https://github.com/newjersey` project
1. If agency-owned AWS accounts for the project have not yet been provisioned, or you would prefer to try thing out in NJIA's AWS account, it might make more sense if the repo is also owned by NJIA.
1. We have an engineering principle of being [open/public by default and closed/private when necessary](https://docs.google.com/document/d/1G3Vx0J5zwTqrKF7iyej_KtBHF__rf7wrL_5RZ6rnJgw/edit?tab=t.0#heading=h.b0umhm4n3ckq), in the interest of transparency and knowledge sharing. We thus prefer keeping repositories open source. However, some agencies may have a blanket policy to not enable public repositories.
1. GitHub configurations that require organizational admins (e.g. adding apps like renovatebot, AWS integration) will have to go through the agency's GitHub admin(s), instead of NJIA Tech Ops. Depending on the permissions granted for the repository, configurations that require repository admin (e.g. setting up branch protection) may also have to go throuh the agency's GitHub admins.

However, migrating a repository later in a project can come with some downsides:

1. Needing to do the migration at all
2. Need to re-permission and reconfigure applications, e.g. renovatebot, AWS integrations
3. Most engineers don't have admin access to repositories in <https://github.com/newjersey>. However, you might be granted admin access to your repository in the agency account. So you might actually have more control and permissions on the agency repository, e.g. to add branch protections, change settings, or adjust access levels, without having to go through NJIA Tech Ops.

### Migrating a GitHub repo to a different organization

1. Figure out who in the agency has GitHub admin access
1. Create a Tech Ops ticket asking to migrate the repository. Include what repositories you want migrated, the agency admin contact, and any additional options you would like from <https://github.com/timrogers/gh-migrate-project> (such as configuring `assignee-mapping.csv`)
   - Tech Ops will likely use <https://github.com/timrogers/gh-migrate-project> to migrate the repository
   - We have also migrated projects using <https://github.com/newjersey/dol-gh-enterprise-migration-scripts>
1. Request to add any GitHub applications, and reconfigure them
   - e.g., renovatebot
   - If you use GitHub projects as an issue tracker, you may want to [enable built-in workflows](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations) to e.g. automatically close issues when the status is set to `Done`

### Setting up SSH keys for two GitHub organizations

See [working in multiple Github Orgs](/innovation-engineering/guides/development/working-in-multiple-github-orgs/).

## Development set up and installation on agency machines

Folks at NJIA may have a laptop provisioned and managed by NJIA, and/or a state laptop provisioned and managed by OIT. Agency partners may have laptops/desktops provisioned by the agency, that are configured differently from the state laptops that OIT manages.

Agency partners may have restrictions on their machines, such as:

- Not having admin access
- Not being able to install applications
- Not being able to install extensions
- Only having write permissions to the local OneDrive folder, without write permissions to other local directories
  - This might mean that the repo needs to be checked into and synced via OneDrive, including all `.git` and `node_module` files. This can work, we're not sure how much this slows down the machine.

Software such as VSCode, git, nvm, Cypress, NVDA, or the WAVE extension may need to be provisioned by the agency's IT admins.

For installing a Node.js application on an agency machine without admin access, see the [running a Node project on native Windows](/innovation-engineering/guides/development/node-on-native-windows/) guide.

## Development onboarding and upskilling

Some examples of onboarding sessions might be:

- How to make text and deploy changes via our usual pull request and CI/CD flow
  - How to global search in VSCode to change text
  - Running tests and checks, and setting up eslint and prettier in VSCode
  - Pulling main, creating a new branch, and using GitHub to make a pull request
  - Practicing the flow by doing tickets
- Evaluating and merging dependency updates
- Accessibility considerations, and how to use a screen reader

As an example, see [this internal blog post](https://scaling-adventure-v9318vm.pages.github.io/blog/2026-03-23-agency-partner-dev/) for development onboarding experiences on the Doula Medicaid project.

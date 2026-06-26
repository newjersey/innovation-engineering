---
title: Infrastructure & Hosting
wip: true
---

## Hosting solutions

### Amplify

**Your go-to option for most frontends**

Think of Amplify as the "easy button" for hosting frontend apps. Whether your frontend is static Vite or full stack NextJS, Amplify handles it all. Just connect your GitHub repo and it automatically deploys your app, distributes it via CDN, and even creates preview environments for your pull requests. It's very little DevOps work, and just needs to be configured behind the right firewalls. Submit an [Operations Request Ticket](https://github.com/newjersey/internal-ops/issues/new?template=request_new_website_webapp.yaml) to get started.

**Use Amplify when**: You're building a normal frontend app and don't have weird requirements. Start here unless you have a specific reason not to.

### Lambda

**The "run code without servers" option**

Lambda runs your code only when it's needed, then shuts down. You're not managing any servers, you just upload functions and AWS runs them when triggered. Perfect for APIs and background tasks.

**Use Lambda when**: You're building an API that doesn't need to be always-on, you have sporadic traffic (so you only pay when it's used), or you need to respond to events like file uploads or scheduled jobs. Great for microservices too.

**Skip Lambda when**: You have a traditional React app with server-side rendering (just use Amplify), you need long-running requests over 15 minutes, or you need persistent WebSocket connections.

### EC2

**When you need the keys to the kingdom**

EC2 is a virtual server that you control completely. Think of it like renting a computer in the cloud; you get to install whatever you want, configure it however you want, but you're also responsible for keeping it running and secure.

**Use EC2 when**: You need full control because you're running something specialized, you have strict networking requirements, or you're moving an existing app that needs its exact environment. Also good for long-running processes that need to keep state.

**Skip EC2 when**: Amplify would work fine. Managing servers is real work (don't sign up for it unless you need to). You'll be handling updates, security patches, and scaling yourself.

## Containerization

We do not have licenses for Docker Desktop, which [requires licenses for government entities](https://docs.docker.com/subscription/desktop-license/). We don’t need the GUI, but Docker Engine is [difficult to install on MacOS without Docker Desktop](https://njcio.slack.com/archives/C03C7NHK9B4/p1760712833246849?thread_ts=1756330087.017419&cid=C03C7NHK9B4). We instead use these open source tools:

1. Docker CLI: Docker’s OCI-compatible container CLI tools
2. [Colima](https://github.com/abiosoft/colima): Open source replacement for Docker Engine
3. [Docker Compose](https://github.com/docker/compose): it’s open source

For macOS, follow [Set up Colima on macOS](/innovation-engineering/guides/development/colima/).
Our preferred Apple Silicon setup uses Colima with Docker CLI, VZ, Rosetta,
VirtioFS, and `brew services`.

For Debian/Ubuntu and [WSL](https://docs.google.com/document/d/1q5InFbTTOrY_lZ5Uo6J5TK3TD7nWz5H0m6XjL2BFUc0/edit?tab=t.xhw9dfnru1m3#heading=h.lxm44az1opfg):

```shell
curl -fsSL https://get.docker.com/ | sh
```

Docker Engine can still be easily installed on Linux without Docker Desktop. For Windows machines (e.g. agency stakeholders), we suggest using WSL (see [Setting up a state Windows laptop](/innovation-engineering/guides/development/windows-wsl2-setup/)), which can be harangued into running containers using the Docker engine on Linux.

## Infrastructure as Code

- AWS CDK - the recommended IaC. It will package up a lambda for you
- Terraform/OpenTofu - used by a couple of projects, is also cloud-agnostic
- Serverless - we do not start new projects with Serverless due to cost and pain points, but have migrated existing projects on Serverless from v3 to v4

We also recommend configuring [Checkov](https://www.checkov.io/) to scan for IaC misconfiguration:

- For local development, [set up a Python environment](/innovation-engineering/guides/development/python-setup) then [install and run Checkov](https://www.checkov.io/1.Welcome/Quick%20Start.html). The `checkov` command can be added as a npm script if that's helpful.
- [Configure Checkov as a Github Action](https://www.checkov.io/4.Integrations/GitHub%20Actions.html)
  - [See the Medicaid CE project for an example](https://github.com/newjersey/medicaid-community-engagement/blob/main/.github/workflows/checkov.yaml).

## Internal requirements and configurations

Ready to deploy your hosting stack? See [this internal document](https://docs.google.com/document/d/1C2489_-2jgauBqlNJ1aNJJuGepM_9Oz0NV1pT9HMCac/edit?tab=t.0#heading=h.er81sd0w396) for what to do and who to talk to, to get hosted with the appropriate billing, security requirements, and networking.

## Project Examples

Doula: [https://github.com/newjersey/doula-medicaid/blob/main/lib/cdk-stack.ts](https://github.com/newjersey/doula-medicaid/blob/main/lib/cdk-stack.ts)

- Dockerized frontend running on an ECS cluster within a VPC on agency-owned AWS accounts

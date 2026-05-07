---
title: Infrastructure & Hosting
wip: true
---

## Hosting solutions

### Amplify

**Your go-to option for most projects**

Think of Amplify as the "easy button" for hosting full-stack apps. You've got a React frontend and Node.js backend? Amplify handles it all. Just connect your GitHub repo and it automatically deploys your app, sets up SSL, distributes it via CDN, and even creates preview environments for your pull requests. It's basically zero DevOps work.

**Use Amplify when**: You're building a normal web app and don't have weird requirements. Start here unless you have a specific reason not to.

**Skip Amplify when**: You need to tinker with server configurations, have complex networking stuff like VPCs, or you're not actually building a web app (like if you're doing batch processing or background jobs).

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

For macOS:

```shell
# As of writing `brew install docker` installs Docker CLI, but not Docker Engine
brew install colima docker docker-compose
mkdir ~/.docker
cat >~/.docker/config.json <<EOF
  "cliPluginsExtraDirs": [
      "/opt/homebrew/lib/docker/cli-plugins"
  ]
EOF
brew services start colima
```

For Debian/Ubuntu and [WSL](https://docs.google.com/document/d/1q5InFbTTOrY_lZ5Uo6J5TK3TD7nWz5H0m6XjL2BFUc0/edit?tab=t.xhw9dfnru1m3#heading=h.lxm44az1opfg):

```shell
curl -fsSL https://get.docker.com/ | sh
```

Docker Engine can still be easily installed on Linux without Docker Desktop. For Windows machines (e.g. agency stakeholders), we suggest using WSL (see [Setting up a state Windows laptop](/innovation-engineering/guides/development/windows-wsl2-setup/)), which can be harangued into running containers using the Docker engine on Linux.

## Domain management

**Note**: Hosting on a subdomain (e.g. `projectname.nj.gov`) is way easier than hosting on a subpath of `nj.gov` (e.g. `nj.gov/agencyname/projectname`)

**TODO**: Add content about how to get a subdomain set up.

## Infrastructure as Code

- AWS CDK - the recommended IaC. It will package up a lambda for you
- Terraform/OpenTofu - used by a couple of projects, is also cloud-agnostic
- Serverless - we do not start new projects with Serverless due to cost and pain points, but have migrated existing projects on Serverless from v3 to v4

#### Project Examples

Doula: https://github.com/newjersey/doula-medicaid/blob/main/lib/cdk-stack.ts
- Dockerized frontend running on an ECS cluster within a VPC on agency-owned AWS accounts

---
title: Infrastructure
wip: true
---

## Hosting

Amplify

EC2

Lambda

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

Docker Engine can still be easily installed on Linux without Docker Desktop. For Windows machines (e.g. agency stakeholders), we suggest using WSL (see [Setting up a state Windows laptop](https://newjersey.github.io/innovation-engineering/guides/laptop-setup-windows/)), which can be harangued into running containers using the Docker engine on Linux.

## Infrastructure as Code

AWS CDK

If Terraform, use OpenTofu

Serverless is deprecated



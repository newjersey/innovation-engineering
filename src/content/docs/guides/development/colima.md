---
title: Set up Colima on macOS
description:
  Use Colima with the Docker CLI, Apple Virtualization.Framework, Rosetta, and
  Homebrew services.
---

This guide sets up Docker-compatible local containers on an Apple Silicon Mac
without Docker Desktop. It uses:

- Docker CLI for the `docker`, `docker compose`, and `docker buildx` commands
- Colima for the local Docker Engine replacement
- macOS Virtualization.Framework (`vz`) instead of QEMU for the VM
- Rosetta for faster `linux/amd64` containers and builds on Apple Silicon
- `brew services` so Colima starts through macOS `launchd`

Use this setup for NJIA development unless a project has a specific reason to do
something else.

## Before you begin

Confirm you have:

- An Apple Silicon Mac
- macOS 26 or newer
- [Homebrew](https://brew.sh/) installed
- Admin access for installing Rosetta

If you already use Colima and want to wipe it clean first, skip to
[Switch an existing Colima setup](#switch-an-existing-colima-setup).

## Install Colima and Docker CLI tools

Install Colima, Docker CLI, Docker Compose, and Buildx:

```shell
brew install colima docker docker-compose docker-buildx
```

Docker CLI plugins installed by Homebrew live outside Docker's default plugin
directory. Tell Docker where to find them:

```shell
mkdir -p ~/.docker
cat > ~/.docker/config.json <<EOF
{
  "cliPluginsExtraDirs": [
    "$(brew --prefix)/lib/docker/cli-plugins"
  ]
}
EOF
```

If you already have `~/.docker/config.json`, do not overwrite it blindly. Add
the `cliPluginsExtraDirs` setting to the existing JSON instead.

Verify the CLI tools are available:

```shell
docker --version
docker compose version
docker buildx version
```

If `docker buildx version` fails, add Buildx to Docker's user plugin directory:

```shell
mkdir -p ~/.docker/cli-plugins
ln -sfn "$(brew --prefix)/opt/docker-buildx/bin/docker-buildx" \
  ~/.docker/cli-plugins/docker-buildx
docker buildx version
```

## Install Rosetta

Rosetta lets Apple Silicon Macs run Intel binaries. Colima can use it inside an
ARM Linux VM for `linux/amd64` containers.

Check whether Rosetta is already installed:

```shell
pkgutil --pkg-info com.apple.pkg.RosettaUpdateAuto
```

If that command says no receipt was found, install Rosetta:

```shell
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

## Start Colima manually first

Do the first start manually. This creates the Colima profile and lets you verify
the VM before `brew services` manages it.

```shell
brew services stop colima

colima start \
  --vm-type vz \
  --vz-rosetta \
  --mount-type virtiofs \
  --arch aarch64 \
  --cpu 8 \
  --memory 16 \
  --disk 256 \
  --runtime docker
```

If Homebrew says the service was not started, that is fine. The goal is to make
sure `launchd` is not supervising Colima during the first manual start.

This creates a native ARM VM with:

- 8 CPUs
- 16 GiB memory
- 256 GiB disk
- Docker runtime
- VZ virtualization
- VirtioFS file sharing
- Rosetta-enabled `linux/amd64` support

## Verify the manual start

Check Colima:

```shell
colima status
```

You should see:

- `macOS Virtualization.Framework`
- `arch: aarch64`
- `runtime: docker`
- `mountType: virtiofs`

Check Docker:

```shell
docker context ls
docker system df
```

The active Docker context should be `colima`.

Check `linux/amd64` container execution:

```shell
docker run --rm --platform linux/amd64 alpine uname -m
```

The output should be:

```text
x86_64
```

Check `linux/amd64` Buildx builds:

```shell
printf 'FROM alpine\nRUN uname -m\n' | \
  docker buildx build \
    --platform linux/amd64 \
    --progress=plain \
    -t colima-amd64-smoke \
    -
```

Look for `x86_64` in the build output. Then clean up the smoke-test image and
cache:

```shell
docker system prune -a --volumes -f
```

## Start Colima with Homebrew services

Once the manual start works, stop Colima and hand it to Homebrew services:

```shell
colima stop
brew services start colima
```

Homebrew creates a per-user `launchd` agent for Colima. Verify the service:

```shell
brew services list
colima status
docker context ls
```

`brew services list` should show `colima` as `started`, and `colima status`
should still show VZ, `aarch64`, Docker, and `virtiofs`.

## Switch an existing Colima setup

:::caution[This deletes local container data]

These steps remove containers, images, build cache, networks, volumes, and the
existing Colima VM. Back up anything important first, especially local database
volumes.

:::

Capture your current settings:

```shell
colima list
sed -n '1,240p' ~/.colima/default/colima.yaml
```

Stop the Homebrew service before making changes:

```shell
brew services stop colima
```

Start Colima manually if it is not already running. This gives Docker a chance
to delete objects before the VM is removed:

```shell
colima start
```

Remove all containers:

```shell
docker ps -aq | while read -r container_id; do
  docker rm -f "$container_id"
done
```

Remove images, unused networks, build cache, and volumes:

```shell
docker system prune -a --volumes -f
docker volume prune -a -f
docker builder prune -a -f
```

Check that Docker is empty:

```shell
docker system df
docker image ls -a
docker volume ls
docker ps -a
```

Stop and delete the old Colima profile:

```shell
colima stop
colima delete --force
```

If `colima list` showed more than one profile and those profiles should also be
removed, delete them explicitly:

```shell
colima delete --profile <profile-name> --force
```

Install Rosetta if needed, then recreate Colima using the preferred setup:

```shell
pkgutil --pkg-info com.apple.pkg.RosettaUpdateAuto || \
  /usr/sbin/softwareupdate --install-rosetta --agree-to-license

colima start \
  --vm-type vz \
  --vz-rosetta \
  --mount-type virtiofs \
  --arch aarch64 \
  --cpu 8 \
  --memory 16 \
  --disk 256 \
  --runtime docker
```

Run the verification steps above. When they pass, hand Colima back to
Homebrew services:

```shell
colima stop
brew services start colima
```

## Troubleshooting

### `brew services` says Colima is started, but Docker cannot connect

Colima may still be booting. Wait a few seconds, then check:

```shell
brew services list
tail -n 120 "$(brew --prefix)/var/log/colima.log"
colima status
```

If it does not recover, restart the service:

```shell
brew services restart colima
```

### Manual Colima and `brew services` are fighting each other

Use one owner at a time. Stop the service, stop the manual VM, then choose one
start path:

```shell
brew services stop colima
colima stop
```

For manual debugging:

```shell
colima start
```

For normal startup:

```shell
brew services start colima
```

### Colima will not switch to VZ or Rosetta

Some Colima settings are fixed when the VM is created, including `arch`,
`vmType`, and `mountType`. Delete and recreate the profile:

```shell
brew services stop colima
colima stop
colima delete --force
```

Then run the preferred `colima start` command from this guide.

### `docker buildx inspect` does not list `linux/amd64`

This can happen even when amd64 execution works. First test the actual behavior:

```shell
docker run --rm --platform linux/amd64 alpine uname -m
```

If that returns `x86_64`, test a build:

```shell
printf 'FROM alpine\nRUN uname -m\n' | \
  docker buildx build \
    --platform linux/amd64 \
    --progress=plain \
    -t colima-amd64-smoke \
    -
```

If both commands return `x86_64`, the setup is working. You may also see a
Rosetta device in `docker buildx inspect --bootstrap`, such as
`lima-vm.io/rosetta=cached`.

### Docker Compose or Buildx is missing

Confirm Docker can see Homebrew's CLI plugin directory:

```shell
cat ~/.docker/config.json
ls "$(brew --prefix)/lib/docker/cli-plugins"
```

If Buildx is still missing, add the user-level plugin symlink:

```shell
mkdir -p ~/.docker/cli-plugins
ln -sfn "$(brew --prefix)/opt/docker-buildx/bin/docker-buildx" \
  ~/.docker/cli-plugins/docker-buildx
```

### Rosetta is missing

Check the Rosetta package receipt:

```shell
pkgutil --pkg-info com.apple.pkg.RosettaUpdateAuto
```

If no receipt is found, install Rosetta:

```shell
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

Then recreate the Colima profile with `--vz-rosetta`.

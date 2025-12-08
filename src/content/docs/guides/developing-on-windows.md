---
title: Developing on Windows with WSL2
---

_Or: "How I Got `npm install` to Work on My State-Issued Dell Laptop"_

If you're a developer who's been handed a Windows machine from your organization and you're staring at PowerShell wondering how you're going to get your Node.js projects running, this guide is for you. We've all been there—trying to run `npm install` only to be greeted by cryptic SSL certificate errors thanks to corporate network security tools like Zscaler.

This is a practical, battle-tested guide for setting up a modern Windows development environment using Windows Subsystem for Linux (WSL2), Windows Terminal, and Visual Studio Code. We recommend WSL2 over Git Bash for full Linux-kernel compatibility, better package management, and smoother tool integration. Why WSL2? Because it provides a complete Linux kernel running inside Windows, which means native Linux performance for development tools, better compatibility with the Node.js/Deno ecosystem, and easier package management with `apt`.

**Quick reality check**: Developing on Windows used to be painful, but it doesn't have to be anymore. With the right setup, you'll have a development environment that rivals macOS and Linux systems—all while keeping your familiar Windows desktop experience.

## Prerequisites

Before we dive in, let's make sure you have everything you need. Don't worry if some of these sound intimidating — we'll walk through each step:

- **A stable internet connection** for downloading packages and updates (this setup involves quite a bit of downloading)
- **Windows 11**, fully updated (check your version by pressing `Windows + R`, typing `winver`, and hitting Enter)
- **Administrator access** to enable Windows features (if you're on a corporate machine, you might need to request this from IT)
- **About 30-60 minutes** of focused time to complete the setup
- A cup of coffee ☕ (optional but recommended)

**State laptop users**: If you're working on a state or corporate-issued machine with network security tools (like Zscaler), don't panic when things don't work immediately. We've got specific instructions for dealing with those challenges.

## 1. Windows Terminal: your new command line home

The default Windows Command Prompt and even PowerShell are... well, let's say they weren't designed with developers in mind. Windows Terminal, however, is a modern, feature-rich terminal application that Microsoft actually got right. It supports multiple tabs, themes, and profiles—think of it as the terminal experience you've been missing on Windows.

### Installing Windows Terminal

The easiest way is through Windows' built-in package manager. **Why use a package manager?** Package managers like `winget` (for Windows) and `apt` (for Linux) automatically handle software downloads, installations, updates, and dependency management. This means:

- **Security**: Software comes from verified repositories rather than random websites
- **Updates**: Straightforward to update all your software with a single command
- **Consistency**: Standardized installation process across different tools
- **Reliability**: No need to hunt for the "real" download link among ads and fake buttons

**Open PowerShell as Administrator** (press `Windows + X` and select "Windows PowerShell (Admin)" or “Terminal (Admin)”) and run:

```shell
winget install -e --id Microsoft.WindowsTerminal
```

**Can't access the Microsoft Store?** If you're on a corporate network that blocks the Microsoft Store, you can download Windows Terminal directly from its [GitHub releases page](https://github.com/microsoft/terminal/releases). Look for the `.zip` file rather than the `.msixbundle` to bypass store restrictions.

Once installed, you'll want to make it your default terminal application. We'll configure it with your new Ubuntu environment in the next steps.

## 2. Install and configure WSL2: your Linux environment

This is where the magic happens. We're going to install a full Linux environment that runs seamlessly inside Windows. Think of it as having the best of both worlds—Windows for your familiar desktop experience and Linux for your development tools.

### 2.1 Enable Required Windows Features

First, we need to tell Windows to enable the subsystem for Linux and virtual machine capabilities. Open Windows PowerShell **as Administrator** (this is crucial — regular PowerShell won't work) and run these commands:

```shell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

**What's happening here?** These commands enable two Windows features: the Windows Subsystem for Linux (WSL) and the Virtual Machine Platform that WSL2 needs to run efficiently. The `/norestart` flag means we'll restart once after both features are enabled rather than restarting twice.

**Restart your computer now.** Yes, really. This is one of those times where the restart is actually necessary for the features to work properly.

### 2.2 Install Ubuntu

After your computer restarts, open PowerShell as Administrator again and run:

```shell
wsl --set-default-version 2
wsl --install
```

**What's happening here?** The first command tells WSL that any new Linux distributions should use WSL2 (the newer, better version). The second command downloads and installs Ubuntu, the default Linux distribution for WSL2.

### 2.3 Initial Ubuntu setup

When Ubuntu launches for the first time, it will ask you to create a username and password. This is important:

- **Username**: Choose a lowercase username with no spaces (it can be different from your Windows username). **Write it down** — it's very difficult to change later.
- **Password**: Create a strong password (it can be different from your Windows password). You'll need this for sudo commands. **Write this down too.**

**Pro tip**: This Ubuntu user will have full administrator rights within the Linux environment, so choose a password you'll remember but that's still secure.

## 3. Understanding dotfiles: your development environment's secret sauce

Before we start installing packages and configuring your environment, let's take a moment to understand dotfiles—they're crucial to how Linux (and your development environment) works, and you'll encounter them throughout this guide.

### What Are Dotfiles?

Dotfiles are configuration files that start with a dot (`.`) character. In Unix-like systems (including your new Ubuntu environment), files that start with a dot are **hidden** by default. They're used to store configuration settings for various programs and your shell environment.

**Why are they hidden?** Back in the early days of Unix, this was a straightforward way to keep configuration files out of the way during normal file browsing. The convention stuck, and now most Linux/Unix programs store their configuration in dotfiles in your home directory (`~/`).

### Common dotfiles you'll encounter

- `.bashrc`: Configuration for your Bash shell (runs every time you open a terminal)
- `.gitignore`: Tells Git which files to ignore in your projects
- `.ssh/config`: Configuration for SSH connections
- `.vimrc`: Configuration for the Vim text editor
- `.profile`: General shell configuration that runs once when you log in

### How to Work with Dotfiles

To see hidden files (including dotfiles) in your terminal:

```shell
ls -la
```

To edit a dotfile, you can use any text editor:

```shell
nano ~/.bashrc    # Edit with nano (beginner-friendly)
vim ~/.bashrc     # Edit with vim (more advanced)
code ~/.bashrc    # Edit with VS Code (after we install it)
```

**Important**: Some dotfiles get automatically loaded when you start your terminal or log in. After editing `.bashrc`, for example, you need to either restart your terminal or run source `~/.bashrc` to apply the changes.


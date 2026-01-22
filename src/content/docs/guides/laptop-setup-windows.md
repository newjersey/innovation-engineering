---
title: Setting up a state Windows laptop
---

_TODO: extract the non-Windows development instructions (like zsh, python, nvm, AWS CLI setup) into shared setup documentation_

Or: "How I Got `npm install` to Work on My State-Issued Dell Laptop"

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

The default Windows Command Prompt and even PowerShell are... well, let's say they weren't designed with developers in mind. Windows Terminal, however, is a modern, feature-rich terminal application. It supports multiple tabs, themes, and profiles—think of it as the terminal experience you've been missing on Windows.

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

### Enable Required Windows Features

First, we need to tell Windows to enable the subsystem for Linux and virtual machine capabilities. Open Windows PowerShell **as Administrator** (this is crucial — regular PowerShell won't work) and run these commands:

```shell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

**What's happening here?** These commands enable two Windows features: the Windows Subsystem for Linux (WSL) and the Virtual Machine Platform that WSL2 needs to run efficiently. The `/norestart` flag means we'll restart once after both features are enabled rather than restarting twice.

**Restart your computer now.** Yes, really. This is one of those times where the restart is actually necessary for the features to work properly.

### Install Ubuntu

After your computer restarts, open PowerShell as Administrator again and run:

```shell
wsl --set-default-version 2
wsl --install -d Ubuntu
```

**What's happening here?** The first command tells WSL that any new Linux distributions should use WSL2 (the newer, better version). The second command downloads and installs Ubuntu, the default Linux distribution for WSL2.

### Initial Ubuntu setup

When Ubuntu launches for the first time, it will ask you to create a username and password. This is important:

- **Username**: Choose a lowercase username with no spaces (it can be different from your Windows username). **Write it down** — it's very difficult to change later.
- **Password**: Create a strong password (it can be different from your Windows password). You'll need this for sudo commands.

**Pro tip**: This Ubuntu user will have full administrator rights within the Linux environment, so choose a password you'll remember but that's still secure.

## 3. Understanding dotfiles

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

### Why This Matters

Throughout this guide, we'll be creating and editing several dotfiles to customize your development environment. Understanding how they work will help you troubleshoot issues and personalize your setup. Don't worry if it seems abstract now—it'll make more sense as we use them!

## 4. Essential Linux Packages

Now for the fun part—installing all the development tools you'll need. Think of this as setting up your Linux toolbox with all the essential utilities.

In your WSL (Ubuntu) terminal, run:

```shell
# First, update the package lists to get the latest versions
sudo apt update

# Install essential development tools
sudo apt install -y \
  curl wget git build-essential ca-certificates \
  software-properties-common apt-transport-https \
  gnupg lsb-release unzip zip tree jq htop \
  vim nano gh python3-pip python3-venv python3-requests zsh
```

**What did we install?** Let's break down the most important ones:

- **curl & wget**: Tools for downloading files from the internet
- **git**: Version control (you probably knew this one)
- **build-essential**: Compilers and tools needed to build software from source
- **gh**: GitHub's official command-line tool
- **tree**: Displays directory structures in a tree format (surprisingly useful)
- **jq**: Command-line JSON processor (invaluable for API work)
- **htop**: A better version of the top command for monitoring system processes
- **vim** & **nano**: Text editors (nano is more beginner-friendly)
- **python3-pip**: Python package installer
- **python3-venv**: Python virtual environment support
- **python3-requests**: Python HTTP request library
- **zsh**: A more powerful shell than bash (we'll configure this next)

**Again, why `apt`?** Like `winget` on Windows, `apt` is Ubuntu's package manager. It ensures you get software from trusted repositories, handles dependencies automatically, and makes updates straightforward. This is much safer and more reliable than downloading random `.deb` files from websites.

This might take a few minutes to complete, especially on a fresh Ubuntu installation.

**Verify it worked:**

```shell
# Test that essential tools are installed
git --version
curl --version
gh --version
python3 --version
zsh --version

# All commands should return version numbers without errors
```

## 5. Switching to zsh: a better shell experience

While bash is the default shell on Ubuntu, we'll switch to **zsh** (Z shell) for a more powerful and user-friendly experience. Zsh offers better autocompletion, command history, and customization options.

### Installing and Configuring Zsh

```shell
# Change your default shell to zsh
chsh -s $(which zsh)

# Log out and back in (or restart your terminal) for the change to take effect
# When you first run zsh, it will ask about configuration - choose option 2 to create a basic .zshrc
```

**Why zsh?** Zsh provides:

- **Better tab completion**: More intelligent suggestions for commands and file paths
- **Improved history**: Better command history search and sharing between sessions
- **Powerful customization**: Themes, plugins, and extensive configuration options
- **Modern features**: Directory navigation shortcuts, spell correction, and more

**Note**: From this point forward, all shell configuration will use `.zshrc` instead of `.bashrc`. If you've already customized `.bashrc`, you can copy those settings to your new `.zshrc` file.

**Verify it worked**: Close and reopen your terminal. You should see a zsh prompt instead of the bash prompt.

## 6. The dreaded Zscaler certificate (corporate network users)

Ah, the infamous SSL certificate error. If you're on a corporate or state-issued laptop, you've probably already encountered this beast:

```
SSL Error: unable to get local issuer certificate
```

This error has tormented developers at the Office for years, but don't despair! The problem is that OIT's network security tool (Zscaler) intercepts and decrypts all HTTPS traffic to scan it for security threats. While this keeps the network secure, it means that development tools like `npm`, `pip`, AWS CLI tools, and Azure CLI tools don't trust the connection because they don't recognize Zscaler's certificate.

**The solution**: We need to tell your Linux environment to trust the Zscaler root certificate.

### Installing the Zscaler Certificate

1. **Get the certificate file**: Download the [ZScaler CA certificate](https://njcio.slack.com/files/U06GURJCTSR/F06KBFR5PC7/node_awscli_zscaler_ca.crt) from Slack to your Downloads folder on Windows.

2. **Copy it to the certificate directory**:

```shell
cd /mnt/c/Users/<your_windows_username>/Downloads
sudo cp node_awscli_zscaler_ca.crt /usr/local/share/ca-certificates/zscaler.crt
```

3. **Update the certificate store**:

```shell
sudo update-ca-certificates
```

4. **Verify it worked**:

```shell
sudo update-ca-certificates --fresh
```

You should see output indicating that certificates were processed, including your Zscaler certificate.

**What's happening here?** We're adding Zscaler's root certificate to Ubuntu's trusted certificate store. This tells all your development tools, "Hey, it's okay to trust connections that have been intercepted and re-encrypted by Zscaler."

**Test it**: Try running `curl -I https://innovation.nj.gov` to see if HTTPS connections work without certificate errors.

### Configuring Python/pip for Zscaler

Python and pip also need to be configured to work with the Zscaler certificate. Add these configurations:

```shell
# Configure pip to use the system certificate store. Copy everything below and run it in one go
mkdir -p ~/.config/pip
cat > ~/.config/pip/pip.conf << 'EOF'
[global]
cert = /etc/ssl/certs/ca-certificates.crt
trusted-host = pypi.org
               pypi.python.org
               files.pythonhosted.org
EOF
```

```shell
# Configure Python requests library". Copy everything below and run it in one go
cat >> ~/.zshrc << 'EOF'

# Python SSL configuration for Zscaler
export REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
export SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
export CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt

EOF
```

Reload your `.zshrc` to apply the changes: `source ~/.zshrc`

**Test Python/pip**: Try installing a straightforward package to verify SSL connections work:

```shell
python3 -c "import requests; print(requests.get('https://ipinfo.io/ip').text)"
```

You should see your public IP address if everything is working correctly.

## 7. Installing Node.js with NVM and configuring it for Zscaler

For Node.js development, we'll use NVM (Node Version Manager) to install and manage Node.js versions. This is essential because different projects often require different Node.js versions.

### Installing NVM

```shell
# Download and install NVM
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Reload your shell configuration to make nvm available
source ~/.zshrc

# Verify NVM installation
nvm --version
```

**Note**: If `nvm` command is not found, restart your terminal or run source ~/.zshrc.

```shell
Installing Node.js
# Install the latest LTS (Long Term Support) version of Node.js
nvm install --lts

# Use the LTS version as default
nvm use --lts

# Verify the installation
node --version
npm --version
```

**Why NVM**? Different projects often require different Node.js versions. NVM lets you switch between versions easily.

### Configuring Node.js for Zscaler

Run the following commands to get Node.js set up to work with Zscaler in WSL:

```shell
# Configure Node's SSL certs. Copy everything below and run it in one go
cat >> ~/.zshrc << 'EOF'

# Node SSL configuration for Zscaler
export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_EXTRA_CA_CERTS="/etc/ssl/certs/ca-certificates.crt"
export NODE_OPTIONS="--use-openssl-ca"

EOF
```

```shell
corepack enable

yarn config set enableStrictSsl false -H
```

Reload your `.zshrc` to apply the changes: `source ~/.zshrc`

**Test Node.js**: Try installing a straightforward package to verify SSL connections work:

```shell
node -e "require('https').get('https://ipinfo.io/ip', res => res.on('data', d => process.stdout.write(d)))"
```

You should see your public IP address if everything is working correctly.

## 8. Setting up your development environment

Now that you have a working Linux environment, let's configure it properly for development work. This is where your environment starts to feel like home.

### Git configuration

First, let's set up Git with your identity and preferences:

```shell
# Set your name and email (use your real name and email attached to GitHub)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set the default branch name to 'main' (modern standard)
git config --global init.defaultBranch main

# Make Git output colorful and easier to read
git config --global color.ui auto

# Set up better diff and merge tools
git config --global core.editor "code --wait --new-window"
git config --global diff.tool vscode
git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

Verify it worked:

```shell
# Check your Git configuration
git config --global --list | grep user
# Should show your name and email

git config --global init.defaultBranch
# Should show 'main'
```

### Github desktop gotchas

GitHub Desktop will use, by default, its own built-in version of git. GH Desktop paths will point to Windows, not WSL. You will not be able to find node.

If you or your stakeholders want to use a GUI for git, consider:
- use VSCode extensions within WSL2
- install GH desktop in WSL2

### Global gitignore file

Create a global `.gitignore` file to automatically ignore common files you never want to commit:

```shell
# Create the global gitignore file. Run the next three lines together
cat > ~/.gitignore << 'EOF'
.aider*
EOF

# Tell Git to use this global gitignore file
git config --global core.excludesfile ~/.gitignore
```

**What's this doing?** This creates a global ignore file that applies to all your Git repositories. It includes common files that you never want to accidentally commit—like OS-generated files, editor temporary files, dependency directories, and environment files containing secrets. Add any additional files to this `.gitignore` file that wouldn't normally be included in project-specific `.gitignore` files.

### SSH key setup for GitHub

While we'll use GitHub CLI for most operations, having SSH keys set up is still useful:

```shell
# Generate a new SSH key (replace with the email linked to your GitHub account)
ssh-keygen -t ed25519 -C "your.email@example.com"

# When prompted, press Enter to accept the default file location
# Choose a strong passphrase when prompted

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your SSH key to the agent
ssh-add ~/.ssh/id_ed25519

# Display your public key (you'll need to add this to GitHub)
cat ~/.ssh/id_ed25519.pub
```

Copy the output of that last command and add it to your GitHub account under Settings → SSH and GPG keys.

**Verify it worked:**

```shell
# Test SSH connection to GitHub (after adding key to GitHub)
ssh -T git@github.com

# Should show: "Hi <yourusername>! You've successfully authenticated..."

# Sign your commits
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
```

### Shell customization

Let's make your shell more pleasant to use by adding some helpful aliases to your `.zshrc` file:

```shell
# Add useful aliases to your .zshrc . Copy everything below and run it in one go
cat >> ~/.zshrc << 'EOF'

# Development aliases
alias myip='curl ipinfo.io/ip'

# Safety aliases
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

EOF
```

Reload your .zshrc to apply the changes: `source ~/.zshrc`

**What did we do?** We added some convenient shortcuts to your shell configuration. These small conveniences add up to a much more pleasant development experience.

### Creating your development directory structure

Let's create a standard directory structure for your development work:

```shell
# Create a standard development directory structure
mkdir -p ~/Developer
cd ~/Developer
```

**Why `~/Developer`?** This creates a consistent, easy-to-find location for all your development projects. Having a standard structure makes it easier to navigate between projects and ensures good organization from the start.

**Verify it worked:**

```shell
# Check that the directory was created
ls -la ~/Developer
# You should see an empty directory
```

## 9. Python virtual environments: keeping your projects clean

Let's set up Python virtual environments. **Why use virtual environments?** When you install Python packages globally (with pip3 install package-name), they can conflict with each other when different projects need different versions of the same package. Virtual environments solve this by creating isolated Python installations for each project.

### Creating and using virtual environments

```shell
# Navigate to your projects directory (we created this earlier)
cd ~/Developer

# Create a new project directory
mkdir my-python-project
cd my-python-project

# Create a virtual environment named 'venv'
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate

# Your prompt should now show (venv) at the beginning
# Install packages only for this project
pip install requests beautifulsoup4

# When you're done working, deactivate the environment
deactivate
```

### Best Practices for Virtual Environments

- **Always use virtual environments** for Python projects
- **Name your environment folder `.venv`** - it's the standard convention
- **Add `.venv/` to your `.gitignore`** - never commit virtual environments to version control
- **Keep a `requirements.txt` file** with your project dependencies:

```shell
# Generate requirements.txt from your current environment
pip freeze > requirements.txt

# Install from requirements.txt in a new environment
pip install -r requirements.txt
```

### Global vs. virtual environment packages

**Install globally only for system tools:**

```shell
# These are tools you want available everywhere
pip3 install --user aider-install  # AI assistant
pip3 install --user black          # Python code formatter
```

**Install in virtual environments for project dependencies:**

```shell
# Create a virtual environment
python3 -m venv .venv

# Activate your project's virtual environment first
source .venv/bin/activate

# Then install project-specific packages
pip install -r requirements.txt
pip install django flask requests
pip freeze > requirements.txt
```

**Why this matters**: This approach prevents dependency conflicts, makes your projects reproducible, and keeps your system Python installation clean.

## 10. Docker CLI: container management without Docker Desktop (optional)

For containerized development, we'll install the Docker CLI without Docker Desktop. This gives you access to Docker commands while keeping your system lightweight.

### Installing Docker CLI

```shell
# Remove conflicting packages
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# Install the docker engine. It'll yell at you about Docker Desktop. Just wait 20 seconds and it'll continue installation.
curl -fsSL https://get.docker.com | sh

# Install Docker Compose
sudo apt install -y docker-compose-plugin

# Add your user to the Docker group (replacing with your Ubuntu username)
sudo usermod -a -G docker yourusername
```

**Why Docker CLI without Docker Desktop?** This approach:

- **Reduces resource usage**: No heavy Docker Desktop GUI application, which requires a license
- **Maintains compatibility**: Full Docker CLI functionality for building and managing containers
- **Enables remote Docker**: Can connect to remote Docker hosts or services like AWS ECS

Verify it worked:

```shell
# Check Docker CLI installation
docker --version
docker compose version

# These should show version information
```

## 11. AWS CLI: cloud development essentials

The AWS CLI is essential for cloud development. Let's install it and configure it to work with multiple AWS accounts and profiles.

### Installing AWS CLI

```shell
# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Clean up installation files
rm -rf awscliv2.zip aws/
```

**Verify the installation:**

```shell
aws --version
# Should show AWS CLI version 2.x
Configuring AWS CLI for Multiple Profiles
AWS profiles allow you to manage multiple AWS accounts or environments (dev, staging, prod):

# Configure your default profile
aws configure

# Configure additional profiles
aws configure --profile development
aws configure --profile staging
aws configure --profile production
```

For each profile, you'll need to provide:

- **Access Key ID**: From your AWS IAM user
- **Secret Access Key**: From your AWS IAM user
- **Default region**: e.g., us-east-1
- **Default output format**: json is recommended

### Managing AWS Profiles

```shell
# List all configured profiles
aws configure list-profiles

# Use a specific profile for a command
aws s3 ls --profile development

# Set a default profile for your session
export AWS_PROFILE=development

# View current configuration
aws configure list
```

### Setting up AWS CLI with Zscaler certificate

Configure AWS CLI to work with the Zscaler certificate:

```shell
# Add AWS certificate configuration to your shell
cat >> ~/.zshrc << 'EOF'

# AWS CLI configuration for Zscaler
export AWS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt

EOF

# Reload your configuration
source ~/.zshrc
```

**Verify AWS CLI works:**

```shell
# Test basic AWS connectivity (replace with your profile)
aws sts get-caller-identity

# Should return your AWS account information (press q to exit)
```

**Managing Multiple Accounts**: Create a profile for each AWS account you work with:

```shell
# Example: different profiles for different purposes
aws configure --profile personal-dev
aws configure --profile work-staging
aws configure --profile work-production
```

## 12. GitHub authentication: essential for development

Before we continue, let's authenticate with GitHub since you'll need this for most development work.

Set up GitHub CLI for seamless repository management:

```shell
# Start the GitHub authentication process
gh auth login
```

Follow the prompts:

- Choose "GitHub.com" as your server
- Choose "HTTPS" as your preferred protocol
- Choose "Yes" to authenticate Git with GitHub credentials
- Choose "Login with a web browser" for authentication

The CLI will display a one-time code. Open your web browser to the address provided (WSL will not be able to open your browser for you), log into GitHub, and enter the code to complete authentication.

**Verify it worked:**

```shell
gh auth status
```

**Why is this essential?** GitHub CLI provides:

- Seamless authentication for Git operations
- Repository management from the command line
- Pull request and issue management without leaving your terminal
- Integration with other tools that need GitHub access

## 13. Installing the Aider CLI

If you're part of the Aider AI assistant pilot program, you can now install it:

```shell
python3 -m pip install aider-install
```

Verify the installation:

```shell
aider --help
```

**What is Aider?** Aider is an AI-powered coding assistant that can help you write and edit code directly in your terminal. It's particularly useful for code refactoring, bug fixes, and implementing new features. Talk to the tech ops team if you'd like to join this pilot.

## 14. Understanding the file system: where your code lives

One of the most confusing aspects of WSL for newcomers is understanding where files live and how to access them. Let's clear this up once and for all.

### The Two File Systems

You're now working with **two** file systems:

- **Your Windows file system**: `C:\`, `D:\`, etc.
- **Your Linux file system**: `/home/yourusername/`, `/etc/`, `/var/`, etc.

### Where should you store your code?

**Short answer**: In your Linux home directory (`/home/<yourusername>/Developer` otherwise known as `~/Developer` or `$HOME/Developer`).

**Why?** For best performance and full Linux file system compatibility, store and edit your project files in your Linux home directory rather than on Windows drives. Here's why:

- Performance: Files in the Linux filesystem are much faster to access from Linux tools
- Compatibility: Some Linux tools expect Unix-style file permissions and attributes
- No weird Windows/Linux path translation issues

### Path Translation Guide

- Linux files: Live under `/home/<yourusername>/` (or `~/` as a shortcut)
- Windows drives: Are mounted at `/mnt/c/`, `/mnt/d/`, etc.
- From Windows: Your Linux files appear at `\\wsl$\Ubuntu\home\<yourusername>\`

### Accessing Files Between Systems

#### From Linux, Open Windows Explorer

```shell
# Open the current Linux directory in Windows File Explorer
explorer.exe .

# Open a specific directory
explorer.exe ~/Developer
```

### From Windows, Access Linux Files

In File Explorer, navigate to: `\\wsl$\Ubuntu\home\<yourusername>\`

**Pro tip**: You can bookmark this location in Windows File Explorer for quick access.

## 15. VSCode Integration: The Best of Both Worlds

Visual Studio Code is the secret sauce that makes Windows development with WSL truly shine. It bridges the gap between your familiar Windows desktop and your powerful Linux development environment.

With the Remote – WSL extension, you get:

- Edit and debug code directly inside your Linux environment
- Run terminal commands and view output seamlessly within VS Code
- Leverage Windows apps (like your web browser) alongside Linux development tools
- Full IntelliSense and extension support that works with your Linux environment

### Installing VSCode

Install VSCode on your Windows system:

```shell
# From PowerShell (as Administrator)
winget install -e --id Microsoft.VisualStudioCode
```

Alternatively, you can download it directly from [code.visualstudio.com](https://code.visualstudio.com/). However, we **strongly recommend** using package managers like `winget` and `apt` because they:

- Simplify updates: One command updates all your software instead of checking each program individually
- Handle dependencies: Automatically install required components
- Provide security: Software comes from verified repositories
- Save time: No hunting through websites for the correct download link
- Ensure consistency: Standardized installation process across your entire system

### Setting Up WSL Integration

1. Open a project in WSL: From your WSL terminal, navigate to any project directory and run:

```shell
cd ~/Developer
code .

# That's the equivalent of:
code ~/Developer
```

2. First-time setup: VSCode will automatically detect WSL and offer to install the "Remote - WSL" extension. Click "Install" when prompted.

3. Verify the connection: Look at the bottom-left corner of VS Code. You should see **"WSL: Ubuntu"** in green, indicating you're connected to your Linux environment.

### Why This Setup is Magical

- Files: You're editing files that live in Linux, but using the familiar VSCode interface
- Terminal: The integrated terminal runs zsh in your Linux environment
- Extensions: Most VS Code extensions work seamlessly in the WSL environment
- Performance: Everything runs at native Linux speed because the code execution happens in Linux

### Essential VSCode Extensions for Development

Once you have VSCode connected to WSL, consider installing these extensions:

- GitLens: Enhanced Git capabilities
- Prettier: Code formatting
- Thunder Client: API testing (alternative to Postman)

**Pro tip**: Extensions installed in WSL are separate from extensions in regular Windows VS Code. This is actually a good thing—it keeps your development environment clean and specific to your Linux setup.

## 16. Configuring Windows Terminal

Remember Windows Terminal that we installed at the beginning? Now it's time to configure it properly so it becomes your primary development interface.

### Setting Ubuntu as Default

1. **Open Windows Terminal settings**: Click the dropdown arrow next to the "+" tab button and select "Settings"

2. **Set Ubuntu as default:**

  - In the left sidebar, click "Startup"
  - Under "Default profile", select "Ubuntu"
  - Under "Default terminal application", select "Windows Terminal"

3. **Customize your Ubuntu profile:**

  - In the left sidebar, under "Profiles", click "Ubuntu"
  - Here you can customize:
    - Font: We recommend "Cascadia Code" or "Fira Code" for better coding experience
    - Color scheme: Try "Campbell Powershell" or "Solarized Dark"
  - Starting directory: Set to `~`

4. **Save your settings**: Click "Save" at the bottom

**Pro tip**: You can create custom key bindings, set background images, and even adjust transparency. Windows Terminal is surprisingly customizable once you dig into the settings!

## 17. Quality of life tools

These aren't strictly necessary, but they'll make your Windows development experience much more pleasant:

### Essential Windows tools

- [PowerToys](https://learn.microsoft.com/windows/powertoys/): A collection of Windows utilities that add functionality Microsoft should have included by default. Particularly useful features:

  - PowerToys Run: Launch applications and files quickly (like macOS Spotlight)
  - FancyZones: Snap windows into custom layouts
  - File Locksmith: See what's using a locked file

- [ScreenToGif](https://www.screentogif.com/): Lightweight screen recorder perfect for creating quick demos or bug reports. Great for sharing your work with team members.

### Oh My Zsh (enhanced shell experience)

For an even better zsh experience, install Oh My Zsh, a popular framework for managing zsh configuration:

```shell
# Install Oh My Zsh
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

Oh My Zsh provides themes, plugins, and sensible defaults that make zsh even more powerful out of the box. It includes features like:

- Git integration: Shows branch info and status in your prompt
- Command aliases: Hundreds of useful shortcuts
- Auto-completion: Intelligent tab completion for many tools
- Themes: Beautiful, informative prompts

**Verify it worked**: Your prompt should change to a more colorful, informative display showing your current directory and git status.

### Environment variables for development

Add commonly needed environment variables to your `~/.zshrc`:

```shell
# Development environment variables
export EDITOR=code
export BROWSER=explorer.exe
export NODE_ENV=development

# Add local bin to PATH for global npm packages
export PATH="$HOME/.local/bin:$PATH"
```

## Troubleshooting Common Issues

### "Windows Subsystem for Linux has no installed distributions"

**Problem**: You get this error when trying to run `wsl` commands.

**Solution**:

```shell
wsl --install -d Ubuntu
```

If that doesn't work, try installing Ubuntu manually from the Microsoft Store.

### VSCode can't connect to WSL

**Problem**: VSCode shows connection errors or doesn't detect WSL.

**Solutions**:

1. Restart both VSCode and your WSL terminal
2. Uninstall and reinstall the "Remote - WSL" extension
3. Run `code --list-extensions --show-versions` in WSL to verify extensions are installed

### Permission denied errors

**Problem**: Getting permission errors when trying to install packages or access files.

**Solutions**:

- Use `sudo` for system-level operations: `sudo apt install packagename`
- Check file ownership: `ls -la filename`
- Fix ownership if needed: `sudo chown username:username filename`

### npm/pip still showing certificate errors

**Problem**: Even after installing the Zscaler certificate, you're still getting SSL errors.

**Solutions**:

1. Verify the certificate is installed: `ls -la /usr/local/share/ca-certificates/`
2. Re-run the update command: `sudo update-ca-certificates --fresh`
3. Restart your terminal session
4. For npm specifically, you might need to set the certificate path explicitly:

```shell
npm config set cafile /etc/ssl/certs/ca-certificates.crt
```

### Slow file performance

**Problem**: File operations are slow, especially with large projects.

**Solutions**:

- Store your projects in the Linux filesystem (`~/Developer`) rather than Windows drives (`/mnt/c/`)
- Disable Windows Defender real-time protection for your WSL directories
- Consider using the [WSL 2 performance tuning guide](https://learn.microsoft.com/windows/wsl/compare-versions#performance-across-os-file-systems)

## References and further reading
- [WSL Documentation](https://learn.microsoft.com/windows/wsl/install)
- [Windows Terminal](https://github.com/microsoft/terminal)
- [VSCode Remote – WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Ubuntu Documentation](https://help.ubuntu.com/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub CLI Documentation](https://cli.github.com/manual/)

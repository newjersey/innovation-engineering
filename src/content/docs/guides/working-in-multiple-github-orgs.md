---
title: Working in multiple Github Orgs
description: Sometimes we need to work in the NJIA GitHub org as well as another department’s org, which means managing multiple SSH keys.
---

When working in more than one GitHub organization, you need to be able to use multiple SSH keys at the same time. This guide walks through the basic setup, including when you might need to use SSO instead of a standard GitHub login.

## Step 1: Generate Unique SSH Keys 

For security and easier management, use a separate SSH key pair for each account (for example, an NJIA GitHub account vs. a DHS GitHub account, or one using NJ SSO).

- Open your terminal or Git Bash.
- Run the following command, replacing "you(at)example.com" with your email address and `id_rsa_department` with a descriptive filename:

```
ssh-keygen -t rsa -b 4096 -C "you(at)example.com" -f ~/.ssh/id_rsa_department
```

- -t rsa: Specifies the key type (RSA is common; ed25519 is also a modern).
- -b 4096: Specifies the number of bits for the key (RSA only, 4096 is a strong length).
- -C: Adds a comment, typically your email, to help identify the key.
- -f: Specifies the filename and location. Keep all keys within the ~/.ssh directory.

When prompted for a passphrase, it's recommended to add a strong one for extra security. 

## Step 2: Add Public Keys to Accounts 

Copy the public key's content using: `cat ~/.ssh/id_rsa_department.pub | pbcopy` (if you want to display it, then manually copy, remove `| pbcopy`).

Paste the output into the [SSH and GPG keys](https://github.com/settings/keys) section of your account's settings page. Make sure you’re logged into the correct account or organization context.

## Step 3: Configure SSH to Use Specific Keys 

Create or edit the `~/.ssh/config` file to tell your SSH client which private key to use for which host: `touch ~/.ssh/config` (create) `code ~/.ssh/config` (open with VSCode).

Add entries for each account. The Host name is an alias you will use in your commands.

```
# Special Department GitHub account
Host github-department
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_department
  IdentitiesOnly yes
  UseKeychain yes # Mac only if you're using keychain
```

- HostName: The actual domain (e.g., github.com).
- IdentityFile: The path to the private key file.
- IdentitiesOnly yes: Ensures the SSH client only tries the specified key, preventing authentication issues. 

## Step 4: Add Keys to the SSH Agent 

- Ensure the SSH agent is running: `eval "$(ssh-agent -s)"`.
- Add your private key to the agent: `ssh-add ~/.ssh/id_rsa_department`
- Verify the keys currently managed by the agent with `ssh-add -l`
- Optional for Macs: add to keychain: `ssh-add --apple-use-keychain ~/.ssh/id_rsa_department`

## Step 5: Test and use the keys 

To test the configuration, reference the host alias you created: `ssh -T git@github-department`

When cloning, you can use the alias in the repo URL if needed, though in many cases Git may automatically select the correct key.

To clone with your alias: `git clone git@github-department:org_name/repo_name.git`

## Step 6: Authorize SSO on your key (if using SSO)

Return to your [SSH and GPG keys](https://github.com/settings/keys) section and [authorize the SSH key for SSO](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-single-sign-on/authorizing-an-ssh-key-for-use-with-single-sign-on).

You should now be able to clone your new repo with the SSH option.
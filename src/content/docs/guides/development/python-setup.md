---
title: Set up a Python project
description: Install uv and use it to manage Python versions, virtual environments, dependencies, and command-line tools.
---

Most NJIA projects use Node and should start from the [Innovation repository template](https://github.com/newjersey/innovation-repo-template/). When you do need Python, use `uv` so the Python version, virtual environment, dependencies, and command-line tools are managed in one place.

## Install uv

### macOS

Install `uv` with Homebrew:

```shell
brew install uv
```

### WSL and Linux

Install `uv` with Astral's standalone installer:

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

If `curl` is not available, use `wget`:

```shell
wget -qO- https://astral.sh/uv/install.sh | sh
```

Restart your shell after the installer finishes so your `PATH` is updated.

:::note

Astral's official `uv` installation docs do not list `apt` as an installation method. For WSL and Linux, use the standalone installer unless a project has a specific reason to use another official method.

:::

### Native Windows

Install `uv` with WinGet:

```powershell
winget install --id=astral-sh.uv -e
```

If WinGet is not available, use the official PowerShell installer:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### Verify the installation

Confirm `uv` is available:

```shell
uv --version
```

## Create a project

Create a new Python project and pin the Python version the project should use:

```shell
uv init my-python-project --python 3.14
cd my-python-project
uv sync
```

`uv init` creates a `pyproject.toml` for dependencies and a `.python-version` file for the project's Python version. `uv sync` creates a `.venv/` virtual environment and a `uv.lock` lockfile.

Commit `pyproject.toml`, `.python-version`, and `uv.lock`. Do not commit `.venv/`. If `.venv/` is not already in `.gitignore`, add it.

:::note

You usually do not need to activate the virtual environment manually. Run project commands through `uv run` and `uv` will use the project's `.venv/` automatically.

:::

## Add dependencies

Add runtime dependencies with `uv add`:

```shell
uv add requests
```

Add development-only tools with `--dev`:

```shell
uv add --dev pytest ruff
```

Run project code and tools with `uv run`:

```shell
uv run python main.py
uv run pytest
uv run ruff check .
```

Remove a dependency with `uv remove`:

```shell
uv remove requests
```

## Work on an existing project

After cloning a Python project that already uses `uv`, install the locked dependencies:

```shell
uv sync
```

Then run the project through `uv run`:

```shell
uv run python main.py
```

If a tool specifically requires an activated virtual environment, activate the project environment after running `uv sync`:

```shell
source .venv/bin/activate
```

On native Windows PowerShell, use:

```powershell
.venv\Scripts\activate
```

When you are done using an activated environment, exit it:

```shell
deactivate
```

## Use Python tools without polluting projects

Install project dependencies into the project with `uv add`. Do not install project dependencies globally or into your system Python.

:::caution

Global Python installs make one shared environment responsible for unrelated projects and tools. That can break projects when two dependencies need different versions, make setup hard to reproduce on another machine, and accidentally modify the Python installation your operating system or other tools rely on.

Use `uv add` for project dependencies and `uvx` or `uv tool install` for command-line tools. `uv` gives each project or tool its own managed environment, so tools stay available without leaking their dependencies into your projects.

:::

For one-off command-line tools, use `uvx`:

```shell
uvx checkov --version
```

For tools you use often and want available on your `PATH`, use `uv tool install`:

```shell
uv tool install checkov
uv tool install ruff
```

If `uv` warns that its tool directory is not on your `PATH`, run `uv tool update-shell` and restart your shell.

`uv` keeps each installed tool in its own isolated environment, which avoids the dependency conflicts that happen when many tools are installed into one global Python environment.

## Work with older requirements files

Some existing projects still use `requirements.txt`. You can install those dependencies into a local virtual environment with `uv`:

```shell
uv venv
uv pip install -r requirements.txt
```

For new Python projects, prefer `pyproject.toml` and `uv.lock`. To migrate dependencies from an existing `requirements.txt` file into a `uv` project, run:

```shell
uv add -r requirements.txt
```

## Useful tools

- [Black](https://black.readthedocs.io/en/stable/) - Python counterpart to Biome/Prettier
- [requests](https://docs.python-requests.org/en/latest/index.html) - HTTP library
- [IPython](https://ipython.org/) - a better Python terminal (allows multi-line commands)

For data analysis:

- [Pandas](https://pandas.pydata.org/pandas-docs/stable/index.html) - lets you manipulate tables/csv equivalents in-memory. We've got a couple Pandas wizards at the office, so feel free to ask for help if you're unfamiliar.
- [Jupyter Notebooks](https://jupyter.org/) - if you want to do iterative data analysis with charts/images as output, and you don't care about source control (it sucks with git)
- [Positron](https://posit.co/products/ide/positron) - RStudio, but for both Python and R. It's a VSCode IDE fork that helps with doing iterative data analysis, including viewing charts + images as an output. Unlike Jupyter Notebooks, you're still fundamentally writing a Python script and can keep that source controlled.

## Frameworks you might want to consider

- [Flask](https://flask.palletsprojects.com/en/stable/)
- [Django](https://www.djangoproject.com/)
- [Streamlit](https://streamlit.io/)

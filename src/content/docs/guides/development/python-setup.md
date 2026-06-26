---
title: How to set up a Python project
---

Most NJIA projects use Node, and should use the [innovation-repo-template](https://github.com/newjersey/innovation-repo-template/). Occasionally you might find yourself in need of a Python project, and this guide aims to help with that.

## Environment setup

We recommend using [pyenv](https://github.com/pyenv/pyenv#installation) to manage python versions, and creating a [python virtual environment](https://docs.python.org/3/tutorial/venv.html) to isolate package dependency installation.

### First time set up

1. Install [pyenv](https://github.com/pyenv/pyenv#installation), following all instructions in the installation section. Running `which python` and `which pip` should output paths containing `.pyenv`
1. Install your desired Python version by running `pyenv install <version number>`, and use this version by running `pyenv global <version number>`. Running `python --version` should output the version number.
1. From the root folder of your project, run `python -m venv .venv` to create an isolated [python virtual environment](https://docs.python.org/3/tutorial/venv.html) for installing dependencies
1. Run `source .venv/bin/activate` to activate the python virtual environment. `(.venv)` should appear in the terminal prompt, ne indicates that the environment has been activated.
1. Create a `requirements.txt` file in the root of your project, to [define your package dependencies](https://pip.pypa.io/en/stable/reference/requirements-file-format/). Add any package dependencies that you need.
1. Run `pip install -r requirements.txt` to install dependencies from the `requirements.txt`
1. Add `.venv/` to your `.gitignore` (the `.venv/` folder is similar to `node_modules`)

### Subsequent development

The python virtual environment needs to be activated in order to be used. Subsequent development on your project should run `source .venv/bin/activate` to activate the python virtual environment, before running the project or installing dependencies.

## Useful tools

- [Black](https://black.readthedocs.io/en/stable/) - Python counterpart to Biome/Prettier
- [requests](https://docs.python-requests.org/en/latest/index.html) - HTTP library
- [IPython](https://ipython.org/) - a better Python terminal (allows multi-line commands)

For data analysis:

- [Pandas](https://pandas.pydata.org/pandas-docs/stable/index.html) - lets you manipulate tables/csv equivalents in-memory. We've got a couple Pandas wizards at the office, so feel free to ask for help if you're unfamiliar 🐼.
- [Jupyter Notebooks](https://jupyter.org/) - if you want to do iterative data analysis with charts/images as output, and you don't care about source control (it sucks with git)
- [Positron](https://posit.co/products/ide/positron) - RStudio, but for both Python and R. It's a VSCode IDE fork that helps with doing iterative data analysis, including viewing charts + images as an output. Unlike Jupyter Notebooks, you're still fundamentally writing a Python script and can keep that source countrolled.

## Frameworks you might want to consider

- [Flask](https://flask.palletsprojects.com/en/stable/)
- [Django](https://www.djangoproject.com/)
- [Streamlit](https://streamlit.io/)

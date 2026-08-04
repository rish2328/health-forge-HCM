# FastAPI Project Setup using Poetry
This document provides a step-by-step guide to set up a FastAPI project using **Poetry** as the dependency and virtual environment manager.

---

# Prerequisites
Before starting, ensure the following software is installed on your system:

- Python 3.11 or above
- Git
- Poetry
---

# Step 1: Install Poetry

### Linux / Ubuntu
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### Verify Installation
```bash
poetry --version
```

If the `poetry` command is not found, add Poetry to your PATH.
```bash
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Verify again.
```bash
poetry --version
```
---

# Step 2: Check Python Version
Verify that the required Python version is installed.

```bash
python3 --version
```

Example:
```text
Python 3.11.13
```
---

# Step 3: Initialize Poetry
Navigate to your project directory and initialize Poetry.
```bash
poetry init
```
Poetry will ask a few questions.
For a basic project, simply press **Enter** to accept the default values.
After completion, Poetry creates:
```text
pyproject.toml
```
---

# Step 4: Create a Virtual Environment
Create a virtual environment using Python 3.11.
```bash
poetry env use python3.11
```

Check the created virtual environment.
```bash
poetry env info
```

Example output:
```text
Virtualenv
Python:      3.11
Executable:  ~/.cache/pypoetry/virtualenvs/...
```
---

# Step 5: Activate the Virtual Environment
If your Poetry version supports it:
```bash
poetry shell
```

If not, activate the environment manually.
```bash
source "$(poetry env info --path)/bin/activate"
```

Alternatively, execute commands without activating the shell.
```bash
poetry run <command>
```

Example:
```bash
poetry run python
```
---

# Step 6: Install Required Dependencies
Install FastAPI and all commonly used dependencies.
```bash
poetry add fastapi uvicorn sqlalchemy alembic psycopg2-binary pymysql pydantic pydantic-settings python-dotenv python-jose passlib bcrypt python-multipart email-validator cryptography requests pytest
```
---

# Step 7: Install Packages from requirements.txt (Optional)
If you already have a `requirements.txt` file, install all dependencies using:
```bash
poetry add $(cat requirements.txt)
```

If you want to ignore version numbers:
```bash
poetry add $(sed 's/[<>=!~].*//' requirements.txt)
```
---

# Step 8: Project Structure
A recommended folder structure for a FastAPI microservice.
```bash
fastapi_project
│
├── app
│   ├── api
│   ├── core
│   ├── dependencies
│   ├── helpers
│   ├── models
│   ├── schemas
│   ├── services
│   └── utils
│
├── .env
├── docker-compose.yml
├── Dockerfile
├── main.py
├── poetry.lock
├── pyproject.toml
├── README.md
└── requirements.txt
```
---

# Step 9: Create Project Structure
Create the required directories.
```bash
mkdir -p app/{api,core,dependencies,helpers,models,schemas,services,utils}
```

Create the required root files.
```bash
touch .env docker-compose.yml Dockerfile main.py README.md requirements.txt
```
---

# Step 10: Run the Application
Run the FastAPI application.
```bash
poetry run uvicorn main:app --reload
```

By default, the application runs on:
```text
http://127.0.0.1:8000
```

Swagger Documentation:
```text
http://127.0.0.1:8000/docs
```

ReDoc Documentation:
```text
http://127.0.0.1:8000/redoc
```

To run the application on a different port:
```bash
poetry run uvicorn main:app --reload --port 8001
```
---

# Common Poetry Commands
```bash
| Command                   | Description                                       |
|---------------------------|---------------------------------------------------|
| `poetry init`             | Initialize a Poetry project                       |
| `poetry install`          | Install dependencies from `pyproject.toml`        |
| `poetry add <package>`    | Install a package                                 |
| `poetry remove <package>` | Remove a package                                  |
| `poetry update`           | Update dependencies                               |
| `poetry show`             | List installed packages                           |
| `poetry env info`         | Display virtual environment information           |
| `poetry env list`         | List available virtual environments               |
| `poetry shell`            | Activate the virtual environment (if supported)   |
| `poetry run <command>`    | Run a command inside the virtual environment      |
```
---

# Verify Installation
Check the installed packages.
```bash
poetry show
```

Verify the Python executable.
```bash
poetry run python --version
```

Verify FastAPI installation.
```bash
poetry run python -c "import fastapi; print(fastapi.__version__)"
```
---

# Useful Commands
Display the dependency tree.
```bash
poetry show --tree
```

Export dependencies to a requirements file.
```bash
poetry export -f requirements.txt --output requirements.txt
```

Remove the virtual environment.
```bash
poetry env remove python3.11
```

Reinstall all dependencies.
```bash
poetry install
```
---

# Notes
- Poetry automatically manages the virtual environment for the project.
- Avoid manually creating a `venv` directory.
- Always use `poetry add` instead of `pip install` for project dependencies.
- Commit both `pyproject.toml` and `poetry.lock` to version control.
- Store environment-specific variables inside the `.env` file.
- Prefer `poetry run <command>` when executing application commands to ensure they run inside the correct virtual environment.






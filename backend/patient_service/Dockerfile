# =============================
#       Stage 1: Builder
# =============================
FROM python:3.10-slim AS Builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV POETRY_VERSION=2.1.3

WORKDIR /app

# INSTALL POETRY
RUN pip install --no-cache-dir poetry==$POETRY_VERSION

# COPY dependencies files first ( Docker Cache Optimization )
COPY pyproject.toml ./
COPY poetry.lock ./

# INSTALL DEPENDENCIES INTO THE SYSTEM PYTHON
RUN poetry config virtualenvs.create false \
        && poetry install --only main --no-interaction --no-root

# =============================
#       Stage 2: RunTime
# =============================
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# COPY INSTALL PACKAGES FROM BUILDER
COPY --from=Builder /usr/local /usr/local

# COPY APPLICATION SOURCE
COPY . .

EXPOSE 8002

CMD [ "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8002" ]


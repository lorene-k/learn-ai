#!/bin/bash

set -e

program="$1"

[ "$1" = "-a" ] && source .venv/bin/activate && return

if [ -z "$VIRTUAL_ENV" ]; then
    if [ -d ".venv" ]; then
    source .venv/bin/activate
    else
        python -m venv .venv
        source .venv/bin/activate
        pip install --upgrade pip
        pip install -r requirements.txt
    fi
fi

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
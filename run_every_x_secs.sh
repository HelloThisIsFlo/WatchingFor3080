#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

SLEEP_DURATION=20

while true; do
    echo "Checking for changes..."
    node -e "$(cat watchFor3080.js)"
    sleep $SLEEP_DURATION
done

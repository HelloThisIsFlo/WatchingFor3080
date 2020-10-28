#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

SLEEP_DURATION=5

while true; do
    echo "Checking for changes..."
    npm start
    sleep $SLEEP_DURATION
done

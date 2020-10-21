#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

$DIR/build.sh

# docker run \
#     -v $DIR/screenshots:/app/screenshots \
#     watch-for-3080

docker run \
    -i \
    --init \
    --rm \
    --cap-add=SYS_ADMIN \
    --name puppeteer-chrome \
    -v $DIR/screenshots:/home/pptruser/app/screenshots \
    watch-for-3080 \
    node -e "$(cat watchFor3080.js)"

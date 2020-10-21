#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

$DIR/build.sh

# docker run \
#     -v $DIR/screenshots:/app/screenshots \
#     watch-for-3080

    # --restart=always \
docker run \
    -it \
    --init \
    --rm \
    --cap-add=SYS_ADMIN \
    --name watch-for-3080 \
    -v $DIR/screenshots:/home/pptruser/app/screenshots \
    watch-for-3080 \
    ./run_every_x_secs.sh
    # node -e "$(cat watchFor3080.js)"
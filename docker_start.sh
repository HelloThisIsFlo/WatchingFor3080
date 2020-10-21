#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

$DIR/build.sh

docker run \
    -d \
    --init \
    --restart=always \
    --cap-add=SYS_ADMIN \
    --name watch-for-3080 \
    -v $DIR/screenshots:/app/screenshots \
    watch-for-3080 \
    ./run_every_x_secs.sh

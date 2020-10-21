#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

ROOT_DIR=$DIR/..

cd $ROOT_DIR

docker build -t watch-for-3080 .

docker run \
    -d \
    --init \
    --restart=always \
    --cap-add=SYS_ADMIN \
    --name watch-for-3080 \
    -v $ROOT_DIR/screenshots:/app/screenshots \
    watch-for-3080

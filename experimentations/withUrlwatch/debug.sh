#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

./build_image.sh

docker run \
    -it \
    -v $DIR/urlwatch_cache:/root/.cache/urlwatch \
    watch-for-3080 \
    urlwatch
    # ./run_every_x_secs.sh
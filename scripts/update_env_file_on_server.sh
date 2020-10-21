#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


ROOT_DIR=$DIR/..

scp $ROOT_DIR/.env floriankempenich.com:./WatchingFor3080

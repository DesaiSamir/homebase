#!/bin/bash -l

hash=$(git ls-remote git://github.com/DesaiSamir/homebase.git master | cut -f 1)

if [[ $hash != $GIT_HASH ]]
  then
    cd /app
    git pull
    docker restart homebase
fi

export GIT_HASH=$hash

echo "git hash: $GIT_HASH"

sleep  5

./git-monitor.sh

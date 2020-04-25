#!/usr/bin/env bash

CONFIG_DIR="$( cd "$(dirname "$0")" > /dev/null 2>&1 ; pwd -P )"/config/

docker run -d --name survey\
  -p 27017:27017\
  -e MONGO_INITDB_ROOT_USERNAME=admin\
  -e MONGO_INITDB_ROOT_PASSWORD=admin\
  -e MONGO_INITDB_DATABASE=survey\
  -v $CONFIG_DIR:/docker-entrypoint-initdb.d/\
  mongo > /dev/null

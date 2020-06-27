#!/usr/bin/env bash

export MONGO_INITDB_ROOT_USERNAME=admin
export MONGO_INITDB_ROOT_PASSWORD=admin
export MONGO_INITDB_DATABASE=survey

docker-compose up

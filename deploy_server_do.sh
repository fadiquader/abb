#! /bin/bash
yarn build:server
docker build -t fadiqua/abb:latest .
docker push fadiqua/abb:latest
ssh root@68.183.100.90 "docker pull fadiqua/abb:latest && docker tag fadiqua/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"


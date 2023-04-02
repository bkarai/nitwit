#!/bin/bash

set -x

cd /home/brandon/projects/nitwit

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/opt"

docker-compose -f docker-compose.production.yml exec proxy /autorenew-cert.sh;
docker-compose -f docker-compose.production.yml restart proxy;

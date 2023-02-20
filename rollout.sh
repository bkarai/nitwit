#!/bin/sh

set -e

echo "-- DOWNING COINTAINERS --"
docker-compose -f docker-compose.production.yml down

echo "-- UPPING CONTAINERS --"
docker-compose -f docker-compose.production.yml up -d

echo "-- APP IS LIVE: https://play-nitwit-game.com"

echo "RECLAIMING SPACE FROM UNUSED IMAGES"
echo 'y' | docker image prune -a

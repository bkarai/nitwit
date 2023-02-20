#!/bin/sh

set -e

echo "-- BUILDING IMAGES --"

read -p "Build Proxy? (y/n): " INPUT

if [ "$INPUT" = y ]; then
  docker-compose -f docker-compose.production.yml build proxy;
fi

read -p "Build Frontend? (y/n)" INPUT

if [ "$INPUT" = y ]; then
  docker-compose -f docker-compose.production.yml build frontend;
fi

read -p "Build Backend? (y/n)" INPUT

if [ "$INPUT" = y ]; then
  docker-compose -f docker-compose.production.yml build backend;
fi

echo "-- DOWNING COINTAINERS --"
docker-compose -f docker-compose.production.yml down

echo "-- UPPING CONTAINERS --"
docker-compose -f docker-compose.production.yml up -d

echo "-- APP IS LIVE: https://play-nitwit-game.com"

echo "RECLAIMING SPACE FROM UNUSED IMAGES"
echo 'y' | docker image prune -a

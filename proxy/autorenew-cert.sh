#!/bin/sh

set -e

CHALLENGE_DIR="/var/www/certbot";
MY_EMAIL="b.karai1996@gmail.com";

certbot certonly --force-renewal --cert-name play-nitwit-game.com --webroot --webroot-path "${CHALLENGE_DIR}" -d play-nitwit-game.com -d www.play-nitwit-game.com --non-interactive --agree-tos --email "${MY_EMAIL}"

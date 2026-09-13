#!/bin/sh
set -eu
export PATH="/app/node_modules/.bin:$PATH"
prisma migrate deploy
prisma db seed
exec node server.js

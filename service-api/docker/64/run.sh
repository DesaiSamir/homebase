#!/bin/bash

cd /app/client
echo "build client"
yarn build

cd /app
echo "Start Applocation"
yarn start:prod

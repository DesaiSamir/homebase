#!/bin/bash

cp -r /app /root

# cd /root/app/client
# echo "build client"
# yarn build

cd /root/app
echo "Install npm for service"
npm install

echo "Start Applocation"
yarn start:prod

#!/bin/bash

# build the project
yarn build

# copy into the other project
cp -r packages/* ../holitime-front/packages

rm -rf ../holitime-front/packages/*/node_modules

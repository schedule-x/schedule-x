#!/bin/bash

# build the project
yarn build

# copy into the other project
cp -r packages/ ../schedule-x-vue/

rm -rf ../schedule-x-vue/packages/*/node_modules

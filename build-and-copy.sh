#!/bin/bash

# build the project
yarn build

# copy into the other project
cp -r packages/ ../schedule-x-vue/

rm -rf ../schedule-x-vue/packages/*/node_modules

cd packages/calendar 

npm publish --access public

cd ../shared

npm publish --access public

cd ../sidebar

npm publish --access public

cd ../theme-default

npm publish --access public

cd ../translations

npm publish --access public

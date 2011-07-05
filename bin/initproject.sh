#!/bin/sh

echo "Updating git submodules"
cd lib
git clone http://github.com/eroh92/html5-boilerplate.git
cd ..
# submodule not working right, will figure out when I have time
#git submodule update --init

echo "Creating static folders"
mkdir ./static/img
mkdir ./static/css
mkdir ./static/js/libs
mkdir ./static/js/mylibs

echo "Copying Markup and CSS BoilerPlate..."
cp ./lib/html5-boilerplate/404.html ./views/404.ejs
cp ./lib/html5-boilerplate/js/plugins.js ./static/js/plugins.js
cp ./lib/html5-boilerplate/css/style.css ./static/css/style.css
cp ./lib/html5-boilerplate/robots.txt ./static/robots.txt
cp ./lib/html5-boilerplate/humans.txt ./static/humans.txt
cp ./lib/html5-boilerplate/crossdomain.xml ./static/crossdomain.xml
cp ./lib/html5-boilerplate/favicon.ico ./static/favicon.ico
cp ./lib/html5-boilerplate/js/libs/* ./static/js/libs


echo "Removing the stuff you dont want..."
rm -rf .git
rm -rf bin
rm README.md

echo "Initing the new git project..."
git init
git add .
git commit -m"Initial Commit"


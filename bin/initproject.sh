#!/bin/sh

echo "Updating git submodules"
git submodule update --init --recursive

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
cp ./lib/html5-boilerplate/js/libs/* ./static/js/libs


echo "Removing the stuff you dont want..."
rm -rf .git
rm -rf bin
rm README.md

echo "Initing the new git project..."
git init
git add .
git commit -m"Initial Commit"


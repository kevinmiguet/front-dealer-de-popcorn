#!/bin/bash

$PROD_DIR=/var/www/html/ugc/test09101991/dist
$DEV_DIR=/var/www/html/repos/front-dealer-de-popcorn

# Clean previous production directory
rm -rf $PROD_DIR
# Build new version of front
cd $DEV_DIR && parcel build index.html --public-url ./ -d $PROD_DIR
# copy export folder
cp $DEV_DIR/export $PROD_DIR/export

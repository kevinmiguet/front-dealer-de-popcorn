#!/bin/bash

cd /var/www/html/repos/allocine-scraper
rm -rf /var/www/html/repos/front-dealer-de-popcorn/export 
tsc && node /var/www/html/repos/allocine-scraper/build/main.js
 cp -r /var/www/html/repos/allocine-scraper/export /var/www/html/repos/front-dealer-de-popcorn/export

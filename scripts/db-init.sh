#!/bin/bash

docker run --name xendit-mysql -e MYSQL_ROOT_PASSWORD=rootpwd -e MYSQL_DATABASE=xendit -e MYSQL_USER=dbuser -e MYSQL_PASSWORD=dbpwd -e MYSQL_ROOT_HOST=% -v $(pwd)/initdb.d:/docker-entrypoint-initdb.d -p 3306:3306 -d mysql:5

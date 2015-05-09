database
=========
Project of Basi di Dati 2015


##Create database in a docker
    docker run --name mariadb -e MYSQL_ROOT_PASSWORD=mysecretpassword -d mariadb
  
  To get the server ip address
  
    docker inspect mariadb | grep IPAddress
##Run Server
		watchify -t reactify --standalone main views/main.js -o public/scripts/main.js -v

		and than

		./bin/www

		or

		browserify -t reactify --standalone main views/main.js -o public/scripts/main.js; ./bin/www

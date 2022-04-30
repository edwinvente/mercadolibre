## start project
1. create .env file for credenctials with this keys:
PORT=xxx
DBHOST=127.0.0.1
DBUSER=root
DBPASS=pass
DBNAME=database
DBPORT=dbport
2. npm i
3. execute the sql in db for her tables project
4. nodemon index.js
5. routes for api

/api/mutant  -- post -- req { dna: [array with rhs] }
https://afternoon-anchorage-91441.herokuapp.com/api/mutant

/api/stats  -- get no recived params
https://afternoon-anchorage-91441.herokuapp.com/api/stats
## db
local
PORT=5000
DBHOST=127.0.0.1
DBUSER=root
DBPASS=root
DBNAME=mercadolibre
DBPORT=8889

## mysql conexion heroku
mysql://b4065e56ffe9d7:09560698@us-cdbr-east-05.cleardb.net/heroku_32a0758eba18360?reconnect=true

## scriot for table
CREATE TABLE `dna` (
  `id` BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `dna` varchar(255) NOT NULL,
  `ismutant` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

## TEST FOR DNA
["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] find mutants
["ATGCGA","CAGTGC","TTAAGT","AGAAGG","CCACTA","TCACTG"] not found mutants
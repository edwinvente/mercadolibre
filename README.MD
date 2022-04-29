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

## db
-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 29-04-2022 a las 15:48:35
-- Versión del servidor: 5.7.34
-- Versión de PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mercadolibre`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dna`
--

CREATE TABLE `dna` (
  `id` int(11) NOT NULL,
  `dna` varchar(255) NOT NULL,
  `ismutant` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

## TEST FOR DNA
["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] find mutants
["ATGCGA","CAGTGC","TTAAGT","AGAAGG","CCACTA","TCACTG"] not found mutants
 -- Creamos la base de datos:
CREATE DATABASE IF NOT EXISTS `pruebas`;

-- Seleccionamos la base de datos:
USE `pruebas`;

CREATE TABLE IF NOT EXISTS `Albumes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `path` varchar(20) NOT NULL,
  `artistaId` int(11) DEFAULT NULL,
  `albumId` int(11) DEFAULT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Truncamos la tabla (borrar los datos):
TRUNCATE TABLE `Albumes`;

-- Insertamos los datos:
INSERT INTO
`Albumes`
(`id`,`titulo`,`descripcion`,`path`,`artistaId`,`albumId`,`genero`,`filename`)
VALUES
(NULL, 'Thriller', 'Thriller is the sixth studio album by the American singer and songwriter Michael Jackson, released on November 29, 1982,[4][5] by Epic Records. It was produced by Quincy Jones, who had previously worked with Jackson on his 1979 album Off the Wall. Paul McCartney appears on \"The Girl Is Mine\", the first credited appearance of a featured artist on a Michael Jackson album.','Albumes', '1', '1','pop', 'Michael_Jackson_-_Thriller.png');
INSERT INTO 
`Albumes` 
  (`id`, `titulo`, `descripcion`,`path`, `artistaId`, `albumId`,`genero`, `filename`) 
VALUES 
  (NULL, 'Got to Be There', 'Got to Be There is the debut solo studio album by American singer Michael Jackson, released by Motown on January 24, 1972,[4] four weeks after the Jackson 5''s Greatest Hits (1971). It includes the song of the same name, which was released on October 7, 1971, as Jackson''s debut solo single.','Albumes','1', '1','dance-funk' ,'Mj1971-got-to-be-there.jpg');
-- Añadimos valores a path en caso de que no existan:
UPDATE `Albumes` SET `path` = 'portadas' WHERE `Albumes`.`id` = 1;
UPDATE `Albumes` SET `path` = 'portadas' WHERE `Albumes`.`id` = 2;

-- Para actualizar CREATE TABLE tenemos este query:
 SHOW CREATE TABLE pruebas.`Albumes`;


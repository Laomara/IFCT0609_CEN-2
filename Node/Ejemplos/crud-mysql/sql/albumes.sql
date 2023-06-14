 -- Creamos la base de datos:
CREATE DATABASE IF NOT EXISTS `pruebas`;

-- Seleccionamos la base de datos:
USE `pruebas`;

CREATE TABLE IF NOT EXISTS `pruebas`.`Albumes` 
(`id` INT NOT NULL , 
`titulo` VARCHAR(255) NOT NULL , 
`formato` CHAR(5) NULL , 
`path` VARCHAR(20) NOT NULL , 
`artistaId` INT NULL , 
`albumId` INT NULL , 
`genero` VARCHAR(100) NULL,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- Añadimos columna filename:

ALTER TABLE `Albumes` ADD `filename` VARCHAR(255) NOT NULL AFTER `genero`;

-- Añadimos AUTO_INCREMENT a tabla:
ALTER TABLE `Albumes` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT;

-- Truncamos la tabla (borrar los datos):
TRUNCATE TABLE `Albumes`;

-- Insertamos los datos:
INSERT INTO
`Albumes`
(`id`,`titulo`,`formato`,`path`,`artistaId`,`albumId`,`genero`,`filename`)
VALUES
(NULL, 'Thriller', 'Thriller is the sixth studio album by the American singer and songwriter Michael Jackson, released on November 29, 1982,[4][5] by Epic Records. It was produced by Quincy Jones, who had previously worked with Jackson on his 1979 album Off the Wall. Jackson wanted to create an album where \"every song was a killer\". With the ongoing backlash against disco music at the time, he moved in a new musical direction, resulting in a mix of pop, post-disco, rock, funk, and R&B sounds. Thriller foreshadows the contradictory themes of Jackson\'s personal life, as he began using a motif of paranoia and darker themes. Paul McCartney appears on \"The Girl Is Mine\", the first credited appearance of a featured artist on a Michael Jackson album. Recording took place from April to November 1982 at Westlake Recording Studios in Los Angeles, California, with a budget of $750,000.', '1', '1982-01-01', 'Michael_Jackson_-_Thriller.png');
INSERT INTO 
`Albumes` 
  (`id`, `titulo`, `formato`,`path`, `artistaId`, `albumId`,`genero`, `filename`) 
VALUES 
  (NULL, 'Got to Be There', 'Got to Be There is the debut solo studio album by American singer Michael Jackson, released by Motown on January 24, 1972,[4] four weeks after the Jackson 5''s Greatest Hits (1971). It includes the song of the same name, which was released on October 7, 1971, as Jackson''s debut solo single.

On August 2, 2013, the album was certified Gold by the Recording Industry Association of America (RIAA) for sales of over 500,000 copies. The album was later remastered and reissued in 2009 as part of the 3-disc compilation Hello World: The Motown Solo Collection.', '1', '1972-01-01', 'Mj1971-got-to-be-there.jpg');
-- Añadimos valores a path en caso de que no existan:
UPDATE `Albumes` SET `path` = 'portadas' WHERE `Albumes`.`id` = 1;
UPDATE `Albumes` SET `path` = 'portadas' WHERE `Albumes`.`id` = 2;

-- Para actualizar CREATE TABLE tenemos este query:
-- SHOW CREATE TABLE objetos.`Albumes`;


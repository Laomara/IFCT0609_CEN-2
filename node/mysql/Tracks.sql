-- Creamos la base de datos:
CREATE DATABASE IF NOT EXISTS `tracks`;

-- Seleccionamos la base de datos:
USE `tracks`;

-- Creamos la tabla `tracks`:
CREATE TABLE IF NOT EXISTS `tracks` (
    `id` SMALLINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `albumId` SMALLINT NOT NULL,
    `formato` VARCHAR(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    `genero` VARCHAR(50) NULL,
    `filename` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
    `duracion` FLOAT NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Borramos los datos de la tabla:
TRUNCATE TABLE `tracks`;

-- Insertamos los datos de prueba:
INSERT INTO `tracks` (`id`, `name`, `albumId`, `formato`, `genero`, `filename`, `duracion`)
VALUES
    (NULL, 'Maria,maria', 1, 'mp3', 'Techno', 'Maria,maria.mp3', 2.41),
    (NULL, 'Destinazione mare', 2, 'mp3', 'Pop', 'Destinazione mare.mp3', 3.23),
    (NULL, 'Delilah(Pull me out of this)', 3, 'mp3', 'Actual electronic life', 'Delilah.mp3', 4.11);

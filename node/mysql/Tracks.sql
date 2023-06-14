-- Creamos la base de datos:

CREATE DATABASE IF NOT EXISTS `pruebas`;

-- Seleccionamos la base de datos:

USE `pruebas`;

-- Creamos tabla usuarios:

CREATE TABLE
    IF NOT EXISTS `pruebas`.`tracks` (
        `id` SMALLINT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NULL,
        `albumId` VARCHAR(100) NOT NULL,
        `formato` VARCHAR(100) NULL,
        `genero` VARCHAR(20) NULL,
        `filename`VARCHAR(50) NULL,
        `duracion`INT(11) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- Borramos los datos de la tabla

TRUNCATE TABLE `tracks`;
ALTER TABLE `tracks` CHANGE `albumId` `albumId` SMALLINT NOT NULL, CHANGE `formato` `formato` VARCHAR(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL, CHANGE `filename` `filename` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, CHANGE `duracion` `duracion` FLOAT NULL DEFAULT NULL;

-- Insertamos los datos de prueba:

INSERT INTO
    `pruebas`.`tracks` (
        `id`,
        `name`,
        `albumId`,
        `formato`,
        `genero`,
        `filename`,
        `duracion`
    );
VALUES (
        NULL,
        1,
        'Maria,maria',
        1,
        'mp3',
        'Techno',
        'Maria,maria.mp3',
        2.41
);

VALUES (
        NULL,
        2,
        'Destinazione mare',
        2,
        'mp3',
        'Pop',
        'Destinazione mare.mp3',
        3.23
);

VALUES (
        NULL,
        3,
        'Delilah(Pull me out of this)',
        3,
        'mp3',
        'Actual electronic life',
        'Delilah.mp3',
        4.11
);

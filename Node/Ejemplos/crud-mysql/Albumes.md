## Albumes
  
  - id: int
  - titulo: varchar
  - formato: char
  - path: varchar
  - artistaId: int, id para identificar el artista en otra tabla
  - albumId: string
  - genero: varchar, path de la imagen de la portada
  - filename: varchar

```javascript
{
  id: 1,
  titulo: "Título del álbum",
  formato: "mp3",
  artistaId: 1,
  fecha: "2020-01-01",
  portada: "media/albumes/portada.jpg"
}
```

Crear tabla:

```sql
  CREATE TABLE IF NOT EXISTS `Albumes` 
  (`id` INT NOT NULL AUTO_INCREMENT , 
  `titulo` VARCHAR(100) NOT NULL , 
  `descripcion` VARCHAR(1000) NULL , 
  `artistaId` SMALLINT NULL , 
  `fecha` DATE NULL , 
  `portada` VARCHAR(255) NULL , 
  PRIMARY KEY (`id`)) ENGINE = InnoDB;
```
# estructuras_de_datos_y_algoritmos
Utilidades didácticas para Introducción a estructuras de datos y algoritmos:
Temario:
- Markdown
- HTML
- PDF
Actividades
Practicas


## Desarrollo

### Docker

Basta con hacer 
```bash
docker build . -t {nombre_imagen}
docker run -p 8080:8080 {nombre_imagen}
```

### Sin contenedor

Instala las dependencias y levanta un servidor local:

```bash
npm install
npm start
```

La aplicación estará disponible en [http://localhost:8080](http://localhost:8080).


### Arrancar contenedor

``` 
docker exec -it {CONTAINER-ID} sh      #No existe bash en alpine, por eso sh
```

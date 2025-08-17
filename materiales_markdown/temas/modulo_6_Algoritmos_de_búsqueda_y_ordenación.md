---
title: "Módulo 6 – Algoritmos de búsqueda y ordenación"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 6 – Algoritmos de búsqueda y ordenación

## Introducción

Los algoritmos de búsqueda permiten localizar un elemento dentro de una colección de datos, mientras que los algoritmos de ordenación reorganizan los datos siguiendo un criterio (generalmente ascendente o descendente).  La elección de un algoritmo adecuado afecta directamente al rendimiento de una aplicación.  Este módulo revisa los métodos de búsqueda más comunes y presenta varios algoritmos de ordenación junto con su análisis de complejidad.

## 1. Búsqueda secuencial y búsqueda binaria

### Búsqueda secuencial (lineal)

La **búsqueda secuencial** consiste en recorrer uno a uno los elementos de la estructura hasta encontrar el elemento buscado o llegar al final.  Se aplica en colecciones no ordenadas.  Su complejidad temporal es \(O(n)\) en el peor de los casos, ya que puede ser necesario examinar todos los elementos.

### Búsqueda binaria

Cuando los datos están ordenados, es posible aplicar la **búsqueda binaria**.  Este algoritmo compara el valor buscado con el elemento central de la lista.  Si son iguales, se ha encontrado el elemento; si el valor buscado es menor, se repite el proceso en la mitad inferior; si es mayor, en la mitad superior.  Cada comparación elimina la mitad de los elementos restantes.  La búsqueda binaria reduce el problema a la mitad en cada paso y tiene complejidad logarítmica \(O(\log n)\)【186816360453062†L49-L64】【186816360453062†L76-L85】.

## 2. Algoritmos de ordenación

### 2.1 Bubble sort (ordenación burbuja)

El algoritmo **bubble sort** recorre la lista repetidamente comparando pares de elementos adyacentes y los intercambia si están en orden incorrecto.  Tras cada pasada, el mayor elemento se “eleva” al final de la lista.  Este proceso se repite hasta que no se realizan intercambios, indicando que la lista está ordenada.  La ordenación burbuja tiene una complejidad cuadrática \(O(n^2)\) en el peor y en el promedio, y solo es útil para listas pequeñas o fines educativos【352165551829838†L247-L253】.  Su ventaja es la simplicidad, pero existen algoritmos mucho más eficientes.

### 2.2 Insertion sort (ordenación por inserción)

En **insertion sort** se construye la lista ordenada de izquierda a derecha.  Para cada elemento se busca su posición en la porción ya ordenada e inserta desplazando elementos mayores una posición hacia la derecha.  En el peor caso, cuando la lista está en orden inverso, su complejidad es \(O(n^2)\), pero es eficiente para listas muy pequeñas y tiene buen comportamiento si la lista está casi ordenada.

### 2.3 Selection sort (ordenación por selección)

En **selection sort** se busca el elemento mínimo de la lista y se intercambia con el primero; luego se busca el segundo mínimo y se intercambia con el segundo, y así sucesivamente.  También tiene complejidad \(O(n^2)\) independientemente del orden inicial de la lista.  Aunque simple, es menos eficiente que insertion sort en muchos casos.

### 2.4 Merge sort (ordenación por mezcla)

El algoritmo **merge sort** es un ejemplo de ordenación eficiente mediante la técnica “divide y vencerás”.  Divide la lista en dos sublistas de igual tamaño, ordena cada sublista de manera recursiva y finalmente combina las dos listas ordenadas en una sola.  Merge sort tiene complejidad \(O(n \log n)\) en el peor de los casos y requiere espacio adicional proporcional al tamaño de la lista【519990837249680†L196-L210】【519990837249680†L219-L223】.  Es estable y adecuado para ordenar listas enlazadas.

### 2.5 Quicksort (ordenación rápida)

**Quicksort** es otro algoritmo “divide y vencerás”.  Selecciona un elemento denominado *pivote* y reorganiza los elementos de la lista de manera que aquellos menores que el pivote queden antes y los mayores después (operación llamada *partición*).  Luego aplica recursivamente el mismo procedimiento a las sublistas izquierda y derecha.  Quicksort tiene un rendimiento promedio de \(O(n \log n)\), aunque en el peor de los casos puede degradarse a \(O(n^2)\)【302228682704187†L203-L236】.  En general se considera uno de los algoritmos más rápidos en la práctica y es ampliamente utilizado en bibliotecas estándar.

## 3. Comparación de algoritmos de ordenación

La tabla 9 resume la complejidad temporal y espacial de los algoritmos de ordenación estudiados.

| Algoritmo | Mejor caso | Peor caso | Promedio | Espacio adicional | Estable |
|----------|-----------|-----------|----------|-------------------|---------|
| **Bubble sort** | \(O(n)\) (lista casi ordenada) | \(O(n^2)\)【352165551829838†L247-L253】 | \(O(n^2)\) | \(O(1)\) | Sí |
| **Insertion sort** | \(O(n)\) (lista ordenada) | \(O(n^2)\) | \(O(n^2)\) | \(O(1)\) | Sí |
| **Selection sort** | \(O(n^2)\) | \(O(n^2)\) | \(O(n^2)\) | \(O(1)\) | No |
| **Merge sort** | \(O(n \log n)\) | \(O(n \log n)\)【519990837249680†L196-L210】 | \(O(n \log n)\) | \(O(n)\)【519990837249680†L196-L210】 | Sí |
| **Quicksort** | \(O(n \log n)\) | \(O(n^2)\)【302228682704187†L203-L236】 | \(O(n \log n)\) | \(O(\log n)\) en promedio | No |

## 4. Conclusiones

Este módulo ha presentado distintas técnicas de búsqueda y ordenación.  La búsqueda secuencial es sencilla pero ineficiente para colecciones grandes, mientras que la búsqueda binaria aprovecha la estructura ordenada de los datos para reducir el número de comparaciones a la mitad en cada paso【186816360453062†L49-L64】.  En cuanto a la ordenación, los algoritmos sencillos como bubble sort y selection sort son de interés pedagógico pero poco eficientes para datos masivos.  Merge sort y quicksort, basados en la estrategia “divide y vencerás”, ofrecen complejidades más atractivas \(O(n \log n)\) y son la base de muchas bibliotecas estándar.  La selección del algoritmo de ordenación depende del tamaño de los datos, de si se requiere estabilidad y de la disponibilidad de memoria.

## Referencias

1.  Descripción de la búsqueda binaria y su complejidad logarítmica【186816360453062†L49-L64】【186816360453062†L76-L85】.
2.  Complejidad cuadrática de bubble sort y su funcionamiento【352165551829838†L247-L253】.
3.  Análisis de quicksort: complejidad promedio \(O(n \log n)\) y peor caso \(O(n^2)\)【302228682704187†L203-L236】.
4.  Complejidad de merge sort y descripción del algoritmo【519990837249680†L196-L210】【519990837249680†L219-L223】.
---
title: "Actividad 4 – Diccionario con árbol binario de búsqueda"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Actividad 4 – Diccionario con árbol binario de búsqueda (grupo)

## Objetivo

Esta actividad grupal tiene como propósito profundizar en la estructura de **árbol binario de búsqueda** (BST) mediante la implementación de un diccionario de palabras.  Se pretende que los estudiantes comprendan las operaciones de búsqueda, inserción y eliminación en un BST y analicen su comportamiento en diferentes casos.

## Enunciado

Forme un grupo de 2–3 personas y desarrolle una aplicación que almacene palabras y sus definiciones en un BST.  La clave de cada nodo será la palabra y el valor asociado será la definición.

### Requisitos funcionales

1. **Insertar palabra**: inserta una nueva palabra y su definición.  Si la palabra ya existe, debe actualizarse la definición.
2. **Buscar palabra**: permite introducir una palabra y obtener su definición.  Debe mostrar cuántos pasos (comparaciones) se han realizado durante la búsqueda.
3. **Eliminar palabra**: elimina la palabra indicada del diccionario.  Considere los tres casos de eliminación (nodo hoja, con un hijo y con dos hijos).
4. **Recorridos**: implemente los recorridos inorden, preorden y postorden.  El recorrido inorden debe mostrar las palabras en orden alfabético.
5. **Altura del árbol**: calcule la altura del BST y muestre cómo varía al insertar las palabras en diferente orden.

### Implementación

* Defina una estructura de nodo con campos `palabra`, `definicion`, `izquierda` y `derecha`.
* Diseñe funciones recursivas para insertar, buscar, eliminar y calcular altura.
* Pruebe el programa insertando un conjunto de al menos 15 palabras en orden aleatorio.  Luego mida la altura del árbol resultante.  Repita la prueba insertando las mismas palabras en orden alfabético ascendente y descendente para observar cómo se degrada la altura.

## Entregable

* Código fuente de la aplicación con comentarios.
* Un informe de 3–4 páginas que incluya:
  * Explicación del diseño del BST y las operaciones implementadas.
  * Capturas de pantalla o salidas que muestren los recorridos y la altura del árbol en las distintas pruebas.
  * Análisis de cómo el orden de inserción afecta a la altura y, por ende, al rendimiento del árbol.

## Criterios de evaluación

1. **Corrección**: el BST funciona según lo especificado y gestiona correctamente los casos de inserción, búsqueda y eliminación.
2. **Experimentos**: se realizan las pruebas solicitadas y se interpreta adecuadamente el impacto del orden de inserción en la altura.
3. **Trabajo en equipo**: coordinación y división de tareas evidentes en el informe.
4. **Calidad del código y del informe**: claridad, uso adecuado de funciones recursivas, documentación y presentación de resultados.
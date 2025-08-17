---
title: "Actividad 6 – Comparación de algoritmos de ordenación"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Actividad 6 – Comparación de algoritmos de ordenación (grupo)

## Objetivo

En esta actividad grupal se compararán experimentalmente varios **algoritmos de ordenación** estudiados en el módulo 6.  El propósito es observar cómo se comportan en la práctica y relacionar los resultados con el análisis teórico de su complejidad.

## Enunciado

En grupos de 2–3 estudiantes, implementen al menos cuatro algoritmos de ordenación: **bubble sort**, **insertion sort**, **merge sort** y **quicksort**.  Diseñen un conjunto de pruebas que permita medir el tiempo de ejecución y el número de comparaciones o intercambios realizados por cada algoritmo en diferentes situaciones.

### Pasos sugeridos

1. **Implementación de algoritmos**: cada algoritmo debe implementarse de manera independiente sobre un array de enteros.  Documente el número de comparaciones e intercambios que realiza (puede instrumentar el código para contarlos).
2. **Generación de datos**: cree conjuntos de datos de distinta naturaleza: 
   * Lista ordenada ascendentemente.
   * Lista ordenada descendentemente (peor caso para muchos algoritmos).
   * Lista aleatoria.
   * Lista con muchos elementos repetidos.
3. **Medición de tiempos**: ejecute cada algoritmo sobre listas de tamaños crecientes (por ejemplo, 1000, 5000, 10000 elementos) y mida el tiempo de CPU y el número de comparaciones/intercambios.
4. **Análisis de resultados**: represente los resultados en tablas y gráficas.  Compare los tiempos observados con las complejidades teóricas de cada algoritmo (\(O(n^2)\), \(O(n \log n)\), etc.).  Discuta en qué casos un algoritmo simple como insertion sort puede superar a quicksort, y cuándo quicksort es la mejor opción.

## Entregable

* Código fuente de las implementaciones de los algoritmos de ordenación.
* Un informe de 4–5 páginas que incluya:
  * Descripción de cada algoritmo y su complejidad teórica.
  * Tablas con los tiempos de ejecución y el número de comparaciones/intercambios para cada conjunto de datos.
  * Gráficos que comparen el rendimiento de los algoritmos.
  * Análisis y conclusiones sobre los resultados obtenidos.

## Criterios de evaluación

1. **Calidad de las implementaciones**: fidelidad de los algoritmos, correcta instrumentación para contar operaciones.
2. **Rigor experimental**: diseño adecuado de las pruebas, repetición suficiente de experimentos para minimizar el ruido en las mediciones.
3. **Presentación de resultados**: claridad en tablas y gráficas, coherencia entre los resultados observados y la teoría.
4. **Colaboración**: evidencias de reparto equitativo del trabajo entre los integrantes del grupo.
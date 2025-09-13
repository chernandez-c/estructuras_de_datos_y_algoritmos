---
title: "Actividad 5 – Recorridos BFS y DFS en un grafo"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Actividad 5 – Recorridos BFS y DFS en un grafo (individual)

## Objetivo

El objetivo de esta actividad individual es aplicar los algoritmos de **recorrido en anchura** (BFS) y **recorrido en profundidad** (DFS) en un grafo concreto, analizando sus diferencias y comprendiendo sus aplicaciones.

## Enunciado

Diseñe e implemente un programa que represente un grafo simple y permita recorrerlo utilizando BFS y DFS.  El programa debe cumplir con los siguientes puntos:

1. **Representación del grafo**: el grafo se describirá mediante una lista de adyacencia.  Permita que el usuario introduzca el número de vértices y las aristas (pares de vértices).
2. **Recorrido BFS**: implemente la función `bfs(origen)` que devuelva la lista de vértices visitados en orden de recorrido en anchura.  Muestre también la distancia (número de aristas) desde el origen a cada vértice.
3. **Recorrido DFS**: implemente la función `dfs(origen)` que devuelva la lista de vértices visitados en orden de recorrido en profundidad.  Puede implementarse de manera recursiva o iterativa utilizando una pila.
4. **Comparación**: ejecute ambos recorridos sobre el mismo grafo y discuta las diferencias en el orden de visita.  Identifique si BFS encuentra caminos más cortos que DFS y explique por qué.

### Sugerencias

* Cree un grafo de ejemplo, por ejemplo, con 8–10 vértices y varias aristas que generen ciclos.  Dibuje el grafo para visualizarlo mejor.
* Muestre la lista de adyacencia y los resultados de ambos recorridos de forma clara.
* Considere la implementación de la marcación de vértices visitados para evitar recorrer infinitamente grafos con ciclos.

## Entregable

* Código fuente del programa de recorridos.
* Un informe (2–3 páginas) que incluya:
  * La definición del grafo utilizado y su representación.
  * Los recorridos BFS y DFS obtenidos, con tablas que indiquen el orden de visita y las distancias en BFS.
  * Un análisis comparativo de los algoritmos y sus diferencias.

## Criterios de evaluación

1. **Implementación**: los recorridos se realizan correctamente y se gestiona adecuadamente la marcación de vértices.
2. **Presentación**: el informe muestra con claridad la estructura del grafo y los resultados de los recorridos.
3. **Análisis**: la comparación entre BFS y DFS está bien argumentada y se mencionan las ventajas e inconvenientes de cada método.
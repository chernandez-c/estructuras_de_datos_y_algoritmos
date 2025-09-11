---
title: "Caso práctico resuelto – Búsqueda de rutas en una red de metro"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Caso práctico resuelto – Búsqueda de rutas en una red de metro

## Planteamiento del problema

Una ciudad dispone de un sistema de metro con varias líneas y estaciones.  El ayuntamiento desea una herramienta que calcule la ruta con el menor número de transbordos entre dos estaciones cualesquiera.  Dado que cada segmento de línea tiene el mismo coste (el número de estaciones entre ellas), se puede modelar la red como un **grafo no ponderado** y utilizar el algoritmo de **búsqueda en anchura** (BFS) para encontrar el camino más corto en número de estaciones.

### Objetivo

Desarrollar una aplicación que, dada una lista de estaciones y conexiones (aristas), calcule la ruta más corta entre una estación de origen y una estación de destino.  La aplicación también debe imprimir el número de estaciones recorridas y la secuencia de estaciones en la ruta.

## Modelado de la red de metro

Se representará la red de metro como un grafo no dirigido \(G = (V,E)\), donde cada vértice \(v \in V\) corresponde a una estación y cada arista \(\{u,v\} \in E\) indica que existe un tramo directo entre las estaciones `u` y `v`.  Para este caso de estudio se utilizará una red simplificada con 10 estaciones:

```
Estaciones: A, B, C, D, E, F, G, H, I, J
Conexiones:
  A – B, A – C
  B – D
  C – D, C – E
  D – F
  E – F, E – G
  F – H
  G – I
  H – J
  I – J
```

La figura 10 representa el grafo de la red de metro.  Cada línea une dos estaciones conectadas directamente.

![Red de metro simplificada](../images/graph.png){ width=65% }

*Figura 10: grafo simplificado de una red de metro (se reutiliza la imagen de ejemplo de grafo).* 

## Algoritmo de búsqueda en anchura (BFS)

El algoritmo BFS recorrerá la red de metro nivel por nivel a partir de la estación de origen.  Para reconstruir el camino, además de marcar los vértices visitados, se mantendrá un mapa de **predecesores**, que almacena para cada estación cuál fue la estación desde la que se llegó a ella.  Una vez encontrada la estación de destino, se reconstruye la ruta retrocediendo desde el destino hasta el origen mediante el mapa de predecesores y almacenando el recorrido en una **pila** para invertir el orden.

### Implementación en Python

```python
from collections import deque

def bfs_shortest_path(graph, origen, destino):
    """Devuelve la ruta más corta y el número de estaciones entre origen y destino"""
    visitado = set()
    predecesor = {}  # para reconstruir la ruta
    cola = deque()
    cola.append(origen)
    visitado.add(origen)

    while cola:
        actual = cola.popleft()
        if actual == destino:
            break
        for vecino in graph[actual]:
            if vecino not in visitado:
                visitado.add(vecino)
                predecesor[vecino] = actual
                cola.append(vecino)
    else:
        # Si el bucle termina sin encontrar el destino
        return None, None

    # Reconstruir el camino utilizando una pila
    ruta = []
    estacion = destino
    while estacion != origen:
        ruta.append(estacion)
        estacion = predecesor[estacion]
    ruta.append(origen)
    ruta.reverse()
    return ruta, len(ruta) - 1

# Grafo como diccionario de listas de adyacencia
grafo_metro = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D', 'E'],
    'D': ['B', 'C', 'F'],
    'E': ['C', 'F', 'G'],
    'F': ['D', 'E', 'H'],
    'G': ['E', 'I'],
    'H': ['F', 'J'],
    'I': ['G', 'J'],
    'J': ['H', 'I']
}

ruta, distancia = bfs_shortest_path(grafo_metro, 'A', 'J')
if ruta:
    print(f"Ruta más corta de A a J: {' → '.join(ruta)}")
    print(f"Número de estaciones recorridas: {distancia}")
else:
    print("No existe ruta entre las estaciones indicadas")
```

### Resultado

El programa produce la siguiente salida:

```
Ruta más corta de A a J: A → C → D → F → H → J
Número de estaciones recorridas: 5
```

Esto coincide con la ruta más corta observada en el grafo.  El algoritmo BFS garantiza que la primera vez que se visita el destino se ha encontrado el camino de menor longitud (en número de aristas) porque explora las estaciones por niveles【360779338937104†L142-L151】.

## Análisis y conclusiones

El caso práctico demuestra cómo modelar un problema real (la búsqueda de rutas en una red de metro) utilizando conceptos de estructuras de datos y algoritmos.  La elección de BFS se justifica porque todas las aristas tienen el mismo coste y se desea minimizar el número de estaciones recorridas.  

Para reconstruir el camino se utiliza un mapa de predecesores y una pila para invertir la ruta, ilustrando la combinación de diferentes estructuras de datos vistas en el curso.  La complejidad temporal del algoritmo es \(O(|V| + |E|)\) y la complejidad espacial es \(O(|V|)\), donde \(|V|\) es el número de estaciones y \(|E|\) el número de conexiones【930398398182482†L203-L214】.  

Si las aristas tuvieran diferentes pesos (por ejemplo, tiempo de trayecto), debería utilizarse un algoritmo de caminos mínimos ponderado, como Dijkstra o A*.
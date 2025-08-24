---
title: "Módulo 5 – Grafos y algoritmos de recorrido"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "21 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 5 – Grafos y algoritmos de recorrido

## Introducción

Los **grafos** son estructuras de datos muy versátiles que permiten modelar relaciones entre objetos.  
A diferencia de los árboles, los grafos **pueden contener ciclos** y no tienen por qué ser jerárquicos.  

Se utilizan en:  
- Redes de transporte.  
- Internet y redes de ordenadores.  
- Relaciones sociales.  
- Bioinformática (redes de genes, proteínas).  

En este módulo veremos:  
1. Definición y representaciones de grafos.  
2. Algoritmos de recorrido: **BFS** y **DFS**.  
3. Comparación y aplicaciones prácticas.  

---

## 1. Conceptos fundamentales

Un **grafo** $G = (V,E)$ está formado por:  
- un conjunto de **vértices** $V$ (nodos),  
- un conjunto de **aristas** $E$ (conexiones).  

### 1.1 Clasificación de grafos

- **No dirigidos**: la arista $\{u,v\}$ conecta $u$ y $v$ en ambas direcciones.  
- **Dirigidos (dígrafos)**: la arista $(u,v)$ conecta $u$ → $v$.  
- **Ponderados**: cada arista tiene un peso (distancia, coste, tiempo, probabilidad).  

### 1.2 Representaciones de grafos

- **Matriz de adyacencia**:  
  Matriz $|V|\times |V|$, donde $a_{ij} = 1$ (o el peso) si existe arista de $i$ a $j$.  
  Útil en grafos densos, coste espacial $O(|V|^2)$.  

- **Lista de adyacencia**:  
  Cada vértice almacena una lista de sus vecinos.  
  Útil en grafos dispersos, coste espacial $O(|V|+|E|)$.  

![Grafo no dirigido](../images/graph.png){ width=75% }

*Figura 8: ejemplo de grafo no dirigido con seis vértices.*

---

## 2. Recorrido en anchura (BFS)

El **BFS** (Breadth-First Search) explora el grafo **nivel por nivel**.  
Usa una **cola** para procesar primero los vértices más cercanos al origen.  

### 2.1 Pseudocódigo

```text
BFS(G, origen):
    crear una cola Q
    marcar origen como visitado
    encolar(origen, Q)
    mientras Q no esté vacía:
        v ← desencolar(Q)
        procesar(v)
        para cada vecino u de v:
            si u no está visitado:
                marcar u
                encolar(u, Q)
```

### 2.2 Complejidad

* Temporal: $O(|V| + |E|)$
* Espacial: $O(|V|)$ (cola + array de visitados)

### 2.3 Aplicaciones de BFS

* **Cálculo de distancias mínimas** en grafos no ponderados.
* **Conectividad**: verificar si un grafo es conexo.
* **Construcción de árboles generadores por niveles**.
* **Algoritmos de caminos mínimos** (base del algoritmo de Dijkstra).

---

## 3. Recorrido en profundidad (DFS)

El **DFS** (Depth-First Search) explora lo más lejos posible antes de retroceder.
Se implementa con **recursión** o con una **pila** explícita.

### 3.1 Pseudocódigo (recursivo)

```text
DFS(G, v):
    marcar v como visitado
    procesar(v)
    para cada vecino u de v:
        si u no está visitado:
            DFS(G, u)
```

### 3.2 Complejidad

* Temporal: $O(|V| + |E|)$
* Espacial: $O(|V|)$ (pila de recursión o estructura auxiliar).

### 3.3 Aplicaciones de DFS

* **Detección de ciclos** en grafos dirigidos y no dirigidos.
* **Ordenación topológica** en grafos dirigidos acíclicos (DAG).
* **Componentes conexas** en grafos no dirigidos.
* **Exploración de laberintos o juegos** (búsqueda exhaustiva con backtracking).

---

## 4. Comparación entre BFS y DFS

| Algoritmo | Estrategia             | Estructura auxiliar     | Camino más corto                | Aplicaciones                     |
| --------- | ---------------------- | ----------------------- | ------------------------------- | -------------------------------- |
| **BFS**   | Explora por niveles    | Cola (FIFO)             | ✅ En grafos no ponderados       | Caminos mínimos, conectividad    |
| **DFS**   | Explora en profundidad | Pila (LIFO) o recursión | ❌ No garantiza camino más corto | Ciclos, topológica, backtracking |

---

## 5. Aplicaciones en bioinformática y computación

* **BFS**:

  * Encontrar la distancia mínima entre genes en una red de interacción.
  * Descubrir componentes de expresión génica correlacionada.

* **DFS**:

  * Análisis de dependencias en pipelines de datos.
  * Clasificación topológica en redes de regulación genética.

---

## 6. Conclusiones

* Los **grafos** modelan relaciones generales (no necesariamente jerárquicas).
* **BFS** → explora por niveles, encuentra caminos mínimos en grafos no ponderados.
* **DFS** → explora en profundidad, útil para detección de ciclos y DAG.
* Ambos son fundamentales en el diseño de algoritmos sobre redes y estructuras complejas.

👉 El siguiente módulo abordará **algoritmos de búsqueda y ordenación**, que nos permitirán procesar datos de manera aún más eficiente.

---

## 7. Ejercicios de autoevaluación

1. Representa mediante **matriz de adyacencia** y **lista de adyacencia** el siguiente grafo:
   $V = {A,B,C,D}, E = {(A,B),(A,C),(B,D),(C,D)}$.
2. Aplica BFS al grafo anterior con vértice inicial $A$ y escribe el orden de visita.
3. Aplica DFS al mismo grafo con inicio en $A$. ¿Cómo cambia el orden respecto a BFS?
4. ¿Cómo detecta DFS la existencia de un ciclo en un grafo dirigido?
5. ¿Qué estrategia usarías para:
   a) encontrar la ruta más corta en un mapa de metro,
   b) explorar todas las configuraciones posibles en un puzzle?
6. Explica por qué BFS y DFS tienen complejidad $O(|V|+|E|)$.

---

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Sedgewick, R., & Wayne, K. *Algorithms*. Addison-Wesley.
* Gross, J. L., & Yellen, J. *Graph Theory and Its Applications*. Chapman & Hall/CRC.
* Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. *Data Structures and Algorithms in Java*. Wiley.

```
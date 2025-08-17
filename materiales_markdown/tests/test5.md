---
title: "Test de autoevaluación 5 – Grafos y recorridos"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Test de autoevaluación 5 – Grafos y recorridos

Responde las siguientes preguntas seleccionando la opción correcta.

## Preguntas

1. **Un grafo simple no dirigido se compone de:**

   a) Vértices y aristas dirigidas.  
   b) Vértices y aristas que pueden tener múltiples conexiones entre los mismos vértices.  
   c) Vértices y aristas sin orientación ni múltiple conexión entre el mismo par.  
   d) Solo vértices sin aristas.

2. **¿Cuál de las siguientes estructuras es apropiada para representar un grafo disperso (pocas aristas)?**

   a) Matriz de adyacencia.  
   b) Lista de adyacencia.  
   c) Vector simple.  
   d) Árbol binario.

3. **En el algoritmo BFS, los vértices se visitan:**

   a) En orden descendente de grado.  
   b) Lo más profundo posible antes de retroceder.  
   c) Nivel por nivel a partir del origen.  
   d) En orden alfabético.

4. **¿Qué estructura de datos utiliza BFS para almacenar vértices pendientes de visitar?**

   a) Pila.  
   b) Cola.  
   c) Árbol.  
   d) Vector.

5. **En un recorrido DFS, al llegar a un vértice sin vecinos no visitados se procede a:**

   a) Volver al vértice de origen y terminar.  
   b) Seguir a un vecino cualquiera aunque esté visitado.  
   c) Retroceder al último vértice con vecinos sin visitar (backtracking).  
   d) Insertar un nuevo vértice.

6. **¿Cuál es la complejidad temporal de BFS y DFS en términos de vértices \(|V|\) y aristas \(|E|\)?**

   a) \(O(|V|)\).  
   b) \(O(|E|)\).  
   c) \(O(|V| + |E|)\).  
   d) \(O(|V| \times |E|)\).

7. **¿Qué recorrido se utiliza para detectar ciclos en un grafo dirigido?**

   a) Solo BFS.  
   b) Solo DFS.  
   c) Ambos, pero DFS es más común.  
   d) Ninguno.

8. **En un grafo no ponderado, BFS garantiza encontrar:**

   a) El camino más corto en número de aristas entre dos vértices.  
   b) El camino de menor coste en términos de peso.  
   c) El árbol generador mínimo.  
   d) Todos los ciclos.

9. **¿Cuál es la principal diferencia entre un grafo y un árbol?**

   a) Un grafo siempre tiene una raíz.  
   b) Un árbol puede contener ciclos, mientras que un grafo no.  
   c) Un árbol es un grafo conectado y acíclico, mientras que un grafo puede contener ciclos y no estar necesariamente conectado.  
   d) No hay diferencia; todo árbol es un grafo y viceversa.

10. **Cuando se recurre a DFS para recorrer un grafo, la estructura auxiliar recomendada es:**

   a) Una cola FIFO.  
   b) Un árbol binario.  
   c) Una pila o la pila de llamadas recursiva.  
   d) Ninguna; no necesita estructura auxiliar.

## Respuestas

1 – c  
2 – b  
3 – c  
4 – b  
5 – c  
6 – c  
7 – c  
8 – a  
9 – c  
10 – c
---
title: "Módulo 6 – Algoritmos de búsqueda"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "21 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 6 – Algoritmos de búsqueda

## Introducción

Los **algoritmos de búsqueda** permiten localizar un elemento dentro de una colección de datos.  
Son fundamentales en informática, pues la mayoría de los problemas reales implican consultar, acceder o recuperar información.  

En este módulo estudiaremos cinco enfoques principales:  

1. **Búsqueda lineal (secuencial)**  
2. **Búsqueda binaria**  
3. **Tablas hash**  
4. **Búsqueda en árboles binarios de búsqueda (BST)**  
5. **Búsqueda en grafos (BFS y DFS)**  

---

## 1. Búsqueda lineal (secuencial)

La búsqueda lineal recorre todos los elementos de la colección hasta encontrar el deseado.  

### Pseudocódigo

```text
función buscarLineal(lista, x):
    para i desde 1 hasta longitud(lista):
        si lista[i] = x entonces
            devolver i
    devolver -1   // no encontrado
````

* **Complejidad temporal**: $O(n)$
* **Ventaja**: funciona siempre, incluso con colecciones no ordenadas.
* **Desventaja**: ineficiente en colecciones grandes.

---

## 2. Búsqueda binaria

Requiere que la colección esté **ordenada**.
Divide el rango de búsqueda a la mitad en cada paso.

### Pseudocódigo

```text
función buscarBinaria(lista, x):
    bajo ← 1
    alto ← longitud(lista)
    mientras bajo ≤ alto:
        medio ← (bajo + alto) / 2
        si lista[medio] = x entonces devolver medio
        si lista[medio] < x entonces
            bajo ← medio + 1
        si no
            alto ← medio - 1
    devolver -1
```

* **Complejidad temporal**: $O(\log n)$
* **Ventaja**: muy rápida en listas ordenadas.
* **Desventaja**: no funciona en listas no ordenadas.

---

## 3. Tablas hash

Una **tabla hash** almacena pares clave–valor en un array, usando una **función hash** que asigna cada clave a una posición.

* **Búsqueda promedio**: $O(1)$
* **Peor caso** (muchas colisiones): $O(n)$

### Operaciones típicas

* **insertar(clave, valor)**: calcula el hash de la clave y almacena el valor en la posición correspondiente.
* **buscar(clave)**: calcula el hash y devuelve el valor asociado.
* **eliminar(clave)**: borra la entrada correspondiente.

⚡ Muy usadas en: diccionarios, bases de datos, compiladores.

---

## 4. Búsqueda en árboles binarios de búsqueda (BST)

En un **BST**, para cada nodo se cumple:

* Claves del subárbol izquierdo < clave del nodo.
* Claves del subárbol derecho > clave del nodo.

### Pseudocódigo de búsqueda

```text
función buscarBST(nodo, clave):
    si nodo = null entonces devolver null
    si clave = nodo.clave entonces devolver nodo
    si clave < nodo.clave entonces
        devolver buscarBST(nodo.izquierdo, clave)
    si no
        devolver buscarBST(nodo.derecho, clave)
```

* **Complejidad**:

  * Árbol balanceado: $O(\log n)$
  * Árbol degenerado: $O(n)$

---

## 5. Búsqueda en grafos (BFS y DFS)

En estructuras de red, la búsqueda se realiza recorriendo vértices y aristas.

### 5.1 BFS (Breadth-First Search)

* Recorre el grafo por **niveles**.
* Usa una **cola (FIFO)**.
* Encuentra caminos más cortos en grafos no ponderados.

### 5.2 DFS (Depth-First Search)

* Explora lo más profundo posible antes de retroceder.
* Usa una **pila (LIFO)** o recursión.
* Útil para exploración exhaustiva y detección de ciclos.

Ambos tienen complejidad: $O(|V|+|E|)$ donde $|V|$ = vértices y $|E|$ = aristas.

---

## 6. Comparación de algoritmos de búsqueda

| Algoritmo   | Datos ordenados      | Complejidad                  | Ventajas                      | Desventajas                         | 
| ----------- | -------------------- | ---------------------------- | ----------------------------- | ----------------------------------- | 
| **Lineal**  | No                   | $O(n)$                     | Simple, universal             | Lento en colecciones grandes        |
| **Binaria** | Sí                   | $O(\log n)$                | Muy rápida                    | Requiere orden                      |  
| **Hash**    | No                   | $O(1)$ promedio            | Extremadamente rápida         | Depende de función hash, colisiones |  
| **BST**     | Sí (orden implícito) | $O(\log n)$ en balanceados | Inserción y borrado dinámicos | Puede degradarse a $O(n)$         |  
| **BFS/DFS** | No necesario         | $O( V + E )$                | Exploran redes y caminos      | Más complejos conceptualmente       |

---

## 7. Aplicaciones

* **Lineal**: búsqueda en pequeños arrays o listas cortas.
* **Binaria**: diccionarios, búsqueda en bases de datos ordenadas.
* **Hash**: tablas de símbolos en compiladores, índices en bases de datos.
* **BST**: diccionarios dinámicos, sistemas de ficheros.
* **BFS/DFS**: rutas en mapas, redes sociales, análisis de grafos biológicos.

---

## 8. Conclusiones

* La elección del algoritmo depende de la **estructura de datos** y del **problema**.
* Lineal es universal pero lenta.
* Binaria aprovecha el orden para lograr $O(\log n)$.
* Hash es rapidísima, ideal para búsquedas directas.
* BST permite colecciones dinámicas ordenadas.
* BFS y DFS extienden la búsqueda a redes y grafos complejos.

---

## 9. Ejercicios de autoevaluación

1. ¿Cuál es la complejidad promedio y peor caso de una búsqueda en tabla hash?
2. ¿Por qué no se puede usar búsqueda binaria en una lista no ordenada?
3. Inserta los valores 10, 20, 5, 15 en un BST y muestra cómo buscarías el valor 15.
4. Aplica BFS en un grafo con vértices A–B–C–D y aristas {A–B, A–C, B–D}. ¿En qué orden se visitan los vértices desde A?
5. Explica en qué contextos preferirías un BST frente a una tabla hash.
6. Diseña un caso práctico donde BFS sea más útil que DFS.

---

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Weiss, M. A. *Data Structures and Algorithm Analysis*. Pearson.
* Sedgewick, R., & Wayne, K. *Algorithms*. Addison-Wesley.
* Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. *Data Structures and Algorithms in Java*. Wiley.


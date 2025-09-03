---
title: "Módulo 4 – Árboles y árboles binarios de búsqueda"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "21 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 4 – Árboles: Estructurando la Jerarquía

## 0. Motivación: De lo Lineal a lo Jerárquico 🌳

En los módulos anteriores, exploramos estructuras de datos **lineales** como listas, pilas y colas. Son como perlas en un hilo: cada elemento tiene un "siguiente" y, a veces, un "anterior". Este modelo es perfecto para secuencias, pero el mundo real rara vez es tan simple.

Pensemos en:

  * Un **organigrama de empresa**: un director tiene varios gerentes a su cargo, y cada gerente tiene sus propios equipos.
  * Un **sistema de archivos**: una carpeta contiene otras carpetas y archivos.
  * La **taxonomía biológica**: Reino, Filo, Clase, Orden...

Intentar modelar estas relaciones con una lista sería torpe y antinatural. Perderíamos la información esencial de la **jerarquía**. Aquí es donde los **árboles** entran en juego. No son solo una estructura de datos más, sino un salto conceptual que nos permite representar la **profundidad, la anidación y las relaciones padre-hijo** que definen los sistemas complejos.

Los árboles nos ofrecen un lenguaje para organizar la información de una manera que refleja su estructura inherente, permitiendo operaciones increíblemente eficientes que serían imposibles en un modelo lineal.

-----

## 1. Conceptos Fundamentales de los Árboles

Un **árbol** es una colección de **nodos** conectados por **aristas** de forma jerárquica. A diferencia de los grafos (que veremos más adelante), un árbol no puede contener ciclos y siempre hay un único camino entre dos nodos cualesquiera.

### Anatomía de un Árbol

Para hablar de árboles, necesitamos un vocabulario común.

  * **Raíz (Root)**: El nodo origen de todo, el único que no tiene padre. Es el ancestro común de todos los demás nodos.
  * **Nodo (Node)**: Cada uno de los elementos del árbol. Contiene un dato y punteros a sus hijos.
  * **Arista (Edge)**: La conexión entre un nodo padre y un nodo hijo.
  * **Hijo (Child)**: Un nodo que desciende directamente de otro.
  * **Padre (Parent)**: El nodo del que desciende directamente otro.
  * **Hoja (Leaf)**: Un nodo que no tiene hijos. Son los "finales" del árbol.
  * **Nodo Interno**: Cualquier nodo que no es ni raíz ni hoja (aunque a veces se incluye la raíz si tiene hijos).
  * **Profundidad (Depth)**: La longitud del camino (número de aristas) desde la raíz hasta un nodo específico. La profundidad de la raíz es 0.
  * **Altura (Height)**: La longitud del camino más largo desde un nodo hasta su hoja más lejana. La **altura del árbol** es la altura de su nodo raíz.
  * **Subárbol (Subtree)**: Un nodo y todos sus descendientes forman un subárbol, que es un árbol válido en sí mismo.

-----

## 2. El Árbol Binario: Una Simplificación Poderosa

Aunque un nodo en un árbol general puede tener cualquier número de hijos, una de las variantes más estudiadas y utilizadas es el **árbol binario**, donde cada nodo tiene, como máximo, **dos hijos**: un hijo izquierdo y un hijo derecho.

Esta restricción no es una limitación, sino una especialización que simplifica enormemente los algoritmos y permite estructuras de datos muy eficientes.

### 2.1 Tipos de Árboles Binarios

No todos los árboles binarios son iguales. Su forma (o *topología*) tiene un gran impacto en su eficiencia.

  * **Árbol Binario Lleno**: Cada nodo tiene 0 o 2 hijos. No hay nodos con un solo hijo.
  * **Árbol Binario Completo**: Todos los niveles están completamente llenos, excepto posiblemente el último, que se llena de izquierda a derecha. Esta estructura es ideal para ser almacenada en un array de forma compacta.
  * **Árbol Binario Perfecto**: Un árbol lleno donde todas las hojas están en el mismo nivel. Representa la máxima "densidad" de nodos para una altura dada. Un árbol perfecto de altura $h$ tiene exactamente $2^{h+1} - 1$ nodos.
  * **Árbol Degenerado o Sesgado**: Cada nodo padre tiene un solo hijo. Se comporta exactamente como una **lista enlazada**, perdiendo todas las ventajas de un árbol. Es el peor caso para un árbol de búsqueda.

### 2.2 El Propósito de los Recorridos 🧭

Recorrer un árbol significa visitar cada uno de sus nodos en un orden específico. Este orden no es arbitrario; cada tipo de recorrido tiene un propósito fundamental. Dado este árbol de ejemplo:

```
      A
     / \
    B   C
   / \   \
  D   E   F
```

1.  **Preorden (Raíz -> Izquierda -> Derecha)**: `A, B, D, E, C, F`

      * **Propósito**: Se usa para **copiar o serializar un árbol**. Al procesar la raíz primero, podemos recrear la estructura de forma unívoca. También se utiliza en árboles de expresión para obtener la notación prefija (Notación Polaca).

2.  **Inorden (Izquierda -> Raíz -> Derecha)**: `D, B, E, A, C, F`

      * **Propósito**: Es la joya de la corona en los **Árboles Binarios de Búsqueda (BST)**. Un recorrido inorden de un BST siempre devuelve sus elementos **en orden ascendente**. Es la forma más natural de "aplanar" un BST en una secuencia ordenada.

3.  **Postorden (Izquierda -> Derecha -> Raíz)**: `D, E, B, F, C, A`

      * **Propósito**: Su uso principal es para **eliminar un árbol de la memoria**. Se asegura de que los hijos de un nodo sean eliminados antes que el propio nodo, evitando dejar punteros huérfanos. También se usa para evaluar árboles de expresión (notación postfija o RPN).

-----

## 3. Árboles Binarios de Búsqueda (BST)

Un BST impone una regla fundamental sobre un árbol binario: la **propiedad de orden del BST**.

> Para cualquier nodo `N`:
>
>   * Todos los valores en el subárbol izquierdo de `N` deben ser **menores** que el valor de `N`.
>   * Todos los valores en el subárbol derecho de `N` deben ser **mayores** que el valor de `N`.

### 3.1 La Gran Idea: Dividir para Conquistar

Esta simple regla es la que le da al BST su poder. Cada vez que comparamos una clave con un nodo, podemos **descartar la mitad del árbol restante**. Si la clave que buscamos es menor que el nodo actual, sabemos con certeza que *no* puede estar en el subárbol derecho, y viceversa.

Este es el mismo principio de la **búsqueda binaria** en un array ordenado, pero aplicado a una estructura de datos dinámica que permite inserciones y eliminaciones eficientes. Mientras el árbol esté razonablemente **balanceado**, las operaciones principales (búsqueda, inserción, eliminación) tienen una complejidad temporal de $O(\log n)$.

### 3.2 Operaciones Detalladas

#### Inserción y Búsqueda

Las operaciones de búsqueda e inserción son recursivas y elegantes. Se desciende por el árbol, tomando una decisión en cada nivel (ir a la izquierda o a la derecha) hasta que se encuentra el elemento o se llega a un punto nulo (`null`), donde se insertaría el nuevo nodo.

#### Análisis Detallado de la Eliminación

La eliminación es la operación más compleja porque debemos preservar la propiedad del BST después de quitar un nodo.

1.  **Caso 1: El nodo a eliminar es una hoja**.

      * **Solución**: Es el caso más simple. Simplemente se elimina el nodo y se actualiza el puntero del padre a `null`.

2.  **Caso 2: El nodo a eliminar tiene un solo hijo**.

      * **Solución**: Se "salta" el nodo. El padre del nodo eliminado pasa a apuntar directamente al único hijo de este.

3.  **Caso 3: El nodo a eliminar tiene dos hijos**.

      * **El Problema**: No podemos simplemente eliminarlo, ya que dejaríamos dos subárboles "huérfanos".
      * **La Solución Elegante**:
        a.  No eliminamos el nodo físicamente. En su lugar, buscamos un sustituto que mantenga la propiedad del BST.
        b.  Este sustituto puede ser:
        * El **sucesor inorden**: El nodo más pequeño en el subárbol derecho.
        * O el **predecesor inorden**: El nodo más grande en el subárbol izquierdo.
        c.  Copiamos el valor del sucesor (o predecesor) al nodo que queremos "eliminar".
        d.  Ahora, el problema se reduce a eliminar el nodo sucesor (o predecesor) de su ubicación original, lo cual es garantizado que será un caso más simple (Caso 1 o Caso 2).

-----

## 4. El Talón de Aquiles de los BST: El Desequilibrio

La magia de $O(\log n)$ solo funciona si la altura del árbol ($h$) es cercana a $\log n$. ¿Qué pasa si insertamos elementos ya ordenados (ej. 10, 20, 30, 40, 50) en un BST?

El resultado es un **árbol degenerado**: una larga cadena de hijos derechos. La altura del árbol se convierte en $n$, y la búsqueda se degrada a una búsqueda lineal con complejidad $O(n)$, perdiendo toda su ventaja.

### 4.1 La Solución: Árboles Autobalanceados

Para resolver este problema, se inventaron los árboles binarios de búsqueda **autobalanceados**. Estas estructuras de datos detectan cuándo una inserción o eliminación desequilibra el árbol y realizan automáticamente operaciones de "reparación" para restaurar el equilibrio.

  * **Árboles AVL**: Son los "perfeccionistas". Se aseguran de que para cada nodo, la diferencia de altura entre su subárbol izquierdo y derecho sea como máximo 1. Lo logran mediante **rotaciones**. Son más rápidos en búsqueda (porque están muy equilibrados) pero más lentos en inserción/eliminación (porque necesitan rebalancear más a menudo).
  * **Árboles Rojo-Negro**: Son los "pragmáticos". Relajan un poco las reglas de equilibrio usando propiedades de color (cada nodo es rojo o negro). Garantizan que el camino más largo de la raíz a una hoja no sea más del doble de largo que el camino más corto. Esto asegura una altura de $O(\log n)$. Son los más utilizados en la práctica (ej. en `std::map` de C++ y `TreeMap` de Java) porque ofrecen un excelente compromiso entre rendimiento de búsqueda y de modificación.

-----

## 5. Caso de Estudio: Árboles de Expresión Aritmética

Una aplicación clásica de los árboles binarios es la representación de expresiones matemáticas.

La expresión `(5 + 3) * (12 - 4)` puede ser representada por el siguiente árbol:

```
      *
     / \
    +   -
   / \ / \
  5  3 12 4
```

  * Los **nodos internos** son operadores (`*`, `+`, `-`).
  * Las **hojas** son los operandos (los números).

¿Qué ocurre si recorremos este árbol?

  * **Recorrido Preorden**: `* + 5 3 - 12 4` (Notación Prefija).
  * **Recorrido Inorden**: `5 + 3 * 12 - 4` (Notación Infija - necesita paréntesis para ser correcta).
  * **Recorrido Postorden**: `5 3 + 12 4 - *` (Notación Postfija o RPN).

Para **evaluar la expresión**, ¡simplemente realizamos un recorrido postorden! Cuando visitamos un nodo operador, aplicamos la operación a los resultados de haber visitado sus hijos izquierdo y derecho.

-----

## 6. Más Allá de los Binarios: Un Vistazo al Ecosistema de Árboles

Aunque los BST son fundamentales, no son el final del camino. Dependiendo del problema, se usan otras variantes:

  * **Árboles B / B+**: Son árboles de búsqueda no binarios (un nodo puede tener muchos hijos). Son la base de datos de los **índices de las bases de datos** y los **sistemas de archivos**. Minimizan las lecturas de disco al ser anchos y poco profundos.
  * **Tries (Árboles de Prefijos)**: Estructuras especializadas para almacenar y buscar cadenas de texto. Son la base de las funciones de **autocompletado** de los buscadores y editores de texto.
  * **Heaps (Montículos)**: Son árboles binarios con una propiedad de orden diferente (el padre siempre es mayor/menor que sus hijos), usados para implementar **colas de prioridad**.

-----

## 7. Ejercicios Ampliados

#### Ejercicios Teóricos y de Diseño

1.  Dibuja el BST resultante de insertar los números `50, 25, 75, 10, 30, 60, 80, 5, 15, 65, 85`. ¿Cuál es la altura del árbol?
2.  Sobre el árbol anterior, muestra los pasos para eliminar el nodo `25`. Luego, muestra los pasos para eliminar el nodo `50`.
3.  ¿Por qué un recorrido inorden en un BST produce una secuencia ordenada? Explica cómo la propiedad del BST lo garantiza.
4.  Describe una situación en la que un árbol Rojo-Negro sería preferible a un árbol AVL, y viceversa.
5.  Implementa en pseudocódigo la función `findMin()` y `findMax()` en un BST de forma iterativa y recursiva.

#### Ejercicios Prácticos de Programación

6.  Escribe una función que determine si un árbol binario dado es un BST válido.
7.  Implementa una función que convierta un array ordenado en un BST perfectamente balanceado.
8.  Escribe un programa que construya un árbol de expresión a partir de una cadena en notación postfija y luego lo evalúe.

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Weiss, M. A. *Data Structures and Algorithm Analysis*. Pearson.
* Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. *Data Structures and Algorithms in Java*. Wiley.
* Sedgewick, R., & Wayne, K. *Algorithms*. Addison-Wesley.
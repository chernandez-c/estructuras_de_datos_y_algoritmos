---
title: "Módulo 3 – Pilas y colas"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "21 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 3 – Pilas y colas

## Introducción

Las **pilas** y **colas** son estructuras de datos lineales que imponen restricciones sobre el acceso a sus elementos.  
Se definen más por las **operaciones permitidas** que por su implementación interna.  
Pueden construirse sobre vectores o listas enlazadas.  

Este módulo presenta su funcionamiento, operaciones básicas, implementaciones típicas y aplicaciones reales.

---

## 1. Pilas (stacks)

Una **pila** es una estructura de tipo **LIFO** (*Last In, First Out*).  
El último elemento en entrar es el primero en salir.  

### 1.1 Operaciones principales

* **`apilar` (push)**: coloca un elemento en la cima de la pila.  
* **`desapilar` (pop)**: elimina y devuelve el elemento superior.  
* **`consultar` (peek)**: devuelve el elemento superior sin retirarlo.  
* **`vacía`**: comprueba si no hay elementos.  
* **`tamaño`**: devuelve el número de elementos.  

#### Pseudocódigo de operaciones básicas

```text
procedimiento apilar(PILA P, DATO x):
    P.tope ← P.tope + 1
    P.elementos[P.tope] ← x

DATO desapilar(PILA P):
    si P.tope = 0 entonces error "Pila vacía"
    x ← P.elementos[P.tope]
    P.tope ← P.tope - 1
    devolver x
```

### 1.2 Implementación mediante vector

* Se utiliza un array y un puntero `tope`.
* Operaciones $O(1)$.
* Requiere tamaño máximo fijo o redimensionamiento dinámico.

### 1.3 Implementación mediante lista enlazada

* Inserción y eliminación en la cabeza de la lista.
* Crecimiento dinámico.
* Operaciones $O(1)$.

### 1.4 Aplicaciones de las pilas

* **Gestión de llamadas y recursión**: pila de activación en compiladores.
* **Evaluación de expresiones**: conversión infija ↔ postfija (notación polaca inversa).
* **Deshacer/rehacer**: editores de texto, navegadores.

![Representación de una pila](../images/stack.png){ width=50% }

*Figura 5: estructura LIFO.*

---

## 2. Colas (queues)

Una **cola** es una estructura de tipo **FIFO** (*First In, First Out*).
El primer elemento en entrar es el primero en salir.

### 2.1 Operaciones principales

* **`encolar` (enqueue)**: inserta un elemento en el extremo trasero.
* **`desencolar` (dequeue)**: elimina y devuelve el elemento del extremo delantero.
* **`frente` (peek)**: consulta el primer elemento.
* **`vacía`**: comprueba si la cola está vacía.

#### Pseudocódigo de operaciones básicas

```text
procedimiento encolar(COLA Q, DATO x):
    Q.trasero ← Q.trasero + 1
    Q.elementos[Q.trasero] ← x

DATO desencolar(COLA Q):
    si Q.frente > Q.trasero entonces error "Cola vacía"
    x ← Q.elementos[Q.frente]
    Q.frente ← Q.frente + 1
    devolver x
```

### 2.2 Implementación mediante vector

* Se usan dos índices: `frente` y `trasero`.
* Problema: cuando `trasero` llega al final, hay espacio libre al inicio.
* Solución: **cola circular**, índices calculados módulo $n$.

### 2.3 Implementación mediante lista enlazada

* Se mantienen punteros a primer y último nodo.
* Operaciones $O(1)$ tanto en encolar como desencolar.
* Crecimiento dinámico.

### 2.4 Variantes de colas

* **Cola circular**: buffer reutilizable, común en sistemas embebidos.
* **Cola doble (deque)**: inserción y eliminación en ambos extremos.
* **Cola de prioridad**: los elementos salen según prioridad; suele usarse un heap.

### 2.5 Aplicaciones de las colas

* **Planificación de procesos**: sistemas operativos.
* **Transmisión de datos**: colas de paquetes en routers.
* **Simulación de eventos**: modelos de líneas de espera.

![Representación de una cola](../images/queue.png){ width=70% }

*Figura 6: estructura FIFO.*

---

## 3. Comparación de pilas y colas

| Estructura | Principio                                  | Operaciones principales            | Complejidad | Uso típico                               |
| ---------- | ------------------------------------------ | ---------------------------------- | ----------- | ---------------------------------------- |
| **Pila**   | LIFO (último en entrar, primero en salir)  | `apilar`, `desapilar`, `consultar` | $O(1)$    | Recursión, expresiones, deshacer/rehacer |
| **Cola**   | FIFO (primero en entrar, primero en salir) | `encolar`, `desencolar`, `frente`  | $O(1)$    | Procesos, comunicaciones, simulaciones   |

---

## 4. Casos de uso en bioinformática y computación

* **Pilas**: seguimiento de llamadas recursivas en algoritmos de alineamiento de secuencias.
* **Colas**: gestión de tareas en pipelines de análisis genómico o procesamiento de datos masivos.

---

## 5. Conclusiones

Las pilas y colas son estructuras sencillas pero fundamentales.
Su poder reside en las **restricciones de acceso** que imponen, lo que las hace ideales para gestionar flujo de información en orden controlado.

Son la base para estructuras más avanzadas: **colas de prioridad, deques, heaps y grafos**.

---

## 6. Ejercicios de autoevaluación

1. ¿Cuál es la diferencia entre una pila y una cola en cuanto al orden de acceso?
2. Implementa en pseudocódigo una pila basada en lista enlazada.
3. Explica cómo funciona una cola circular y por qué mejora el uso de memoria respecto a una cola simple con vector.
4. Diseña un algoritmo que evalúe una expresión en notación postfija utilizando una pila.
5. ¿En qué casos sería preferible implementar una cola con lista enlazada en lugar de con un vector?
6. Analiza qué estructura usarías para:
   a) un editor de texto con opción de deshacer,
   b) un sistema de tickets en un banco.

---

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. *Data Structures and Algorithms in Python*. Wiley.
* Weiss, M. A. *Data Structures and Algorithm Analysis*. Pearson.
* Sedgewick, R., & Wayne, K. *Algorithms*. Addison-Wesley.
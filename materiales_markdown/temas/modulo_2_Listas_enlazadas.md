---
title: "Módulo 2 – Listas enlazadas"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "21 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 2 – Listas enlazadas

## Introducción

El vector estudiado en el módulo anterior es una estructura simple y eficiente para acceder aleatoriamente a elementos mediante índices.  
Sin embargo, presenta una desventaja importante: su tamaño es **estático** y no puede adaptarse a cambios dinámicos en la cantidad de datos.  

Para superar esta limitación se utilizan **listas enlazadas**, estructuras dinámicas en las que cada elemento (o *nodo*) contiene información y referencias a otros nodos.  
Una lista enlazada permite **insertar y eliminar elementos en cualquier posición sin necesidad de desplazar el resto de elementos**, lo que reduce el coste de estas operaciones respecto a un vector.

---

## 1. Estructura de una lista enlazada simple

Una **lista enlazada simple** está formada por nodos.  
Cada nodo contiene dos campos:  
- un **campo de datos**, que almacena la información,  
- un **campo de enlace**, que almacena la dirección del siguiente nodo.  

El primer nodo de la lista se denomina **cabeza** (*head*), y el campo de enlace del último nodo es nulo (`null`).

![Lista enlazada simple](../images/linked_list.png){ width=80% }

*Figura 2: lista enlazada simple de cinco nodos.*

### 1.1 Operaciones básicas

* **Inserción al inicio**: coste $O(1)$, no requiere recorrer la lista.  
* **Inserción al final**: coste $O(n)$, hay que recorrer hasta el último nodo.  
* **Inserción intermedia**: coste $O(n)$ en general, pues requiere recorrer hasta la posición deseada.  
* **Eliminación**: depende de si es la cabeza ($O(1)$) o intermedia ($O(n)$ porque hay que conocer el predecesor).  
* **Búsqueda**: siempre $O(n)$, recorrido secuencial.

#### Pseudocódigo de inserción al inicio

```text
NODO insertarInicio(LISTA L, DATO x):
    nuevo ← crearNodo(x)
    nuevo.siguiente ← L.cabeza
    L.cabeza ← nuevo
```

#### Pseudocódigo de búsqueda lineal

```text
NODO buscar(LISTA L, DATO x):
    actual ← L.cabeza
    mientras actual ≠ null hacer
        si actual.dato = x entonces
            devolver actual
        actual ← actual.siguiente
    devolver null
```

---

## 2. Listas doblemente enlazadas

Las **listas doblemente enlazadas** extienden la lista simple añadiendo un segundo enlace que apunta al nodo anterior.
Cada nodo contiene tres campos: datos, enlace al siguiente y enlace al anterior.

Este diseño facilita:

* El recorrido en ambos sentidos.
* La eliminación de un nodo sin necesidad de conocer el predecesor explícitamente.

![Lista doblemente enlazada](../images/doubly_linked_list.png){ width=80% }

*Figura 3: lista doblemente enlazada.*

⚡ Inconveniente: requieren más memoria por nodo (un puntero adicional).

---

## 3. Listas circulares

En una **lista circular** el enlace del último nodo apunta de nuevo al primer nodo, de modo que **no existe un nodo con enlace nulo**.

* La cabeza puede ser cualquier nodo.
* Suele mantenerse un puntero al último nodo para facilitar las inserciones al inicio y al final.

![Lista circular](../images/circular_linked_list.png){ width=65% }

*Figura 4: lista enlazada circular.*

**Aplicaciones típicas**:

* Planificadores de sistemas operativos (round-robin).
* Listas de reproducción de música.
* Juegos en los que los turnos son cíclicos.

También existen variantes **doblemente circulares**: permiten avanzar y retroceder indefinidamente.

---

## 4. Comparación con arrays

| Característica              | Lista enlazada                                           | Vector (array)                          |
| --------------------------- | -------------------------------------------------------- | --------------------------------------- |
| **Crecimiento**             | Dinámico, tamaño ajustable en tiempo de ejecución.       | Estático, tamaño fijo.                  |
| **Acceso aleatorio**        | No, recorrido secuencial $O(n)$.                       | Sí, acceso $O(1)$ mediante índices.   |
| **Inserción/eliminación**   | $O(1)$ si se conoce el nodo; $O(n)$ en el peor caso. | $O(n)$ (desplazamiento de elementos). |
| **Uso de memoria**          | Requiere punteros adicionales.                           | Memoria contigua, más compacta.         |
| **Localidad de referencia** | Baja: nodos dispersos en memoria.                        | Alta: acceso más eficiente en caché.    |

**Conclusión**:

* Listas enlazadas son preferibles si hay muchas inserciones/eliminaciones.
* Arrays son preferibles si se requiere acceso aleatorio frecuente y mejor aprovechamiento de memoria caché.

---

## 5. Casos de uso en bioinformática y computación

* **Gestión dinámica de secuencias de ADN** cuando se insertan o eliminan bases frecuentemente.
* **Representación de colas de procesos** en un sistema operativo.
* **Simulación de estructuras moleculares dinámicas**, donde los elementos se crean y destruyen constantemente.

---

## 6. Conclusiones

Las listas enlazadas son estructuras dinámicas que resuelven las limitaciones de tamaño fijo de los vectores.
La posibilidad de insertar y eliminar nodos sin desplazar el resto de elementos las hace muy flexibles.

Existen variantes como:

* **Listas doblemente enlazadas**, que permiten recorrer en ambas direcciones.
* **Listas circulares**, que eliminan el concepto de "fin" y son útiles en procesos cíclicos.

👉 En el siguiente módulo se estudiarán **pilas** y **colas**, dos tipos de listas restringidas en los que el acceso se realiza solo por los extremos.

---

## 7. Ejercicios de autoevaluación

1. ¿Cuál es el coste temporal de acceder al elemento $i$ en una lista enlazada simple?
2. Explica por qué una lista doblemente enlazada facilita la eliminación de un nodo conocido.
3. Implementa en pseudocódigo la inserción al final de una lista enlazada simple. ¿Cuál es su complejidad?
4. Diseña un ejemplo donde una lista circular sea más eficiente que un array.
5. ¿Por qué las listas enlazadas tienen peor aprovechamiento de la caché de procesador que los arrays?
6. Analiza qué estructura usarías en un sistema que necesita almacenar y procesar continuamente colas de trabajos entrantes.

---

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. *Data Structures and Algorithms in Python*. Wiley.
* Weiss, M. A. *Data Structures and Algorithm Analysis*. Pearson.
* Sedgewick, R. & Wayne, K. *Algorithms*. Addison-Wesley.

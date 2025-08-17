---
title: "Módulo 2 – Listas enlazadas"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 2 – Listas enlazadas

## Introducción

El vector estudiado en el módulo anterior es una estructura simple y eficiente para acceder aleatoriamente a elementos mediante índices.  Sin embargo, presenta una desventaja importante: su tamaño es estático y no puede adaptarse a cambios dinámicos en la cantidad de datos.  Para superar esta limitación se utilizan **listas enlazadas**, estructuras dinámicas en las que cada elemento (o *nodo*) contiene información y referencias a otros nodos.  Una lista enlazada permite insertar y eliminar elementos en cualquier posición sin necesidad de desplazar el resto de elementos, lo que reduce el coste de estas operaciones respecto a un vector.【518458188332822†L192-L207】

## 1. Estructura de una lista enlazada simple

Una **lista enlazada simple** está formada por nodos.  Cada nodo contiene dos campos: un campo de datos, que almacena la información, y un campo de enlace, que almacena la dirección del siguiente nodo.  El primer nodo de la lista se denomina *cabeza* y el campo de enlace del último nodo es nulo (apunta a `null`).

La figura 2 muestra una lista enlazada simple con cinco nodos.  Cada nodo almacena un valor y un puntero al siguiente nodo.  El último puntero contiene una señal de fin (representada como una cruz roja).

![Lista enlazada simple](../images/linked_list.png){ width=85% }

*Figura 2: lista enlazada simple.*

### Operaciones básicas

Las operaciones fundamentales de una lista enlazada son:

* **Inserción al inicio**: se crea un nuevo nodo y se actualiza su enlace para apuntar al nodo que era cabeza.  El nuevo nodo se convierte en la nueva cabeza.  Esta operación tiene coste \(O(1)\).
* **Inserción al final**: se recorre la lista hasta llegar al último nodo y se actualiza su enlace para apuntar al nuevo nodo.  El coste es \(O(n)\) porque hay que recorrer la lista completa.
* **Inserción en posición intermedia**: se recorre la lista hasta el nodo previo a la posición de inserción y se actualizan los enlaces para incluir el nuevo nodo.
* **Eliminación**: para eliminar un nodo es necesario actualizar el enlace del nodo anterior para que apunte al siguiente.  La eliminación en la cabeza es sencilla; en posiciones intermedias requiere conocer el predecesor.
* **Búsqueda**: se recorre la lista secuencialmente comparando cada elemento con el valor buscado; el coste es \(O(n)\).

#### Pseudocódigo de inserción al inicio

```text
NODO insertarInicio(LISTA L, DATO x):
    nuevo ← crearNodo(x)
    nuevo.siguiente ← L.cabeza
    L.cabeza ← nuevo
```

La simplicidad del pseudocódigo refleja la ventaja de la inserción al principio: no es necesario recorrer la lista.【518458188332822†L192-L207】

## 2. Listas doblemente enlazadas

Las **listas doblemente enlazadas** extienden la lista simple añadiendo un segundo enlace que apunta al nodo anterior.  Cada nodo contiene tres campos: datos, enlace al siguiente y enlace al anterior.  Este diseño facilita el recorrido en ambos sentidos y simplifica la eliminación de un nodo sin necesidad de conocer su predecesor.  La figura 3 ilustra una lista doblemente enlazada de cinco nodos.

![Lista doblemente enlazada](../images/doubly_linked_list.png){ width=85% }

*Figura 3: lista doblemente enlazada.*

Las operaciones de inserción y eliminación son similares a las de la lista simple, pero deben actualizarse ambos enlaces.

## 3. Listas circulares

En una **lista circular** el enlace del último nodo apunta de nuevo al primer nodo, de modo que no existe un nodo con enlace nulo.  La cabeza puede ser cualquier nodo; suele mantenerse un puntero al último nodo para facilitar las inserciones al inicio y al final.  La figura 4 muestra un ejemplo de lista enlazada circular con cinco nodos.

![Lista circular](../images/circular_linked_list.png){ width=60% }

*Figura 4: lista enlazada circular.*

Las listas circulares se utilizan cuando se desea recorrer repetidamente la lista sin volver al inicio de forma explícita (por ejemplo, en aplicaciones de rondas o listas de reproducción de música).  También pueden implementarse como listas doblemente circulares, permitiendo avanzar y retroceder indefinidamente.

## 4. Comparación con arrays

| Característica | Lista enlazada | Vector (array) |
|---------------|----------------|---------------|
| **Crecimiento** | Dinámico, se ajusta en tiempo de ejecución. | Estático, tamaño fijo【472939831318413†L22-L36】. |
| **Acceso aleatorio** | No admite acceso aleatorio; se recorre secuencialmente. | Acceso en tiempo constante mediante índices. |
| **Inserción/eliminación** | \(O(1)\) si se conoce el nodo anterior; \(O(n)\) en el peor de los casos. | Requiere mover elementos; \(O(n)\) en el peor de los casos. |
| **Uso de memoria** | Requiere espacio adicional para punteros. | Uso contiguo de memoria, sin punteros. |

Las listas enlazadas son preferibles cuando se realizan muchas operaciones de inserción o eliminación; los arrays son más eficientes para accesos aleatorios y ocupan menos memoria.

## 5. Conclusiones

Las listas enlazadas son estructuras dinámicas que resuelven las limitaciones de tamaño fijo de los vectores.  La posibilidad de insertar y eliminar nodos sin desplazar el resto de elementos las hace apropiadas para aplicaciones en las que la cantidad de datos varía con frecuencia.  Existen variantes como las listas doblemente enlazadas y las listas circulares, cada una con ventajas específicas.  En el siguiente módulo se estudiarán las **pilas** y **colas**, dos tipos de listas restringidas en las que el acceso a los elementos se realiza solo por los extremos.

## Referencias

1.  Ventajas de las listas enlazadas y comparación con vectores【518458188332822†L192-L207】.
2.  Propiedades de los arrays estáticos y su tamaño fijo【472939831318413†L22-L36】.
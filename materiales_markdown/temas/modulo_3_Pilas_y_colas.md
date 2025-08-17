---
title: "Módulo 3 – Pilas y colas"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 3 – Pilas y colas

## Introducción

Las **pilas** y **colas** son estructuras de datos lineales que imponen restricciones sobre el acceso a sus elementos.  Pueden implementarse mediante vectores o listas enlazadas, pero se definen por el conjunto de operaciones que permiten más que por su representación interna.  Este módulo presenta el funcionamiento de estas estructuras, sus operaciones básicas y algunas aplicaciones.

## 1. Pilas (stacks)

Una **pila** es una estructura de tipo LIFO (*Last In, First Out*).  Esto significa que el último elemento en entrar es el primero en salir.  Solo se puede acceder al elemento situado en la parte superior de la pila.  Las dos operaciones principales son:

* **`apilar` (push)**: coloca un elemento en la cima de la pila.
* **`desapilar` (pop)**: elimina y devuelve el elemento situado en la cima de la pila【735453531594789†L198-L206】.

Otras operaciones útiles son:

* **`crear`**: inicializa una pila vacía.
* **`tamaño`**: devuelve el número de elementos almacenados.
* **`consultar` o `peek`**: devuelve el elemento superior sin retirarlo.
* **`vacía`**: comprueba si la pila está vacía【735453531594789†L254-L272】.

### Implementación mediante vector

Una pila puede implementarse con un vector y una variable que indique la posición del elemento superior.  Al apilar, se incrementa este indicador y se almacena el elemento.  Al desapilar, se devuelve el elemento y se decrementa el indicador.  El tamaño máximo debe fijarse al crear la pila o gestionarse mediante redimensionamiento dinámico.

### Implementación mediante lista enlazada

Al utilizar una lista enlazada, cada elemento se inserta o elimina al inicio de la lista.  Así, las operaciones de apilar y desapilar tienen coste \(O(1)\).  La ventaja de este enfoque es que la pila puede crecer dinámicamente sin necesidad de tamaño máximo.

### Aplicaciones de las pilas

* **Gestión de llamadas y recursión**: las llamadas a funciones se almacenan en una pila de activación.  Cuando se invoca una función, se apila la dirección de retorno; al finalizar, se desapila y se reanuda la ejecución.
* **Evaluación de expresiones**: las pilas se utilizan para convertir expresiones infijas a notación postfija (RPN) y evaluar expresiones aritméticas.
* **Deshacer operaciones**: muchas aplicaciones (editores de texto, navegadores) utilizan pilas para implementar la función “deshacer/rehacer” almacenando estados previos.

### Ilustración de una pila

La figura 5 muestra una pila con cinco elementos.  Los elementos se apilan desde la base hacia la cima; el puntero `Top` indica el elemento que se devolverá al desapilar.

![Representación de una pila](../images/stack.png){ width=50% }

*Figura 5: estructura LIFO.*

## 2. Colas (queues)

Una **cola** es una estructura de tipo FIFO (*First In, First Out*), donde el primer elemento en entrar es el primero en salir.  Se realizan operaciones en los extremos:

* **`encolar` (enqueue)**: inserta un elemento en el extremo trasero de la cola.
* **`desencolar` (dequeue)**: elimina y devuelve el elemento situado en el extremo delantero【54013116763302†L160-L170】.

Otras operaciones comunes son:

* **`crear`**: inicializa una cola vacía.
* **`frente` o `peek`**: devuelve el valor del primer elemento sin retirarlo.
* **`vacía`**: comprueba si no hay elementos en la cola【54013116763302†L209-L214】.

### Implementación mediante vector

Para implementar una cola con un vector se suelen utilizar dos índices: `frente` y `trasero`.  Cada vez que se encola un elemento, se incrementa el índice `trasero` y se coloca el elemento.  Al desencolar, se incrementa el índice `frente`.  Cuando alguno de los índices alcanza el final del vector, se puede reutilizar el espacio utilizando una **cola circular**, en la que los índices se calculan módulo el tamaño del vector.

### Implementación mediante lista enlazada

En este caso se mantiene un puntero al primer nodo y otro al último.  Para encolar, se crea un nodo y se añade al final actualizando el puntero `trasero`.  Para desencolar, se elimina el primer nodo y se actualiza `frente`.  Las operaciones tienen coste \(O(1)\) y la cola puede crecer y decrecer dinámicamente.

### Variantes de colas

* **Cola circular**: se utiliza un vector como buffer circular, en el que los índices se reciclan cuando alcanzan el final.  Permite aprovechar al máximo la memoria sin mover datos.
* **Cola de prioridad**: los elementos se extraen según su prioridad, no según el orden de llegada.  Suele implementarse con un **heap** (montículo), estudiado en módulos avanzados.

### Aplicaciones de las colas

* **Gestión de trabajos**: en los sistemas operativos, las tareas pendientes de ejecución se almacenan en colas de procesos.
* **Transmisión de datos**: en redes de comunicación, los paquetes se colocan en colas para ser enviados en orden de llegada.
* **Simulación de eventos**: muchas simulaciones basadas en eventos utilizan colas para programar la ocurrencia de sucesos en el tiempo.

### Ilustración de una cola

La figura 6 presenta una cola con cinco elementos.  El extremo izquierdo (`Front`) indica el primer elemento en salir; el extremo derecho (`Rear`) indica dónde se insertará el siguiente elemento.

![Representación de una cola](../images/queue.png){ width=70% }

*Figura 6: estructura FIFO.*

## 3. Comparación de pilas y colas

| Estructura | Principio | Operaciones principales | Uso típico |
|-----------|----------|------------------------|-----------|
| **Pila** | LIFO (último en entrar, primero en salir). | `apilar`, `desapilar`, `consultar`. | Evaluación de expresiones, recursión, deshacer/rehacer. |
| **Cola** | FIFO (primero en entrar, primero en salir). | `encolar`, `desencolar`, `frente`. | Planificación de procesos, comunicación entre sistemas. |

## 4. Conclusiones

Las pilas y colas son estructuras de datos sencillas pero esenciales que restringen el acceso a los elementos a uno o dos extremos.  Su utilidad deriva de esa restricción: las pilas permiten retroceder a estados previos y gestionar llamadas anidadas; las colas facilitan el procesamiento en orden de llegada y la sincronización en sistemas distribuidos.  En los siguientes módulos se abordarán estructuras más complejas como los **árboles** y los **grafos**.

## Referencias

1.  Definición de pila y operaciones `push` y `pop`【735453531594789†L198-L206】.
2.  Operaciones auxiliares de una pila (`crear`, `tamaño`, `vacía`, `consultar`)【735453531594789†L254-L272】.
3.  Definición de cola como estructura FIFO y operaciones `encolar` y `desencolar`【54013116763302†L160-L170】.
4.  Operaciones adicionales de una cola (`vacía`, `frente`)【54013116763302†L209-L214】.
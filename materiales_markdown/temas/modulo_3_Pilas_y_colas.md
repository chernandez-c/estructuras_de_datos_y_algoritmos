# Módulo 3 – Pilas y colas

---

## Introducción

Las **pilas** y **colas** son estructuras de datos lineales muy particulares porque, a diferencia de arrays o listas enlazadas, **no permiten acceder libremente a cualquier elemento en cualquier momento**.
En lugar de ello, **imponen una disciplina de acceso**: un orden específico en que los datos entran y salen.

* En las **pilas**: el último en entrar es el primero en salir (*Last In, First Out*, LIFO).
* En las **colas**: el primero en entrar es el primero en salir (*First In, First Out*, FIFO).

Esto puede parecer una restricción incómoda, pero en realidad es lo que les da su poder: al controlar el orden de acceso, estas estructuras simplifican enormemente el diseño de algoritmos y sistemas.

Ambas pueden implementarse sobre **vectores** o **listas enlazadas**, pero lo esencial es que se definen por **qué operaciones permiten** y no por cómo se implementan.

📜 **Anécdota histórica**: en los primeros lenguajes como Fortran o Lisp, las pilas fueron fundamentales para manejar las llamadas a funciones y la recursión. Sin pilas, muchos lenguajes de programación modernos serían inviables.

---

## 1. Pilas (stacks)

Una **pila** es como una pila de platos en la cocina: colocas un plato encima del otro, y cuando necesitas uno, tomas siempre el de arriba.

Este modelo **LIFO** es intuitivo y extremadamente útil.

---

### 1.1 Operaciones principales

* **`apilar` (push)**: coloca un elemento en la cima.
* **`desapilar` (pop)**: retira y devuelve el elemento superior.
* **`consultar` (peek/top)**: permite ver el elemento en la cima sin eliminarlo.
* **`vacía`**: indica si la pila está vacía.
* **`tamaño`**: devuelve el número de elementos.

#### Pseudocódigo básico

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

---

### 1.2 Implementaciones

**Con vector**:

* Se usa un array y un puntero `tope`.
* Operaciones en **O(1)**.
* Limitación: tamaño máximo fijo (a menos que usemos arrays dinámicos como en Java o Python).

**Con lista enlazada**:

* Se insertan y eliminan nodos al inicio.
* Crecimiento dinámico.
* Operaciones también en **O(1)**.

👉 Filosofía: elegir implementación depende del equilibrio entre **simplicidad** (arrays) y **flexibilidad** (listas enlazadas).

---

### 1.3 Aplicaciones de las pilas

* **Gestión de llamadas a funciones**: cada vez que una función se invoca, se guarda su estado en la **pila de activación**. Cuando termina, se desapila y se retoma el control.
* **Evaluación de expresiones**: las pilas permiten transformar expresiones de notación infija a postfija (notación polaca inversa). Esto inspiró incluso calculadoras físicas (HP utilizó notación polaca inversa en los 70).
* **Operaciones de deshacer/rehacer**: en editores de texto, cada acción se apila, y al pulsar “Ctrl+Z” se desapila para revertir el estado.
* **Recorridos en grafos y árboles**: algoritmos de **búsqueda en profundidad (DFS)** utilizan pilas explícitas o implícitas en recursión.

![Representación de una pila](../images/stack.png){ width=50% }

*Figura 5: estructura LIFO.*

📌 *Filosofía*: la pila nos enseña que **la historia reciente es la más importante**: lo último que hicimos es lo primero que podemos deshacer.

---

## 2. Colas (queues)

Una **cola** es como esperar turno en una taquilla o en un banco: el primero que llega es el primero que se atiende.

El modelo **FIFO** refleja procesos donde el orden de llegada determina el orden de salida.

---

### 2.1 Operaciones principales

* **`encolar` (enqueue)**: inserta un elemento al final.
* **`desencolar` (dequeue)**: elimina y devuelve el primero.
* **`frente` (peek/front)**: consulta el primer elemento sin retirarlo.
* **`vacía`**: indica si la cola está vacía.

#### Pseudocódigo básico

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

---

### 2.2 Implementaciones

**Con vector**:

* Se usan dos índices: `frente` y `trasero`.
* Problema: al llegar al final del array puede quedar espacio libre al inicio.
* Solución: **cola circular** → índices calculados módulo $n$.

**Con lista enlazada**:

* Se mantienen punteros a la cabeza y a la cola.
* Operaciones en **O(1)** tanto en encolar como desencolar.
* Crecimiento dinámico.

---

### 2.3 Variantes de colas

* **Cola circular**: muy usada en buffers de sistemas embebidos (ej. recibir datos por un puerto serie).
* **Deque (cola doble)**: permite insertar y eliminar en ambos extremos. Útil en algoritmos como *sliding window*.
* **Cola de prioridad**: cada elemento tiene prioridad, y se atiende el más importante primero (se suele implementar con heaps).

📜 **Anécdota**: los primeros sistemas de impresión compartida (años 60) introdujeron el término **spooling** (de *simultaneous peripheral operations on-line*), que usaba colas para almacenar trabajos de impresión en orden.

---

### 2.4 Aplicaciones de las colas

* **Planificación de procesos**: los sistemas operativos encolan procesos para darles CPU según su turno.
* **Routers de red**: almacenan paquetes en colas FIFO hasta que la línea está libre.
* **Simulación de líneas de espera**: estudios de eficiencia en supermercados, hospitales o tráfico urbano.
* **Pipelines de bioinformática**: colas de tareas para procesar grandes volúmenes de datos secuenciales (ej. secuencias de ADN).

![Representación de una cola](../images/queue.png){ width=70% }

*Figura 6: estructura FIFO.*

---

## 3. Comparación de pilas y colas

| Estructura | Principio                          | Operaciones                        | Complejidad | Uso típico                    |
| ---------- | ---------------------------------- | ---------------------------------- | ----------- | ----------------------------- |
| **Pila**   | LIFO (último entra, primero sale)  | `apilar`, `desapilar`, `consultar` | $O(1)$    | Recursión, deshacer, DFS      |
| **Cola**   | FIFO (primero entra, primero sale) | `encolar`, `desencolar`, `frente`  | $O(1)$    | Procesos, comunicaciones, BFS |

📌 Ambas son simples, pero su **disciplina de acceso** las convierte en cimientos de algoritmos muy complejos.

---

## 4. Casos de uso en bioinformática y computación

* **Pilas**:

  * Alineamiento de secuencias recursivo → seguimiento de llamadas en la pila.
  * Algoritmos DFS en grafos de interacción genética.
  * Retroceso (*backtracking*) en predicción de estructuras de ARN.

* **Colas**:

  * Pipelines de procesamiento de datos genómicos.
  * Algoritmos BFS en redes biológicas o de proteínas.
  * Simulación de colas de espera en hospitales (modelos epidemiológicos).

👉 Aquí vemos cómo una idea simple (orden de acceso) se convierte en pieza clave de sistemas biológicos, tecnológicos y sociales.

---

## 5. Conclusiones

Las pilas y colas son estructuras sencillas, pero **fundamentales**:

* **Pilas**: gestionan lo inmediato, lo último que pasó.
* **Colas**: gestionan lo justo, el orden de llegada.

Filosóficamente, representan dos visiones del tiempo:

* La pila se centra en el **presente más reciente**.
* La cola en la **historia acumulada**.

Además, son la base de estructuras más avanzadas como **colas de prioridad, deques, heaps, árboles y grafos**.

---

## 6. Ejercicios de autoevaluación

1. ¿Cuál es la diferencia conceptual entre una pila y una cola en cuanto al orden de acceso?
2. Implementa en pseudocódigo una pila basada en lista enlazada.
3. Explica cómo funciona una cola circular y por qué es más eficiente que una cola simple basada en array.
4. Diseña un algoritmo que evalúe una expresión en notación postfija usando una pila.
5. ¿Cuándo preferirías implementar una cola con lista enlazada en lugar de un vector?
6. Elige estructura para cada caso:
   a) Editor de texto con opción de deshacer.
   b) Sistema de tickets en un banco.
   c) Router de red que gestiona paquetes en tiempo real.

---

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. *Data Structures and Algorithms in Python*. Wiley.
* Weiss, M. A. *Data Structures and Algorithm Analysis*. Pearson.
* Sedgewick, R., & Wayne, K. *Algorithms*. Addison-Wesley.
* Knuth, D. *The Art of Computer Programming, Vol. 1: Fundamental Algorithms*. Addison-Wesley.

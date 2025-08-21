---
title: "Módulo 7 – Algoritmos de ordenación"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "21 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 7 – Algoritmos de ordenación

## Introducción

En informática, **ordenar** significa reorganizar los elementos de una colección (números, cadenas, registros, secuencias biológicas, etc.) siguiendo un criterio predefinido, normalmente ascendente o descendente. Aunque a primera vista pueda parecer una operación sencilla, la ordenación es una de las tareas más frecuentes y esenciales en el procesamiento de datos.

Su importancia radica en que:

* **Acelera búsquedas posteriores**: por ejemplo, la **búsqueda binaria** solo funciona si los datos están previamente ordenados, reduciendo drásticamente el tiempo de búsqueda de $O(n)$ a $O(\log n)$.
* **Facilita la detección de duplicados y patrones**: ordenar registros permite identificar rápidamente valores repetidos o detectar regularidades en los datos.
* **Optimiza procesos de análisis y almacenamiento**: en bases de datos, algoritmos de compresión, sistemas de archivos o bioinformática, el rendimiento mejora considerablemente cuando los datos se encuentran ordenados.
* **Es un bloque fundamental de algoritmos más complejos**: muchos algoritmos de grafos, optimización o aprendizaje automático dependen internamente de rutinas de ordenación eficientes.

Históricamente, el estudio de la ordenación ha sido central en el desarrollo de la algoritmia: desde los primeros métodos sencillos como *bubble sort* hasta algoritmos sofisticados como *merge sort* o *quicksort*, que forman parte de bibliotecas estándar en la mayoría de los lenguajes de programación.

En este módulo se explorarán distintos algoritmos de ordenación, analizando su funcionamiento, su complejidad computacional y sus ventajas y desventajas. El objetivo es que el estudiante pueda **comprender los principios detrás de cada método** y **elegir el más adecuado según el tamaño de los datos, el entorno de ejecución y las restricciones de memoria**.

---

¿Quieres que te lo integre directamente en el **Markdown del módulo 7** ya reescrito con esta introducción ampliada?

---

## 1. Algoritmos cuadráticos

### 1.1 Bubble sort (burbuja)

Compara elementos adyacentes e intercambia si están en orden incorrecto.  

#### Pseudocódigo

```text
procedimiento bubbleSort(lista):
    n ← longitud(lista)
    repetir
        intercambiado ← falso
        para i desde 1 hasta n-1:
            si lista[i] > lista[i+1] entonces
                intercambiar(lista[i], lista[i+1])
                intercambiado ← verdadero
    hasta que intercambiado = falso
```

* Complejidad: $O(n^2)$
* Ventaja: simple.
* Desventaja: muy ineficiente para listas grandes.

---

### 1.2 Insertion sort (inserción)

Construye la lista ordenada de izquierda a derecha, insertando cada elemento en la posición correcta.

#### Pseudocódigo

```text
procedimiento insertionSort(lista):
    para i desde 2 hasta longitud(lista):
        clave ← lista[i]
        j ← i - 1
        mientras j ≥ 1 y lista[j] > clave:
            lista[j+1] ← lista[j]
            j ← j - 1
        lista[j+1] ← clave
```

* Complejidad:

  * Mejor caso (lista ya ordenada): $O(n)$
  * Peor caso: $O(n^2)$
* Bueno para listas pequeñas o casi ordenadas.

---

### 1.3 Selection sort (selección)

Busca el mínimo y lo coloca al inicio, repitiendo el proceso.

#### Pseudocódigo

```text
procedimiento selectionSort(lista):
    n ← longitud(lista)
    para i desde 1 hasta n-1:
        min ← i
        para j desde i+1 hasta n:
            si lista[j] < lista[min] entonces
                min ← j
        intercambiar(lista[i], lista[min])
```

* Complejidad: $O(n^2)$ siempre.
* Innecesario en la práctica salvo como ejemplo didáctico.

---

## 2. Algoritmos eficientes ($O(n \log n)$)

### 2.1 Merge sort (mezcla)

Divide la lista en dos mitades, ordena recursivamente y combina.

#### Pseudocódigo

```text
función mergeSort(lista):
    si longitud(lista) ≤ 1 entonces devolver lista
    medio ← longitud(lista) / 2
    izquierda ← mergeSort(lista[1..medio])
    derecha ← mergeSort(lista[medio+1..fin])
    devolver fusionar(izquierda, derecha)
```

* Complejidad: $O(n \log n)$ siempre.
* Espacio adicional: $O(n)$.
* Estable (mantiene el orden relativo de elementos iguales).
* Uso típico: ordenación externa, donde los datos son demasiado grandes para caber en memoria (ej. archivos de varios GB en bioinformática).
---

### 2.2 Quicksort (rápido)

Selecciona un **pivote** y divide los elementos en menores y mayores, aplicando recursión en ambas partes.

#### Pseudocódigo

```text
función quickSort(lista):
    si longitud(lista) ≤ 1 entonces devolver lista
    pivote ← lista[1]
    menores ← [x ∈ lista | x < pivote]
    iguales ← [x ∈ lista | x = pivote]
    mayores ← [x ∈ lista | x > pivote]
    devolver quickSort(menores) + iguales + quickSort(mayores)
```

* Promedio: $O(n \log n)$.
* Peor caso: $O(n^2)$ (si pivote elegido muy mal).
* Muy rápido en la práctica, usado en bibliotecas estándar.
* Optimización común: elegir pivote aleatorio o la mediana de tres elementos.
---

## 3. Comparación de algoritmos

| Algoritmo          | Mejor caso      | Peor caso       | Promedio        | Espacio adicional         | Estable |
| ------------------ | --------------- | --------------- | --------------- | ------------------------- | ------- |
| **Bubble sort**    | $O(n)$        | $O(n^2)$      | $O(n^2)$      | $O(1)$                  | ✅       |
| **Insertion sort** | $O(n)$        | $O(n^2)$      | $O(n^2)$      | $O(1)$                  | ✅       |
| **Selection sort** | $O(n^2)$      | $O(n^2)$      | $O(n^2)$      | $O(1)$                  | ❌       |
| **Merge sort**     | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$                  | ✅       |
| **Quicksort**      | $O(n \log n)$ | $O(n^2)$      | $O(n \log n)$ | $O(\log n)$ (recursión) | ❌       |

---

## 4. Aplicaciones en computación y bioinformática

* **Insertion sort**: ordenar pequeñas listas (ej. registros temporales).
* **Merge sort**: ordenación externa, como ordenar archivos genómicos de varios gigabytes en disco.
* **Quicksort**: ordenación interna en memoria, ampliamente usado en librerías estándar, siendo el algoritmo por defecto en muchas librerías de C, Java o Python.
* **Ordenación en bioinformática**: 
  - Clasificación de secuencias de ADN/proteínas antes de alineamientos masivos.
  - Preparación de grandes matrices de expresión génica para análisis estadísticos.
  - Preprocesamiento de datos de lecturas en secuenciación masiva.

---

## 5. Conclusiones

* Los algoritmos **cuadráticos** son simples, útiles solo para listas pequeñas o fines pedagógicos.
* **Merge sort** y **quicksort** ofrecen rendimiento $O(n \log n)$ y son los más usados en la práctica.
* La **estabilidad** y el **uso de memoria** son criterios importantes en la elección.
* La ordenación es clave para optimizar procesos posteriores como búsquedas y análisis de grandes volúmenes de datos.

---

## 6. Ejercicios de autoevaluación

1. Ordena manualmente la lista `[5,2,9,1,5,6]` con bubble sort, mostrando cada pasada.
2. ¿Por qué insertion sort es más eficiente que bubble sort en la práctica?
3. Explica por qué merge sort es estable y selection sort no lo es.
4. Analiza el peor caso de quicksort. ¿Cómo puede mitigarse?
5. Diseña un algoritmo que combine **insertion sort** y **quicksort** para aprovechar lo mejor de ambos.
6. ¿Qué algoritmo usarías para ordenar un archivo de 50 GB almacenado en disco? Justifica tu respuesta.

---

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Weiss, M. A. *Data Structures and Algorithm Analysis*. Pearson.
* Sedgewick, R., & Wayne, K. *Algorithms*. Addison-Wesley.
* Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. *Data Structures and Algorithms in Java*. Wiley.

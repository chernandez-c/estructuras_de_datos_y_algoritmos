---
title: "Módulo 1 – Fundamentos de estructuras de datos y análisis de algoritmos"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "21 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 1 – Fundamentos de estructuras de datos y análisis de algoritmos

## Objetivos del módulo

Al finalizar este módulo el estudiante será capaz de:

- Definir qué es un algoritmo y describir sus propiedades esenciales.  
- Analizar la eficiencia de un algoritmo en tiempo y memoria utilizando notación Big O.  
- Reconocer diferentes paradigmas algorítmicos (divide y vencerás, voraces, programación dinámica).  
- Explicar qué es un tipo de dato abstracto (TDA) y por qué es independiente de su implementación.  
- Comprender el funcionamiento de vectores y matrices como estructuras de datos estáticas.  

---

## 1. Introducción

Los **algoritmos** son secuencias finitas de pasos que resuelven un problema definido.  

Las instrucciones deben ser lo suficientemente precisas para que un ordenador pueda ejecutarlas sin ambigüedad.  

Su importancia no radica solo en dar una respuesta correcta, sino en hacerlo de manera **eficiente**, aprovechando el tiempo de cómputo y la memoria disponibles.  

Las **estructuras de datos** proporcionan formas de organizar la información para que los algoritmos accedan a ella de manera más eficaz.  

En este módulo se introducen los conceptos básicos: **tipos de dato abstracto (TDA)**, la **notación Big O**, los principales **paradigmas algorítmicos** y los **vectores** (o arrays) como ejemplo de estructura estática.  

---

## 2. Concepto y representación de algoritmos

Un **algoritmo** debe cumplir ciertas propiedades:

- **Finitud**: siempre termina.  
- **Definición precisa**: cada paso está claramente especificado, sin ambigüedad.  
- **Entrada y salida**: recibe datos de entrada y produce resultados.  

### 2.1 Representación

Se utilizan **pseudocódigo** y **diagramas de flujo**, que permiten describirlos de manera formal y clara.  

**Ejemplo simple**: encontrar el máximo de *n* números.  

```text
Algoritmo Maximo(lista[1..n]):
  max ← lista[1]
  para i desde 2 hasta n hacer
    si lista[i] > max entonces
      max ← lista[i]
  devolver max
```

Este algoritmo recorre toda la lista una vez ⇒ **complejidad O(n)**.

---

## 3. Análisis de eficiencia y notación Big O

La eficiencia de un algoritmo se mide en dos dimensiones principales:

* **Tiempo de ejecución**: número de operaciones realizadas en función del tamaño de la entrada (*n*).
* **Uso de memoria**: cantidad de espacio adicional necesario para ejecutarlo.

### 3.1 Crecimiento con el tamaño de la entrada

El comportamiento varía según el tamaño de *n*:

* Algoritmos **O(n)** escalan linealmente.
* Algoritmos **O(n²)** crecen de forma cuadrática, lo que los hace inviables en contextos como la bioinformática.

**Gráfico comparativo de crecimiento**:

![Crecimiento de funciones de complejidad](../images/complejidad.png){ width=70% }

### 3.2 Peor caso, mejor caso y caso promedio

* **Peor caso**: Ofrece un límite superior del tiempo de ejecución para cualquier entrada válida.
* **Mejor caso**: Refleja la situación más favorable (ej. datos ya ordenados en un algoritmo de ordenación).
* **Caso promedio**: Calcula el tiempo de ejecución esperado considerando distribuciones de datos.

### 3.3 Paradigmas algorítmicos

* **Divide y vencerás**: dividir el problema en subproblemas (ej. *merge sort*).
* **Voraces**: toman decisiones locales óptimas (ej. problema del cambio de monedas con denominaciones canónicas).
* **Programación dinámica**: reutilizan soluciones parciales (ej. Needleman–Wunsch en alineamiento de secuencias).

### 3.4 Tabla de complejidad habitual

| Orden          | Descripción        | Ejemplo                            |
| -------------- | ------------------ | ---------------------------------- |
| **O(1)**       | Tiempo constante   | Acceder a un elemento de un vector |
| **O(log n)**   | Tiempo logarítmico | Búsqueda binaria                   |
| **O(n)**       | Tiempo lineal      | Recorrer una lista                 |
| **O(n log n)** | Cuasilineal        | *Quicksort*, *Merge sort*          |
| **O(n²)**      | Cuadrático         | *Bubble sort*                      |

⚡ Además de Big O, existen notaciones **Ω** (cota inferior) y **Θ** (cota ajustada).

---

## 4. Ejemplos aplicados en bioinformática

* **Cálculo del contenido GC en una secuencia**: algoritmo **O(n)**.

```python
seq = "ATGCGCTAAGC"
gc = sum(1 for base in seq if base in "GC") / len(seq)
print(f"GC%: {gc:.2%}")
```

* **Comparación de todas las parejas de secuencias en un genoma**: complejidad **O(n²)** → impracticable en genomas completos.
* **Alineamiento global**: programación dinámica (**O(n·m)** para dos secuencias de longitudes *n* y *m*).

---

## 5. Tipos de estructuras de datos

Las estructuras de datos organizan la información según necesidades:

| Tipo            | Descripción                                   | Ejemplo                           |
| --------------- | --------------------------------------------- | --------------------------------- |
| **Lineales**    | elementos secuenciales con predecesor/sucesor | vectores, listas, pilas, colas    |
| **Jerárquicas** | elementos en niveles de jerarquía             | árboles, heaps                    |
| **Grafos**      | relaciones entre objetos sin jerarquía fija   | redes sociales, mapas             |
| **Estáticas**   | tamaño fijo definido al crearse               | arrays                            |
| **Dinámicas**   | tamaño ajustable en ejecución                 | listas enlazadas, árboles, grafos |

### 5.1 Tipo de dato abstracto (TDA)

Un **TDA** se define por **operaciones y reglas**, no por su implementación.

Ejemplo: una pila, que siempre ofrece `apilar`, `desapilar`, `consultar`.
Puede implementarse con vectores o con listas enlazadas.

---

## 6. Vectores y matrices

Los **vectores** son arrays unidimensionales de tamaño fijo:

* **Acceso**: O(1) gracias a direcciones contiguas.
* **Recorrido**: O(n).
* **Inserción/eliminación**: O(n), porque hay que desplazar elementos.

Las **matrices** son arrays bidimensionales. Un array $m \times n$ puede verse como un vector de $m$ filas con $n$ columnas.

**Ejemplo**: recorrido fila por fila vs. columna por columna y su impacto en rendimiento (caché).

---

## 7. Conclusiones

En este módulo hemos:

* Definido qué es un algoritmo y cómo medir su eficiencia.
* Estudiado la notación Big O y otras notaciones complementarias.
* Reconocido paradigmas algorítmicos clave.
* Clasificado las estructuras de datos y profundizado en vectores y matrices.

📌 Comprender estos fundamentos marca la diferencia entre esperar días para un análisis genómico o tener resultados en minutos.

---

## 8. Ejercicios de autoevaluación

1. ¿Cuál es la complejidad temporal de recorrer una matriz $m \times n$?
2. ¿Por qué la programación dinámica es útil en alineamiento de secuencias?
3. Explica la diferencia entre un TDA y su implementación.
4. Si un algoritmo tarda 2 segundos con *n=1000* y es **O(n²)**, ¿cuánto tardará aproximadamente con *n=2000*?
5. Escribe en pseudocódigo un algoritmo que invierta un vector y analiza su complejidad.
6. Diseña un algoritmo voraz para dar cambio en monedas de 1, 2, 5, 10 y 20. ¿Es siempre óptimo?

---

## Referencias

* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. *Introduction to Algorithms*. MIT Press.
* Sedgewick, R., & Wayne, K. *Algorithms*. Addison-Wesley.
* Goodrich, M. T., & Tamassia, R. *Data Structures and Algorithms in Java*. Wiley.
* Kleinberg, J., & Tardos, É. *Algorithm Design*. Pearson.
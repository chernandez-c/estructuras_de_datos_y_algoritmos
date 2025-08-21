---
title: "Módulo 8 – Algoritmos y estructuras de datos en bioinformática"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "24 de agosto de 2025"
toc: true
number-sections: true
---

# Módulo 8 – Algoritmos y estructuras de datos en bioinformática

## Introducción

La **bioinformática** es un campo donde los algoritmos y las estructuras de datos resultan absolutamente **indispensables**. El volumen de información biológica que manejamos hoy —genomas completos, secuencias de proteínas, redes de interacción molecular, datos de expresión génica— es tan grande que **ningún análisis sería posible sin diseñar algoritmos eficientes y estructuras adecuadas**.

En este módulo se presentan **casos de uso concretos** que integran lo aprendido en toda la asignatura. El objetivo es doble:  
1. Reconocer la importancia de elegir bien la estructura de datos y el algoritmo en escenarios reales.  
2. Mostrar cómo conceptos vistos en módulos anteriores (búsqueda, ordenación, árboles, grafos, programación dinámica) encuentran aplicación inmediata en bioinformática.

---

## 1. Procesamiento de secuencias biológicas

Una de las tareas más frecuentes es trabajar con **cadenas de ADN, ARN o proteínas**. Estas secuencias pueden tener millones de caracteres, lo que obliga a pensar en estrategias eficientes.

### 1.1 Búsqueda de patrones

- **Problema**: localizar subsecuencias (motivos) dentro de un genoma.  
  Ejemplo: encontrar la subsecuencia `ATG` en una cadena de millones de nucleótidos.

- **Estructuras utilizadas**:
  - **Tablas hash** (ver Módulo 6) → se usan para indexar fragmentos de longitud fija llamados *k-mers*.  
    *Ejemplo*: en un genoma, dividir la secuencia en fragmentos de longitud 10 (10-mers) y almacenarlos en una tabla hash con su posición. La búsqueda de un patrón se reduce a consultar la clave correspondiente en tiempo cercano a $O(1)$.
  - **Tries** y **árboles de sufijos** → estructuras especializadas que almacenan todas las subcadenas posibles de una secuencia. Permiten localizar rápidamente motivos o patrones repetidos.

- **Ventaja práctica**: estas estructuras permiten responder en segundos preguntas que de otro modo requerirían recorrer el genoma completo (coste $O(n)$) para cada búsqueda.

---

### 1.2 Comparación de secuencias

- **Problema**: alinear dos secuencias para medir similitud (ADN, proteínas).  
- **Algoritmos clásicos**:  
  - **Needleman–Wunsch** (alineamiento global).  
  - **Smith–Waterman** (alineamiento local).  
- Ambos se basan en **programación dinámica** (ver Módulo 1, paradigmas algorítmicos), con coste $O(n·m)$ para secuencias de longitudes $n$ y $m$.
- **Limitación**: para secuencias largas (millones de bases) el coste es prohibitivo.  
- **Solución**:  
  - usar estructuras de índices (hash de k-mers, árboles de sufijos),  
  - o recurrir a algoritmos aproximados y heurísticos (ej. BLAST).

---

## 2. Ordenación de grandes volúmenes de datos

La ordenación, estudiada en el Módulo 7, es crítica en bioinformática porque facilita análisis posteriores.

- **Ejemplo**: ordenar secuencias FASTA por longitud, GC%, o por la frecuencia de un motivo.
- **Algoritmos aplicados**:
  - **Merge sort externo** → ideal cuando los datos no caben en memoria, ya que divide el archivo en bloques ordenados en disco y luego los fusiona.  
  - **Counting sort / Radix sort** → muy eficientes cuando el alfabeto es reducido (ej. nucleótidos {A, C, G, T}). Permiten ordenar millones de secuencias más rápido que quicksort o mergesort en esos contextos.

---

## 3. Grafos en bioinformática

Los grafos, introducidos en el Módulo 5, son una herramienta fundamental para representar relaciones en biología.

- **Redes de interacción genética y proteica**: modeladas como grafos, donde los nodos son genes/proteínas y las aristas representan interacciones.  
  *Ejemplo*: un BFS puede usarse para comprobar si dos genes pertenecen a la misma red de regulación.  

- **Grafos de ensamblado**:
  - En la secuenciación masiva, el ADN se fragmenta en millones de *reads* cortos.  
  - Los **grafos de Bruijn** permiten reconstruir el genoma conectando *k-mers* solapados.  
  - Cada nodo representa un *k-mer*, y las aristas indican solapamientos.  
  - El problema del ensamblado se transforma en encontrar un camino que recorra el grafo respetando los solapamientos.  

👉 Esto convierte un problema biológico en un problema algorítmico de recorrido de grafos.

---

## 4. Árboles en biología computacional

Los árboles, vistos en el Módulo 4, también encuentran aplicaciones directas en bioinformática.

- **Árboles filogenéticos**: representan las relaciones evolutivas entre especies o genes.  
  - Algoritmos clásicos: **UPGMA** y **Neighbor-Joining** construyen árboles a partir de matrices de distancias genéticas.  
- **BST y AVL**: se usan como índices dinámicos para bases de datos de secuencias, permitiendo búsquedas rápidas de motivos o genes asociados a cierta función.

---

## 5. Casos prácticos integradores

1. **Indexación de un genoma**:  
   Construir un **árbol de sufijos** y usarlo para localizar fragmentos de secuencia en tiempo logarítmico.
2. **Alineamiento múltiple**:  
   Combinar programación dinámica (para pares de secuencias) con heurísticas de búsqueda global.  
3. **Clasificación de secuencias**:  
   Ordenar proteínas por peso molecular usando algoritmos de ordenación eficientes.  
4. **Redes biológicas**:  
   Aplicar BFS en un grafo de interacciones para encontrar rutas metabólicas mínimas.

---

## 6. Conclusiones

- La bioinformática ilustra la necesidad de algoritmos y estructuras **eficientes**, ya que los datos biológicos suelen tener escalas masivas (miles de millones de caracteres).  
- Sin las herramientas vistas en este curso (hashing, árboles, grafos, ordenación, programación dinámica), muchos problemas serían **computacionalmente inviables**.  
- Este módulo muestra cómo lo aprendido se conecta directamente con aplicaciones reales en investigación biomédica y genómica.

---

## 7. Ejercicios de autoevaluación

1. Diseña un pseudocódigo para buscar un motivo de longitud 3 en una secuencia de ADN usando **tablas hash de k-mers** (apóyate en el Módulo 6).  
2. ¿Qué ventajas tiene **radix sort** sobre quicksort para ordenar secuencias de nucleótidos? (revisa Módulo 7).  
3. Explica cómo un **grafo de Bruijn** ayuda en el ensamblado de genomas (conecta con Módulo 5).  
4. Construye un pequeño **árbol filogenético** a partir de tres secuencias ficticias.  
5. El alineamiento de dos secuencias de 1 millón de bases con Needleman–Wunsch es inviable ($O(n^2)$). ¿Qué estrategias alternativas existen?

---

## Referencias

- Jones, N. C., & Pevzner, P. A. *An Introduction to Bioinformatics Algorithms*. MIT Press.  
- Durbin, R., Eddy, S., Krogh, A., & Mitchison, G. *Biological Sequence Analysis*. Cambridge University Press.  
- Compeau, P., & Pevzner, P. *Bioinformatics Algorithms: An Active Learning Approach*. Active Learning Publishers.  
```

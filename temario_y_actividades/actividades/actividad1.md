---
title: "Actividad 1 – Implementación de un vector dinámico"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Actividad 1 – Implementación de un vector dinámico (individual)

## Objetivo

El objetivo de esta actividad individual es familiarizarse con la implementación de una estructura de datos básica: el **vector dinámico**.  A diferencia de un array estático, el vector dinámico permite aumentar o disminuir su capacidad según las necesidades del programa.

## Enunciado

Implemente en el lenguaje de programación de su preferencia (por ejemplo, Python, C++ o Java) un **vector dinámico** que ofrezca las siguientes operaciones:

1. **`crear(capacidad_inicial)`**: crea un vector vacío con una capacidad inicial determinada.
2. **`tamaño()`**: devuelve el número de elementos almacenados.
3. **`capacidad()`**: devuelve la capacidad actual del vector (número de posiciones disponibles antes de redimensionar).
4. **`obtener(i)`**: devuelve el elemento en la posición `i`.  Debe lanzar una excepción o error si el índice es inválido.
5. **`añadir(x)`**: añade el elemento `x` al final.  Si el vector está lleno, debe redimensionarse (por ejemplo, duplicando la capacidad).
6. **`insertar(i, x)`**: inserta el elemento `x` en la posición `i`, desplazando los elementos posteriores hacia la derecha.  Si `i` es igual al tamaño, equivale a añadir.
7. **`eliminar(i)`**: elimina el elemento de la posición `i`, desplazando los elementos posteriores hacia la izquierda y reduciendo el tamaño.

### Sugerencias de implementación

* Utilice un array interno para almacenar los elementos.  Cuando sea necesario redimensionar, cree un array nuevo con mayor capacidad y copie los elementos.
* Establezca un **factor de crecimiento** (por ejemplo, multiplicar la capacidad por 2) para reducir el número de redimensionamientos.
* Piense cómo podría implementarse la operación de reducción de capacidad al eliminar muchos elementos (por ejemplo, reduciendo la capacidad cuando el número de elementos es menor que la mitad de la capacidad).

## Entregable

* Código fuente documentado del vector dinámico.
* Un informe breve (1–2 páginas) que explique las decisiones de diseño tomadas y la complejidad temporal de las operaciones implementadas.
* Ejemplos de uso que demuestren el correcto funcionamiento de las operaciones.

## Criterios de evaluación

1. **Corrección**: el vector funciona conforme a las especificaciones, gestiona adecuadamente la memoria y maneja los errores de índice.
2. **Complejidad**: se analiza la eficiencia de cada operación (\(O(1)\) amortizado para `añadir` e `insertar`, \(O(n)\) para operaciones de desplazamiento).
3. **Documentación**: claridad en el código y en el informe, comentarios adecuados y explicación de la estrategia de redimensionamiento.
---
title: "Actividad 3 – Evaluación de expresiones con pilas"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Actividad 3 – Evaluación de expresiones con pilas (individual)

## Objetivo

Esta actividad individual tiene como finalidad comprender el uso de las **pilas** en la evaluación de expresiones matemáticas.  Se implementará un conversor de expresiones infijas a postfijas y un evaluador de expresiones postfijas.

## Enunciado

1. **Conversor infijo → postfijo**: implemente el algoritmo de Shunting Yard para convertir una expresión aritmética en notación infija (por ejemplo, `3 + 4 * (2 - 1)`) a notación postfija (también llamada notación polaca inversa, por ejemplo, `3 4 2 1 - * +`).  Utilice una pila para operadores y otra para la salida.
2. **Evaluador postfijo**: implemente un algoritmo que evalue una expresión postfija utilizando una pila.  Recorra la expresión token por token; cuando encuentre un operando, apílelo; cuando encuentre un operador, desapile los operandos necesarios, aplique el operador y apile el resultado.
3. **Interfaz**: permita al usuario introducir expresiones infijas, conviértalas a postfijo, muestre la expresión postfija y luego evalúe el resultado final.

### Consideraciones

* El programa debe soportar operadores básicos (`+`, `-`, `*`, `/`, `^`) y paréntesis.
* Defina y documente la precedencia y asociatividad de los operadores (por ejemplo, `^` es asociativo a la derecha).
* Gestione correctamente los errores (expresiones mal formadas, división por cero, etc.).

## Entregable

* Código fuente del conversor y evaluador, debidamente comentado.
* Un breve informe (1–2 páginas) que explique el funcionamiento de los algoritmos utilizados y la complejidad de las operaciones con pilas.
* Pruebas con al menos cinco expresiones distintas, incluyendo casos con paréntesis y diferentes niveles de precedencia.

## Criterios de evaluación

1. **Exactitud**: el algoritmo convierte y evalúa correctamente las expresiones.
2. **Uso de pilas**: se utilizan pilas para manejar operadores y operandos según lo indicado en clase.
3. **Robustez**: el programa detecta y maneja casos de error de manera adecuada.
4. **Claridad**: código bien estructurado y documentado; informe que exponga la lógica de forma comprensible.
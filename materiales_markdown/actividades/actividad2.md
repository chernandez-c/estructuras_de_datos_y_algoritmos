---
title: "Actividad 2 – Gestión de contactos con listas enlazadas"
author: "Curso de Introducción a Estructuras de Datos y Algoritmos"
date: "15 de agosto de 2025"
toc: true
number-sections: true
---

# Actividad 2 – Gestión de contactos con listas enlazadas (grupo)

## Objetivo

El propósito de esta actividad grupal es diseñar y desarrollar una aplicación sencilla que gestione una lista de contactos utilizando **listas enlazadas**.  Se pretende profundizar en las operaciones de inserción, eliminación y búsqueda en listas dinámicas.

## Enunciado

Forme un grupo de 2–3 personas y desarrollen una aplicación de consola que permita almacenar, buscar y eliminar contactos.  Cada contacto debe contener al menos los siguientes campos:

* Nombre completo.
* Número de teléfono.
* Correo electrónico.

### Requisitos funcionales

1. **Añadir contacto**: inserta un nuevo contacto en la lista manteniendo el orden alfabético por nombre.
2. **Buscar contacto**: permite buscar por nombre y mostrar los datos completos.  La búsqueda debe recorrer la lista hasta encontrar el contacto o llegar al final.
3. **Eliminar contacto**: elimina el contacto identificado por nombre o número de teléfono.
4. **Listar contactos**: muestra todos los contactos en orden alfabético.
5. **Guardar y cargar** (opcional): persiste la lista de contactos en un archivo para cargarlos al iniciar la aplicación.

### Implementación

* Utilicen una **lista enlazada simple** en la que cada nodo almacene un contacto y una referencia al siguiente.
* Para mantener el orden alfabético, inserten cada nuevo contacto en la posición correcta según el nombre.
* Al eliminar un contacto, actualicen los enlaces de la lista para que no queden nodos huérfanos.

## Entregable

* Código fuente de la aplicación con comentarios.
* Un documento de 2–3 páginas que describa la arquitectura del programa, explique cómo se implementaron las operaciones sobre la lista y presente capturas de pantalla con ejemplos de uso.
* Opcionalmente, un archivo de contactos que pueda cargarse al iniciar la aplicación.

## Criterios de evaluación

1. **Trabajo en equipo**: evidencias de colaboración y reparto de tareas.
2. **Funcionalidad**: la aplicación cumple los requisitos y maneja casos de error (contacto duplicado, contacto no encontrado, etc.).
3. **Implementación**: uso correcto de listas enlazadas y mantenimiento del orden alfabético.
4. **Documentación**: claridad en la explicación del diseño y en la presentación de los resultados.
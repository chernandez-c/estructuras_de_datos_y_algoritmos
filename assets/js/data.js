const quizData = {
    quiz1: [
        { q: "¿Qué describe principalmente la notación Big O?", o: ["El tiempo exacto de ejecución", "El comportamiento en el mejor de los casos", "La tasa de crecimiento del tiempo de ejecución a medida que aumenta la entrada", "El uso de memoria"], a: 2 },
        { q: "Un algoritmo `O(n)` tarda 5s para 1000 elementos. ¿Cuánto tardará para 2000 elementos?", o: ["5 segundos", "10 segundos", "25 segundos", "No se puede saber"], a: 1 },
        { q: "Ordena de más a menos eficiente: `O(n²)`, `O(log n)`, `O(n log n)`, `O(2ⁿ)`, `O(n)`.", o: ["`O(log n)`, `O(n)`, `O(n log n)`, `O(n²)`, `O(2ⁿ)`", "`O(2ⁿ)`, `O(n²)`, `O(n log n)`, `O(n)`, `O(log n)`", "`O(n)`, `O(log n)`, `O(n log n)`, `O(n²)`, `O(2ⁿ)`"], a: 0 },
        { q: "¿Por qué es crucial el análisis de eficiencia en bioinformática?", o: ["Porque los ordenadores son lentos", "Porque los conjuntos de datos son masivos", "Porque es un requisito para publicar", "Todas las anteriores"], a: 1 },
    ],
    quiz2: [
        { q: "¿Diferencia principal entre array y lista enlazada?", o: ["Arrays solo guardan números", "Acceso `O(1)` en arrays, `O(n)` en listas enlazadas", "Listas enlazadas tienen tamaño fijo"], a: 1 },
        { q: "Pila: `push(5)`, `push(8)`, `pop()`, `push(3)`, `peek()`. ¿Resultado?", o: ["5", "8", "3", "Vacía"], a: 2 },
        { q: "¿Qué estructura usar para un pipeline de tareas por orden de llegada?", o: ["Pila (Stack)", "Cola (Queue)", "Array"], a: 1 },
        { q: "Un TAD (Tipo Abstracto de Dato) define:", o: ["La implementación exacta", "Un conjunto de valores y sus operaciones", "Un algoritmo específico"], a: 1 },
    ],
    quiz3: [
        { q: "¿Requisito para la búsqueda binaria?", o: ["Que los datos sean números", "Que no haya duplicados", "Que la colección esté ordenada"], a: 2 },
        { q: "En 1024 elementos, ¿cuántas comparaciones hará la búsqueda binaria en el peor caso?", o: ["1024", "512", "10", "1"], a: 2 },
        { q: "¿Qué es una colisión en una tabla hash?", o: ["Insertar un elemento que ya existe", "La tabla está llena", "Dos claves diferentes generan el mismo índice"], a: 2 },
        { q: "La complejidad promedio de búsqueda en una tabla hash bien diseñada es:", o: ["`O(n)`", "`O(log n)`", "`O(1)`"], a: 2 },
    ],
    quiz4: [
        { q: "¿Complejidad promedio de Quick Sort y Merge Sort?", o: ["`O(n)`", "`O(n²)`", "`O(n log n)`"], a: 2 },
        { q: "¿Qué algoritmo es eficiente si la lista ya está casi ordenada?", o: ["Quick Sort", "Selection Sort", "Insertion Sort"], a: 2 },
        { q: "Un algoritmo de ordenación 'estable' es aquel que:", o: ["Siempre tiene la misma complejidad", "No utiliza memoria adicional", "Mantiene el orden relativo de elementos iguales"], a: 2 },
        { q: "El paso clave en el algoritmo Quick Sort es:", o: ["La fusión de las mitades", "La selección del mínimo", "La partición en base a un pivote"], a: 2 },
    ],
    quiz5: [
        { q: "En un BST, ¿dónde está el valor más pequeño?", o: ["En la raíz", "En la hoja más a la derecha", "Siguiendo los punteros izquierdos desde la raíz"], a: 2 },
        { q: "¿Qué recorrido de un BST produce los elementos en orden ascendente?", o: ["Pre-orden", "Post-orden", "In-orden"], a: 1 },
        { q: "La complejidad de búsqueda en un BST balanceado es:", o: ["`O(n)`", "`O(log n)`", "`O(1)`"], a: 1 },
        { q: "¿Cuál es una aplicación directa de los árboles en bioinformática?", o: ["Almacenar una secuencia de ADN", "Representar relaciones evolutivas (filogenia)", "Una cola de procesamiento"], a: 1 },
    ],
    quiz6: [
        { q: "Para una red social (grafo disperso), ¿qué representación es más eficiente en memoria?", o: ["Matriz de Adyacencia", "Lista de Adyacencia", "Ambas son iguales"], a: 1 },
        { q: "¿Qué algoritmo usarías para encontrar el camino más corto (en nº de interacciones) en una red PPI?", o: ["DFS", "BFS", "Quick Sort"], a: 1 },
        { q: "La Búsqueda en Profundidad (DFS) utiliza internamente una...", o: ["Cola", "Pila", "Tabla Hash"], a: 1 },
        { q: "En un grafo de ciudades y carreteras, el 'peso' de una arista podría representar:", o: ["El nombre de la ciudad", "La distancia en kilómetros", "El número de coches"], a: 1 },
    ]
};

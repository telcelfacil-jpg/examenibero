import json

preguntas_ibero_muestra = [
    {
        "id": 154,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Números naturales, fracciones y decimales",
        "pregunta": "¿Cuánto es 3/4 + 1/8?",
        "opciones": [
            {"id": "a", "texto": "4/12"},
            {"id": "b", "texto": "7/8"},
            {"id": "c", "texto": "5/8"},
            {"id": "d", "texto": "1"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Para sumar fracciones con diferente denominador, buscamos uno común. El común múltiplo de 4 y 8 es 8. Convertimos 3/4 a octavos multiplicando por 2 arriba y abajo: 6/8. Ahora sumamos: 6/8 + 1/8 = 7/8."
    },
    {
        "id": 155,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Proporcionalidad y porcentajes",
        "pregunta": "Una playera cuesta $240 y tiene 25% de descuento. ¿Cuánto pagarás?",
        "opciones": [
            {"id": "a", "texto": "$60"},
            {"id": "b", "texto": "$180"},
            {"id": "c", "texto": "$200"},
            {"id": "d", "texto": "$190"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El 25% de 240 es la cuarta parte. 240 ÷ 4 = 60. Ese es el descuento. Restamos el descuento al precio original: 240 - 60 = 180."
    },
    {
        "id": 156,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría: figuras, área y perímetros",
        "pregunta": "¿Cuál es el área de un rectángulo que mide 8 cm de largo y 5 cm de ancho?",
        "opciones": [
            {"id": "a", "texto": "26 cm²"},
            {"id": "b", "texto": "13 cm²"},
            {"id": "c", "texto": "40 cm²"},
            {"id": "d", "texto": "16 cm²"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El área de un rectángulo se obtiene multiplicando la base por su altura (lado x lado). En este caso, 8 cm x 5 cm = 40 cm²."
    },
    {
        "id": 157,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión lectora",
        "pregunta": "Lee el texto:\n\n\"Los delfines son mamíferos marinos muy inteligentes. Viven en grupos y se comunican mediante sonidos. Pueden aprender trucos y resolver problemas.\"\n\n¿Cuál es la idea principal del texto?",
        "opciones": [
            {"id": "a", "texto": "Los delfines viven en el mar."},
            {"id": "b", "texto": "Los delfines comen peces."},
            {"id": "c", "texto": "Los delfines son animales inteligentes que viven en grupo."},
            {"id": "d", "texto": "Los delfines hacen sonidos."}
        ],
        "respuesta_correcta": "c",
        "explicacion": "La idea principal es la que resume el sentido de todo el texto. Las demás opciones son detalles secundarios o información que no está en el texto."
    },
    {
        "id": 158,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Reglas de acentuación",
        "pregunta": "¿Cuál palabra está correctamente acentuada?",
        "opciones": [
            {"id": "a", "texto": "arbol"},
            {"id": "b", "texto": "dificil"},
            {"id": "c", "texto": "canción"},
            {"id": "d", "texto": "lapiz"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "La palabra 'canción' lleva tilde por ser aguda terminada en 'n'. 'Árbol', 'difícil' y 'lápiz' deberían llevar tilde porque son graves que no terminan en n, s o vocal."
    },
    {
        "id": 159,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Clases de palabras (sustantivo, adjetivo, verbo, etc.)",
        "pregunta": "En la oración: “María compró un libro interesante.”\n¿Cuál es el verbo?",
        "opciones": [
            {"id": "a", "texto": "María"},
            {"id": "b", "texto": "compró"},
            {"id": "c", "texto": "libro"},
            {"id": "d", "texto": "interesante"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El verbo indica la acción. 'María' es sustantivo propio (sujeto). 'Libro' es sustantivo común, 'interesante' adjetivo y 'compró' es la acción o verbo."
    },
    {
        "id": 160,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Sistemas del cuerpo humano",
        "pregunta": "¿Cuál es la función principal del sistema respiratorio?",
        "opciones": [
            {"id": "a", "texto": "Transportar sangre"},
            {"id": "b", "texto": "Permitir el intercambio de oxígeno y dióxido de carbono"},
            {"id": "c", "texto": "Producir energía"},
            {"id": "d", "texto": "Regular la temperatura"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El sistema respiratorio es el encargado de proveer oxígeno a nuestro cuerpo y desechar el dióxido de carbono que producimos, mediante los pulmones. El transporte de sangre corresponde al sistema circulatorio."
    },
    {
        "id": 161,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Geografía de México: climas, montañas, ríos",
        "pregunta": "¿Cuál es el río más largo de México?",
        "opciones": [
            {"id": "a", "texto": "Río Bravo"},
            {"id": "b", "texto": "Río Lerma"},
            {"id": "c", "texto": "Río Usumacinta"},
            {"id": "d", "texto": "Río Balsas"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "El Río Bravo (o Grande) es el más largo y sirve de frontera natural con Estados Unidos en gran parte de su recorrido."
    },
    {
        "id": 162,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Calentamiento global y medio ambiente",
        "pregunta": "El calentamiento global es causado principalmente por:",
        "opciones": [
            {"id": "a", "texto": "El movimiento de la Luna"},
            {"id": "b", "texto": "El exceso de gases de efecto invernadero"},
            {"id": "c", "texto": "Los terremotos"},
            {"id": "d", "texto": "La rotación de la Tierra"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El exceso de gases como el dióxido de carbono, producidos por actividades humanas (quema de combustibles fósiles, deforestación), atrapa el calor en la atmósfera impidiendo que salga al espacio, calentando el planeta."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in preguntas_ibero_muestra if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas de muestra del examen Ibero a preguntas.json.")

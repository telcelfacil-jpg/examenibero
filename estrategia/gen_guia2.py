import json

nuevas_preguntas_guia2 = [
    {
        "id": 111,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Números decimales y operaciones",
        "pregunta": "En una carrera de relevos, el primer corredor tardó 12.35 segundos, el segundo 11.8 segundos y el tercero 12.04 segundos. ¿Cuál fue el tiempo total del equipo?",
        "opciones": [
            {"id": "a", "texto": "36.19 segundos"},
            {"id": "b", "texto": "35.19 segundos"},
            {"id": "c", "texto": "36.09 segundos"},
            {"id": "d", "texto": "35.39 segundos"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "Se suman alineando el punto decimal: 12.35 + 11.80 + 12.04 = 36.19."
    },
    {
        "id": 112,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Ubicación espacial (Plano cartesiano)",
        "pregunta": "¿Qué par ordenado representa el origen en un plano cartesiano?",
        "opciones": [
            {"id": "a", "texto": "(1, 1)"},
            {"id": "b", "texto": "(0, 1)"},
            {"id": "c", "texto": "(0, 0)"},
            {"id": "d", "texto": "(1, 0)"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El origen es el punto donde se cruzan el eje X y el eje Y, representado matemáticamente como (0,0)."
    },
    {
        "id": 113,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Proporcionalidad y porcentajes",
        "pregunta": "Si un salón tiene 40 alumnos y el 25% lleva lentes, ¿cuántos alumnos llevan lentes?",
        "opciones": [
            {"id": "a", "texto": "15"},
            {"id": "b", "texto": "12"},
            {"id": "c", "texto": "8"},
            {"id": "d", "texto": "10"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "El 25% representa una cuarta parte (1/4). Dividiendo 40 entre 4, el resultado es 10."
    },
    {
        "id": 114,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión - Desarrollo de interpretación",
        "pregunta": "En la frase 'El viento susurraba secretos a través de las ramas', ¿qué figura retórica se está utilizando al atribuir acciones humanas al viento?",
        "opciones": [
            {"id": "a", "texto": "Símil o comparación"},
            {"id": "b", "texto": "Hipérbole"},
            {"id": "c", "texto": "Personificación o prosopopeya"},
            {"id": "d", "texto": "Metáfora"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Dar cualidades o acciones humanas a objetos inanimados o elementos de la naturaleza se llama personificación."
    },
    {
        "id": 115,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Reflexión sobre el sistema de la lengua",
        "pregunta": "¿Cuál de las siguientes palabras es un adverbio de tiempo?",
        "opciones": [
            {"id": "a", "texto": "Rápido"},
            {"id": "b", "texto": "Ayer"},
            {"id": "c", "texto": "Mucho"},
            {"id": "d", "texto": "Lejos"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "'Ayer' responde a la pregunta ¿cuándo?, indicando un momento temporal. 'Rápido' es modo, 'Mucho' es cantidad y 'Lejos' es lugar."
    },
    {
        "id": 116,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Convencionalidades lingüísticas (Acentuación)",
        "pregunta": "Identifica la opción donde la palabra destacada requiere acento diacrítico para indicar que es un pronombre personal y no un artículo:",
        "opciones": [
            {"id": "a", "texto": "Préstame **el** lápiz rojo."},
            {"id": "b", "texto": "Iré contigo, **el** no quiso venir."},
            {"id": "c", "texto": "**El** árbol perdió sus hojas."},
            {"id": "d", "texto": "Me gusta **el** pastel de chocolate."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "En la opción B, 'el' se refiere a una persona, por lo que debe llevar tilde (él). En las demás opciones, 'el' funciona como artículo definido."
    },
    {
        "id": 117,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Análisis de estructura textual",
        "pregunta": "¿Qué tipo de texto tiene como propósito convencer al lector de una idea mediante el uso de argumentos lógicos y opiniones fundamentadas?",
        "opciones": [
            {"id": "a", "texto": "Texto literario"},
            {"id": "b", "texto": "Texto expositivo"},
            {"id": "c", "texto": "Texto normativo"},
            {"id": "d", "texto": "Texto argumentativo"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "El texto argumentativo defiende una postura explícita e intenta persuadir al receptor mediante argumentos."
    },
    {
        "id": 118,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Organización e interpretación de datos",
        "pregunta": "Las calificaciones de Ana fueron: 8, 9, 8, 10, y 7. ¿Cuál es su promedio (media aritmética)?",
        "opciones": [
            {"id": "a", "texto": "8.0"},
            {"id": "b", "texto": "8.4"},
            {"id": "c", "texto": "8.2"},
            {"id": "d", "texto": "8.5"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Se suman todas (8+9+8+10+7 = 42). Al dividir el total (42) entre las 5 materias, el resultado es 8.4."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

data.extend(nuevas_preguntas_guia2)

# Re-enumerar o re-identificar los formativos si es necesario, pero los append no chocan.
with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas las {len(nuevas_preguntas_guia2)} preguntas generadas en base a la Guia 2 a preguntas.json.")

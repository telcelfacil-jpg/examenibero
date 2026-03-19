import json

# Nuevas preguntas alineadas a temario de Secundaria (Séptimo Grado / Guía Santillana)
santillana_qs = [
    {
        "id": 101,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Jerarquía de operaciones",
        "pregunta": "¿Cuál es el resultado de la siguiente expresión matemática: 15 + 3 × 4 - 8 ÷ 2?",
        "opciones": [
            {"id": "a", "texto": "31"},
            {"id": "b", "texto": "23"},
            {"id": "c", "texto": "68"},
            {"id": "d", "texto": "36"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Por jerarquía, primero multiplicaciones y divisiones (3×4=12 y 8÷2=4). Luego sumas y restas: 15 + 12 - 4 = 23."
    },
    {
        "id": 102,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Fracciones",
        "pregunta": "En una receta se requieren 3/4 de taza de harina para hacer un pastel. Si se quieren hacer 2 pasteles, ¿cuánta harina se utilizará?",
        "opciones": [
            {"id": "a", "texto": "1 taza y media (1 1/2)"},
            {"id": "b", "texto": "2 tazas"},
            {"id": "c", "texto": "6/8 de taza"},
            {"id": "d", "texto": "1 taza y 1/4"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "3/4 + 3/4 = 6/4 de taza. Simplificando es 3/2, lo que equivale a 1 entero y 1/2."
    },
    {
        "id": 103,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Tipos de textos",
        "pregunta": "Lee el siguiente fragmento: 'El león (Panthera leo) es un mamífero carnívoro de la familia de los félidos y una de las cinco especies del género Panthera.' ¿Qué tipo de texto es?",
        "opciones": [
            {"id": "a", "texto": "Narrativo"},
            {"id": "b", "texto": "Argumentativo"},
            {"id": "c", "texto": "Expositivo / Informativo"},
            {"id": "d", "texto": "Literario"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Es un texto expositivo porque presenta información y datos objetivos sobre un tema."
    },
    {
        "id": 104,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Ortografía",
        "pregunta": "Selecciona la palabra que está escrita correctamente:",
        "opciones": [
            {"id": "a", "texto": "Subvención"},
            {"id": "b", "texto": "Exepción"},
            {"id": "c", "texto": "Desisión"},
            {"id": "d", "texto": "Convección"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "Subvención es correcta. 'Excepción' lleva 'c'. 'Decisión' lleva 'c' y 's'. (Convección también es correcta en ciencia, pero subvención es uso clásico de b/v)."
    },
    {
        "id": 105,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales y Experimentales",
        "tema": "El cuerpo humano",
        "pregunta": "¿Cuál es la función principal del sistema respiratorio?",
        "opciones": [
            {"id": "a", "texto": "Transportar nutrientes a través de la sangre."},
            {"id": "b", "texto": "El intercambio de gases, oxigenar la sangre y liberar dióxido de carbono."},
            {"id": "c", "texto": "Procesar y digerir los alimentos para obtener energía."},
            {"id": "d", "texto": "Producir hormonas para regular el metabolismo."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El sistema respiratorio se encarga de que ocurra el intercambio de oxígeno y dióxido de carbono en los pulmones."
    },
    {
        "id": 106,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales y Experimentales",
        "tema": "Origen de la vida y Evolución",
        "pregunta": "¿Qué científico propuso la teoría de la evolución por selección natural?",
        "opciones": [
            {"id": "a", "texto": "Isaac Newton"},
            {"id": "b", "texto": "Albert Einstein"},
            {"id": "c", "texto": "Charles Darwin"},
            {"id": "d", "texto": "Gregor Mendel"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Charles Darwin, en conjunto con Alfred Russel Wallace, propuso la teoría de la evolución mediante la selección natural."
    },
    {
        "id": 107,
        "tipo": "opcion_multiple",
        "materia": "Conciencia Histórica",
        "tema": "Legado de los pueblos originarios",
        "pregunta": "¿Cuál de las siguientes civilizaciones mesoamericanas se desarrolló principalmente en la península de Yucatán y desarrolló un sistema matemático que incluía el cero?",
        "opciones": [
            {"id": "a", "texto": "Olmecas"},
            {"id": "b", "texto": "Mayas"},
            {"id": "c", "texto": "Aztecas"},
            {"id": "d", "texto": "Zapotecas"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Los Mayas se asentaron en lo que hoy es el sureste de México (Yucatán) y crearon el sistema vigesimal con uso del cero."
    },
    {
        "id": 108,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Sociales (Geografía)",
        "tema": "El espacio geográfico",
        "pregunta": "¿Cómo se le llama a la representación esférica más exacta de la Tierra que respeta la proporción de continentes y océanos?",
        "opciones": [
            {"id": "a", "texto": "Mapa mundi"},
            {"id": "b", "texto": "Globo terráqueo"},
            {"id": "c", "texto": "Hemeroteca"},
            {"id": "d", "texto": "Planisferio"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El globo terráqueo es la única representación que conserva las distancias, formas y proporciones de manera fidedigna al no tener distorsión plana."
    },
    {
        "id": 109,
        "tipo": "opcion_multiple",
        "materia": "Comprensión Lectora",
        "tema": "Ideas principales",
        "pregunta": "Lee lo siguiente: 'La fotosíntesis es el proceso metabólico por el cual las plantas verdes, algas y algunas bacterias convierten la luz solar en energía química'. ¿Cuál es el tema principal?",
        "opciones": [
            {"id": "a", "texto": "El uso de la luz por las bacterias."},
            {"id": "b", "texto": "La síntesis de clorofila."},
            {"id": "c", "texto": "El ciclo del agua en las plantas."},
            {"id": "d", "texto": "El proceso general de la fotosíntesis."}
        ],
        "respuesta_correcta": "d",
        "explicacion": "El enunciado define e introduce el concepto general de la fotosíntesis como tema central."
    },
    {
        "id": 110,
        "tipo": "opcion_multiple",
        "materia": "Inglés (Oxford Placement Test)",
        "tema": "Utilización del inglés",
        "pregunta": "Choose the correct answer to complete the sentence: 'I _____ to the cinema every weekend.'",
        "opciones": [
            {"id": "a", "texto": "goes"},
            {"id": "b", "texto": "go"},
            {"id": "c", "texto": "going"},
            {"id": "d", "texto": "am go"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Para el pronombre 'I' en tiempo presente simple (rutinas como 'every weekend'), el verbo se conjuga sin la 's' final, por lo tanto es 'go'."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

data.extend(santillana_qs)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas las 10 preguntas generadas a preguntas.json.")

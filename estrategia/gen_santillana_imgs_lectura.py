import json
import os

preguntas_comprension_lectora = [
    {
        "id": 131,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión lectora",
        "pregunta": "Lee el siguiente fragmento y responde: 'Intenta lograr tus metas. Para ello, aliméntate con el delicioso sabor de CEREAPLUS, adicionado con vitaminas, minerales y hierro... Prueba sus deliciosos sabores: fresas con crema, vainilla y chocolate con nuez.'\n\nEl texto anterior es...",
        "opciones": [
            {"id": "a", "texto": "un anuncio."},
            {"id": "b", "texto": "una descripción."},
            {"id": "c", "texto": "una invitación."},
            {"id": "d", "texto": "un refrán."}
        ],
        "respuesta_correcta": "a",
        "explicacion": "El texto tiene como propósito persuadir al lector para que consuma un producto determinado (CEREAPLUS), lo cual es la función principal de un anuncio publicitario."
    },
    {
        "id": 132,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Análisis de textos publicitarios",
        "pregunta": "Según el texto anterior del cereal CEREAPLUS, ¿cuál es la intención del texto?",
        "opciones": [
            {"id": "a", "texto": "Convencer al lector de alimentarse bien."},
            {"id": "b", "texto": "Presentar al lector ingredientes sanos."},
            {"id": "c", "texto": "Exponer al lector cómo practicar un pasatiempo."},
            {"id": "d", "texto": "Convencer al lector de consumir un cereal."}
        ],
        "respuesta_correcta": "d",
        "explicacion": "Aunque menciona ingredientes y metas, el propósito comercial real de cualquier anuncio de este tipo es lograr que la gente compre y consuma su producto."
    },
    {
        "id": 133,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Análisis de textos publicitarios",
        "pregunta": "¿Cuál de los siguientes enunciados cuestiona al lector del anuncio de CEREAPLUS?",
        "opciones": [
            {"id": "a", "texto": "¡Tú eres lo que comes!"},
            {"id": "b", "texto": "Prueba sus deliciosos sabores."},
            {"id": "c", "texto": "Andar en patineta."},
            {"id": "d", "texto": "¿Te parece poco?"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "Cuestionar significa hacer una pregunta directa e interpelar al lector, y '¿Te parece poco?' utiliza signos de interrogación para lograr este efecto."
    },
    {
        "id": 134,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión lectora",
        "pregunta": "Según el anuncio de CEREAPLUS, su nuevo ingrediente único que fortalece los huesos es...",
        "opciones": [
            {"id": "a", "texto": "extracalcio."},
            {"id": "b", "texto": "minerales."},
            {"id": "c", "texto": "hierro."},
            {"id": "d", "texto": "vitaminas."}
        ],
        "respuesta_correcta": "a",
        "explicacion": "El texto menciona explícitamente: 'su nuevo Extracalcio, un ingrediente único de CEREAPLUS que fortalece tus huesos'."
    },
    {
        "id": 135,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión lectora",
        "pregunta": "Según el anuncio, ¿cuántos sabores ofrece CEREAPLUS?",
        "opciones": [
            {"id": "a", "texto": "Dos"},
            {"id": "b", "texto": "Tres"},
            {"id": "c", "texto": "Cuatro"},
            {"id": "d", "texto": "Cinco"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El texto enlista los siguientes sabores: 1) fresas con crema, 2) vainilla y 3) chocolate con nuez. Por lo tanto, ofrece tres sabores."
    },
    {
        "id": 136,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Recursos literarios",
        "pregunta": "¿Cuál es el recurso que se utiliza en la frase publicitaria '¡tú eres lo que comes!'?",
        "opciones": [
            {"id": "a", "texto": "Metáfora"},
            {"id": "b", "texto": "Comparación"},
            {"id": "c", "texto": "Juego de palabras"},
            {"id": "d", "texto": "Hipérbole"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "Es una metáfora porque identifica directamente la identidad de la persona ('tú eres') con la calidad de sus alimentos ('lo que comes'), sin utilizar un nexo comparativo como 'como'."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in preguntas_comprension_lectora if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas de comprensión lectora de Santillana a preguntas.json.")

import json
import os

preguntas_civica = [
    {
        "id": 1009,
        "tipo": "opcion_multiple",
        "materia": "Formación Cívica y Ética",
        "tema": "Inclusión y Equidad",
        "pregunta": "¿Qué opción señala el respeto a las diferencias físicas?",
        "opciones": [
            {"id": "a", "texto": "Dirigirse a los compañeros como 'cuatro ojos', 'el gordo', 'jirafa', 'ñoño'."},
            {"id": "b", "texto": "Excluir de los juegos a compañeros que tienen alguna discapacidad."},
            {"id": "c", "texto": "Prohibir que las niñas jueguen en el equipo de futbol de la escuela."},
            {"id": "d", "texto": "Dirigirse a los compañeros por su nombre y convivir con todos."}
        ],
        "respuesta_correcta": "d",
        "explicacion": "El respeto implica llamar a cada persona por su nombre, evitando apodos o discriminación, y fomentando la convivencia armónica."
    },
    {
        "id": 1010,
        "tipo": "opcion_multiple",
        "materia": "Formación Cívica y Ética",
        "tema": "Empatía y Respeto",
        "pregunta": "Se habla de respeto a las diferencias emocionales cuando un compañero llora y los demás le dicen...",
        "opciones": [
            {"id": "a", "texto": "'los hombres no lloran'."},
            {"id": "b", "texto": "'entendemos cómo te sientes'."},
            {"id": "c", "texto": "'aguántate como los machos'."},
            {"id": "d", "texto": "'no llores, no es para tanto'."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Validar y comprender las emociones ajenas es la base de la empatía y el respeto a la sensibilidad de cada individuo."
    },
    {
        "id": 1011,
        "tipo": "opcion_multiple",
        "materia": "Formación Cívica y Ética",
        "tema": "Estereotipos de género",
        "pregunta": "¿Cuál opción es un ejemplo de estereotipo?",
        "opciones": [
            {"id": "a", "texto": "Angélica no compra en la panadería porque vio un insecto."},
            {"id": "b", "texto": "Pedro fue expulsado del equipo por pelear."},
            {"id": "c", "texto": "Javier le rompió a Mario su lapicera rosa porque ese color es de niñas."},
            {"id": "d", "texto": "Mariana obtuvo un reconocimiento por su alta calificación."}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Asignar un color exclusivamente a un género biológico (rosa = niñas) es un estereotipo social que limita la libertad de elección."
    },
    {
        "id": 1012,
        "tipo": "opcion_multiple",
        "materia": "Formación Cívica y Ética",
        "tema": "Cambios durante la adolescencia",
        "pregunta": "Es una característica física que marca el inicio de la adolescencia.",
        "opciones": [
            {"id": "a", "texto": "Aparición de vello en las axilas y crecimiento de bigote en hombres y mujeres."},
            {"id": "b", "texto": "Consolidación de la personalidad del hombre y la mujer."},
            {"id": "c", "texto": "Crecimiento de senos en las mujeres; aparición de barba en los hombres."},
            {"id": "d", "texto": "Falta de comunicación con los adultos o familiares cercanos."}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Son caracteres sexuales secundarios que surgen durante la pubertad y marcan físicamente el desarrollo hacia la madurez."
    },
    {
        "id": 1013,
        "tipo": "opcion_multiple",
        "materia": "Formación Cívica y Ética",
        "tema": "Cambios durante la adolescencia",
        "pregunta": "Una característica psicológica durante la adolescencia es...",
        "opciones": [
            {"id": "a", "texto": "una mejor relación con los padres."},
            {"id": "b", "texto": "la búsqueda de identidad."},
            {"id": "c", "texto": "una mayor seguridad en sí mismo."},
            {"id": "d", "texto": "la búsqueda de amigos del sexo opuesto."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Una de las etapas psicológicas más importantes en la adolescencia es la conformación de la propia identidad, cuestionando y descubriendo quiénes son."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

data.extend(preguntas_civica)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_civica)} preguntas de Formación Cívica de santillana.")

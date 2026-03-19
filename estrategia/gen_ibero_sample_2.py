import json

preguntas_ibero_muestra2 = [
    {
        "id": 163,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Números naturales, fracciones y decimales",
        "pregunta": "Una receta necesita 2/3 de taza de azúcar. Si solo tienes una taza medidora de 1/6, ¿cuántas veces debes llenarla?",
        "opciones": [
            {"id": "a", "texto": "2"},
            {"id": "b", "texto": "3"},
            {"id": "c", "texto": "4"},
            {"id": "d", "texto": "6"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Para saber cuántos 1/6 caben en 2/3, buscamos fracciones equivalentes. Multiplicamos 2/3 por 2 arriba y abajo para convertir a sextos: (2x2)/(3x2) = 4/6. Entonces necesitas llenar la taza de 1/6 cuatro veces."
    },
    {
        "id": 164,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Proporcionalidad y porcentajes",
        "pregunta": "Si 4 cuadernos cuestan $72, ¿cuánto costarán 7 cuadernos al mismo precio?",
        "opciones": [
            {"id": "a", "texto": "$98"},
            {"id": "b", "texto": "$126"},
            {"id": "c", "texto": "$112"},
            {"id": "d", "texto": "$108"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Primero obtenemos el valor unitario (cuánto cuesta un cuaderno): 72 ÷ 4 = 18. Luego multiplicamos por los 7 cuadernos: 18 x 7 = 126."
    },
    {
        "id": 165,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Patrones y secuencias numéricas",
        "pregunta": "Observa la secuencia:\n3, 6, 12, 24, ___",
        "opciones": [
            {"id": "a", "texto": "36"},
            {"id": "b", "texto": "48"},
            {"id": "c", "texto": "30"},
            {"id": "d", "texto": "60"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El patrón de esta secuencia es multiplicar por 2 el número anterior. 3x2=6, 6x2=12, 12x2=24. El siguiente número es 24x2=48."
    },
    {
        "id": 166,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Proporcionalidad y porcentajes",
        "pregunta": "En un grupo hay 40 alumnos. El 30% son niñas. ¿Cuántas niñas hay?",
        "opciones": [
            {"id": "a", "texto": "10"},
            {"id": "b", "texto": "12"},
            {"id": "c", "texto": "14"},
            {"id": "d", "texto": "16"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Para calcular el 30% de 40, podemos multiplicar 40 por su valor decimal 0.30 (40 x 0.30 = 12) o bien dividir 40/10=4 (que es el 10%) y multiplicarlo por 3 = 12 niñas."
    },
    {
        "id": 167,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión lectora",
        "pregunta": "Lee:\n\"El desierto parece un lugar vacío, pero en realidad alberga una gran variedad de plantas y animales que se han adaptado a las altas temperaturas.\"\n\n¿Qué significa “alberga”?",
        "opciones": [
            {"id": "a", "texto": "Destruye"},
            {"id": "b", "texto": "Oculta"},
            {"id": "c", "texto": "Aloja"},
            {"id": "d", "texto": "Calienta"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "En el contexto de la oración, \"alberga\" significa que sirve de hogar o alojamiento a una variedad de plantas y animales."
    },
    {
        "id": 168,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión lectora",
        "pregunta": "Lee:\n\"El desierto parece un lugar vacío, pero en realidad alberga una gran variedad de plantas y animales que se han adaptado a las altas temperaturas.\"\n\n¿Qué tipo de texto es?",
        "opciones": [
            {"id": "a", "texto": "Narrativo"},
            {"id": "b", "texto": "Informativo"},
            {"id": "c", "texto": "Instructivo"},
            {"id": "d", "texto": "Poético"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Es un texto informativo (o expositivo) porque su objetivo principal es explicar y dar a conocer hechos sobre la flora y la fauna del desierto de forma objetiva."
    },
    {
        "id": 169,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Uso correcto de mayúsculas y puntos",
        "pregunta": "¿Cuál oración está correctamente escrita?",
        "opciones": [
            {"id": "a", "texto": "Ayer fuimos ala playa."},
            {"id": "b", "texto": "Ayer fuimos a la playa."},
            {"id": "c", "texto": "Ayer fuimos ala playa"},
            {"id": "d", "texto": "Ayer fuimos a la playa"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "La opción B está correcta: las palabras están separadas debidamente ('a la' y no 'ala'), comienza con mayúscula y termina con el punto final correspondiente."
    },
    {
        "id": 170,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Partes de la oración: sujeto, predicado",
        "pregunta": "Identifica el sujeto:\n\"Los volcanes activos representan un riesgo.\"",
        "opciones": [
            {"id": "a", "texto": "activos"},
            {"id": "b", "texto": "representan"},
            {"id": "c", "texto": "Los volcanes activos"},
            {"id": "d", "texto": "riesgo"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El sujeto es la persona, animal o cosa de la que se habla y que realiza la acción del verbo. ¿Quiénes representan un riesgo? \"Los volcanes activos\"."
    },
    {
        "id": 171,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Ambientes y ecosistemas",
        "pregunta": "Si un ecosistema pierde muchos árboles, ¿qué puede ocurrir?",
        "opciones": [
            {"id": "a", "texto": "Aumenta el oxígeno"},
            {"id": "b", "texto": "Disminuye la biodiversidad"},
            {"id": "c", "texto": "Se forman más ríos"},
            {"id": "d", "texto": "No pasa nada"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Los árboles son el hábitat y fuente de alimento para muchas especies; al perderlos, disminuye la variedad de vida y el equilibrio ecológico (biodiversidad)."
    },
    {
        "id": 172,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Ciudadanía, derechos humanos y diversidad",
        "pregunta": "¿Por qué el Día de la Independencia se celebra el 16 de septiembre?",
        "opciones": [
            {"id": "a", "texto": "Porque ese día terminó la guerra"},
            {"id": "b", "texto": "Porque fue el inicio del movimiento independentista"},
            {"id": "c", "texto": "Porque se firmó la Constitución"},
            {"id": "d", "texto": "Porque nació Miguel Hidalgo"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El 16 de septiembre de 1810 se considera el inicio del movimiento de Independencia de México, con el grito de Dolores proclamado por el cura Miguel Hidalgo."
    }
]


file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in preguntas_ibero_muestra2 if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas de la lista 2 (Nivel Secundaria) a preguntas.json.")

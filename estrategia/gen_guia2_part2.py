import json

nuevas_preguntas_guia2_p2 = [
    {
        "id": 119,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Números naturales y lectura",
        "pregunta": "¿Cómo se lee correctamente el número 2,000,005,000,000?",
        "opciones": [
            {"id": "a", "texto": "Dos mil millones cinco mil."},
            {"id": "b", "texto": "Dos billones cinco mil millones."},
            {"id": "c", "texto": "Dos trillones cinco mil."},
            {"id": "d", "texto": "Dos mil billones cinco mil millones."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El número tiene 12 ceros (o cifras) a la derecha del 2. Un billón es un millón de millones (12 ceros). Por lo tanto, es 'Dos billones', seguido de 'cinco mil millones'."
    },
    {
        "id": 120,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Fracciones y operaciones",
        "pregunta": "¿Cuál es el resultado de sumar 1/4 + 1/2?",
        "opciones": [
            {"id": "a", "texto": "2/6"},
            {"id": "b", "texto": "3/4"},
            {"id": "c", "texto": "1/3"},
            {"id": "d", "texto": "2/4"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Para sumar, se requiere un denominador común. 1/2 es equivalente a 2/4. Sumando: 1/4 + 2/4 = 3/4."
    },
    {
        "id": 121,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Fracciones",
        "pregunta": "Si divides 3/5 entre 2 (un número natural), ¿cuál es el resultado correcto?",
        "opciones": [
            {"id": "a", "texto": "3/10"},
            {"id": "b", "texto": "6/5"},
            {"id": "c", "texto": "1.5/5"},
            {"id": "d", "texto": "3/2.5"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "Para dividir una fracción entre un entero, se multiplica el denominador de la fracción por el entero: 3 / (5 * 2) = 3/10."
    },
    {
        "id": 122,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Sucesiones numéricas",
        "pregunta": "¿Cuál es el siguiente número en la sucesión aritmética: 7, 13, 19, 25...?",
        "opciones": [
            {"id": "a", "texto": "30"},
            {"id": "b", "texto": "31"},
            {"id": "c", "texto": "33"},
            {"id": "d", "texto": "29"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "En esta sucesión aritmética, la diferencia constante entre cada número es +6. Por lo tanto, 25 + 6 = 31."
    },
    {
        "id": 123,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Figuras y cuerpos geométricos",
        "pregunta": "¿Cuántas caras, aristas y vértices tiene un prisma rectangular (como una caja de zapatos)?",
        "opciones": [
            {"id": "a", "texto": "6 caras, 12 aristas y 8 vértices."},
            {"id": "b", "texto": "4 caras, 8 aristas y 4 vértices."},
            {"id": "c", "texto": "6 caras, 8 aristas y 12 vértices."},
            {"id": "d", "texto": "8 caras, 12 aristas y 6 vértices."}
        ],
        "respuesta_correcta": "a",
        "explicacion": "Un prisma rectangular tiene 6 caras (lados planos), 12 aristas (líneas donde se unen las caras) y 8 vértices (esquinas)."
    },
    {
        "id": 124,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Magnitudes y medidas",
        "pregunta": "Si un recipiente tiene una capacidad de 2.5 litros, ¿cuántos mililitros de agua puede contener?",
        "opciones": [
            {"id": "a", "texto": "250 ml"},
            {"id": "b", "texto": "25 ml"},
            {"id": "c", "texto": "2500 ml"},
            {"id": "d", "texto": "25000 ml"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Un litro equivale a 1000 mililitros (ml). Por lo tanto, 2.5 litros se multiplica por 1000, lo que da 2500 ml."
    },
    {
        "id": 125,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Organización e interpretación de datos",
        "pregunta": "¿Cuál es la 'moda' en el siguiente conjunto de edades: 11, 12, 11, 13, 11, 12, 14?",
        "opciones": [
            {"id": "a", "texto": "11"},
            {"id": "b", "texto": "12"},
            {"id": "c", "texto": "13"},
            {"id": "d", "texto": "12.5"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "La moda en estadística es el valor que se repite con mayor frecuencia. En este caso, el número 11 aparece tres veces, más que cualquier otro."
    },
    {
        "id": 126,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Reflexión sobre el sistema de la lengua",
        "pregunta": "¿Qué tipo de nexo se está utilizando en la oración: 'Estudió mucho para el examen, **por consiguiente**, obtuvo una buena calificación'?",
        "opciones": [
            {"id": "a", "texto": "Nexo de tiempo"},
            {"id": "b", "texto": "Nexo de causa-efecto"},
            {"id": "c", "texto": "Nexo de comparación"},
            {"id": "d", "texto": "Nexo de suma o adición"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "La frase 'por consiguiente' introduce la consecuencia o el efecto de la acción previa (estudiar mucho)."
    },
    {
        "id": 127,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Convencionalidades lingüísticas (Puntuación)",
        "pregunta": "¿Para qué se utiliza el guion largo (—) en los textos narrativos?",
        "opciones": [
            {"id": "a", "texto": "Para separar las sílabas de una palabra muy larga."},
            {"id": "b", "texto": "Para indicar el final de un párrafo."},
            {"id": "c", "texto": "Para introducir los diálogos de los personajes y separarlos de la narración."},
            {"id": "d", "texto": "Para hacer una pausa breve en la lectura."}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El guion largo, también llamado raya, es el signo de puntuación convencional en español para marcar la intervención de cada personaje en un diálogo."
    },
    {
        "id": 128,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Convencionalidades lingüísticas (Siglas)",
        "pregunta": "¿Qué significan estructuralmente instituciones o documentos escritos en mayúsculas sostenidas, como CURP o SEP?",
        "opciones": [
            {"id": "a", "texto": "Son Abreviaturas comunes."},
            {"id": "b", "texto": "Son Siglas o Acrónimos oficiales."},
            {"id": "c", "texto": "Son errores de formato de texto."},
            {"id": "d", "texto": "Son nombres propios de personas."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Las siglas (como CURP) se forman con las letras iniciales de los términos que componen una frase o el nombre de una institución."
    },
    {
        "id": 129,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Tipos de texto",
        "pregunta": "¿Cómo se distingue principalmente un texto formal de uno informal?",
        "opciones": [
            {"id": "a", "texto": "Por su longitud, el formal siempre es más largo."},
            {"id": "b", "texto": "Por el tipo de registro, vocabulario especializado y estructura gramatical frente al lenguaje coloquial y cercano."},
            {"id": "c", "texto": "El texto formal sólo se escribe en computadora y el informal a mano."},
            {"id": "d", "texto": "Por el color de la tinta que se utiliza."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El registro lingüístico varía: el formal emplea un vocabulario preciso, respeta normas estrictas y es cortes, mientras que el informal usa modismos, muletillas y tuteo."
    },
    {
        "id": 130,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Reflexión sobre la lengua (Verbos)",
        "pregunta": "Identifica la opción en donde el verbo está conjugado en *copretérito* (pasado imperfecto):",
        "opciones": [
            {"id": "a", "texto": "Yo comeré una manzana."},
            {"id": "b", "texto": "Nosotros cantamos en el coro."},
            {"id": "c", "texto": "Ellos corrían en el parque todos los días."},
            {"id": "d", "texto": "Tú saltaste la cuerda."}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El copretérito señala una acción pasada que no está terminada de manera precisa o que era habitual. Además, sus terminaciones características son -aba, -ía (como corr-ía-n)."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Evitar duplicados revisando IDs
ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in nuevas_preguntas_guia2_p2 if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas más derivadas de la Guía de Estudio 2.")

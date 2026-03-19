import json
import os

preguntas_extraidas = [
    {
        "id": 1001,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "¿Qué órgano se encarga de la memoria y la coordinación del lenguaje?",
        "opciones": [
            {"id": "a", "texto": "Corazón"},
            {"id": "b", "texto": "Hígado"},
            {"id": "c", "texto": "Cerebro"},
            {"id": "d", "texto": "Esófago"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El cerebro es el órgano del sistema nervioso central que controla las funciones cognitivas, incluida la memoria y el lenguaje."
    },
    {
        "id": 1002,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "¿Cuál de las opciones es parte del sistema locomotor?",
        "opciones": [
            {"id": "a", "texto": "Huesos"},
            {"id": "b", "texto": "Arterias"},
            {"id": "c", "texto": "Cerebro"},
            {"id": "d", "texto": "Corazón"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "El sistema locomotor está formado por el sistema óseo (huesos) y el sistema muscular, permitiendo el movimiento del cuerpo."
    },
    {
        "id": 1003,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "¿Cuál es la principal función del sistema circulatorio?",
        "opciones": [
            {"id": "a", "texto": "Sostener y mover el cuerpo"},
            {"id": "b", "texto": "Regular el funcionamiento de los órganos"},
            {"id": "c", "texto": "Transformar los alimentos y nutrimentos"},
            {"id": "d", "texto": "Llevar la sangre a todo el cuerpo"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "El sistema circulatorio se encarga de transportar la sangre, nutrientes, oxígeno y otras sustancias por todo el cuerpo."
    },
    {
        "id": 1004,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "La eliminación del dióxido de carbono se realiza mediante el sistema...",
        "opciones": [
            {"id": "a", "texto": "circulatorio."},
            {"id": "b", "texto": "respiratorio."},
            {"id": "c", "texto": "muscular."},
            {"id": "d", "texto": "óseo."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El sistema respiratorio expulsa el dióxido de carbono que las células producen, al exhalar el aire de los pulmones."
    },
    {
        "id": 1005,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "¿Cuál es uno de los órganos del sistema digestivo?",
        "opciones": [
            {"id": "a", "texto": "Faringe"},
            {"id": "b", "texto": "Arteria"},
            {"id": "c", "texto": "Cartílago"},
            {"id": "d", "texto": "Ligamento"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "La faringe es un conducto que conecta la boca con el esófago, formando parte del sistema digestivo (y también respiratorio)."
    },
    {
        "id": 1006,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "¿Qué órganos secretan y ayudan a la digestión?",
        "opciones": [
            {"id": "a", "texto": "Estómago y vejiga"},
            {"id": "b", "texto": "Hígado y páncreas"},
            {"id": "c", "texto": "Cerebro y laringe"},
            {"id": "d", "texto": "Pulmones y riñones"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El hígado y el páncreas son glándulas anexas que secretan bilis y jugo pancreático, fundamentales para descomponer los alimentos."
    },
    {
        "id": 1007,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "Los glóbulos blancos que atacan las infecciones son los...",
        "opciones": [
            {"id": "a", "texto": "glóbulos rojos."},
            {"id": "b", "texto": "leucocitos."},
            {"id": "c", "texto": "linfocitos."},
            {"id": "d", "texto": "virus."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Los leucocitos son células del sistema inmunológico, también conocidos como glóbulos blancos, encargados de combatir infecciones."
    },
        {
        "id": 1008,
        "tipo": "opcion_multiple",
        "materia": "Ciencias Naturales",
        "tema": "El cuerpo humano y la salud",
        "pregunta": "¿Qué sistema transporta los desechos mediante orina, heces y sudor?",
        "opciones": [
            {"id": "a", "texto": "inmunológico"},
            {"id": "b", "texto": "Respiratorio"},
            {"id": "c", "texto": "Expulsor"},
            {"id": "d", "texto": "Excretor"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "El sistema excretor elimina las sustancias de desecho de la sangre y el cuerpo a través de la orina y el sudor."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

data.extend(preguntas_extraidas)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_extraidas)} preguntas extraídas visualmente de la carpeta 'santillana' a preguntas.json.")

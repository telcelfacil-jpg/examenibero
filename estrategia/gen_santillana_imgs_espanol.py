import json

preguntas_espanol = [
    {
        "id": 148,
        "tipo": "opcion_multiple",
        "materia": "Español",
        "tema": "Textos Literarios",
        "pregunta": "¿Qué es una fábula?",
        "opciones": [
            {"id": "a", "texto": "Un dicho popular y anónimo que expresa un consejo de forma inmediata."},
            {"id": "b", "texto": "Un relato extenso de ficción con múltiples tramas entrelazadas."},
            {"id": "c", "texto": "Un relato breve del género didáctico protagonizado por animales u objetos que deja una enseñanza."},
            {"id": "d", "texto": "Un texto expositivo que detalla descubrimientos científicos recientes."}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Las fábulas son relatos del género didáctico, habitualmente breves, cuyos protagonistas suelen ser animales u objetos con características humanas, y terminan con una moraleja o enseñanza."
    },
    {
        "id": 149,
        "tipo": "opcion_multiple",
        "materia": "Español",
        "tema": "Textos Literarios",
        "pregunta": "En los textos didácticos y morales breves, ¿cómo se denominan aquellos relatos que están protagonizados principalmente por personas en lugar de animales?",
        "opciones": [
            {"id": "a", "texto": "Mitos"},
            {"id": "b", "texto": "Refranes"},
            {"id": "c", "texto": "Epopeyas"},
            {"id": "d", "texto": "Apólogos"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "A diferencia de la fábula tradicional, protagonizada por animales o seres irracionales, el apólogo suele estar protagonizado por personas que dejan una lección moral."
    },
    {
        "id": 150,
        "tipo": "opcion_multiple",
        "materia": "Español",
        "tema": "Ortografía y Puntuación",
        "pregunta": "En un texto narrativo, ¿qué signo de puntuación se utiliza para indicar las intervenciones de diálogo entre los personajes?",
        "opciones": [
            {"id": "a", "texto": "Las comillas (\" \")"},
            {"id": "b", "texto": "El guion largo (—)"},
            {"id": "c", "texto": "El punto y coma (;)"},
            {"id": "d", "texto": "Los paréntesis ( )"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El guion largo (raya) se utiliza al inicio de las intervenciones en un diálogo de un texto narrativo para indicar el cambio de personaje."
    },
    {
        "id": 151,
        "tipo": "opcion_multiple",
        "materia": "Español",
        "tema": "Textos Literarios",
        "pregunta": "¿Cuál es la principal diferencia entre una fábula y un refrán?",
        "opciones": [
            {"id": "a", "texto": "La fábula es siempre anónima, mientras que el refrán tiene un autor conocido."},
            {"id": "b", "texto": "La fábula narra una historia para exponer una enseñanza, y el refrán presenta una enseñanza directa sin historia previa."},
            {"id": "c", "texto": "La fábula se escribe solo en prosa y el refrán se escribe solo en verso."},
            {"id": "d", "texto": "El refrán es protagonizado por animales y la fábula por personas."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Tanto la fábula como el refrán tienen un carácter didáctico, pero la fábula requiere desarrollar una narrativa (un inicio, clímax y desenlace) para llegar a la moraleja, mientras que el refrán sintetiza la enseñanza en una sola oración popular."
    },
    {
        "id": 152,
        "tipo": "opcion_multiple",
        "materia": "Español",
        "tema": "Textos Literarios",
        "pregunta": "Lee el siguiente texto:\n\n\"El holgazán y descuidado siempre se halla necesitado y menesteroso.\"\n\nPor su brevedad, carácter didáctico e intención de dar una enseñanza, este tipo de texto se conoce como:",
        "opciones": [
            {"id": "a", "texto": "Cuento"},
            {"id": "b", "texto": "Fábula"},
            {"id": "c", "texto": "Refrán"},
            {"id": "d", "texto": "Leyenda"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Un refrán es un dicho popular y anónimo que expresa un consejo o enseñanza de forma muy sintética e inmediata, derivado de la experiencia popular."
    },
    {
        "id": 153,
        "tipo": "opcion_multiple",
        "materia": "Español",
        "tema": "Comprensión Lectora",
        "pregunta": "¿Cuál es el sentido general que transmite el refrán \"Al mal tiempo, buena cara\"?",
        "opciones": [
            {"id": "a", "texto": "Que debemos abrigarnos bien cuando hace mucho frío."},
            {"id": "b", "texto": "Que aunque las situaciones sean adversas, mantener una actitud positiva puede mejorar la situación."},
            {"id": "c", "texto": "Que las personas cambian de actitud dependiendo del clima en su ciudad."},
            {"id": "d", "texto": "Que es conveniente ocultar las emociones en todo momento."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Este refrán aconseja enfrentar las adversidades (el \"mal tiempo\") con buena disposición y optimismo (la \"buena cara\")."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in preguntas_espanol if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas de Español a preguntas.json.")

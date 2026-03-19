import json
import os

preguntas_estrategia = [
    {
        "id": 142,
        "tipo": "opcion_multiple",
        "materia": "Estrategias de Estudio",
        "tema": "Métodos y Técnicas",
        "pregunta": "Según las recomendaciones de estudio, ¿en qué tarea se recomienda usar dos colores, uno para las ideas principales y otro para las secundarias, evitando marcar todo el texto?",
        "opciones": [
            {"id": "a", "texto": "Notas al margen"},
            {"id": "b", "texto": "Prelectura"},
            {"id": "c", "texto": "Subrayado"},
            {"id": "d", "texto": "Resumen"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El subrayado busca facilitar la identificación de contenidos importantes dentro del texto, apoyándose visualmente en dos colores distintos para clasificar la información."
    },
    {
        "id": 143,
        "tipo": "opcion_multiple",
        "materia": "Estrategias de Estudio",
        "tema": "Métodos y Técnicas",
        "pregunta": "¿Qué técnica consiste en una lectura rápida de familiarización para identificar palabras desconocidas y determinar la idea general del texto?",
        "opciones": [
            {"id": "a", "texto": "Lectura comprensiva"},
            {"id": "b", "texto": "Prelectura"},
            {"id": "c", "texto": "Memorizar"},
            {"id": "d", "texto": "Esquema"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "La prelectura (o lectura exploratoria) sirve para un acercamiento inicial con el material de estudio antes de realizar una concentración profunda."
    },
    {
        "id": 144,
        "tipo": "opcion_multiple",
        "materia": "Estrategias de Estudio",
        "tema": "Métodos y Técnicas",
        "pregunta": "¿Cuál etapa es considerada el inicio de la fase más importante del método de estudio, ya que permite demostrar la asimilación estructurando jerárquicamente los datos?",
        "opciones": [
            {"id": "a", "texto": "El resumen"},
            {"id": "b", "texto": "El esquema"},
            {"id": "c", "texto": "El subrayado"},
            {"id": "d", "texto": "Las notas al margen"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El esquema permite ver la relación jerárquica de los datos de manera que, con un solo vistazo, se reconozca el tema completo y se demuestre la comprensión."
    },
    {
        "id": 145,
        "tipo": "opcion_multiple",
        "materia": "Estrategias de Estudio",
        "tema": "Mapas Conceptuales",
        "pregunta": "¿Qué es un mapa conceptual?",
        "opciones": [
            {"id": "a", "texto": "Un resumen redactado a mano de todo el temario."},
            {"id": "b", "texto": "Una gráfica estadística sobre el rendimiento escolar."},
            {"id": "c", "texto": "Una representación gráfica del conocimiento que muestra una red de conceptos."},
            {"id": "d", "texto": "Un cuestionario con preguntas y respuestas literales."}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El mapa conceptual es fundamentalmente visual, utilizando nodos (círculos o cajas) que contienen conceptos, entrelazados para formar una red de conocimiento."
    },
    {
        "id": 146,
        "tipo": "opcion_multiple",
        "materia": "Estrategias de Estudio",
        "tema": "Mapas Conceptuales",
        "pregunta": "En la construcción de un mapa conceptual, ¿cuál es la fase descrita como la más importante porque crea enlaces entre diferentes conceptos usando nexos para formar sentencias lógicas?",
        "opciones": [
            {"id": "a", "texto": "Seleccionar"},
            {"id": "b", "texto": "Agrupar"},
            {"id": "c", "texto": "Comprobar"},
            {"id": "d", "texto": "Conectar"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "La conexión (o enlace) es clave porque, mediante flechas y palabras conectoras (nexos), indica cómo los conceptos previamente solitarios se relacionan entre sí."
    },
    {
        "id": 147,
        "tipo": "opcion_multiple",
        "materia": "Estrategias de Estudio",
        "tema": "Herramientas Digitales",
        "pregunta": "¿Cuál de las siguientes es una herramienta electrónica mencionada específicamente para desarrollar mapas conceptuales?",
        "opciones": [
            {"id": "a", "texto": "Photoshop"},
            {"id": "b", "texto": "MindMeister"},
            {"id": "c", "texto": "Excel"},
            {"id": "d", "texto": "Spotify"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "MindMeister, junto con Mindomo y Mind42, son aplicaciones web especializadas en la elaboración de mapas conceptuales y esquemas mentales."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in preguntas_estrategia if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas de Estrategias de Estudio a preguntas.json.")

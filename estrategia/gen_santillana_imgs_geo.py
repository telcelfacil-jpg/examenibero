import json
import os

preguntas_geometria = [
    {
        "id": 137,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría - Simetría",
        "pregunta": "¿Cuántos ejes de simetría tiene en total un hexágono regular?",
        "opciones": [
            {"id": "a", "texto": "Uno"},
            {"id": "b", "texto": "Tres"},
            {"id": "c", "texto": "Seis"},
            {"id": "d", "texto": "Doce"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Un hexágono regular tiene 6 ejes de simetría: tres ejes que unen los vértices opuestos y otros tres que unen los puntos medios de sus lados opuestos."
    },
    {
        "id": 138,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría - Simetría",
        "pregunta": "¿Cuántos ejes de simetría tiene un triángulo isósceles?",
        "opciones": [
            {"id": "a", "texto": "Cero"},
            {"id": "b", "texto": "Uno"},
            {"id": "c", "texto": "Dos"},
            {"id": "d", "texto": "Tres"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El triángulo isósceles tiene solo un eje de simetría, que es la línea recta que parte desde el vértice donde se cruzan los dos lados iguales hacia el centro del lado desigual."
    },
    {
        "id": 139,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría - Simetría",
        "pregunta": "¿Cuál de los siguientes triángulos NO tiene ejes de simetría?",
        "opciones": [
            {"id": "a", "texto": "Triángulo Equilátero"},
            {"id": "b", "texto": "Triángulo Acutángulo Isósceles"},
            {"id": "c", "texto": "Triángulo Escaleno"},
            {"id": "d", "texto": "Triángulo Rectángulo Isósceles"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El triángulo escaleno tiene sus tres lados con medidas diferentes, por lo que es imposible trazar un eje que lo divida en mitades exactas o reflejadas."
    },
    {
        "id": 140,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría - Cuadriláteros",
        "pregunta": "¿Qué cuadrilátero se caracteriza por tener solo un par de lados opuestos que son paralelos?",
        "opciones": [
            {"id": "a", "texto": "Cuadrado"},
            {"id": "b", "texto": "Rectángulo"},
            {"id": "c", "texto": "Trapecio"},
            {"id": "d", "texto": "Romboide"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El trapecio es un cuadrilátero con un solo par de lados paralelos llamados 'bases' (base mayor y base menor)."
    },
    {
        "id": 141,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría - Cuadriláteros",
        "pregunta": "¿Qué cuadrilátero tiene cuatro lados iguales y cuatro ángulos internos rectos (de 90 grados)?",
        "opciones": [
            {"id": "a", "texto": "Cuadrado"},
            {"id": "b", "texto": "Rombo"},
            {"id": "c", "texto": "Trapecio"},
            {"id": "d", "texto": "Romboide"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "El cuadrado reúne ambas condiciones: paralelogramo de cuatro lados congruentes (iguales) y cuatro ángulos de 90°."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in preguntas_geometria if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas teóricas de geometría a preguntas.json.")

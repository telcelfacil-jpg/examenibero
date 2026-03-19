import json

preguntas_diagnostico = [
    {
        "id": 173,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Operaciones",
        "pregunta": "5/6 - 1/3 =",
        "opciones": [
            {"id": "a", "texto": "4/6"},
            {"id": "b", "texto": "3/6"},
            {"id": "c", "texto": "1/2"},
            {"id": "d", "texto": "2/3"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Para restar, convertimos 1/3 a sextos multiplicando por 2 arriba y abajo: 2/6. Entonces, 5/6 - 2/6 = 3/6. Al simplificar dividiendo entre 3, obtenemos 1/2."
    },
    {
        "id": 174,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Porcentajes",
        "pregunta": "Si un pantalón cuesta $480 y tiene 15% de descuento, ¿cuánto pagarás?",
        "opciones": [
            {"id": "a", "texto": "$408"},
            {"id": "b", "texto": "$72"},
            {"id": "c", "texto": "$420"},
            {"id": "d", "texto": "$465"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "El 10% de 480 es 48, y el 5% es 24. Así que el 15% de descuento son $72. Pagamos: 480 - 72 = 408."
    },
    {
        "id": 175,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría",
        "pregunta": "¿Cuál es el área de un triángulo con base 10 cm y altura 6 cm?",
        "opciones": [
            {"id": "a", "texto": "60"},
            {"id": "b", "texto": "30"},
            {"id": "c", "texto": "16"},
            {"id": "d", "texto": "20"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "La fórmula del área del triángulo es (base × altura) / 2. Sería (10 × 6) / 2 = 60 / 2 = 30."
    },
    {
        "id": 176,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Secuencias",
        "pregunta": "Secuencia: 2, 5, 11, 23, ___",
        "opciones": [
            {"id": "a", "texto": "35"},
            {"id": "b", "texto": "46"},
            {"id": "c", "texto": "47"},
            {"id": "d", "texto": "48"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El patrón es multiplicar el número anterior por 2 y sumarle 1. 2×2+1=5; 5×2+1=11; 11×2+1=23; 23×2+1=47."
    },
    {
        "id": 177,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Proporcionalidad",
        "pregunta": "Si 3 litros cuestan $54, ¿cuánto cuestan 5 litros?",
        "opciones": [
            {"id": "a", "texto": "$75"},
            {"id": "b", "texto": "$80"},
            {"id": "c", "texto": "$90"},
            {"id": "d", "texto": "$85"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Calculamos el precio de 1 litro dividiendo 54 / 3 = 18. Luego, multiplicamos ese precio por 5 litros: 18 × 5 = 90."
    },
    {
        "id": 178,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Decimales y Fracciones",
        "pregunta": "Convierte 0.75 a fracción:",
        "opciones": [
            {"id": "a", "texto": "3/4"},
            {"id": "b", "texto": "7/5"},
            {"id": "c", "texto": "75/10"},
            {"id": "d", "texto": "1/3"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "0.75 significa 75 centésimos (75/100). Dividiendo ambos entre 25 obtenemos la forma simplificada: 3/4."
    },
    {
        "id": 179,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Geometría",
        "pregunta": "El perímetro de un cuadrado es 36 cm. ¿Cuánto mide cada lado?",
        "opciones": [
            {"id": "a", "texto": "6"},
            {"id": "b", "texto": "9"},
            {"id": "c", "texto": "12"},
            {"id": "d", "texto": "18"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El cuadrado tiene 4 lados iguales. Su perímetro se divide en 4: 36 / 4 = 9 cm cada lado."
    },
    {
        "id": 180,
        "tipo": "opcion_multiple",
        "materia": "Pensamiento Matemático",
        "tema": "Operaciones",
        "pregunta": "¿Cuál es el resultado de 2³ × 4?",
        "opciones": [
            {"id": "a", "texto": "16"},
            {"id": "b", "texto": "32"},
            {"id": "c", "texto": "24"},
            {"id": "d", "texto": "12"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "2 elevado a la 3 (2³) es 2 × 2 × 2 = 8. Multiplicado por 4 es 8 × 4 = 32."
    },
    {
        "id": 181,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Comprensión lectora",
        "pregunta": "Lee:\n\n\"La energía solar es una fuente limpia y renovable. No produce contaminación y puede aprovecharse en muchas regiones del mundo.\"\n\nLa idea principal es:",
        "opciones": [
            {"id": "a", "texto": "La energía solar contamina."},
            {"id": "b", "texto": "La energía solar es limpia y útil."},
            {"id": "c", "texto": "La energía se usa en todo el mundo."},
            {"id": "d", "texto": "La contaminación es un problema."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Esta opción resume el mensaje central: las ventajas y aprovechamiento de la energía solar."
    },
    {
        "id": 182,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Vocabulario",
        "pregunta": "¿Qué significa “renovable”?",
        "opciones": [
            {"id": "a", "texto": "Que se puede volver a usar"},
            {"id": "b", "texto": "Que se termina rápido"},
            {"id": "c", "texto": "Que es peligrosa"},
            {"id": "d", "texto": "Que es costosa"}
        ],
        "respuesta_correcta": "a",
        "explicacion": "Renovable hace referencia a un recurso de la naturaleza (como la luz solar o el viento) que se regenera o no se agota con el uso."
    },
    {
        "id": 183,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Acentuación",
        "pregunta": "¿Cuál está correctamente acentuada?",
        "opciones": [
            {"id": "a", "texto": "lapíz"},
            {"id": "b", "texto": "examén"},
            {"id": "c", "texto": "difícil"},
            {"id": "d", "texto": "arbol"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "'Difícil' es una palabra grave que termina en 'l' (consonante distinta de 'n' o 's'), por lo tanto lleva tilde. Lo correcto para las otras sería: lápiz, examen, árbol."
    },
    {
        "id": 184,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Gramática",
        "pregunta": "Identifica el verbo:\n\"Los científicos investigan nuevas vacunas.\"",
        "opciones": [
            {"id": "a", "texto": "científicos"},
            {"id": "b", "texto": "investigan"},
            {"id": "c", "texto": "nuevas"},
            {"id": "d", "texto": "vacunas"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El verbo es la palabra que describe la acción o proceso realizado por el sujeto; en este caso es la acción de investigar."
    },
    {
        "id": 185,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Tipos de texto",
        "pregunta": "¿Qué tipo de texto es el fragmento de la energía solar?",
        "opciones": [
            {"id": "a", "texto": "Narrativo"},
            {"id": "b", "texto": "Informativo"},
            {"id": "c", "texto": "Dramático"},
            {"id": "d", "texto": "Poético"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "El texto intenta explicar datos de la realidad de manera clara y objetiva; carece de personajes o trama literaria."
    },
    {
        "id": 186,
        "tipo": "opcion_multiple",
        "materia": "Lengua y Comunicación",
        "tema": "Redacción",
        "pregunta": "Elige la oración correcta:",
        "opciones": [
            {"id": "a", "texto": "El perro corria rapido."},
            {"id": "b", "texto": "El perro corría rápido."},
            {"id": "c", "texto": "El perro corría rapido."},
            {"id": "d", "texto": "El perro corria rápido."}
        ],
        "respuesta_correcta": "b",
        "explicacion": "'Corría' lleva tilde para deshacer el diptongo (hiato) y 'rápido' lleva tilde por ser palabra esdrújula."
    },
    {
        "id": 187,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Anatomía",
        "pregunta": "El órgano que bombea sangre es:",
        "opciones": [
            {"id": "a", "texto": "Pulmón"},
            {"id": "b", "texto": "Hígado"},
            {"id": "c", "texto": "Corazón"},
            {"id": "d", "texto": "Riñón"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El corazón es el músculo que se relaja y se contrae para bombear la sangre hacia todo el cuerpo a través del sistema circulatorio."
    },
    {
        "id": 188,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Física y Química",
        "pregunta": "¿Qué estado de la materia tiene forma y volumen definidos?",
        "opciones": [
            {"id": "a", "texto": "Líquido"},
            {"id": "b", "texto": "Gas"},
            {"id": "c", "texto": "Sólido"},
            {"id": "d", "texto": "Vapor"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Los sólidos tienen sus partículas muy unidas y organizadas, por lo que conservan una forma y volumen fijos, a diferencia de líquidos o gases."
    },
    {
        "id": 189,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Economía",
        "pregunta": "¿Cuál es una actividad económica primaria?",
        "opciones": [
            {"id": "a", "texto": "Comercio"},
            {"id": "b", "texto": "Agricultura"},
            {"id": "c", "texto": "Transporte"},
            {"id": "d", "texto": "Publicidad"}
        ],
        "respuesta_correcta": "b",
        "explicacion": "Las actividades primarias son aquellas dedicadas a la obtención de materias primas directamente de la naturaleza, como agricultura, ganadería o pesca."
    },
    {
        "id": 190,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Astronomía y Geografía",
        "pregunta": "El movimiento de rotación de la Tierra produce:",
        "opciones": [
            {"id": "a", "texto": "Las estaciones"},
            {"id": "b", "texto": "Los eclipses"},
            {"id": "c", "texto": "El día y la noche"},
            {"id": "d", "texto": "Los terremotos"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "El movimiento de la Tierra girando sobre su propio eje (rotación) da como resultado que una cara esté iluminada por el sol y la otra oscurecida."
    },
    {
        "id": 191,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Geografía de México",
        "pregunta": "¿Cuál es la capital de México?",
        "opciones": [
            {"id": "a", "texto": "Guadalajara"},
            {"id": "b", "texto": "Monterrey"},
            {"id": "c", "texto": "Puebla"},
            {"id": "d", "texto": "Ciudad de México"}
        ],
        "respuesta_correcta": "d",
        "explicacion": "La Ciudad de México (CDMX) es la capital política, cultural y financiera del país."
    },
    {
        "id": 192,
        "tipo": "opcion_multiple",
        "materia": "Conocimientos Generales",
        "tema": "Civismo",
        "pregunta": "Los derechos humanos son:",
        "opciones": [
            {"id": "a", "texto": "Privilegios del gobierno"},
            {"id": "b", "texto": "Leyes escolares"},
            {"id": "c", "texto": "Derechos que tienen todas las personas"},
            {"id": "d", "texto": "Normas de tránsito"}
        ],
        "respuesta_correcta": "c",
        "explicacion": "Son inherentes a todos los seres humanos desde su nacimiento para garantizar su dignidad e integridad sin distinción."
    }
]

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"

with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

ids_existentes = {p.get("id") for p in data if "id" in p}
preguntas_a_agregar = [p for p in preguntas_diagnostico if p["id"] not in ids_existentes]

data.extend(preguntas_a_agregar)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_a_agregar)} preguntas de diagnóstico a preguntas.json.")

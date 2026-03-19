import json
import re

file_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/estrategia/extract_doc1.txt"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# ESTRUCTURA PARA EL SIMULACRO (30 preguntas)
start_simulacro = text.find("PARTE 2: Examen de Estrategia Académica")
end_simulacro = text.find("PARTE 3: Respuestas y Justificación Táctica")
texto_preguntas = text[start_simulacro:end_simulacro]

start_respuestas = text.find("PARTE 3: Respuestas y Justificación Táctica")
end_respuestas = text.find("ESTRUCTURA DETALLADA DE LAS SESIONES")
texto_respuestas = text[start_respuestas:end_respuestas]

respuestas_matches = re.findall(r'\n([A-D])\s*\n\s*\((.*?)\)', texto_respuestas)
respuestas = [{"ans": m[0].strip().lower(), "exp": m[1].strip().replace("\n", " ")} for m in respuestas_matches]

preguntas_matches = list(re.finditer(r'(.*?)\s+A\)\s+(.*?)\s+B\)\s+(.*?)\s+C\)\s+(.*?)\s+D\)\s+(.*?)(?=\n.*?\s+A\)|$)', texto_preguntas, re.DOTALL))

# Limpiar preguntas_matches, el grupo 1 empieza con categorías a veces
preguntas_limpias = []
current_tema = "Razonamiento"
id_counter = 14

for i, m in enumerate(preguntas_matches):
    enunciado = m.group(1).strip()
    
    # Extraer tema si hay "I. Comprensión Lectora..."
    tema_match = re.search(r'(I|II|III|IV|V)\.\s+(.*?)\n(.*)', enunciado, re.DOTALL)
    if tema_match:
        current_tema = tema_match.group(2).strip()
        enunciado = tema_match.group(3).strip()
        
    opts = [
        {"id": "a", "texto": m.group(2).strip().replace("\n", " ")},
        {"id": "b", "texto": m.group(3).strip().replace("\n", " ")},
        {"id": "c", "texto": m.group(4).strip().replace("\n", " ")},
        {"id": "d", "texto": m.group(5).strip().replace("\n", " ")}
    ]
    
    # Ajustar para D si absorbió romanos de la sig. categoría
    # Para ser seguros, ya sabemos que el regex D) hasta ($|\n.*A) corta bien
    
    preguntas_limpias.append({
        "id": id_counter,
        "tipo": "opcion_multiple",
        "materia": "Estrategia Académica",
        "tema": current_tema,
        "pregunta": enunciado.replace("\n", " "),
        "opciones": opts,
        "respuesta_correcta": respuestas[i]["ans"],
        "explicacion": respuestas[i]["exp"]
    })
    id_counter += 1

# Leer preguntas.json
json_path = "c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/data/preguntas.json"
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Agregar "curso de estrategia" como info también
data.append({
    "id": id_counter,
    "tipo": "informativo",
    "materia": "Estrategia Académica",
    "tema": "Fundamentos y Reglas Tácticas",
    "contenido": "Regla de los 45 segundos: No estancarse. Detección de Distractores: Verdad Irrelevante, El Extremo (siempre, nunca), La Inversa. Análisis por Eliminación: Tachar imposibles para subir a 50% de probabilidad."
})

data.extend(preguntas_limpias)

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Agregadas {len(preguntas_limpias)} preguntas de estrategia a preguntas.json.")

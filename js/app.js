// Estado Principal Evolutivo con Persistencia Simulada
const state = {
    user: {
        name: "Ariadna",
        profile: {
            // Mapa de calor: { 'Tema': { correct: 0, total: 0 } }
            performance: JSON.parse(localStorage.getItem('ari_performance')) || {
                "Manejo de Información": { correct: 0, total: 0, priority: 1 },
                "Fracciones": { correct: 0, total: 0, priority: 1 },
                "Oxford English Prep": { correct: 0, total: 0, priority: 1 }
            },
            tacticalScore: 56
        }
    },
    session: {
        questions: [],
        currentIndex: 0,
        tempScore: 0,
        mode: null,
        resultsByTopic: {},
        metadata: {}
    },
    timerInterval: null,
    timeLeft: 45,
    syllabus: [
        {
            category: 'Estrategia y Táctica de Examen',
            icon: 'infoexterna/imagenes/estrategia_icon.png',
            modules: [
                {
                    id: 'mat-strat', title: 'I. Fundamentos y Reglas Tácticas', lessons: [
                        {
                            id: 'mat-e1', title: 'La Regla de los 45 Segundos', file: 'mat_estrategia_tactica.md', dbTopic: 'Fundamentos y Reglas Tácticas', videos: [
                                { title: 'Técnica: Regla 45 Segundos', url: 'infoexterna/imagenes/estrategia_45seg.mp4', isLocal: true },
                                { title: 'Técnicas de Examen', url: 'https://www.youtube.com/embed/Xq4y1s_X6uY' },
                                { title: 'Mentalidad Ganadora', url: 'https://www.youtube.com/embed/QHriWBCSrFY' }
                            ]
                        },
                        {
                            id: 'mat-e2', title: 'Descarte Lógico y Distractores', file: 'strat_descarte.md', dbTopic: 'Técnicas de Descarte', videos: []
                        },
                        {
                            id: 'mat-e3', title: 'Gestión del Estrés y Bloqueos', file: 'strat_estres.md', dbTopic: 'Psicología de Examen', videos: []
                        }
                    ]
                }
            ]
        },
        {
            category: 'PENSAMIENTO MATEMÁTICO', icon: '🧮', modules: [
                {
                    id: 'mat-num', title: 'I. Sistema Numérico', lessons: [
                        {
                            id: 'mat-1', title: 'Lectura de Naturales (Billones)', file: 'mat_naturales.md', dbTopic: 'Operaciones', videos: [
                                { title: 'Cifras hasta Billones', url: 'https://www.youtube.com/embed/bifFFAaUymU' },
                                { title: 'Lectura de Números Grandes', url: 'https://www.youtube.com/embed/F9uIK80Xf0I' }
                            ]
                        },
                        {
                            id: 'mat-2', title: 'Lectura de Decimales y Valor Posicional', file: 'mat_decimales.md', dbTopic: 'Decimales', videos: [
                                { title: 'Valor Posicional', url: 'https://www.youtube.com/embed/3-WSjQwZR24?rel=0&modestbranding=1' },
                                { title: 'Lectura de Decimales', url: 'https://www.youtube.com/embed/o-6d5N7S9-I?rel=0&modestbranding=1' }
                            ]
                        },
                        {
                            id: 'mat-3', title: 'Fracciones en la Recta Numérica', file: 'mat_fracciones_recta.md', dbTopic: 'Fracciones', videos: [
                                { title: 'Fracciones en la Recta', url: 'https://www.youtube.com/embed/wwei2xlNlJ0?rel=0&modestbranding=1' },
                                { title: 'Ubicación de Fracciones', url: 'https://www.youtube.com/embed/pp0cApJD14c?rel=0&modestbranding=1' }
                            ]
                        },
                        {
                            id: 'mat-4', title: 'Sucesiones Aritméticas/Geométricas', file: 'mat_sucesiones.md', dbTopic: 'Jerarquización', videos: [
                                { title: 'Sucesiones Aritméticas', url: 'https://www.youtube.com/embed/QHriWBCSrFY?rel=0&modestbranding=1' },
                                { title: 'Secuencias Lógicas', url: 'https://www.youtube.com/embed/FGoSqeFl5zg?rel=0&modestbranding=1' }
                            ]
                        }
                    ]
                },
                {
                    id: 'mat-geo', title: 'II. Geometría y Medida', lessons: [
                        {
                            id: 'mat-5', title: 'Rectas Paralelas y Perpendiculares', file: 'mat_rectas.md', dbTopic: 'Geometría', videos: [
                                { title: 'Tipos de Rectas', url: 'https://www.youtube.com/embed/Vl6M20p0_hY' },
                                { title: 'Rectas y Ángulos', url: 'https://www.youtube.com/embed/v5Qk0dF0w_A' }
                            ]
                        },
                        {
                            id: 'mat-6', title: 'Ángulos: Agudos, Rectos y Obtusos', file: 'mat_angulos.md', dbTopic: 'Geometría', videos: [
                                { title: 'Los Ángulos', url: 'https://www.youtube.com/embed/s71k0TGE29s' },
                                { title: 'Clasificación de Ángulos', url: 'https://www.youtube.com/embed/oKz_1lXvU-U' }
                            ]
                        },
                        {
                            id: 'mat-7', title: 'Triángulos y Cuadriláteros', file: 'mat_figuras.md', dbTopic: 'Geometría', videos: [
                                { title: 'Triángulos', url: 'https://www.youtube.com/embed/3_m9S-V-0-w' },
                                { title: 'Cuadriláteros', url: 'https://www.youtube.com/embed/GIs7IuF9C9s' }
                            ]
                        },
                        {
                            id: 'mat-8', title: 'Prismas: Caras, Aristas y Vértices', file: 'mat_prismas.md', dbTopic: 'Figuras y cuerpos geométricos', videos: [
                                { title: 'Partes de un Prisma', url: 'https://www.youtube.com/embed/28gB4s80B_k' },
                                { title: 'Cuerpos Geométricos', url: 'https://www.youtube.com/embed/n0j1XwaroHs' }
                            ]
                        }
                    ]
                },
                {
                    id: 'mat-est', title: 'III. Razones y Estadística', lessons: [
                        {
                            id: 'mat-9', title: 'Cálculo de Porcentajes (%)', file: 'mat_porcentajes.md', dbTopic: 'Proporcionalidad y porcentajes', videos: [
                                { title: 'Truco de Porcentajes', url: 'https://www.youtube.com/embed/ETvdn26fy_w' },
                                { title: 'Porcentajes Rápidos', url: 'https://www.youtube.com/embed/RE3XoDORupw' }
                            ]
                        },
                        {
                            id: 'mat-10', title: 'Media, Mediana y Moda', file: 'mat_estadistica.md', dbTopic: 'Organización e interpretación de datos', videos: [
                                { title: 'Media Mediana y Moda', url: 'https://www.youtube.com/embed/0DA7Wtz1ddg' },
                                { title: 'Medidas de Tendencia Central', url: 'https://www.youtube.com/embed/fTIsA0u6p_w' }
                            ]
                        },
                        {
                            id: 'mat-11', title: 'Lectura de Gráficas de Barras', file: 'mat_graficas.md', dbTopic: 'Organización e interpretación de datos', videos: [
                                { title: 'Gráficas de Barras', url: 'https://www.youtube.com/embed/J-lDNbS2wS8' },
                                { title: 'Interpretación de Datos', url: 'https://www.youtube.com/embed/L2F2VkFaS_U' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            category: 'LENGUA Y COMUNICACIÓN', icon: '📖', modules: [
                {
                    id: 'len-comp', title: 'I. Comprensión Lectora', lessons: [
                        {
                            id: 'len-1', title: 'Idea Principal y Secundarias', file: 'len_idea_principal.md', dbTopic: 'Comprensión lectora', videos: [
                                { title: 'Idea Principal', url: 'https://www.youtube.com/embed/Lh33p67gS1o' },
                                { title: 'Identificar Ideas', url: 'https://www.youtube.com/embed/3m4fV-qI-YI' }
                            ]
                        },
                        {
                            id: 'len-2', title: 'Deducción en Cuentos y Relatos', file: 'len_inferencias.md', dbTopic: 'Comprensión lectora', videos: [
                                { title: 'Inferencias Lectoras', url: 'https://www.youtube.com/embed/H0W9U3Uub_Y' },
                                { title: 'Estrategias de Lectura', url: 'https://www.youtube.com/embed/W9l8c7_h7v0' }
                            ]
                        },
                        {
                            id: 'len-3', title: 'Hecho vs. Opinión', file: 'len_hechos.md', dbTopic: 'Comprensión lectora', videos: [
                                { title: 'Hechos y Opiniones', url: 'https://www.youtube.com/embed/A59zLidpI38' },
                                { title: 'Diferencias Clave', url: 'https://www.youtube.com/embed/Xq4y1s_X6uY' }
                            ]
                        }
                    ]
                },
                {
                    id: 'len-gram', title: 'II. Reflexión Lingüística', lessons: [
                        {
                            id: 'len-4', title: 'Clases de Palabras (SEGA)', file: 'len_sega.md', dbTopic: 'Acentuación', videos: [
                                { title: 'Método SEGA', url: 'https://www.youtube.com/embed/o_6O9oX6y7o' },
                                { title: 'Reglas de Acentuación', url: 'https://www.youtube.com/embed/3nC03u0hB_8' }
                            ]
                        },
                        {
                            id: 'len-5', title: 'Uso de Nexos y Conectores', file: 'len_nexos.md', dbTopic: 'Reflexión sobre el sistema de la lengua', videos: [
                                { title: 'Conectores Lógicos', url: 'https://www.youtube.com/embed/35W9w8YQfD0' },
                                { title: 'Nexos en el Texto', url: 'https://www.youtube.com/embed/v9YI8p_c3E0' }
                            ]
                        },
                        {
                            id: 'len-6', title: 'Signos de Puntuación (Coma/Punto)', file: 'len_puntuacion.md', dbTopic: 'Convencionalidades lingüísticas (Puntuación)', videos: [
                                { title: 'Signos de Puntuación', url: 'https://www.youtube.com/embed/vO-cZ0G7vRE' },
                                { title: 'Uso de la Coma', url: 'https://www.youtube.com/embed/G6g8x1N7eJ8' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            category: 'CONOCIMIENTOS GENERALES', icon: '🌎', modules: [
                {
                    id: 'gen-cien', title: 'Ciencias Naturales', lessons: [
                        { id: 'sci-1', title: 'Sistemas del Cuerpo Humano', file: 'sci_cuerpo.md', dbTopic: 'Cuerpo Humano' },
                        { id: 'sci-2', title: 'Propiedades de la Materia', file: 'sci_materia.md', dbTopic: 'Materia' },
                        { id: 'sci-3', title: 'Energía: Luz, Sonido y Calor', file: 'sci_energy.md', dbTopic: 'Energía' },
                        { id: 'sci-4', title: 'Bio-diversidad y Ecosistemas', file: 'sci_ecosistemas.md', dbTopic: 'Ecología' },
                        { id: 'sci-5', title: 'El Sistema Solar y el Universo', file: 'sci_universo.md', dbTopic: 'Universo' }
                    ]
                },
                {
                    id: 'gen-soc', title: 'Geografía e Historia', lessons: [
                        { id: 'soc-1', title: 'Geografía Física de México', file: 'soc_geografia.md', dbTopic: 'Geografía de México' },
                        { id: 'soc-2', title: 'Historia: Época Prehispánica', file: 'soc_prehispanica.md', dbTopic: 'Historia' },
                        { id: 'soc-3', title: 'La Independencia de México', file: 'soc_independencia.md', dbTopic: 'Historia' },
                        { id: 'soc-4', title: 'Derechos Humanos y Ciudadanía', file: 'soc_derechos.md', dbTopic: 'Ciudadanía' },
                        { id: 'soc-5', title: 'Actividades Económicas y PIB', file: 'soc_pib.md', dbTopic: 'Economía' }
                    ]
                }
            ]
        },
        {
            category: 'OXFORD ENGLISH PREP', icon: 'infoexterna/imagenes/oxford_badge.png', modules: [
                {
                    id: 'eng-modules', title: 'Oxford Test of English (OTE)', lessons: [
                        { id: 'eng-1', title: 'Speaking: Interview & Photos (A2)', file: 'eng_speaking_a2.md', dbTopic: 'Speaking' },
                        { id: 'eng-2', title: 'Listening: Basic Conversations (A2)', file: 'eng_listening_a2.md', dbTopic: 'Listening' },
                        { id: 'eng-3', title: 'Reading: Signs & Short Emails (A2)', file: 'eng_reading_a2.md', dbTopic: 'Reading' },
                        { id: 'eng-4', title: 'Writing: Short Notes & Stories (A2)', file: 'eng_writing_a2.md', dbTopic: 'Writing' },
                        { id: 'eng-5', title: 'Grammar Essence (B1)', file: 'eng_grammar_1.md', dbTopic: 'Grammar' },
                        { id: 'eng-6', title: 'Essential Vocabulary', file: 'eng_vocab_1.md', dbTopic: 'Vocabulary' }
                    ]
                }
            ]
        }
    ],
    // MODO SEGURO: Datos embebidos para cuando falla el servidor (CORS)
    safeEntries: {
        questions: [
            { id: "s1", materia: "Matemáticas", tema: "Fracciones", pregunta: "En modo seguro: ¿Qué es mayor, 1/2 o 1/4?", opciones: [{ id: 'a', texto: '1/2' }, { id: 'b', texto: '1/4' }], respuesta_correcta: 'a', explicacion: "1/2 es la mitad, 1/4 es la cuarta parte." },
            { id: "s2", materia: "Lenguaje", tema: "Acentuación", pregunta: "¿Cuál palabra es aguda?", opciones: [{ id: 'a', texto: 'CamadA' }, { id: 'b', texto: 'Café' }], respuesta_correcta: 'b', explicacion: "Café lleva la fuerza en la última sílaba." }
        ],
        lessonFallback: "# Acceso incorrecto\n\nEstás abriendo el archivo directamente desde tu carpeta (`file://`), y por seguridad el navegador bloquea la carga dinámica de las lecciones.\n\n**Para ver el contenido completo:**\n1. Abre una terminal en la carpeta del proyecto.\n2. Ejecuta **`npm run serve`**.\n3. Abre tu navegador en **`http://127.0.0.1:4173`**.\n\nCon eso volverán a cargarse textos, preguntas y videos."
    },
};

const topicAliases = {
    "TÃ©cnicas de Descarte": ["Pensamiento CrÃ­tico y Descarte Directo", "MÃ©todos y TÃ©cnicas", "Estrategias de Estudio"],
    "PsicologÃ­a de Examen": ["MÃ©todos y TÃ©cnicas", "Estrategias de Estudio"],
    "ComprensiÃ³n lectora": ["ComprensiÃ³n Lectora y Vocabulario en Contexto", "Textos Literarios", "AnÃ¡lisis de textos publicitarios", "Tipos de texto", "Manejo de InformaciÃ³n"],
    "ReflexiÃ³n sobre el sistema de la lengua": ["Estructura de la Lengua (Concordancia y Trampas Gramaticales)", "SinÃ³nimos", "OrtografÃ­a"],
    "Convencionalidades lingÃ¼Ã­sticas (PuntuaciÃ³n)": ["Signos de PuntuaciÃ³n", "OrtografÃ­a"],
    "JerarquizaciÃ³n": ["Secuencias", "Razonamiento LÃ³gico y AnalogÃ­as"],
    "Figuras y cuerpos geomÃ©tricos": ["GeometrÃ­a", "GeometrÃ­a - CuadrilÃ¡teros", "GeometrÃ­a - SimetrÃ­a"],
    "Cuerpo Humano": ["El cuerpo humano y la salud", "Cambios durante la adolescencia", "Ciencias Naturales"],
    "Materia": ["Ciencias Naturales", "Propiedades de la materia"],
    "EnergÃ­a": ["Ciencias Naturales", "Luz, sonido y calor", "EnergÃ­a"],
    "CiudadanÃ­a": ["Civismo", "FormaciÃ³n CÃ­vica y Ã‰tica"],
    "EcologÃ­a": ["Ambientes y ecosistemas", "Ciencias Naturales"],
    "Universo": ["AstronomÃ­a y GeografÃ­a", "Ciencias Naturales"],
    "Historia": ["Conciencia HistÃ³rica", "Historia"],
    "GeografÃ­a de MÃ©xico": ["GeografÃ­a", "Ciencias Sociales (GeografÃ­a)", "AstronomÃ­a y GeografÃ­a"],
    "EconomÃ­a": ["Actividades econÃ³micas de MÃ©xico", "Conocimientos Generales"],
    "Reading": ["ComprensiÃ³n Lectora y Vocabulario en Contexto", "Everyday Vocabulary", "Reading"],
    "Listening": ["Listening", "Everyday Vocabulary"],
    "Speaking": ["Speaking", "Everyday Vocabulary", "Present Simple vs Continuous"],
    "Writing": ["Writing", "Grammar", "GramÃ¡tica"],
    "Grammar": ["Grammar", "GramÃ¡tica", "Present Simple vs Continuous", "Present Continuous", "Estructura de la Lengua (Concordancia y Trampas Gramaticales)"],
    "Vocabulary": ["Vocabulary", "Everyday Vocabulary", "ComprensiÃ³n Lectora y Vocabulario en Contexto"]
};

const weakTopicSeeds = [
    "manejo de informacion",
    "comprension lectora",
    "fracciones",
    "present simple vs continuous",
    "everyday vocabulary"
];

const placementBands = [
    { min: 0, label: "A1", description: "Reconoce vocabulario y estructuras muy bÃ¡sicas." },
    { min: 40, label: "A2", description: "Comprende situaciones cotidianas y consignas simples." },
    { min: 58, label: "B1", description: "Resuelve textos breves y gramÃ¡tica funcional con autonomÃ­a." },
    { min: 76, label: "B2", description: "Interpreta detalles, intenciÃ³n y estructuras menos frecuentes." },
    { min: 90, label: "C1", description: "Sostiene un desempeÃ±o avanzado y consistente." }
];

const finalExamBlueprint = [
    {
        key: "math",
        label: "Pensamiento MatemÃ¡tico",
        count: 29,
        secondsPerQuestion: 103,
        matcher: (question) => {
            const materia = normalizeText(question.materia);
            return materia.includes("matematic") || materia.includes("logica");
        }
    },
    {
        key: "language",
        label: "Lengua y ComunicaciÃ³n",
        count: 26,
        secondsPerQuestion: 104,
        matcher: (question) => {
            const materia = normalizeText(question.materia);
            return materia.includes("lengua") || materia.includes("espanol") || materia.includes("comprension lectora");
        }
    },
    {
        key: "general",
        label: "Conocimientos Generales",
        count: 17,
        secondsPerQuestion: 106,
        matcher: (question) => {
            const materia = normalizeText(question.materia);
            return materia.includes("ciencias") || materia.includes("conocimientos generales") || materia.includes("historia") || materia.includes("geografia") || materia.includes("ciudadania") || materia.includes("formacion civica");
        }
    },
    {
        key: "english",
        label: "Oxford English",
        count: 28,
        secondsPerQuestion: 107,
        matcher: (question) => isEnglishQuestion(question)
    }
];

function normalizeText(value = "") {
    return value
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function shuffleArray(items = []) {
    return [...items].sort(() => Math.random() - 0.5);
}

function cloneQuestion(question, overrides = {}) {
    return {
        ...question,
        opciones: Array.isArray(question.opciones) ? shuffleArray(question.opciones.map((option) => ({ ...option }))) : question.opciones,
        elementos: Array.isArray(question.elementos) ? shuffleArray(question.elementos.map((item) => ({ ...item }))) : question.elementos,
        columnas: question.columnas ? {
            izquierda: question.columnas.izquierda.map((item) => ({ ...item })),
            derecha: shuffleArray(question.columnas.derecha.map((item) => ({ ...item })))
        } : question.columnas,
        sourceId: question.id,
        ...overrides
    };
}

function isEnglishQuestion(question) {
    const materia = normalizeText(question.materia);
    const tema = normalizeText(question.tema);
    return materia.includes("ingles") ||
        materia.includes("english") ||
        materia.includes("oxford") ||
        ["reading", "listening", "speaking", "writing", "grammar", "vocabulary"].some((token) => tema.includes(token));
}

function getQuestionSearchTerms(topic, fallbackTitle = "") {
    const seeds = [topic, fallbackTitle, ...(topicAliases[topic] || [])];
    return [...new Set(seeds.map((entry) => normalizeText(entry)).filter(Boolean))];
}

function getTopicPool(allQuestions, topic, fallbackTitle = "") {
    const searchTerms = getQuestionSearchTerms(topic, fallbackTitle);
    return allQuestions.filter((question) => {
        const materia = normalizeText(question.materia);
        const tema = normalizeText(question.tema);
        return searchTerms.some((term) => {
            if (!term) return false;
            return tema.includes(term) ||
                materia.includes(term) ||
                (tema.length > 4 && term.includes(tema)) ||
                (materia.length > 4 && term.includes(materia));
        });
    });
}

function getAdaptiveTopicScore(topic) {
    const normalizedTopic = normalizeText(topic);
    const perf = state.user.profile.performance[topic];
    const seededWeakness = weakTopicSeeds.some((seed) => normalizedTopic.includes(seed));

    if (!perf || perf.total === 0) {
        return seededWeakness ? 1.45 : 1.05;
    }

    const accuracy = perf.correct / perf.total;
    const lowHistoryBoost = perf.total < 4 ? 0.15 : 0;
    return Number((1.5 - accuracy + lowHistoryBoost + ((perf.priority || 1) * 0.2)).toFixed(2));
}

function buildAdaptiveQuestionSet(allQuestions, limit = 15) {
    const eligibleQuestions = allQuestions.filter((question) => question.tipo === "opcion_multiple" && question.materia !== "Estrategia AcadÃ©mica");
    const usedIds = new Set();
    const selected = [];

    const rankedTopics = [...new Set(eligibleQuestions.map((question) => question.tema).filter(Boolean))]
        .map((topic) => ({
            topic,
            score: getAdaptiveTopicScore(topic),
            pool: shuffleArray(eligibleQuestions.filter((question) => question.tema === topic))
        }))
        .sort((a, b) => b.score - a.score);

    rankedTopics.forEach(({ score, pool }) => {
        const quota = score >= 1.35 ? 3 : 2;
        pool.slice(0, quota).forEach((question) => {
            if (!usedIds.has(question.id) && selected.length < limit) {
                usedIds.add(question.id);
                selected.push(cloneQuestion(question, { timeLimit: 45 }));
            }
        });
    });

    shuffleArray(eligibleQuestions).forEach((question) => {
        if (!usedIds.has(question.id) && selected.length < limit) {
            usedIds.add(question.id);
            selected.push(cloneQuestion(question, { timeLimit: 45 }));
        }
    });

    return selected;
}

function buildSectionedDemoExam(allQuestions) {
    const selected = [];
    const usedIds = new Set();

    finalExamBlueprint.forEach((section) => {
        const sectionPool = shuffleArray(
            allQuestions.filter((question) => question.tipo === "opcion_multiple" && section.matcher(question) && !usedIds.has(question.id))
        );

        sectionPool.slice(0, section.count).forEach((question) => {
            usedIds.add(question.id);
            selected.push(cloneQuestion(question, {
                sectionLabel: section.label,
                timeLimit: section.secondsPerQuestion
            }));
        });
    });

    if (selected.length < 100) {
        shuffleArray(allQuestions.filter((question) => question.tipo === "opcion_multiple" && !usedIds.has(question.id))).forEach((question) => {
            if (selected.length < 100) {
                usedIds.add(question.id);
                selected.push(cloneQuestion(question, {
                    sectionLabel: question.materia,
                    timeLimit: 90
                }));
            }
        });
    }

    return selected.slice(0, 100);
}

function getPlacementLevel(score, totalQuestions) {
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const band = [...placementBands].reverse().find((entry) => percentage >= entry.min) || placementBands[0];
    return { ...band, percentage };
}

function getSessionResultKey(question) {
    if (state.session.mode === "placement") {
        const topic = normalizeText(question.tema);
        if (topic.includes("reading") || topic.includes("vocabulary")) return "Reading & Vocabulary";
        if (topic.includes("listening")) return "Listening";
        if (topic.includes("speaking")) return "Speaking";
        if (topic.includes("writing")) return "Writing";
        return "Grammar & Use of English";
    }

    if (state.session.mode === "demo-final") {
        return question.sectionLabel || question.materia || "Examen Demo";
    }

    return question.tema || question.materia || "General";
}

function registerSessionResult(question, isCorrect) {
    const resultKey = getSessionResultKey(question);
    if (!state.session.resultsByTopic[resultKey]) {
        state.session.resultsByTopic[resultKey] = { correct: 0, total: 0 };
    }

    state.session.resultsByTopic[resultKey].total++;
    if (isCorrect) {
        state.session.resultsByTopic[resultKey].correct++;
    }
}

const lessonEnhancements = {
    "mat-e1": {
        replaceVideos: true,
        videos: [
            { title: "Tactica: regla de 45 segundos", url: "infoexterna/imagenes/estrategia_45seg.mp4", isLocal: true },
            { title: "Base de la regla de 45 segundos", url: "infoexterna/imagenes/estrategia_45baseg.mp4", isLocal: true },
            { title: "Tecnicas para examen de admision", url: "https://www.youtube.com/embed/FP04a7za8Ts" }
        ],
        mediaHighlights: [
            { title: "Cuándo aplicar la regla", points: ["Si un reactivo no avanza en 45 segundos, marca y sigue.", "Regresa después con la mente más fresca.", "La regla protege tu tiempo para preguntas con mayor probabilidad de acierto."] }
        ]
    },
    "mat-e2": {
        replaceVideos: true,
        videos: [
            { title: "Tecnicas para examen tipo test", url: "https://www.youtube.com/embed/kU7eMO48NPU" },
            { title: "Como identificar distractores", url: "https://www.youtube.com/embed/AmPSh4aV9C4" }
        ],
        mediaHighlights: [
            { title: "Detecta distractores", points: ["Busca palabras extremas como siempre o nunca.", "Descarta respuestas que no respondan exactamente lo que pide el reactivo.", "Compara dos opciones finalistas antes de decidir."] },
            { title: "Rutina de 20 segundos", points: ["Subraya el verbo de la consigna.", "Calcula o resume antes de ver opciones.", "Elige y avanza: no te estanques."] }
        ]
    },
    "mat-e3": {
        replaceVideos: true,
        videos: [
            { title: "Regla 45 segundos", url: "infoexterna/imagenes/estrategia_45seg.mp4", isLocal: true },
            { title: "Controlar los nervios del examen", url: "https://www.youtube.com/embed/0Vg5d1-sxVs" },
            { title: "Nervios en examenes: como combatirlos", url: "https://www.youtube.com/embed/f6WxjYZvesI" }
        ],
        mediaHighlights: [
            { title: "Protocolo anti-bloqueo", points: ["Respira 4 segundos, sostÃ©n 2 y suelta 4.", "Mueve hombros y manos para liberar tensiÃ³n.", "Retoma el reactivo con una sola meta: encontrar la pista clave."] },
            { title: "Antes del examen", points: ["Llega con agua y material listo.", "Haz una lectura rÃ¡pida de la secciÃ³n.", "Reserva energÃ­a para las preguntas de mayor puntaje."] }
        ]
    },
    "mat-1": {
        replaceVideos: true,
        videos: [
            { title: "Como leer numeros muy grandes", url: "https://www.youtube.com/embed/xU4zMra2T7A" },
            { title: "Aprende a leer y escribir cantidades", url: "https://www.youtube.com/embed/OwcbKpwJnyA" }
        ],
        mediaHighlights: [
            { title: "Lee por bloques", points: ["Separa las cifras en grupos de tres.", "Nombra unidades, miles y millones en orden.", "Verifica el valor de la primera cifra antes de leer completo."] }
        ]
    },
    "mat-2": {
        replaceVideos: true,
        videos: [
            { title: "Como leer numeros decimales", url: "https://www.youtube.com/embed/bVFExqCCwfE" },
            { title: "Lectura y escritura de numeros decimales", url: "https://www.youtube.com/embed/PwBKGSJa-UE" }
        ],
        mediaHighlights: [
            { title: "Valor posicional", points: ["Ubica enteros antes del punto.", "Despues del punto identifica decimos, centesimos y milesimos.", "Lee el numero completo sin perder el orden de las posiciones."] }
        ]
    },
    "mat-3": {
        replaceVideos: true,
        videos: [
            { title: "Ubicar fracciones en la recta", url: "https://www.youtube.com/embed/TvLbbFKIfEw" },
            { title: "Fracciones en la recta numerica", url: "https://www.youtube.com/embed/xP7L2f9RJzQ" }
        ],
        mediaHighlights: [
            { title: "Primero divide", points: ["Cuenta en cuantas partes se divide la unidad.", "Usa el denominador para marcar intervalos iguales.", "Avanza tantas partes como indica el numerador."] }
        ]
    },
    "mat-4": {
        replaceVideos: true,
        videos: [
            { title: "Sucesiones para primaria", url: "https://www.youtube.com/embed/FGoSqeFl5zg" },
            { title: "Que es una sucesion numerica", url: "https://www.youtube.com/embed/zeN2UYyVAHA" },
            { title: "Patrones y secuencias logicas", url: "https://www.youtube.com/embed/dJCBqmaVlpY" }
        ],
        mediaHighlights: [
            { title: "Patron primero", points: ["Observa cuanto cambia de un numero al siguiente.", "Decide si la regla es sumar, restar, multiplicar o alternar.", "Verifica la regla en al menos tres terminos."] }
        ]
    },
    "mat-5": {
        replaceVideos: true,
        videos: [
            { title: "Lineas paralelas y perpendiculares", url: "https://www.youtube.com/embed/kQJwKbHpvHA" },
            { title: "Tipos de lineas para ninos", url: "https://www.youtube.com/embed/xZmIgZ3Aaow" }
        ],
        mediaHighlights: [
            { title: "Compara direccion", points: ["Las paralelas no se cruzan.", "Las perpendiculares forman un angulo recto.", "Las secantes se cruzan, pero no siempre a 90 grados."] }
        ]
    },
    "mat-6": {
        replaceVideos: true,
        videos: [
            { title: "Tipos de angulos", url: "https://www.youtube.com/embed/-zLWJYY42GU" },
            { title: "Angulo recto agudo y obtuso para ninos", url: "https://www.youtube.com/embed/4pGyx2PrfgM" }
        ],
        mediaHighlights: [
            { title: "Abre y compara", points: ["Agudo es menor de 90 grados.", "Recto mide 90 grados.", "Obtuso es mayor de 90 y menor de 180 grados."] }
        ]
    },
    "mat-7": {
        replaceVideos: true,
        videos: [
            { title: "Los triangulos para ninos", url: "https://www.youtube.com/embed/MextPb4-wsA" },
            { title: "Cuadrilateros para ninos", url: "https://www.youtube.com/embed/GBl62iBnQzg" }
        ],
        mediaHighlights: [
            { title: "Clasifica por lados y angulos", points: ["Reconoce triangulos por sus lados o angulos.", "Un cuadrilatero siempre tiene cuatro lados.", "Observa si hay lados paralelos para distinguir trapecio, rombo o rectangulo."] }
        ]
    },
    "mat-8": {
        replaceVideos: true,
        videos: [
            { title: "Partes de un prisma", url: "https://www.youtube.com/embed/4G4aOfXFwoc" },
            { title: "Aristas caras y vertices", url: "https://www.youtube.com/embed/kESdCbIz9Wc" }
        ],
        mediaHighlights: [
            { title: "Cuenta sin confundir", points: ["Las caras son superficies planas.", "Las aristas son lineas donde se unen dos caras.", "Los vertices son puntas donde se unen varias aristas."] }
        ]
    },
    "mat-9": {
        replaceVideos: true,
        videos: [
            { title: "Porcentajes para ninos", url: "https://www.youtube.com/embed/pM2zZlSGTWI" },
            { title: "Porcentajes super facil", url: "https://www.youtube.com/embed/A65mLtz5t58" }
        ],
        mediaHighlights: [
            { title: "Piensa en 100", points: ["Un porcentaje es una parte de 100.", "Convierte 50% en mitad y 25% en cuarta parte cuando ayude.", "Relaciona porcentaje, fraccion y decimal."] }
        ]
    },
    "mat-10": {
        replaceVideos: true,
        videos: [
            { title: "Moda media y mediana para ninos", url: "https://www.youtube.com/embed/YvgDWSd3BU4" },
            { title: "Media mediana y moda en tablas", url: "https://www.youtube.com/embed/OW6Uys0b_sw" }
        ],
        mediaHighlights: [
            { title: "Tres medidas distintas", points: ["La media promedia todos los datos.", "La mediana va en el centro cuando ordenas.", "La moda es el dato que mas se repite."] }
        ]
    },
    "mat-11": {
        replaceVideos: true,
        videos: [
            { title: "Los graficos de barras", url: "https://www.youtube.com/embed/MuV0ZX9oVeE" },
            { title: "Tablas y diagramas de barras", url: "https://www.youtube.com/embed/Q05Ox4elqQo" }
        ],
        mediaHighlights: [
            { title: "Lee el eje correcto", points: ["Mira primero que representa cada eje.", "Compara alturas antes de responder.", "Calcula diferencias entre barras cuando la pregunta lo pida."] }
        ]
    },
    "len-1": {
        replaceVideos: true,
        videos: [
            { title: "Idea principal y secundarias para primaria", url: "https://www.youtube.com/embed/PyCTNOq8SmU" },
            { title: "Idea principal y detalles", url: "https://www.youtube.com/embed/u2eFYFQ9_fI" }
        ],
        mediaHighlights: [
            { title: "Ruta de lectura", points: ["Pregunta de que trata todo el texto.", "Busca la oracion que se repite en varias ideas.", "Separa el tema general de los ejemplos."] }
        ]
    },
    "len-2": {
        replaceVideos: true,
        videos: [
            { title: "Inferencias para ninos", url: "https://www.youtube.com/embed/KsEk7nLoe54" },
            { title: "Inferir informacion en un texto", url: "https://www.youtube.com/embed/XlMkRsFgj14" }
        ],
        mediaHighlights: [
            { title: "Pista mas conclusion", points: ["Subraya una pista del texto.", "Combinala con lo que ya sabes.", "Elige la conclusion que si se puede sostener con evidencia."] }
        ]
    },
    "len-3": {
        replaceVideos: true,
        videos: [
            { title: "Hecho y opinion", url: "https://www.youtube.com/embed/TxHHyaBC07I" },
            { title: "Diferencia entre hecho y opinion", url: "https://www.youtube.com/embed/Z0TgsYfjSWs" }
        ],
        mediaHighlights: [
            { title: "Distingue rapido", points: ["El hecho se puede comprobar.", "La opinion usa valoraciones como bonito, mejor o terrible.", "Busca datos, fechas o cantidades para confirmar."] }
        ]
    },
    "len-4": {
        replaceVideos: true,
        videos: [
            { title: "Reglas de acentuacion", url: "https://www.youtube.com/embed/pIz97AZ2OE0" },
            { title: "Palabras agudas graves y esdrujulas", url: "https://www.youtube.com/embed/OWqP3NEKlgA" }
        ],
        mediaHighlights: [
            { title: "SEGA rapido", points: ["Separa en silabas.", "Encuentra la silaba tonica.", "Clasifica antes de decidir si lleva acento."] }
        ]
    },
    "len-5": {
        replaceVideos: true,
        videos: [
            { title: "Conectores logicos para ninos", url: "https://www.youtube.com/embed/0yK64bAjrOw" },
            { title: "Nexos y conectores", url: "https://www.youtube.com/embed/WPiBDug950o" }
        ],
        mediaHighlights: [
            { title: "Conector correcto", points: ["Usa porque para causa.", "Usa pero para contraste.", "Usa despues o luego para secuencia."] }
        ]
    },
    "len-6": {
        replaceVideos: true,
        videos: [
            { title: "Signos de puntuacion para primaria", url: "https://www.youtube.com/embed/2Bs6tknaLJQ" },
            { title: "Uso del punto y la coma", url: "https://www.youtube.com/embed/CHffxEk06S0" }
        ],
        mediaHighlights: [
            { title: "Pausa correcta", points: ["El punto cierra una idea completa.", "La coma separa elementos o pausas breves.", "Lee en voz alta para comprobar si la puntuacion ayuda al sentido."] }
        ]
    },
    "sci-1": {
        replaceVideos: true,
        videos: [
            { title: "Sistemas del cuerpo humano", url: "https://www.youtube.com/embed/S3jJj68dBxw" },
            { title: "Cuerpo humano para primaria", url: "https://www.youtube.com/embed/KYUQ-kySe2E" }
        ],
        mediaHighlights: [
            { title: "Relaciona sistema y funcion", points: ["Digestivo procesa alimentos.", "Respiratorio toma oxigeno.", "Circulatorio reparte nutrientes y oxigeno."] }
        ]
    },
    "sci-2": {
        replaceVideos: true,
        videos: [
            { title: "Propiedades de la materia", url: "https://www.youtube.com/embed/swcjamDFsn0" },
            { title: "Estados y cambios de la materia", url: "https://www.youtube.com/embed/L3fmJrr72fk" }
        ],
        mediaHighlights: [
            { title: "Observa y clasifica", points: ["Describe color, masa, volumen o textura.", "Decide si es solido, liquido o gas.", "Relaciona el cambio con calor o enfriamiento."] }
        ]
    },
    "sci-3": {
        replaceVideos: true,
        videos: [
            { title: "Luz sonido y calor", url: "https://www.youtube.com/embed/hukIxkPqfM4" },
            { title: "Tipos de energia para ninos", url: "https://www.youtube.com/embed/N90yMBxTUNg" }
        ],
        mediaHighlights: [
            { title: "Piensa en la fuente", points: ["La luz permite ver.", "El sonido viaja por vibraciones.", "El calor cambia la temperatura de los cuerpos."] }
        ]
    },
    "sci-4": {
        replaceVideos: true,
        videos: [
            { title: "Ecosistemas para primaria", url: "https://www.youtube.com/embed/usDVb2JWhHo" },
            { title: "Biodiversidad y ecosistemas", url: "https://www.youtube.com/embed/VLSDpRJj10M" }
        ],
        mediaHighlights: [
            { title: "Cadena de vida", points: ["Ubica seres vivos y factores no vivos.", "Reconoce productor, consumidor y descomponedor.", "Piensa como un cambio afecta a todo el ecosistema."] }
        ]
    },
    "sci-5": {
        replaceVideos: true,
        videos: [
            { title: "Sistema solar para ninos", url: "https://www.youtube.com/embed/ZykXgSqet6A" },
            { title: "Planetas del sistema solar", url: "https://www.youtube.com/embed/Oex6qI90DK8" }
        ],
        mediaHighlights: [
            { title: "Orden y rasgos", points: ["Recuerda el orden desde el Sol.", "Distingue planetas rocosos y gigantes gaseosos.", "Relaciona rotacion con dia y traslacion con ano."] }
        ]
    },
    "soc-1": {
        replaceVideos: true,
        videos: [
            { title: "Geografia de Mexico para primaria", url: "https://www.youtube.com/embed/aLHnduUqDdY" },
            { title: "Relieve y regiones de Mexico", url: "https://www.youtube.com/embed/2CO_RWLVAwQ" }
        ],
        mediaHighlights: [
            { title: "Ubica en el mapa", points: ["Relaciona region con clima y relieve.", "Distingue llanuras, sierras y mesetas.", "Recuerda costas, fronteras y oceanos."] }
        ]
    },
    "soc-2": {
        replaceVideos: true,
        videos: [
            { title: "Epoca prehispanica de Mexico", url: "https://www.youtube.com/embed/T211sRIcKyg" },
            { title: "Culturas prehispanicas para ninos", url: "https://www.youtube.com/embed/rSo-BT795Cc" }
        ],
        mediaHighlights: [
            { title: "Cultura y legado", points: ["Relaciona pueblo con territorio.", "Ubica aportes como agricultura, escritura o calendario.", "Diferencia rasgos mayas, mexicas y otras culturas."] }
        ]
    },
    "soc-3": {
        replaceVideos: true,
        videos: [
            { title: "Independencia de Mexico para ninos", url: "https://www.youtube.com/embed/CiU8sV8DHJg" },
            { title: "Resumen de la independencia", url: "https://www.youtube.com/embed/W-I1W2z9ZlI" }
        ],
        mediaHighlights: [
            { title: "Linea del tiempo", points: ["Identifica inicio, desarrollo y consumacion.", "Relaciona personajes con acciones clave.", "Recuerda por que comenzo el movimiento."] }
        ]
    },
    "soc-4": {
        replaceVideos: true,
        videos: [
            { title: "Derechos humanos para ninos", url: "https://www.youtube.com/embed/1xi3P5jr7eo" },
            { title: "Ciudadania y derechos", url: "https://www.youtube.com/embed/VARoxLd4JVc" }
        ],
        mediaHighlights: [
            { title: "Derecho mas ejemplo", points: ["Relaciona cada derecho con una situacion diaria.", "Piensa quien debe protegerlo.", "Distingue derecho de responsabilidad."] }
        ]
    },
    "soc-5": {
        replaceVideos: true,
        videos: [
            { title: "Actividades economicas", url: "https://www.youtube.com/embed/l_Mv06EwzNM" },
            { title: "Sectores economicos para primaria", url: "https://www.youtube.com/embed/NsJfgkBl9Xo" }
        ],
        mediaHighlights: [
            { title: "Sector correcto", points: ["Primario obtiene recursos.", "Secundario transforma materias primas.", "Terciario ofrece servicios."] }
        ]
    },
    "eng-1": {
        replaceVideos: true,
        videos: [
            { title: "A2 English speaking practice", url: "https://www.youtube.com/embed/Juxpn7dy1iY" },
            { title: "Speaking exam questions A2", url: "https://www.youtube.com/embed/3Mr4mGMALwI" }
        ],
        mediaHighlights: [
            { title: "Speaking Frame", points: ["Start with a complete sentence.", "Use there is / there are to describe the photo.", "Give one opinion with because."] }
        ]
    },
    "eng-2": {
        replaceVideos: true,
        videos: [
            { title: "A2 English Listening Practice - Travel", url: "https://www.youtube.com/embed/gOMypAhVaXE" },
            { title: "A2 English Listening Practice - Coffee", url: "https://www.youtube.com/embed/xioVn6MPsUc" }
        ],
        mediaHighlights: [
            { title: "Listening Routine", points: ["Read the options before the audio starts.", "Listen for names, times and places.", "Ignore one unknown word and follow the general meaning."] }
        ]
    },
    "eng-3": {
        replaceVideos: true,
        videos: [
            { title: "Reading comprehension quiz A2", url: "https://www.youtube.com/embed/UMcLcRabHOM" },
            { title: "Learn English through stories A2", url: "https://www.youtube.com/embed/vuXPKL-0aPQ" }
        ],
        mediaHighlights: [
            { title: "Reading Scan", points: ["First identify the text type.", "Then find the exact key word.", "Finally confirm with one detail from the text."] }
        ]
    },
    "eng-4": {
        replaceVideos: true,
        videos: [
            { title: "Cambridge KEY A2 story writing", url: "https://www.youtube.com/embed/TvSN43QFnkw" },
            { title: "Cambridge KEY A2 email writing", url: "https://www.youtube.com/embed/UMcLcRabHOM" }
        ],
        mediaHighlights: [
            { title: "Writing Checklist", points: ["Include greeting, purpose and closing.", "Use connectors: and, but, because.", "Check verb tense before sending."] }
        ]
    },
    "eng-5": {
        replaceVideos: true,
        videos: [
            { title: "Present simple vs present continuous for kids", url: "https://www.youtube.com/embed/jrrRYlI9XR8" },
            { title: "Quick grammar lesson for beginners", url: "https://www.youtube.com/embed/GV9IFkjsQkE" }
        ],
        mediaHighlights: [
            { title: "Grammar Control", points: ["Look for time markers: now, every day, at the moment.", "Match subject and verb.", "Choose the tense before reading the options again."] }
        ]
    },
    "eng-6": {
        replaceVideos: true,
        videos: [
            { title: "Vocabulary for kids: places in the city", url: "https://www.youtube.com/embed/EsWIJj04oQw" },
            { title: "Places in town vocabulary A2", url: "https://www.youtube.com/embed/07cNNLfce_U" }
        ],
        mediaHighlights: [
            { title: "Vocabulary Builder", points: ["Group words by place: school, home, city.", "Pair each word with an action.", "Review in short sessions of five minutes."] }
        ]
    }
};

function applyLessonEnhancements() {
    state.syllabus.forEach((category) => {
        category.modules.forEach((module) => {
            module.lessons.forEach((lesson) => {
                const enhancement = lessonEnhancements[lesson.id];
                if (!enhancement) return;

                lesson.mediaHighlights = enhancement.mediaHighlights || lesson.mediaHighlights;
                if (enhancement.videos) {
                    lesson.videos = enhancement.replaceVideos
                        ? [...enhancement.videos]
                        : [...(lesson.videos || []), ...enhancement.videos];
                }
                if (enhancement.audio && !lesson.audio) {
                    lesson.audio = enhancement.audio;
                }
            });
        });
    });
}

applyLessonEnhancements();

// Referencias DOM
const dom = {
    screens: document.querySelectorAll('.screen'),
    dashboard: document.getElementById('home-screen'),
    learningMenu: document.getElementById('learning-menu-screen'),
    lesson: document.getElementById('lesson-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),

    // UI Elements
    tacticalScoreText: document.getElementById('tactical-score'),
    syllabusList: document.getElementById('syllabus-container'),
    lessonTitle: document.getElementById('lesson-title'),
    lessonText: document.getElementById('lesson-text'),
    lessonAudio: document.getElementById('lesson-audio'),
    audioContainer: document.getElementById('audio-player-container'),
    videoGrid: document.querySelector('.video-grid'),
    lessonBadge: document.getElementById('lesson-badge'),

    // Quiz elements
    quizBadge: document.getElementById('materia-badge'),
    quizTema: document.getElementById('tema-text'),
    quizPregunta: document.getElementById('pregunta-text'),
    quizOpciones: document.getElementById('options-container'),
    quizFeedback: document.getElementById('feedback-container'),
    fTitle: document.getElementById('feedback-title'),
    fText: document.getElementById('feedback-text'),
    quizProgress: document.getElementById('progress-bar'),
    quizTimer: document.getElementById('timer'),
    reportCorrect: document.getElementById('score-correct'),
    reportTotal: document.getElementById('score-total'),
    reportSummary: document.getElementById('feedback-summary'),
    reportInsight: document.getElementById('ia-insight'),
    resultTitle: document.querySelector('#result-screen h1'),
    resultSubtitle: document.querySelector('#result-screen header p'),
};

window.__APP_STATE__ = state;
window.__APP_DOM__ = dom;

// --- INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', () => {
    if (dom.tacticalScoreText) {
        dom.tacticalScoreText.textContent = `${state.user.profile.tacticalScore}% `;
    }
    const placementCardTitle = document.querySelector('.card-placement h2');
    const placementCardText = document.querySelector('.card-placement p');
    if (placementCardTitle) placementCardTitle.textContent = 'Test de habilidades';
    if (placementCardText) placementCardText.textContent = 'Diagnostica tu nivel Oxford actual y define tu punto de partida.';
    if (!dom.resultSubtitle && dom.resultTitle) {
        const subtitle = document.createElement('p');
        subtitle.id = 'result-subtitle';
        dom.resultTitle.insertAdjacentElement('afterend', subtitle);
        dom.resultSubtitle = subtitle;
    }
    if (dom.resultSubtitle) dom.resultSubtitle.textContent = 'Resumen de la sesiÃ³n mÃ¡s reciente.';
    if (!document.querySelector('script[data-role="app-overrides"]')) {
        const overrideScript = document.createElement('script');
        overrideScript.src = 'js/app.overrides.js';
        overrideScript.dataset.role = 'app-overrides';
        document.body.appendChild(overrideScript);
    }
    if (window.location.protocol === 'file:') {
        document.getElementById('cors-warning').classList.remove('hidden');
    }
});

// --- NAVEGACIÓN ---

function switchScreen(screenId) {
    dom.screens.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error(`Screen not found: ${screenId}`);
    }
}
window.switchScreen = switchScreen;

function backToHome(el) {
    clearInterval(state.timerInterval);
    if (dom.lessonAudio) dom.lessonAudio.pause();
    
    // Detener todos los videos e iframes en el grid para evitar ruidos de fondo
    if (dom.videoGrid) {
        dom.videoGrid.querySelectorAll('video').forEach(v => v.pause());
        dom.videoGrid.querySelectorAll('iframe').forEach(f => f.src = "");
    }
    if (el) {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        el.classList.add('active');
    }
    switchScreen('home-screen');
}
window.backToHome = backToHome;

function toggleNavGroup(groupId) {
    const groupElement = document.getElementById(groupId);
    if (!groupElement) return;
    const group = groupElement.parentElement;
    const isOpen = group.classList.contains('open');

    // Cerrar otros grupos si es necesario (opcional)
    document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));

    if (!isOpen) {
        group.classList.add('open');
    }
}
window.toggleNavGroup = toggleNavGroup;
// window.loadLesson se exportará correctamente después de su definición

async function fetchQuestions() {
    try {
        const response = await fetch('data/preguntas.json');
        if (!response.ok) throw new Error('Network response was not ok');
        state.allQuestions = await response.json();
    } catch (error) {
        console.error("Error loading questions, using safe fallback:", error);
        state.allQuestions = state.safeEntries.questions;
    }
}
window.fetchQuestions = fetchQuestions;

async function enterModule(moduleId, el, subCategory) {
    // Definir títulos amigables
    const titles = {
        'aprendizaje': subCategory || 'Ruta de Aprendizaje Académico',
        'english': 'Oxford English Prep (Nivel A2)',
        'estrategia': 'Estrategia y Táctica de Examen'
    };

    // Actualizar estado activo en la barra lateral
    document.querySelectorAll('.nav-item, .nav-sub-item').forEach(nav => nav.classList.remove('active'));
    if (el) {
        el.classList.add('active');
    } else if (subCategory) {
        // Marcado de sub-items mejorado
        const subItems = document.querySelectorAll('.nav-sub-item');
        subItems.forEach(item => {
            if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(subCategory)) {
                item.classList.add('active');
            }
        });
    }

    if (titles[moduleId]) {
        // Actualizar título en el DOM
        const headerTitle = document.querySelector('#learning-menu-screen h1');
        if (headerTitle) headerTitle.innerText = titles[moduleId];

        renderSyllabus(moduleId, subCategory);
        switchScreen('learning-menu-screen');
    } else if (moduleId === 'simulador') {
        startApp(moduleId);
    }
}
window.enterModule = enterModule;

async function startPlacementTest() {
    // Asegurar que las preguntas están cargadas
    if (!state.allQuestions || state.allQuestions.length === 0) {
        await fetchQuestions();
    }

    // Filtrar solo preguntas de ingles
    const englishQuestions = state.allQuestions.filter(q =>
        q.materia === 'Inglés' ||
        q.materia === 'Oxford English' ||
        q.tema?.includes('English')
    );

    state.session.mode = 'placement';
    state.session.questions = [...englishQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
    state.session.currentIndex = 0;
    state.session.tempScore = 0;

    switchScreen('quiz-screen');
    renderQuestion();
}
window.startPlacementTest = startPlacementTest;

// --- APRENDIZAJE ---

function renderSyllabus(filterContext, subCategory) {
    dom.syllabusList.innerHTML = "";

    // Filtrar el temario según el contexto y subcategoría
    const filteredSyllabus = state.syllabus.filter(cat => {
        if (filterContext === 'english') return cat.category === 'OXFORD ENGLISH PREP';
        if (filterContext === 'estrategia') return cat.category === 'Estrategia y Táctica de Examen';
        if (filterContext === 'aprendizaje') {
            if (subCategory) {
                const normalizedSub = subCategory.toUpperCase();
                // Match por categoría
                if (cat.category.toUpperCase().includes(normalizedSub)) return true;
                // Match por keywords comunes (Ciencias, Sociedad, Matemáticas, Lenguaje)
                if (normalizedSub.includes('CIENCIAS') && cat.category === 'CONOCIMIENTOS GENERALES') return true;
                if (normalizedSub.includes('SOCIEDAD') && cat.category === 'CONOCIMIENTOS GENERALES') return true;
                // Match interno por módulos
                return cat.modules.some(m => m.title.toUpperCase().includes(normalizedSub));
            }
            // No mostrar English ni Estrategia en la lista general de aprendizaje
            return cat.category !== 'OXFORD ENGLISH PREP' && cat.category !== 'Estrategia y Táctica de Examen';
        }
        return true;
    });

    if (filteredSyllabus.length === 0) {
        dom.syllabusList.innerHTML = `
            <div class="empty-state p-5 text-center">
                <p>No hay temas disponibles actualmente para esta categoría.</p>
                <button class="btn btn-primary mt-3" onclick="backToHome()">Volver al Inicio</button>
            </div>
        `;
        return;
    }

    filteredSyllabus.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.className = 'subject-section';
        const isImage = category.icon.includes('/') || category.icon.includes('.png');
        catDiv.innerHTML = `
            <div class="subject-header">
                <span class="subject-icon">${isImage ? `<img src="${category.icon}" class="nav-icon-img">` : category.icon}</span> 
                <h2>${category.category}</h2>
            </div>
        `;

        const moduleGrid = document.createElement('div');
        moduleGrid.className = 'module-grid';

        category.modules.forEach(module => {
            const modDiv = document.createElement('div');
            modDiv.className = 'syllabus-module';
            modDiv.innerHTML = `<h4>${module.title}</h4>`;

            const list = document.createElement('div');
            list.className = 'lesson-list';

            module.lessons.forEach(lesson => {
                const card = document.createElement('div');
                card.className = 'lesson-item card-hover';
                card.innerHTML = `
                        <div class="lesson-info">
                            <span class="lesson-name">${lesson.title}</span>
                            <div class="lesson-meta-chips">
                                <span class="chip chip-lectura">📚 Lectura</span>
                                <span class="chip chip-multimedia">🎬 Multimedia</span>
                                <span class="chip chip-practica">🎯 Práctica</span>
                            </div>
                        </div>
                    `;

                // Event Listeners directos para evitar problemas de serialización JSON
                card.querySelector('.chip-lectura').onclick = (e) => { e.stopPropagation(); loadLesson(e, lesson, category.category, 1); };
                card.querySelector('.chip-multimedia').onclick = (e) => { e.stopPropagation(); loadLesson(e, lesson, category.category, 2); };
                card.querySelector('.chip-practica').onclick = (e) => { e.stopPropagation(); loadLesson(e, lesson, category.category, 3); };

                card.onclick = (e) => loadLesson(e, lesson, category.category);
                list.appendChild(card);
            });
            modDiv.appendChild(list);
            moduleGrid.appendChild(modDiv);
        });
        catDiv.appendChild(moduleGrid);
        dom.syllabusList.appendChild(catDiv);
    });
}

function loadLessonById(moduleId, lessonId) {
    // This function needs to be updated to the new syllabus structure if it's still used.
    // For now, it's left as is, but it won't work with the new syllabus.
    const module = state.syllabus.find(m => m.id === moduleId);
    const lesson = module.lessons.find(l => l.id === lessonId);
    loadLesson(lesson, module.title);
}

function switchPhase(phaseNumber) {
    if (!state.currentLesson) return;

    // Reset UI state for steps
    document.querySelectorAll('.phase-step').forEach((step, idx) => {
        const num = idx + 1;
        step.classList.remove('active');
        if (num < phaseNumber) step.classList.add('completed');
        else step.classList.remove('completed');
    });

    const stepEl = document.getElementById(`step-${phaseNumber}`);
    if (stepEl) stepEl.classList.add('active');

    // Hide all phase contents
    document.querySelectorAll('.phase-content').forEach(p => p.style.display = 'none');

    // Show current phase content
    const phaseIds = ['', 'phase-reading', 'phase-multimedia', 'phase-practice', 'phase-evaluation'];
    const targetId = phaseIds[phaseNumber];
    const targetContent = document.getElementById(targetId);

    if (targetContent) {
        targetContent.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Execute phase-specific logic
    if (phaseNumber === 3) renderPracticeSet(state.currentLesson.id);
}

function backToLearningMenu() {
    switchScreen('learning-menu-screen');
}

async function loadLesson(event, lesson, categoryTitle, targetPhase = 1) {
    if (event) event.stopPropagation();
    state.currentLesson = lesson; // Store current lesson context
    dom.lessonTitle.textContent = lesson.title;
    dom.lessonBadge.textContent = categoryTitle;

    // Ir a la fase objetivo
    switchPhase(targetPhase);

    // Load Phase 1 Text
    const text = await fetchLessonContent(lesson.file);
    document.getElementById('lesson-text').innerHTML = marked.parse(text);

    // Prepare Phase 2 Multimedia
    const audioContainer = document.getElementById('audio-player-container');
    const videoGrid = document.querySelector('.video-grid');
    const multimediaStep = document.getElementById('step-2');

    if (lesson.audio) {
        audioContainer.classList.remove('hidden');
        dom.lessonAudio.src = lesson.audio;
    } else {
        audioContainer.classList.add('hidden');
    }

    videoGrid.innerHTML = "";
    const validVideos = (lesson.videos || []).filter(v =>
        v.url && v.url.trim() !== "" &&
        !v.url.includes("EJEMPLO") &&
        !v.url.includes("videos_placeholder")
    );

    if (validVideos.length > 0) {
        validVideos.forEach(v => {
            const card = document.createElement('div');
            card.className = 'video-card';

            if (v.isLocal || v.url.endsWith('.mp4')) {
                card.innerHTML = `
                    <div class="video-label">${v.title}</div>
                    <video controls preload="auto" playsinline class="rounded shadow-sm">
                        <source src="${v.url}" type="video/mp4">
                        Tu navegador no soporta el video.
                    </video>
                `;
            } else {
                const secureUrl = v.url.includes('?') ? `${v.url}&rel=0&modestbranding=1` : `${v.url}?rel=0&modestbranding=1`;
                card.innerHTML = `<div class="video-label">${v.title}</div><iframe src="${secureUrl}" frameborder="0" allowfullscreen></iframe>`;
            }
            videoGrid.appendChild(card);
        });
    }

    // Lógica radical de visibilidad de fase Multimedia
    if (validVideos.length === 0 && !lesson.audio) {
        if (multimediaStep) multimediaStep.style.display = 'none';
        // Si el usuario intenta entrar manualmente a la fase 2, lo saltamos? 
        // Por ahora solo lo ocultamos visualmente del stepper
    } else {
        if (multimediaStep) multimediaStep.style.display = 'flex';
    }

    // Prepare Phase 3 Practice (Demo questions for now)
    renderPracticeSet(lesson.id);

    switchScreen('lesson-screen');
}
window.loadLesson = loadLesson;

async function renderPracticeSet(lessonId) {
    const practiceArea = document.getElementById('practice-area');
    const allQuestions = await loadQuestions();

    // Filter questions by dbTopic or lesson title as fallback
    const filter = state.currentLesson.dbTopic || state.currentLesson.title;
    const topicPool = allQuestions.filter(q =>
        (q.tema && q.tema.includes(filter)) ||
        (q.materia && q.materia.includes(filter))
    );

    if (topicPool.length === 0) {
        practiceArea.innerHTML = "<p>Preparando más reactivos tácticos para este tema...</p>";
        return;
    }

    const q = topicPool[Math.floor(Math.random() * topicPool.length)];
    let questionHtml = '';

    if (q.tipo === 'ordenamiento' && q.elementos) {
        const shuffledOptions = [...q.elementos].sort(() => 0.5 - Math.random());
        questionHtml = `
            <div class="practice-card">
                <p><strong>Ordena los elementos:</strong> ${q.pregunta}</p>
                <div id="sortable-list" class="list-group mb-3">
                    ${shuffledOptions.map(opt => `<div class="list-group-item p-3 border rounded mb-2 bg-white cursor-pointer" data-id="${opt.id}">${opt.texto}</div>`).join('')}
                </div>
                <button class="btn btn-primary mt-3" onclick="checkOrderingPractice('${q.respuesta_correcta.join(',')}')">Verificar Orden</button>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    } else if (q.tipo === 'relacion_columnas' && q.columnas) {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Relaciona las columnas:</strong> ${q.pregunta}</p>
                <div class="row">
                    <div class="col-6">
                        <ul class="list-unstyled">
                            ${q.columnas.izquierda.map(item => `<li class="p-2 border rounded mb-2 bg-light">${item.id}. ${item.texto}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="list-unstyled">
                            ${q.columnas.derecha.map(item => `
                                <li class="mb-2 d-flex align-items-center">
                                    <input type="text" class="match-input form-control me-2" style="width:50px" data-id="${item.id}">
                                    <span>${item.texto}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <button class="btn btn-primary mt-3" onclick="checkMatchingPractice('${JSON.stringify(q.respuesta_correcta)}')">Verificar Relación</button>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    } else { // Default to multiple choice
        questionHtml = `
            <div class="practice-card">
                <p><strong>Reactivo de Práctica:</strong> ${q.pregunta}</p>
                <div class="options-grid">
                    ${q.opciones.map(opt => `
                        <button class="btn-option" onclick="checkPractice(this, ${opt.id === q.respuesta_correcta})">${opt.texto}</button>
                    `).join('')}
                </div>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    }
    practiceArea.innerHTML = questionHtml;

    // Initialize Sortable if present
    const sortList = document.getElementById('sortable-list');
    if (sortList && typeof Sortable !== 'undefined') {
        new Sortable(sortList, { animation: 150 });
    }
}

function checkPractice(btn, isCorrect) {
    const feedback = document.getElementById('practice-feedback');
    const allButtons = document.querySelectorAll('.btn-option');

    // Lock all buttons
    allButtons.forEach(b => b.disabled = true);

    feedback.classList.remove('hidden');
    if (isCorrect) {
        btn.style.background = 'var(--success)';
        feedback.innerHTML = "✨ ¡Excelente! Has demostrado dominio. Ahora puedes pasar a la Evaluación Final.";
        feedback.className = "mt-2 p-2 rounded bg-green-100 text-green-700";
        // Unlock Evaluation Phase
        document.getElementById('step-4').classList.remove('locked');
    } else {
        btn.style.background = '#f87171';
        feedback.innerHTML = `
            <div class="error-box p-3 bg-red-50 text-red-700 rounded border border-red-200">
                <p>⚠️ <strong>Incorrecto.</strong> El rigor académico exige precisión total.</p>
                <p class="small mb-2">Para asegurar el éxito en la Ibero, debes repasar la base teórica.</p>
                <button class="btn btn-secondary btn-sm" onclick="switchPhase(1)">📖 Volver a Lectura (Obligatorio)</button>
            </div>
        `;
    }
}

function checkOrderingPractice(correctOrderStr) {
    const feedback = document.getElementById('practice-feedback');
    const items = document.querySelectorAll('#sortable-list .list-group-item');
    const userOrder = Array.from(items).map(item => item.getAttribute('data-id')).join(',');

    // Lock interaction
    items.forEach(item => item.classList.add('disabled-item'));

    feedback.classList.remove('hidden');
    if (userOrder === correctOrderStr) {
        feedback.innerHTML = "✨ ¡Perfecto! El orden lógico es la base del pensamiento crítico. Avanza a la Evaluación.";
        feedback.className = "mt-2 p-2 rounded bg-green-100 text-green-700";
        document.getElementById('step-4').classList.remove('locked');
    } else {
        feedback.innerHTML = `
            <div class="error-box p-3 bg-red-50 text-red-700 rounded border border-red-200">
                <p>⚠️ <strong>Orden Incorrecto.</strong> La jerarquía es fundamental.</p>
                <button class="btn btn-secondary btn-sm" onclick="switchPhase(1)">📖 Repasar Teoría</button>
            </div>
        `;
    }
}

function checkMatchingPractice(correctMatchesJson) {
    const feedback = document.getElementById('practice-feedback');
    const inputs = document.querySelectorAll('.match-input');
    const correctMatches = JSON.parse(correctMatchesJson);

    let allCorrect = true;
    inputs.forEach(input => {
        const id = input.getAttribute('data-id');
        if (input.value.trim().toUpperCase() !== correctMatches[id].toUpperCase()) {
            allCorrect = false;
        }
        input.disabled = true;
    });

    feedback.classList.remove('hidden');
    if (allCorrect) {
        feedback.innerHTML = "✨ ¡Relación Exitosa! Tu capacidad asociativa es excelente.";
        feedback.className = "mt-2 p-2 rounded bg-green-100 text-green-700";
        document.getElementById('step-4').classList.remove('locked');
    } else {
        feedback.innerHTML = `
            <div class="error-box p-3 bg-red-50 text-red-700 rounded border border-red-200">
                <p>⚠️ <strong>Relación Incorrecta.</strong> Revisa las definiciones básicas.</p>
                <button class="btn btn-secondary btn-sm" onclick="switchPhase(1)">📖 Volver a Lectura</button>
            </div>
        `;
    }
}

function startLessonEvaluation() {
    // Corrected: Use dbTopic for precise database filtering
    startApp('aprendizaje', state.currentLesson.dbTopic || state.currentLesson.title);
}

// Helper para cargar lecciones reales desde la carpeta /lessons
async function fetchLessonContent(filename) {
    if (window.location.protocol === 'file:') {
        return `
            <div class="emergency-guide">
                <h2>⚠️ Protocolo bloqueado</h2>
                <p>Estás abriendo Ariadna mediante doble clic (<code>file://</code>). Los navegadores modernos bloquean la carga de contenidos dinámicos en ese modo.</p>
                <div class="steps">
                    <p>1. Abre una terminal en la carpeta del proyecto.</p>
                    <p>2. Ejecuta <b>npm run serve</b>.</p>
                    <p>3. Abre <b>http://127.0.0.1:4173</b> en tu navegador.</p>
                </div>
            </div>
        `;
    }
    try {
        const res = await fetch(`lessons/${filename}`);
        if (!res.ok) {
            return `
                <div class="emergency-guide">
                    <h2>🚧 Módulo en Mantenimiento</h2>
                    <p>El contenido de lectura para "<b>${filename}</b>" está siendo actualizado para cumplir con los estándares de excelencia del Examen Ibero.</p>
                    <p><i>Por favor, revisa la fase Multimedia o Práctica mientras terminamos la edición.</i></p>
                </div>
            `;
        }
        return await res.text();
    } catch (e) {
        return `<div class="error-msg">Error crítico al cargar lección: ${e.message}</div>`;
    }
}

function formatMarkdown(text) {
    return text
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^\* (.*$)/gim, '<li>$1</li>')
        .replace(/^> \[!TIP\]\n> (.*$)/gim, '<div class="insight-box"><strong>💡 Tip Táctico:</strong> $1</div>')
        .replace(/\n/g, '<br>');
}

function completeLesson() {
    alert("¡Excelente Ariadna! Tu perfil evolutivo se está actualizando.");
    switchScreen('learning-menu-screen');
}

// --- SIMULADOR ADAPTATIVO (LOGICA IA) ---

async function loadQuestions() {
    if (window.location.protocol === 'file:') {
        return state.safeEntries.questions;
    }
    try {
        const res = await fetch('data/preguntas.json');
        if (!res.ok) throw new Error("CORS o 404");
        return await res.json();
    } catch (e) {
        console.warn("CORS Error: Usando base de datos local.");
        return state.safeEntries.questions;
    }
}

// --- MOTOR DE EXAMEN DEMO RANDOMIZADO ---

async function initiateFinalDemoExam() {
    const allPool = await loadQuestions();
    if (!allPool || allPool.length === 0) {
        alert("Error: No hay preguntas cargadas.");
        return;
    }

    // Shuffle and pick 100 random questions for the FINAL SIMULATOR
    const shuffled = allPool.sort(() => 0.5 - Math.random());
    state.session.questions = shuffled.slice(0, 100);
    state.session.currentIndex = 0;
    state.session.tempScore = 0;
    state.session.resultsByTopic = {};

    switchScreen('quiz-screen');
    renderQuestion();
}

async function startApp(mode, topicFilter = null) {
    state.session.mode = mode;
    state.session.tempScore = 0;
    state.session.currentIndex = 0;
    state.session.resultsByTopic = {};

    const allData = await loadQuestions();

    if (mode === 'estrategia') {
        state.session.questions = allData.filter(q => q.materia.toLowerCase().includes('estrategia') || q.materia.toLowerCase().includes('examen'));
    } else if (topicFilter) {
        const query = topicFilter.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        state.session.questions = allData.filter(q => {
            const tema = (q.tema || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
            const materia = (q.materia || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
            return tema.includes(query) || materia.includes(query) || query.includes(tema) || query === tema;
        }).slice(0, 10);
    } else {
        // --- MOTOR ADAPTATIVO IA ---
        // Priorizar preguntas de áreas con bajo rendimiento o alto 'priority'
        state.session.questions = allData.filter(q => q.materia !== 'Estrategia Académica').sort((a, b) => {
            const perfA = state.user.profile.performance[a.tema] || { priority: 0.5 };
            const perfB = state.user.profile.performance[b.tema] || { priority: 0.5 };
            // Si tiene prioridad ALTA o rendimiento BAJO, va primero
            return (perfB.priority || 0) - (perfA.priority || 0);
        }).slice(0, 15); // Sesiones cortas para Ariadna
    }

    if (state.session.questions.length === 0) {
        alert("IA: Estamos optimizando los reactivos para este nivel evolutivo. Prueba otro tema.");
        return;
    }

    switchScreen('quiz-screen');
    renderQuestion();
}

function startTimer() {
    clearInterval(state.timerInterval);
    state.timeLeft = 45;
    updateTimerUI();
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        updateTimerUI();
        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerUI() {
    dom.quizTimer.textContent = `00:${state.timeLeft < 10 ? '0' : ''}${state.timeLeft} `;
    dom.quizTimer.style.color = state.timeLeft <= 10 ? 'var(--danger)' : 'var(--text-muted)';
}

function handleTimeout() {
    dom.fTitle.textContent = "⏱️ ¡Tiempo Agotado!";
    dom.fText.textContent = "Regla de los 45 segundos: No se permite el sobre-análisis.";
    showFeedback(false);
}

function renderQuestion() {
    const q = state.session.questions[state.session.currentIndex];
    dom.quizBadge.textContent = q.materia;
    dom.quizTema.textContent = q.tema;
    dom.quizProgress.style.width = ((state.session.currentIndex) / state.session.questions.length * 100) + '%';
    dom.quizOpciones.innerHTML = "";
    dom.quizFeedback.classList.add('hidden');
    dom.quizFeedback.className = "feedback-container hidden";

    if (q.tipo === 'informativo') {
        dom.quizPregunta.innerHTML = formatMarkdown(q.contenido);
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary mt-4';
        nextBtn.textContent = 'Entendido, Continuar';
        nextBtn.onclick = () => nextQuestion();
        dom.quizOpciones.appendChild(nextBtn);
    } else if (q.tipo === 'opcion_multiple') {
        dom.quizPregunta.textContent = q.pregunta;
        q.opciones.forEach((opt, idx) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.textContent = `${['A', 'B', 'C', 'D'][idx]}) ${opt.texto} `;
            div.onclick = () => selectOption(opt.id, div);
            dom.quizOpciones.appendChild(div);
        });
        startTimer();
    } else {
        dom.quizPregunta.textContent = `${q.pregunta} (Este tipo de reactivo se activa en modo Práctica. Avanza para evaluación de opción múltiple).`;
        const skipBtn = document.createElement('button');
        skipBtn.className = 'btn btn-secondary mt-4';
        skipBtn.textContent = 'Siguiente Reactivo';
        skipBtn.onclick = () => nextQuestion();
        dom.quizOpciones.appendChild(skipBtn);
    }
}

function selectOption(selectedId, element) {
    clearInterval(state.timerInterval);
    const q = state.session.questions[state.session.currentIndex];
    const isCorrect = selectedId === q.respuesta_correcta;

    // Registrar desempeño en el Perfil IA
    recordPerformance(q.tema, isCorrect);

    Array.from(dom.quizOpciones.children).forEach(c => c.classList.add('disabled'));
    element.classList.add('selected', isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) state.session.tempScore++;

    dom.fTitle.textContent = isCorrect ? "✅ Táctica Exitosa" : "❌ Error de Análisis";
    dom.fText.textContent = q.explicacion || "";
    showFeedback(isCorrect);
}

function recordPerformance(tema, isCorrect) {
    if (!state.user.profile.performance[tema]) {
        state.user.profile.performance[tema] = { correct: 0, total: 0, priority: 1 };
    }
    state.user.profile.performance[tema].total++;
    if (isCorrect) state.user.profile.performance[tema].correct++;

    // Guardar en persistencia simulada
    localStorage.setItem('ari_performance', JSON.stringify(state.user.profile.performance));
}

function showFeedback(isCorrect) {
    dom.quizFeedback.classList.remove('hidden');
    dom.quizFeedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    setTimeout(() => dom.quizFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
}

function nextQuestion() {
    state.session.currentIndex++;
    if (state.session.currentIndex >= state.session.questions.length) {
        showResultsUI();
    } else {
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// --- REPORTE EVOLUTIVO FINAL ---

function showResultsUI() {
    clearInterval(state.timerInterval);
    switchScreen('result-screen');

    dom.reportCorrect.textContent = state.session.tempScore;
    dom.reportTotal.textContent = state.session.questions.length;

    // Análisis de la IA para el reporte
    renderIAInsights();
}

function renderIAInsights() {
    dom.reportSummary.innerHTML = "";
    let insights = [];

    // Analizar áreas de la sesión actual
    const sessionTopics = [...new Set(state.session.questions.map(q => q.tema))];

    sessionTopics.forEach(tema => {
        const perf = state.user.profile.performance[tema] || { correct: 0, total: 1 };
        const pct = Math.round((perf.correct / perf.total) * 100);

        let status = "EN PRÁCTICA";
        let statusClass = "neutral";
        if (pct >= 85) { status = "🏆 ¡DOMINADO!"; statusClass = "high"; }
        else if (pct < 60) { status = "⚠️ ÁREA CRÍTICA"; statusClass = "low"; }

        const card = document.createElement('div');
        card.className = `insight-card ${pct < 60 ? 'low' : 'high'}`;
        card.innerHTML = `
            <div class="card-header">
                <strong>${tema}</strong>
                <span class="badge ${statusClass}">${status}</span>
            </div>
            <div class="pct-bar"><div class="fill" style="width: ${pct}%"></div></div>
            <span>${pct}% de rentabilidad táctica</span>
        `;
        dom.reportSummary.appendChild(card);

        if (pct < 60) insights.push(tema);
    });

    dom.reportInsight.innerHTML = insights.length > 0
        ? `La IA ha detectado que debemos priorizar: <strong>${insights.join(', ')}</strong>.<br> El siguiente ciclo evolutivo se enfocará en refrescar estos conceptos.`
        : "¡Excelente desempeño Ariadna! Has superado los umbrales de este ciclo. El próximo nivel aumentará la complejidad táctica.";
}

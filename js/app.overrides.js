const localServerUrl = "http://127.0.0.1:4173";
const localLessonFallback = `# Acceso incorrecto

Estas abriendo el proyecto directamente desde tu carpeta (\`file://\`), y por seguridad el navegador bloquea la carga dinamica de las lecciones.

**Para ver el contenido completo:**
1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta **\`npm run serve\`**.
3. Abre tu navegador en **\`${localServerUrl}\`**.

Con eso volveran a cargarse textos, preguntas y videos.`;

state.safeEntries.lessonFallback = localLessonFallback;

function extendAlias(label, additions) {
    const normalized = normalizeText(label);
    const existingKey = Object.keys(topicAliases).find((key) => normalizeText(key) === normalized) || label;
    const current = Array.isArray(topicAliases[existingKey]) ? topicAliases[existingKey] : [];
    topicAliases[existingKey] = [...new Set([...current, ...additions])];
}

extendAlias("Tecnicas de Descarte", [
    "Pensamiento Critico y Descarte Directo",
    "Descarte de Opciones",
    "Metodos y Tecnicas",
    "Gestion del Tiempo"
]);
extendAlias("Psicologia de Examen", [
    "Gestion del Tiempo",
    "Fundamentos y Reglas Tacticas",
    "Metodos y Tecnicas"
]);
extendAlias("Energia", [
    "Fisica y Quimica",
    "Calentamiento global y medio ambiente",
    "Ciencias Naturales y Experimentales",
    "Luz, sonido y calor"
]);
extendAlias("Ecologia", [
    "Ambientes y ecosistemas",
    "Calentamiento global y medio ambiente"
]);
extendAlias("Economia", [
    "Economia"
]);
extendAlias("Writing", [
    "Writing",
    "Grammar",
    "Utilizacion del ingles"
]);
extendAlias("Figuras y cuerpos geometricos", [
    "Figuras geometricas",
    "Geometria"
]);

const practiceFallbackBank = {
    "mat-e2": [
        {
            prompt: "Si dos opciones parecen correctas, que estrategia conviene aplicar primero?",
            options: [
                { text: "Elegir la mas larga sin revisar la consigna", correct: false },
                { text: "Volver al verbo clave y descartar la que no responde exactamente", correct: true },
                { text: "Cambiar la respuesta al azar para avanzar", correct: false }
            ]
        },
        {
            prompt: "Un distractor suele reconocerse porque:",
            options: [
                { text: "Usa palabras extremas o se aleja de lo que pide el reactivo", correct: true },
                { text: "Siempre es la opcion mas corta", correct: false },
                { text: "Coincide con cualquier dato aunque no responda la pregunta", correct: false }
            ]
        }
    ],
    "mat-e3": [
        {
            prompt: "Si te bloqueas en una pregunta durante el examen, lo mejor es:",
            options: [
                { text: "Quedarte hasta resolverla completa", correct: false },
                { text: "Respirar, marcarla y pasar a la siguiente para volver despues", correct: true },
                { text: "Cambiar todas tus respuestas anteriores", correct: false }
            ]
        },
        {
            prompt: "La respiracion guiada antes de retomar una pregunta dificil ayuda a:",
            options: [
                { text: "Reducir tension y recuperar foco", correct: true },
                { text: "Aumentar el tiempo por pregunta", correct: false },
                { text: "Memorizar la respuesta correcta", correct: false }
            ]
        }
    ],
    "sci-3": [
        {
            prompt: "Cual ejemplo muestra una fuente de energia termica?",
            options: [
                { text: "Una lampara apagada", correct: false },
                { text: "Una estufa que calienta agua", correct: true },
                { text: "Una regla de plastico", correct: false }
            ]
        },
        {
            prompt: "El sonido se produce cuando:",
            options: [
                { text: "Un objeto vibra y esas vibraciones se transmiten", correct: true },
                { text: "La luz se refleja en una superficie", correct: false },
                { text: "El aire deja de moverse por completo", correct: false }
            ]
        }
    ],
    "sci-4": [
        {
            prompt: "En un ecosistema, los productores son los seres que:",
            options: [
                { text: "Fabrican su alimento, como las plantas", correct: true },
                { text: "Se alimentan de otros animales", correct: false },
                { text: "Descomponen rocas y metales", correct: false }
            ]
        }
    ],
    "soc-5": [
        {
            prompt: "Que actividad pertenece al sector secundario?",
            options: [
                { text: "Cultivar maiz", correct: false },
                { text: "Transformar leche en queso en una fabrica", correct: true },
                { text: "Vender boletos de cine", correct: false }
            ]
        }
    ],
    "eng-4": [
        {
            prompt: "Which sentence works best as the opening of a short email?",
            options: [
                { text: "Dear Ana, How are you?", correct: true },
                { text: "Blue table quickly", correct: false },
                { text: "Yesterday because school", correct: false }
            ]
        }
    ],
    "mat-8": [
        {
            prompt: "Como se llama la linea donde se unen dos caras de un prisma?",
            options: [
                { text: "Vertice", correct: false },
                { text: "Arista", correct: true },
                { text: "Base", correct: false }
            ]
        }
    ]
};

function buildFallbackPracticeQuestion(lessonId) {
    const bank = practiceFallbackBank[lessonId] || [];
    if (bank.length === 0) return null;
    return bank[Math.floor(Math.random() * bank.length)];
}

function appendInfoCard(videoGrid, title, points) {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `
        <div class="video-label">${title}</div>
        <div class="info-card">
            ${(points || []).map((point) => `<p>${point}</p>`).join("")}
        </div>
    `;
    videoGrid.appendChild(card);
}

function ensureFallbackMultimedia(videoGrid) {
    if (!videoGrid || videoGrid.children.length > 0) return;

    appendInfoCard(videoGrid, "Guia de observacion", [
        "Identifica la idea clave del tema antes de practicar.",
        "Anota dos palabras importantes y una duda concreta.",
        "Vuelve a practica con esa idea como foco."
    ]);
    appendInfoCard(videoGrid, "Puente hacia practica", [
        "Resume el concepto en una frase corta.",
        "Piensa en un ejemplo real o escolar.",
        "Usa ese ejemplo para resolver el reactivo."
    ]);
}

document.addEventListener("DOMContentLoaded", () => {
    const warning = document.querySelector("#cors-warning p");
    if (warning) {
        warning.innerHTML = `Modo de emergencia activo: el texto y las preguntas estan en modo demostracion porque no se detecto un servidor. Inicia esta copia con <b>npm run serve</b> y abre <b>${localServerUrl}</b> para ver el contenido completo.`;
    }
});

async function fetchLessonContent(filename) {
    if (window.location.protocol === "file:") {
        return `
            <div class="emergency-guide">
                <h2>Protocolo bloqueado</h2>
                <p>Estas abriendo Ariadna mediante doble clic (<code>file://</code>). Los navegadores modernos bloquean la carga de contenidos dinamicos en ese modo.</p>
                <div class="steps">
                    <p>1. Abre una terminal en la carpeta del proyecto.</p>
                    <p>2. Ejecuta <b>npm run serve</b>.</p>
                    <p>3. Abre <b>${localServerUrl}</b> en tu navegador.</p>
                </div>
            </div>
        `;
    }
    try {
        const res = await fetch(`lessons/${filename}`);
        if (!res.ok) {
            return `
                <div class="emergency-guide">
                    <h2>Modulo en mantenimiento</h2>
                    <p>El contenido de lectura para "<b>${filename}</b>" esta siendo actualizado.</p>
                    <p><i>Puedes revisar mientras tanto la fase Multimedia o Practica.</i></p>
                </div>
            `;
        }
        return await res.text();
    } catch (error) {
        return `<div class="error-msg">Error al cargar la leccion: ${error.message}</div>`;
    }
}
window.fetchLessonContent = fetchLessonContent;

async function loadLesson(event, lesson, categoryTitle, targetPhase = 1) {
    if (event) event.stopPropagation();
    state.currentLesson = lesson;
    dom.lessonTitle.textContent = lesson.title;
    dom.lessonBadge.textContent = categoryTitle;

    switchPhase(targetPhase);

    const text = await fetchLessonContent(lesson.file);
    document.getElementById("lesson-text").innerHTML = marked.parse(text);

    const audioContainer = document.getElementById("audio-player-container");
    const videoGrid = document.querySelector(".video-grid");
    const multimediaStep = document.getElementById("step-2");

    if (lesson.audio) {
        audioContainer.classList.remove("hidden");
        dom.lessonAudio.src = lesson.audio;
    } else {
        audioContainer.classList.add("hidden");
        dom.lessonAudio.removeAttribute("src");
    }

    videoGrid.innerHTML = "";

    const validVideos = (lesson.videos || []).filter((video) => {
        return Boolean(video && video.url && video.url.trim() && !video.url.includes("EJEMPLO") && !video.url.includes("videos_placeholder"));
    });

    validVideos.forEach((video) => {
        const card = document.createElement("div");
        card.className = "video-card";

        if (video.isLocal || video.url.endsWith(".mp4")) {
            card.innerHTML = `
                <div class="video-label">${video.title}</div>
                <video controls preload="auto" playsinline class="rounded shadow-sm">
                    <source src="${video.url}" type="video/mp4">
                    Tu navegador no soporta el video.
                </video>
            `;
        } else {
            const secureUrl = video.url.includes("?") ? `${video.url}&rel=0&modestbranding=1` : `${video.url}?rel=0&modestbranding=1`;
            card.innerHTML = `<div class="video-label">${video.title}</div><iframe src="${secureUrl}" frameborder="0" allowfullscreen></iframe>`;
        }

        videoGrid.appendChild(card);
    });

    (lesson.mediaHighlights || []).forEach((highlight) => {
        appendInfoCard(videoGrid, highlight.title, highlight.points || []);
    });

    ensureFallbackMultimedia(videoGrid);

    if (videoGrid.children.length === 0 && !lesson.audio) {
        if (multimediaStep) multimediaStep.style.display = "none";
    } else {
        if (multimediaStep) multimediaStep.style.display = "flex";
    }

    renderPracticeSet(lesson.id);
    switchScreen("lesson-screen");
}
window.loadLesson = loadLesson;

async function renderPracticeSet() {
    const practiceArea = document.getElementById("practice-area");
    const allQuestions = await loadQuestions();
    const lesson = state.currentLesson;
    const topicPool = shuffleArray(getTopicPool(allQuestions, lesson.dbTopic || lesson.title, lesson.title));
    const fallbackPractice = buildFallbackPracticeQuestion(lesson.id);

    if (topicPool.length === 0 && !fallbackPractice) {
        practiceArea.innerHTML = "<p>Estamos curando nuevos reactivos para este tema. Mientras tanto, revisa la lectura y la guia multimedia.</p>";
        return;
    }

    const question = topicPool.length > 0 ? cloneQuestion(topicPool[0]) : null;
    let questionHtml = "";

    if (!question && fallbackPractice) {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Reactivo de practica:</strong> ${fallbackPractice.prompt}</p>
                <div class="options-grid">
                    ${fallbackPractice.options.map((option) => `
                        <button class="btn-option" onclick="checkPractice(this, ${option.correct})">${option.text}</button>
                    `).join("")}
                </div>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    } else if (question.tipo === "ordenamiento" && question.elementos) {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Ordena los elementos:</strong> ${question.pregunta}</p>
                <div id="sortable-list" class="list-group mb-3">
                    ${question.elementos.map((option) => `<div class="list-group-item p-3 border rounded mb-2 bg-white cursor-pointer" data-id="${option.id}">${option.texto}</div>`).join("")}
                </div>
                <button class="btn btn-primary mt-3" onclick="checkOrderingPractice('${question.respuesta_correcta.join(",")}')">Verificar orden</button>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    } else if (question.tipo === "relacion_columnas" && question.columnas) {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Relaciona las columnas:</strong> ${question.pregunta}</p>
                <div class="row">
                    <div class="col-6">
                        <ul class="list-unstyled">
                            ${question.columnas.izquierda.map((item) => `<li class="p-2 border rounded mb-2 bg-light">${item.id}. ${item.texto}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="list-unstyled">
                            ${question.columnas.derecha.map((item) => `
                                <li class="mb-2 d-flex align-items-center">
                                    <input type="text" class="match-input form-control me-2" style="width:50px" data-id="${item.id}">
                                    <span>${item.texto}</span>
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                </div>
                <button class="btn btn-primary mt-3" onclick="checkMatchingPractice('${JSON.stringify(question.respuesta_correcta)}')">Verificar relacion</button>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    } else {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Reactivo de practica:</strong> ${question.pregunta}</p>
                <div class="options-grid">
                    ${question.opciones.map((option) => `
                        <button class="btn-option" onclick="checkPractice(this, ${option.id === question.respuesta_correcta})">${option.texto}</button>
                    `).join("")}
                </div>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    }

    practiceArea.innerHTML = questionHtml;

    const sortList = document.getElementById("sortable-list");
    if (sortList && typeof Sortable !== "undefined") {
        new Sortable(sortList, { animation: 150 });
    }
}
window.renderPracticeSet = renderPracticeSet;

function startTimer(seconds = 45) {
    clearInterval(state.timerInterval);
    state.timeLeft = Number(seconds || 45);
    updateTimerUI();
    state.timerInterval = setInterval(() => {
        state.timeLeft -= 1;
        updateTimerUI();
        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            handleTimeout();
        }
    }, 1000);
}
window.startTimer = startTimer;

function updateTimerUI() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    dom.quizTimer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    dom.quizTimer.style.color = state.timeLeft <= 15 ? "var(--danger)" : "var(--text-muted)";
}
window.updateTimerUI = updateTimerUI;

function renderQuestion() {
    const question = state.session.questions[state.session.currentIndex];
    if (!question) return;

    dom.quizBadge.textContent = question.sectionLabel || question.materia || "Sesion";
    dom.quizTema.textContent = question.tema || state.session.metadata.subtitle || "";
    dom.quizPregunta.textContent = question.pregunta || "Reactivo sin contenido";
    dom.quizProgress.style.width = `${(state.session.currentIndex / Math.max(state.session.questions.length, 1)) * 100}%`;
    dom.quizOpciones.innerHTML = "";
    dom.quizFeedback.classList.add("hidden");
    dom.quizFeedback.className = "feedback-container hidden";

    if (question.tipo === "informativo") {
        dom.quizPregunta.innerHTML = formatMarkdown(question.contenido);
        const nextBtn = document.createElement("button");
        nextBtn.className = "btn btn-primary mt-4";
        nextBtn.textContent = "Continuar";
        nextBtn.onclick = () => nextQuestion();
        dom.quizOpciones.appendChild(nextBtn);
        clearInterval(state.timerInterval);
        return;
    }

    if (question.tipo !== "opcion_multiple" || !Array.isArray(question.opciones)) {
        dom.quizPregunta.textContent = `${question.pregunta} (Este tipo de reactivo se resuelve en la fase de practica).`;
        const skipBtn = document.createElement("button");
        skipBtn.className = "btn btn-secondary mt-4";
        skipBtn.textContent = "Siguiente reactivo";
        skipBtn.onclick = () => nextQuestion();
        dom.quizOpciones.appendChild(skipBtn);
        clearInterval(state.timerInterval);
        return;
    }

    question.opciones.forEach((option, index) => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = `${["A", "B", "C", "D"][index] || "-"} ) ${option.texto}`;
        div.onclick = () => selectOption(option.id, div);
        dom.quizOpciones.appendChild(div);
    });

    startTimer(question.timeLimit || 45);
}
window.renderQuestion = renderQuestion;

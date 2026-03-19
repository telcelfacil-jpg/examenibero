const localServerUrl = "http://127.0.0.1:4173";
const localLessonFallback = `# Acceso incorrecto

Estas abriendo el proyecto directamente desde tu carpeta (\`file://\`), y por seguridad el navegador bloquea la carga dinamica de las lecciones.

**Para ver el contenido completo:**
1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta **\`npm run serve\`**.
3. Abre tu navegador en **\`${localServerUrl}\`**.

Con eso volveran a cargarse textos, preguntas y videos.`;

state.safeEntries.lessonFallback = localLessonFallback;

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
    } catch (e) {
        return `<div class="error-msg">Error al cargar la leccion: ${e.message}</div>`;
    }
}

window.fetchLessonContent = fetchLessonContent;

function startTimer(seconds = 45) {
    clearInterval(state.timerInterval);
    state.timeLeft = seconds;
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
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    dom.quizTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    dom.quizTimer.style.color = state.timeLeft <= 15 ? 'var(--danger)' : 'var(--text-muted)';
}

function handleTimeout() {
    const question = state.session.questions[state.session.currentIndex];
    if (!question || !dom.quizFeedback.classList.contains('hidden')) return;

    registerSessionResult(question, false);
    recordPerformance(question.tema || question.materia, false);
    Array.from(dom.quizOpciones.children).forEach((child) => child.classList.add('disabled'));
    dom.fTitle.textContent = "â±ï¸ Â¡Tiempo Agotado!";
    dom.fText.textContent = "Se registrÃ³ como oportunidad de mejora. Aplica la regla de decidir y avanzar.";
    showFeedback(false);
}

async function startPlacementTest() {
    if (!state.allQuestions || state.allQuestions.length === 0) {
        await fetchQuestions();
    }

    const englishQuestions = shuffleArray(state.allQuestions.filter((question) => isEnglishQuestion(question)));
    state.session.mode = 'placement';
    state.session.metadata = {
        title: 'Test de habilidades',
        subtitle: 'DiagnÃ³stico Oxford con estimaciÃ³n de nivel CEFR.'
    };
    state.session.questions = englishQuestions
        .slice(0, Math.min(24, englishQuestions.length))
        .map((question) => cloneQuestion(question, { timeLimit: 75, sectionLabel: 'Oxford English Placement' }));
    state.session.currentIndex = 0;
    state.session.tempScore = 0;
    state.session.resultsByTopic = {};

    if (state.session.questions.length === 0) {
        alert("No hay suficientes reactivos de inglÃ©s cargados para ejecutar el diagnÃ³stico.");
        return;
    }

    switchScreen('quiz-screen');
    renderQuestion();
}
window.startPlacementTest = startPlacementTest;

async function loadLesson(event, lesson, categoryTitle, targetPhase = 1) {
    if (event) event.stopPropagation();
    state.currentLesson = lesson;
    dom.lessonTitle.textContent = lesson.title;
    dom.lessonBadge.textContent = categoryTitle;

    switchPhase(targetPhase);

    const text = await fetchLessonContent(lesson.file);
    document.getElementById('lesson-text').innerHTML = marked.parse(text);

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
    const validVideos = (lesson.videos || []).filter((video) =>
        video.url && video.url.trim() !== "" && !video.url.includes("EJEMPLO") && !video.url.includes("videos_placeholder")
    );

    validVideos.forEach((video) => {
        const card = document.createElement('div');
        card.className = 'video-card';

        if (video.isLocal || video.url.endsWith('.mp4')) {
            card.innerHTML = `
                <div class="video-label">${video.title}</div>
                <video controls preload="auto" playsinline class="rounded shadow-sm">
                    <source src="${video.url}" type="video/mp4">
                    Tu navegador no soporta el video.
                </video>
            `;
        } else {
            const secureUrl = video.url.includes('?') ? `${video.url}&rel=0&modestbranding=1` : `${video.url}?rel=0&modestbranding=1`;
            card.innerHTML = `<div class="video-label">${video.title}</div><iframe src="${secureUrl}" frameborder="0" allowfullscreen></iframe>`;
        }

        videoGrid.appendChild(card);
    });

    if (lesson.mediaHighlights && lesson.mediaHighlights.length > 0) {
        lesson.mediaHighlights.forEach((highlight) => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.innerHTML = `
                <div class="video-label">${highlight.title}</div>
                <div class="info-card">
                    ${(highlight.points || []).map((point) => `<p>${point}</p>`).join('')}
                </div>
            `;
            videoGrid.appendChild(card);
        });
    }

    if (videoGrid.children.length === 0 && !lesson.audio) {
        if (multimediaStep) multimediaStep.style.display = 'none';
    } else {
        if (multimediaStep) multimediaStep.style.display = 'flex';
    }

    renderPracticeSet(lesson.id);
    switchScreen('lesson-screen');
}
window.loadLesson = loadLesson;

async function renderPracticeSet() {
    const practiceArea = document.getElementById('practice-area');
    const allQuestions = await loadQuestions();
    const topicPool = shuffleArray(getTopicPool(allQuestions, state.currentLesson.dbTopic || state.currentLesson.title, state.currentLesson.title));

    if (topicPool.length === 0) {
        practiceArea.innerHTML = "<p>Estamos curando nuevos reactivos para este tema. Mientras tanto, revisa la lectura y la guÃ­a multimedia.</p>";
        return;
    }

    const question = cloneQuestion(topicPool[0]);
    let questionHtml = '';

    if (question.tipo === 'ordenamiento' && question.elementos) {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Ordena los elementos:</strong> ${question.pregunta}</p>
                <div id="sortable-list" class="list-group mb-3">
                    ${question.elementos.map((option) => `<div class="list-group-item p-3 border rounded mb-2 bg-white cursor-pointer" data-id="${option.id}">${option.texto}</div>`).join('')}
                </div>
                <button class="btn btn-primary mt-3" onclick="checkOrderingPractice('${question.respuesta_correcta.join(',')}')">Verificar Orden</button>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    } else if (question.tipo === 'relacion_columnas' && question.columnas) {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Relaciona las columnas:</strong> ${question.pregunta}</p>
                <div class="row">
                    <div class="col-6">
                        <ul class="list-unstyled">
                            ${question.columnas.izquierda.map((item) => `<li class="p-2 border rounded mb-2 bg-light">${item.id}. ${item.texto}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="list-unstyled">
                            ${question.columnas.derecha.map((item) => `
                                <li class="mb-2 d-flex align-items-center">
                                    <input type="text" class="match-input form-control me-2" style="width:50px" data-id="${item.id}">
                                    <span>${item.texto}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <button class="btn btn-primary mt-3" onclick="checkMatchingPractice('${JSON.stringify(question.respuesta_correcta)}')">Verificar RelaciÃ³n</button>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    } else {
        questionHtml = `
            <div class="practice-card">
                <p><strong>Reactivo de PrÃ¡ctica:</strong> ${question.pregunta}</p>
                <div class="options-grid">
                    ${question.opciones.map((option) => `
                        <button class="btn-option" onclick="checkPractice(this, ${option.id === question.respuesta_correcta})">${option.texto}</button>
                    `).join('')}
                </div>
                <p id="practice-feedback" class="mt-2 hidden"></p>
            </div>
        `;
    }

    practiceArea.innerHTML = questionHtml;

    const sortList = document.getElementById('sortable-list');
    if (sortList && typeof Sortable !== 'undefined') {
        new Sortable(sortList, { animation: 150 });
    }
}

async function initiateFinalDemoExam() {
    const allPool = await loadQuestions();
    if (!allPool || allPool.length === 0) {
        alert("Error: No hay preguntas cargadas.");
        return;
    }

    state.session.mode = 'demo-final';
    state.session.metadata = {
        title: 'Examen Demo Integral',
        subtitle: '100 reactivos organizados por secciones y tiempos de referencia.'
    };
    state.session.questions = buildSectionedDemoExam(allPool);
    state.session.currentIndex = 0;
    state.session.tempScore = 0;
    state.session.resultsByTopic = {};

    switchScreen('quiz-screen');
    renderQuestion();
}
window.initiateFinalDemoExam = initiateFinalDemoExam;

async function startApp(mode, topicFilter = null) {
    state.session.mode = mode;
    state.session.tempScore = 0;
    state.session.currentIndex = 0;
    state.session.resultsByTopic = {};
    state.session.metadata = {};

    const allData = await loadQuestions();

    if (mode === 'estrategia') {
        state.session.metadata = {
            title: 'PrÃ¡ctica de Estrategia',
            subtitle: 'Domina descarte, ritmo y toma de decisiones.'
        };
        state.session.questions = shuffleArray(
            allData.filter((question) => normalizeText(question.materia).includes('estrategia') || normalizeText(question.materia).includes('examen'))
        ).slice(0, 12).map((question) => cloneQuestion(question, { timeLimit: 50 }));
    } else if (topicFilter) {
        state.session.metadata = {
            title: 'EvaluaciÃ³n de tema',
            subtitle: `ValidaciÃ³n de aprendizaje enfocada en ${topicFilter}.`
        };
        state.session.questions = shuffleArray(getTopicPool(allData, topicFilter, state.currentLesson?.title || topicFilter))
            .slice(0, 10)
            .map((question) => cloneQuestion(question, { timeLimit: 60 }));
    } else {
        state.session.metadata = {
            title: 'Simulador Adaptativo',
            subtitle: 'Refuerzo inteligente segÃºn tus Ã¡reas de oportunidad.'
        };
        state.session.questions = buildAdaptiveQuestionSet(allData, 15);
    }

    if (state.session.questions.length === 0) {
        alert("No hay suficientes reactivos vinculados a este tema. Necesitamos ampliar este bloque antes de evaluarlo.");
        return;
    }

    switchScreen('quiz-screen');
    renderQuestion();
}
window.startApp = startApp;

function renderQuestion() {
    const question = state.session.questions[state.session.currentIndex];
    if (!question) return;

    dom.quizBadge.textContent = question.sectionLabel || question.materia;
    dom.quizTema.textContent = question.tema || state.session.metadata.title || 'PrÃ¡ctica guiada';
    dom.quizProgress.style.width = `${(state.session.currentIndex / state.session.questions.length) * 100}%`;
    dom.quizOpciones.innerHTML = "";
    dom.quizFeedback.classList.add('hidden');
    dom.quizFeedback.className = "feedback-container hidden";

    if (question.tipo === 'informativo') {
        dom.quizPregunta.innerHTML = formatMarkdown(question.contenido);
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-primary mt-4';
        nextBtn.textContent = 'Entendido, Continuar';
        nextBtn.onclick = () => nextQuestion();
        dom.quizOpciones.appendChild(nextBtn);
        return;
    }

    dom.quizPregunta.textContent = question.pregunta;

    if (question.tipo === 'opcion_multiple') {
        question.opciones.forEach((option, index) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.textContent = `${['A', 'B', 'C', 'D'][index]}) ${option.texto}`;
            div.onclick = () => selectOption(option.id, div);
            dom.quizOpciones.appendChild(div);
        });
        startTimer(question.timeLimit || 45);
        return;
    }

    dom.quizPregunta.textContent = `${question.pregunta} (Este tipo de reactivo se trabaja primero en modo prÃ¡ctica guiada).`;
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn btn-secondary mt-4';
    skipBtn.textContent = 'Siguiente Reactivo';
    skipBtn.onclick = () => nextQuestion();
    dom.quizOpciones.appendChild(skipBtn);
}

function selectOption(selectedId, element) {
    if (!dom.quizFeedback.classList.contains('hidden')) return;

    clearInterval(state.timerInterval);
    const question = state.session.questions[state.session.currentIndex];
    const isCorrect = selectedId === question.respuesta_correcta;

    registerSessionResult(question, isCorrect);
    recordPerformance(question.tema || question.materia, isCorrect);

    Array.from(dom.quizOpciones.children).forEach((child) => child.classList.add('disabled'));
    element.classList.add('selected', isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) state.session.tempScore++;

    dom.fTitle.textContent = isCorrect ? "âœ… Respuesta Correcta" : "âŒ Respuesta Incorrecta";
    dom.fText.textContent = question.explicacion || "Revisa la lectura y vuelve a intentarlo con foco en la idea principal.";
    showFeedback(isCorrect);
}

function recordPerformance(topic, isCorrect) {
    if (!topic) return;

    if (!state.user.profile.performance[topic]) {
        state.user.profile.performance[topic] = { correct: 0, total: 0, priority: 1 };
    }

    const performance = state.user.profile.performance[topic];
    performance.total++;
    if (isCorrect) {
        performance.correct++;
    }

    const accuracy = performance.correct / performance.total;
    performance.priority = Number((1.6 - accuracy + (performance.total < 4 ? 0.15 : 0)).toFixed(2));

    localStorage.setItem('ari_performance', JSON.stringify(state.user.profile.performance));
}

function showResultsUI() {
    clearInterval(state.timerInterval);
    switchScreen('result-screen');

    dom.reportCorrect.textContent = state.session.tempScore;
    dom.reportTotal.textContent = state.session.questions.length;

    if (dom.resultTitle) {
        dom.resultTitle.textContent = state.session.metadata.title || 'Reporte Evolutivo Final';
    }
    if (dom.resultSubtitle) {
        dom.resultSubtitle.textContent = state.session.metadata.subtitle || 'Resumen de la sesiÃ³n mÃ¡s reciente.';
    }

    renderIAInsights();
}

function renderIAInsights() {
    dom.reportSummary.innerHTML = "";

    const resultEntries = Object.entries(state.session.resultsByTopic);
    const weakAreas = [];

    resultEntries.forEach(([label, result]) => {
        const percentage = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
        let status = "EN PROCESO";
        let statusClass = "neutral";

        if (percentage >= 85) {
            status = "DOMINADO";
            statusClass = "high";
        } else if (percentage < 60) {
            status = "PRIORIDAD";
            statusClass = "low";
            weakAreas.push(label);
        }

        const card = document.createElement('div');
        card.className = `insight-card ${percentage < 60 ? 'low' : 'high'}`;
        card.innerHTML = `
            <div class="card-header">
                <strong>${label}</strong>
                <span class="badge ${statusClass}">${status}</span>
            </div>
            <div class="pct-bar"><div class="fill" style="width: ${percentage}%"></div></div>
            <span>${percentage}% de aciertos en esta sesiÃ³n</span>
        `;
        dom.reportSummary.appendChild(card);
    });

    if (state.session.mode === 'placement') {
        const placement = getPlacementLevel(state.session.tempScore, state.session.questions.length);
        dom.reportInsight.innerHTML = `Nivel estimado actual: <strong>${placement.label}</strong> (${placement.percentage}% de aciertos). ${placement.description}${weakAreas.length > 0 ? `<br>Conviene reforzar: <strong>${weakAreas.join(', ')}</strong>.` : ''}`;
        return;
    }

    if (state.session.mode === 'demo-final') {
        dom.reportInsight.innerHTML = weakAreas.length > 0
            ? `El examen demo detectÃ³ presiÃ³n en estas secciones: <strong>${weakAreas.join(', ')}</strong>. Conviene regresar a los mÃ³dulos y repetir un simulador adaptativo focalizado.`
            : "El examen demo se resolviÃ³ con un desempeÃ±o consistente. El siguiente paso es sostener el ritmo y practicar manejo de tiempo.";
        return;
    }

    dom.reportInsight.innerHTML = weakAreas.length > 0
        ? `La IA ha detectado que debemos priorizar: <strong>${weakAreas.join(', ')}</strong>.<br>El siguiente ciclo de trabajo se enfocarÃ¡ en reforzar solo esos conceptos.`
        : "Buen desempeÃ±o en esta sesiÃ³n. El siguiente nivel puede aumentar dificultad y variedad de reactivos.";
}

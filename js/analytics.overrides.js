const analyticsStorageKey = "ari_learning_analytics_v2";
const maxStoredSessions = 40;
const dayMs = 24 * 60 * 60 * 1000;

dom.evolutionSummary = document.getElementById("evolution-summary");
dom.evolutionKpis = document.getElementById("evolution-kpis");
dom.evolutionDomains = document.getElementById("evolution-domains");
dom.recentSessions = document.getElementById("recent-sessions");
dom.resultHistorySummary = document.getElementById("result-history-summary");

const moduleProgressTargets = {
    strategy: document.querySelector(".card-strategy .fill"),
    learning: document.querySelector(".card-learning .fill")
};

function createEmptyAnalytics() {
    return {
        sessions: [],
        topics: {},
        domains: {},
        questions: {},
        lastPlacement: null,
        lastDemo: null
    };
}

function parseStoredJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        return fallback;
    }
}

function resolveDomainLabel(categoryTitle = "", moduleTitle = "") {
    const category = normalizeText(categoryTitle);
    const module = normalizeText(moduleTitle);

    if (category.includes("estrategia")) return "Estrategia";
    if (category.includes("matematic")) return "Matematicas";
    if (category.includes("lengua")) return "Lenguaje";
    if (category.includes("oxford") || category.includes("english")) return "English";
    if (module.includes("ciencias")) return "Ciencias";
    if (module.includes("geografia") || module.includes("historia")) return "Sociedad";
    if (category.includes("conocimientos")) return "Ciencias";
    return "General";
}

function buildTopicDomainLookup() {
    const lookup = {};
    state.syllabus.forEach((category) => {
        category.modules.forEach((module) => {
            const domain = resolveDomainLabel(category.category, module.title);
            module.lessons.forEach((lesson) => {
                [lesson.dbTopic, lesson.title, module.title, category.category].filter(Boolean).forEach((token) => {
                    lookup[normalizeText(token)] = domain;
                });
            });
        });
    });
    return lookup;
}

const topicDomainLookup = buildTopicDomainLookup();

function inferDomainFromLabels(topic = "", materia = "") {
    const topicKey = normalizeText(topic);
    const materiaKey = normalizeText(materia);
    const lookupEntries = Object.entries(topicDomainLookup);

    for (const [lookupKey, domain] of lookupEntries) {
        if ((topicKey && (topicKey === lookupKey || topicKey.includes(lookupKey) || lookupKey.includes(topicKey))) ||
            (materiaKey && (materiaKey === lookupKey || materiaKey.includes(lookupKey) || lookupKey.includes(materiaKey)))) {
            return domain;
        }
    }

    const combined = `${materiaKey} ${topicKey}`;
    if (combined.includes("oxford") || combined.includes("english") || combined.includes("ingles")) return "English";
    if (combined.includes("matematic") || combined.includes("fraccion") || combined.includes("porcentaje") || combined.includes("geometr")) return "Matematicas";
    if (combined.includes("lengua") || combined.includes("lect") || combined.includes("ortograf") || combined.includes("puntuacion")) return "Lenguaje";
    if (combined.includes("ciencia") || combined.includes("ecolog") || combined.includes("universo") || combined.includes("energia") || combined.includes("materia")) return "Ciencias";
    if (combined.includes("historia") || combined.includes("geografia") || combined.includes("ciudadania") || combined.includes("econom")) return "Sociedad";
    if (combined.includes("estrategia") || combined.includes("examen")) return "Estrategia";
    return "General";
}

function summarizeTopicStats(entry = {}) {
    const total = Number(entry.total || 0);
    const correct = Number(entry.correct || 0);
    const accuracy = total > 0 ? correct / total : 0;
    const recentPenalty = entry.lastResult === false ? 0.18 : 0;
    const lowExposure = total < 4 ? 0.12 : 0;
    return {
        total,
        correct,
        accuracy,
        priority: Number((1.55 - accuracy + recentPenalty + lowExposure).toFixed(2))
    };
}

function rebuildDomainRollup(analytics) {
    analytics.domains = {};
    Object.values(analytics.topics).forEach((topicEntry) => {
        const domain = topicEntry.domain || "General";
        if (!analytics.domains[domain]) {
            analytics.domains[domain] = { correct: 0, total: 0, lastSeen: null };
        }
        analytics.domains[domain].correct += Number(topicEntry.correct || 0);
        analytics.domains[domain].total += Number(topicEntry.total || 0);
        if (topicEntry.lastSeen && (!analytics.domains[domain].lastSeen || topicEntry.lastSeen > analytics.domains[domain].lastSeen)) {
            analytics.domains[domain].lastSeen = topicEntry.lastSeen;
        }
    });
}

function syncPerformanceFromAnalytics() {
    Object.entries(state.analytics.topics).forEach(([topic, entry]) => {
        const summary = summarizeTopicStats(entry);
        state.user.profile.performance[topic] = {
            correct: summary.correct,
            total: summary.total,
            priority: summary.priority
        };
    });
    localStorage.setItem("ari_performance", JSON.stringify(state.user.profile.performance));
}

function hydrateAnalytics() {
    const stored = parseStoredJson(analyticsStorageKey, createEmptyAnalytics()) || createEmptyAnalytics();
    const analytics = {
        sessions: Array.isArray(stored.sessions) ? stored.sessions : [],
        topics: stored.topics || {},
        domains: stored.domains || {},
        questions: stored.questions || {},
        lastPlacement: stored.lastPlacement || null,
        lastDemo: stored.lastDemo || null
    };

    Object.entries(state.user.profile.performance || {}).forEach(([topic, perf]) => {
        if (!analytics.topics[topic]) {
            analytics.topics[topic] = {
                correct: Number(perf.correct || 0),
                total: Number(perf.total || 0),
                lastSeen: null,
                lastResult: null,
                domain: inferDomainFromLabels(topic, topic)
            };
        }
    });

    Object.entries(analytics.topics).forEach(([topic, entry]) => {
        entry.correct = Number(entry.correct || 0);
        entry.total = Number(entry.total || 0);
        entry.domain = entry.domain || inferDomainFromLabels(topic, topic);
    });

    rebuildDomainRollup(analytics);
    return analytics;
}

state.analytics = hydrateAnalytics();
syncPerformanceFromAnalytics();

function persistAnalytics() {
    rebuildDomainRollup(state.analytics);
    localStorage.setItem(analyticsStorageKey, JSON.stringify(state.analytics));
    syncPerformanceFromAnalytics();
}

function getQuestionTrackingKey(question = {}) {
    return question.sourceId || question.id || `${normalizeText(question.tema || question.materia || "general")}::${normalizeText(question.pregunta || "").slice(0, 80)}`;
}

function getDomainFromQuestion(question = {}) {
    return inferDomainFromLabels(question.tema || question.sectionLabel || "", question.materia || "");
}

function recordPerformance(topicOrQuestion, isCorrect, relatedQuestion = null) {
    const question = relatedQuestion || (typeof topicOrQuestion === "object" ? topicOrQuestion : null);
    const topic = typeof topicOrQuestion === "string"
        ? topicOrQuestion
        : (question?.tema || question?.materia || "General");
    const domain = question ? getDomainFromQuestion(question) : inferDomainFromLabels(topic, topic);

    if (!state.analytics.topics[topic]) {
        state.analytics.topics[topic] = {
            correct: 0,
            total: 0,
            lastSeen: null,
            lastResult: null,
            domain
        };
    }

    const topicEntry = state.analytics.topics[topic];
    topicEntry.total += 1;
    if (isCorrect) {
        topicEntry.correct += 1;
    }
    topicEntry.lastSeen = new Date().toISOString();
    topicEntry.lastResult = isCorrect;
    topicEntry.domain = domain;

    if (question) {
        const questionKey = getQuestionTrackingKey(question);
        if (!state.analytics.questions[questionKey]) {
            state.analytics.questions[questionKey] = {
                correct: 0,
                total: 0,
                lastSeen: null,
                lastResult: null,
                topic,
                domain
            };
        }
        const questionEntry = state.analytics.questions[questionKey];
        questionEntry.total += 1;
        if (isCorrect) {
            questionEntry.correct += 1;
        }
        questionEntry.lastSeen = topicEntry.lastSeen;
        questionEntry.lastResult = isCorrect;
        questionEntry.topic = topic;
        questionEntry.domain = domain;
    }

    persistAnalytics();
}
window.recordPerformance = recordPerformance;

function formatRelativeSessionDate(isoDate) {
    if (!isoDate) return "sin fecha";
    const diff = Date.now() - new Date(isoDate).getTime();
    const days = Math.max(0, Math.floor(diff / dayMs));
    if (days === 0) return "hoy";
    if (days === 1) return "ayer";
    return `hace ${days} dias`;
}

function formatModeLabel(mode = "") {
    if (mode === "placement") return "Test de habilidades";
    if (mode === "demo-final") return "Examen demo";
    if (mode === "simulador") return "Simulador adaptativo";
    if (mode === "estrategia") return "Estrategia";
    return "Sesion guiada";
}

function getOverallLearningStats() {
    const topics = Object.values(state.analytics.topics);
    const total = topics.reduce((sum, entry) => sum + Number(entry.total || 0), 0);
    const correct = topics.reduce((sum, entry) => sum + Number(entry.correct || 0), 0);
    const mastered = topics.filter((entry) => Number(entry.total || 0) >= 4 && (Number(entry.correct || 0) / Number(entry.total || 1)) >= 0.85).length;
    return {
        total,
        correct,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
        mastered
    };
}

function getPriorityTopics(limit = 3) {
    return Object.entries(state.analytics.topics)
        .map(([topic, entry]) => {
            const total = Number(entry.total || 0);
            const accuracy = total > 0 ? Number(entry.correct || 0) / total : 0;
            const recentPenalty = entry.lastResult === false ? 0.18 : 0;
            const score = (1 - accuracy) + recentPenalty + (total < 3 ? 0.12 : 0);
            return { topic, total, accuracy, score };
        })
        .filter((entry) => entry.total > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

function renderOpportunityTags() {
    const tagsContainer = document.querySelector(".areas-oportunidad .tags-container");
    if (!tagsContainer) return;

    const priorities = getPriorityTopics(4);
    if (priorities.length === 0) {
        tagsContainer.innerHTML = `<span class="tag">Completa una primera sesion para detectar prioridades.</span>`;
        return;
    }

    tagsContainer.innerHTML = priorities.map((entry, index) => {
        const critical = index < 2 || entry.accuracy < 0.6;
        return `<span class="tag ${critical ? "critico" : ""}">${entry.topic}</span>`;
    }).join("");
}

function renderModuleProgress() {
    const domainEntries = state.analytics.domains;
    const math = domainEntries.Matematicas || { correct: 0, total: 0 };
    const language = domainEntries.Lenguaje || { correct: 0, total: 0 };
    const science = domainEntries.Ciencias || { correct: 0, total: 0 };
    const social = domainEntries.Sociedad || { correct: 0, total: 0 };
    const strategy = domainEntries.Estrategia || { correct: 0, total: 0 };
    const learningTotal = [math, language, science, social].reduce((sum, entry) => sum + Number(entry.total || 0), 0);
    const learningCorrect = [math, language, science, social].reduce((sum, entry) => sum + Number(entry.correct || 0), 0);

    const strategyPct = strategy.total > 0 ? Math.round((strategy.correct / strategy.total) * 100) : 0;
    const learningPct = learningTotal > 0 ? Math.round((learningCorrect / learningTotal) * 100) : 0;

    if (moduleProgressTargets.strategy) {
        moduleProgressTargets.strategy.style.width = `${strategyPct}%`;
    }
    if (moduleProgressTargets.learning) {
        moduleProgressTargets.learning.style.width = `${learningPct}%`;
    }
}

function renderEvolutionDashboard() {
    if (!dom.evolutionKpis || !dom.evolutionDomains || !dom.recentSessions || !dom.evolutionSummary) return;

    const overall = getOverallLearningStats();
    const recentSessions = [...state.analytics.sessions].slice(-5).reverse();
    const lastPlacement = state.analytics.lastPlacement ? state.analytics.lastPlacement.level : "--";
    const lastDemo = state.analytics.lastDemo ? `${state.analytics.lastDemo.percentage}%` : "--";

    dom.evolutionSummary.textContent = overall.total > 0
        ? `${overall.percentage}% de precision acumulada en ${state.analytics.sessions.length} sesiones. Temas dominados: ${overall.mastered}.`
        : "Aun no hay historial suficiente. Completa una sesion para empezar a ver la evolucion.";

    dom.evolutionKpis.innerHTML = [
        { label: "Precision global", value: `${overall.percentage}%`, meta: `${overall.correct} aciertos de ${overall.total} reactivos registrados` },
        { label: "Sesiones completadas", value: `${state.analytics.sessions.length}`, meta: recentSessions[0] ? `Ultima actividad ${formatRelativeSessionDate(recentSessions[0].timestamp)}` : "Sin sesiones registradas" },
        { label: "Temas dominados", value: `${overall.mastered}`, meta: "Se consideran al menos 4 intentos y 85% o mas de acierto" },
        { label: "Oxford actual", value: `${lastPlacement}`, meta: `Ultimo demo integral: ${lastDemo}` }
    ].map((card) => `
        <article class="evolution-stat-card">
            <span class="label">${card.label}</span>
            <span class="value">${card.value}</span>
            <span class="meta">${card.meta}</span>
        </article>
    `).join("");

    const orderedDomains = ["Matematicas", "Lenguaje", "Ciencias", "Sociedad", "English", "Estrategia"];
    dom.evolutionDomains.innerHTML = orderedDomains.map((domain) => {
        const entry = state.analytics.domains[domain] || { correct: 0, total: 0 };
        const percentage = entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : 0;
        return `
            <article class="domain-progress-card">
                <div class="title-row">
                    <strong>${domain}</strong>
                    <span class="badge ${percentage >= 85 ? "high" : percentage < 60 ? "low" : "neutral"}">${percentage}%</span>
                </div>
                <div class="mini-progress"><div class="fill" style="width:${percentage}%"></div></div>
                <span class="meta">${entry.total > 0 ? `${entry.correct}/${entry.total} reactivos historicos` : "Aun sin historial suficiente"}</span>
            </article>
        `;
    }).join("");

    dom.recentSessions.innerHTML = recentSessions.length > 0
        ? recentSessions.map((session) => `
            <article class="session-history-item">
                <div class="title-row">
                    <strong>${session.title}</strong>
                    <span class="mode">${formatModeLabel(session.mode)}</span>
                </div>
                <div class="mini-progress"><div class="fill" style="width:${session.percentage}%"></div></div>
                <span class="meta">${session.percentage}% de acierto, ${session.correct}/${session.total} reactivos, ${formatRelativeSessionDate(session.timestamp)}</span>
                <div class="detail-row">
                    ${(session.weakAreas || []).slice(0, 3).map((topic) => `<span class="detail-pill">Refuerzo: ${topic}</span>`).join("") || '<span class="detail-pill">Sin alertas criticas</span>'}
                </div>
            </article>
        `).join("")
        : `<article class="session-history-item"><strong>Sin historial todavia</strong><span class="meta">Cuando termines una sesion, aqui veras el avance acumulado, las areas fuertes y las prioridades de refuerzo.</span></article>`;

    renderOpportunityTags();
    renderModuleProgress();
}

function renderResultHistorySummary(sessionEntry) {
    if (!dom.resultHistorySummary || !sessionEntry) return;

    const overall = getOverallLearningStats();
    const priorities = getPriorityTopics(3);
    const placementInfo = state.analytics.lastPlacement ? `Oxford ${state.analytics.lastPlacement.level}` : "Sin placement reciente";

    dom.resultHistorySummary.innerHTML = `
        <article class="result-history-card">
            <div class="title-row">
                <strong>Avance acumulado</strong>
                <span class="mode">${formatModeLabel(sessionEntry.mode)}</span>
            </div>
            <div class="mini-progress"><div class="fill" style="width:${overall.percentage}%"></div></div>
            <span class="meta">${overall.percentage}% global en ${state.analytics.sessions.length} sesiones. ${placementInfo}.</span>
            <div class="detail-row">
                <span class="detail-pill">Sesion actual: ${sessionEntry.percentage}%</span>
                <span class="detail-pill">Temas dominados: ${overall.mastered}</span>
                ${(priorities[0] ? `<span class="detail-pill">Siguiente foco: ${priorities[0].topic}</span>` : "")}
            </div>
        </article>
    `;
}

function finalizeSessionAnalytics() {
    if (state.session.recorded || !state.session.mode) return null;

    const total = Number(state.session.questions.length || 0);
    const correct = Number(state.session.tempScore || 0);
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const topicEntries = Object.entries(state.session.resultsByTopic || {})
        .map(([label, entry]) => ({
            label,
            correct: Number(entry.correct || 0),
            total: Number(entry.total || 0),
            percentage: Number(entry.total || 0) > 0 ? Math.round((Number(entry.correct || 0) / Number(entry.total || 0)) * 100) : 0
        }))
        .sort((a, b) => a.percentage - b.percentage);

    const sessionEntry = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        mode: state.session.mode,
        title: state.session.metadata.title || formatModeLabel(state.session.mode),
        subtitle: state.session.metadata.subtitle || "",
        timestamp: new Date().toISOString(),
        correct,
        total,
        percentage,
        weakAreas: topicEntries.filter((entry) => entry.total > 0 && entry.percentage < 60).map((entry) => entry.label),
        strongAreas: topicEntries.filter((entry) => entry.total > 0 && entry.percentage >= 85).map((entry) => entry.label),
        topicBreakdown: topicEntries
    };

    if (state.session.mode === "placement") {
        const level = getPlacementLevel(correct, total);
        sessionEntry.placementLevel = level.label;
        state.analytics.lastPlacement = {
            level: level.label,
            percentage: level.percentage,
            timestamp: sessionEntry.timestamp
        };
    }

    if (state.session.mode === "demo-final") {
        state.analytics.lastDemo = {
            percentage,
            timestamp: sessionEntry.timestamp
        };
    }

    state.analytics.sessions.push(sessionEntry);
    state.analytics.sessions = state.analytics.sessions.slice(-maxStoredSessions);
    state.session.recorded = true;

    persistAnalytics();
    renderEvolutionDashboard();
    renderResultHistorySummary(sessionEntry);
    return sessionEntry;
}

function getQuestionAdaptiveWeight(question) {
    const topic = question.tema || question.materia || "General";
    const domain = getDomainFromQuestion(question);
    const topicEntry = state.analytics.topics[topic];
    const questionEntry = state.analytics.questions[getQuestionTrackingKey(question)];
    const domainEntry = state.analytics.domains[domain];
    const seededWeakness = weakTopicSeeds.some((seed) => normalizeText(topic).includes(seed));

    let weight = seededWeakness ? 1.1 : 0.8;

    if (topicEntry && topicEntry.total > 0) {
        const topicAccuracy = topicEntry.correct / topicEntry.total;
        weight += (1 - topicAccuracy) * 1.6;
        if (topicEntry.lastResult === false) weight += 0.35;
        if (topicEntry.total < 4) weight += 0.2;
    } else {
        weight += 0.45;
    }

    if (domainEntry && domainEntry.total > 0) {
        const domainAccuracy = domainEntry.correct / domainEntry.total;
        weight += (1 - domainAccuracy) * 0.45;
    }

    if (questionEntry && questionEntry.total > 0) {
        const questionAccuracy = questionEntry.correct / questionEntry.total;
        weight += (1 - questionAccuracy) * 1.35;
        if (questionEntry.lastResult === false) weight += 0.45;
        if (questionEntry.correct >= 2 && questionAccuracy >= 0.85) weight -= 0.35;
    } else {
        weight += 0.25;
    }

    return Number((weight + Math.random() * 0.05).toFixed(3));
}

function buildAdaptiveQuestionSet(allQuestions, limit = 15) {
    const eligibleQuestions = allQuestions.filter((question) => question.tipo === "opcion_multiple" && question.materia !== "Estrategia AcadÃ©mica");
    const enriched = eligibleQuestions.map((question) => ({
        question,
        topic: question.tema || question.materia || "General",
        weight: getQuestionAdaptiveWeight(question)
    })).sort((a, b) => b.weight - a.weight);

    const selected = [];
    const usedIds = new Set();
    const topicCounts = {};

    enriched.forEach((entry) => {
        if (selected.length >= limit) return;
        const key = entry.question.id;
        const maxPerTopic = entry.weight >= 3 ? 3 : entry.weight >= 2 ? 2 : 1;

        if (!usedIds.has(key) && (topicCounts[entry.topic] || 0) < maxPerTopic) {
            usedIds.add(key);
            topicCounts[entry.topic] = (topicCounts[entry.topic] || 0) + 1;
            selected.push(cloneQuestion(entry.question, { timeLimit: 45 }));
        }
    });

    enriched.forEach((entry) => {
        if (selected.length >= limit) return;
        const key = entry.question.id;
        if (!usedIds.has(key)) {
            usedIds.add(key);
            selected.push(cloneQuestion(entry.question, { timeLimit: 45 }));
        }
    });

    return selected;
}
window.buildAdaptiveQuestionSet = buildAdaptiveQuestionSet;

async function startPlacementTest() {
    if (!state.allQuestions || state.allQuestions.length === 0) {
        await fetchQuestions();
    }

    const englishQuestions = shuffleArray(state.allQuestions.filter((question) => isEnglishQuestion(question)));
    state.session.mode = "placement";
    state.session.metadata = {
        title: "Test de habilidades",
        subtitle: "Diagnostico Oxford con estimacion de nivel CEFR."
    };
    state.session.questions = englishQuestions
        .slice(0, Math.min(24, englishQuestions.length))
        .map((question) => cloneQuestion(question, { timeLimit: 75, sectionLabel: "Oxford English Placement" }));
    state.session.currentIndex = 0;
    state.session.tempScore = 0;
    state.session.resultsByTopic = {};
    state.session.recorded = false;
    state.session.startedAt = new Date().toISOString();

    if (state.session.questions.length === 0) {
        alert("No hay suficientes reactivos de ingles cargados para ejecutar el diagnostico.");
        return;
    }

    switchScreen("quiz-screen");
    renderQuestion();
}
window.startPlacementTest = startPlacementTest;

async function initiateFinalDemoExam() {
    const allPool = await loadQuestions();
    if (!allPool || allPool.length === 0) {
        alert("Error: No hay preguntas cargadas.");
        return;
    }

    state.session.mode = "demo-final";
    state.session.metadata = {
        title: "Examen Demo Integral",
        subtitle: "100 reactivos organizados por secciones y tiempos de referencia."
    };
    state.session.questions = buildSectionedDemoExam(allPool);
    state.session.currentIndex = 0;
    state.session.tempScore = 0;
    state.session.resultsByTopic = {};
    state.session.recorded = false;
    state.session.startedAt = new Date().toISOString();

    switchScreen("quiz-screen");
    renderQuestion();
}
window.initiateFinalDemoExam = initiateFinalDemoExam;

async function startApp(mode, topicFilter = null) {
    state.session.mode = mode;
    state.session.tempScore = 0;
    state.session.currentIndex = 0;
    state.session.resultsByTopic = {};
    state.session.metadata = {};
    state.session.recorded = false;
    state.session.startedAt = new Date().toISOString();

    const allData = await loadQuestions();

    if (mode === "estrategia") {
        state.session.metadata = {
            title: "Practica de Estrategia",
            subtitle: "Domina descarte, ritmo y toma de decisiones."
        };
        state.session.questions = shuffleArray(
            allData.filter((question) => normalizeText(question.materia).includes("estrategia") || normalizeText(question.materia).includes("examen"))
        ).slice(0, 12).map((question) => cloneQuestion(question, { timeLimit: 50 }));
    } else if (topicFilter) {
        state.session.metadata = {
            title: "Evaluacion de tema",
            subtitle: `Validacion de aprendizaje enfocada en ${topicFilter}.`
        };
        state.session.questions = shuffleArray(getTopicPool(allData, topicFilter, state.currentLesson?.title || topicFilter))
            .slice(0, 10)
            .map((question) => cloneQuestion(question, { timeLimit: 60 }));
    } else {
        state.session.metadata = {
            title: "Simulador Adaptativo",
            subtitle: "Refuerzo inteligente segun tus areas de oportunidad."
        };
        state.session.questions = buildAdaptiveQuestionSet(allData, 15);
    }

    if (state.session.questions.length === 0) {
        alert("No hay suficientes reactivos vinculados a este tema. Necesitamos ampliar este bloque antes de evaluarlo.");
        return;
    }

    switchScreen("quiz-screen");
    renderQuestion();
}
window.startApp = startApp;

function handleTimeout() {
    const question = state.session.questions[state.session.currentIndex];
    if (!question || !dom.quizFeedback.classList.contains("hidden")) return;

    registerSessionResult(question, false);
    recordPerformance(question, false);
    Array.from(dom.quizOpciones.children).forEach((child) => child.classList.add("disabled"));
    dom.fTitle.textContent = "Tiempo agotado";
    dom.fText.textContent = "Se registro como oportunidad de mejora. Decide, marca y avanza.";
    showFeedback(false);
}
window.handleTimeout = handleTimeout;

function selectOption(selectedId, element) {
    if (!dom.quizFeedback.classList.contains("hidden")) return;

    clearInterval(state.timerInterval);
    const question = state.session.questions[state.session.currentIndex];
    const isCorrect = selectedId === question.respuesta_correcta;

    registerSessionResult(question, isCorrect);
    recordPerformance(question, isCorrect);

    Array.from(dom.quizOpciones.children).forEach((child) => child.classList.add("disabled"));
    element.classList.add("selected", isCorrect ? "correct" : "incorrect");

    if (isCorrect) state.session.tempScore++;

    dom.fTitle.textContent = isCorrect ? "Respuesta correcta" : "Respuesta incorrecta";
    dom.fText.textContent = question.explicacion || "Revisa la lectura y vuelve a intentarlo con foco en la idea principal.";
    showFeedback(isCorrect);
}
window.selectOption = selectOption;

function showResultsUI() {
    clearInterval(state.timerInterval);
    switchScreen("result-screen");

    dom.reportCorrect.textContent = state.session.tempScore;
    dom.reportTotal.textContent = state.session.questions.length;

    if (dom.resultTitle) {
        dom.resultTitle.textContent = state.session.metadata.title || "Reporte Evolutivo Final";
    }
    if (dom.resultSubtitle) {
        dom.resultSubtitle.textContent = state.session.metadata.subtitle || "Resumen de la sesion mas reciente.";
    }

    const sessionEntry = finalizeSessionAnalytics();
    renderIAInsights(sessionEntry);
}
window.showResultsUI = showResultsUI;

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

        const card = document.createElement("div");
        card.className = `insight-card ${percentage < 60 ? "low" : "high"}`;
        card.innerHTML = `
            <div class="card-header">
                <strong>${label}</strong>
                <span class="badge ${statusClass}">${status}</span>
            </div>
            <div class="pct-bar"><div class="fill" style="width: ${percentage}%"></div></div>
            <span>${percentage}% de aciertos en esta sesion</span>
        `;
        dom.reportSummary.appendChild(card);
    });

    const lastSession = state.analytics.sessions[state.analytics.sessions.length - 1] || {
        mode: state.session.mode,
        percentage: state.session.questions.length > 0 ? Math.round((state.session.tempScore / state.session.questions.length) * 100) : 0
    };

    renderResultHistorySummary(lastSession);

    if (state.session.mode === "placement") {
        const placement = getPlacementLevel(state.session.tempScore, state.session.questions.length);
        dom.reportInsight.innerHTML = `Nivel estimado actual: <strong>${placement.label}</strong> (${placement.percentage}% de aciertos). ${placement.description}${weakAreas.length > 0 ? `<br>Conviene reforzar: <strong>${weakAreas.join(", ")}</strong>.` : ""}`;
        return;
    }

    if (state.session.mode === "demo-final") {
        dom.reportInsight.innerHTML = weakAreas.length > 0
            ? `El examen demo detecto presion en estas secciones: <strong>${weakAreas.join(", ")}</strong>. Conviene regresar a los modulos y repetir un simulador adaptativo focalizado.`
            : "El examen demo se resolvio con un desempeno consistente. El siguiente paso es sostener el ritmo y practicar manejo de tiempo.";
        return;
    }

    dom.reportInsight.innerHTML = weakAreas.length > 0
        ? `La IA detecto que debemos priorizar: <strong>${weakAreas.join(", ")}</strong>.<br>El siguiente ciclo se enfocara en reforzar solo esos conceptos y medir si la precision mejora en la proxima sesion.`
        : "Buen desempeno en esta sesion. El historial muestra que ya puedes aumentar dificultad y variedad de reactivos.";
}
window.renderIAInsights = renderIAInsights;

function backToHome(el) {
    clearInterval(state.timerInterval);
    if (dom.lessonAudio) dom.lessonAudio.pause();

    if (dom.videoGrid) {
        dom.videoGrid.querySelectorAll("video").forEach((video) => video.pause());
        dom.videoGrid.querySelectorAll("iframe").forEach((frame) => frame.src = "");
    }

    if (el) {
        document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
        el.classList.add("active");
    }

    renderEvolutionDashboard();
    switchScreen("home-screen");
}
window.backToHome = backToHome;

document.addEventListener("DOMContentLoaded", () => {
    renderEvolutionDashboard();
});

const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const artifactDir = path.join(__dirname, "..", "artifacts", "visual");

test.beforeAll(() => {
    fs.mkdirSync(artifactDir, { recursive: true });
});

async function login(page) {
    await page.fill("#auth-username", "ari");
    await page.fill("#auth-password", "santa0249");
    await page.locator("#auth-form button[type='submit']").click();
    await page.waitForFunction(() => !document.body.classList.contains("auth-locked"));
}

async function waitForOverrides(page) {
    await page.waitForFunction(() => Boolean(window.__APP_STATE__));
    await page.waitForFunction(() => Boolean(document.querySelector('script[data-role="app-overrides"]')));
}

async function capture(page, name) {
    await page.screenshot({ path: path.join(artifactDir, name), fullPage: true });
}

async function answerCurrentQuestion(page, chooseCorrect = true) {
    const current = await page.evaluate(({ chooseCorrect }) => {
        const session = window.__APP_STATE__.session;
        const question = session.questions[session.currentIndex];
        if (!question || question.tipo !== "opcion_multiple") {
            return null;
        }

        const correctIndex = question.opciones.findIndex((option) => option.id === question.respuesta_correcta);
        const selectedIndex = chooseCorrect
            ? correctIndex
            : question.opciones.findIndex((option) => option.id !== question.respuesta_correcta);

        return {
            selectedIndex,
            currentIndex: session.currentIndex,
            total: session.questions.length
        };
    }, { chooseCorrect });

    if (!current) {
        const nextButton = page.locator("#options-container button").first();
        if (await nextButton.count()) {
            await nextButton.click();
        }
        return;
    }

    await page.locator("#options-container .option").nth(current.selectedIndex).click();
    await expect(page.locator("#feedback-container")).toBeVisible();

    const isLast = current.currentIndex === current.total - 1;
    const nextButton = page.locator("#feedback-container button");
    await nextButton.click();

    if (!isLast) {
        await expect(page.locator("#question-container")).toBeVisible();
    }
}

async function finishQuiz(page, strategy = "correct") {
    while (await page.locator("#quiz-screen.active").count()) {
        const before = await page.evaluate(() => ({
            currentIndex: window.__APP_STATE__.session.currentIndex,
            total: window.__APP_STATE__.session.questions.length
        }));

        const chooseCorrect = strategy === "correct";
        await answerCurrentQuestion(page, chooseCorrect);

        const finished = await page.locator("#result-screen.active").count();
        if (finished) {
            return;
        }

        await page.waitForFunction(
            ({ previous }) => window.__APP_STATE__.session.currentIndex > previous || document.querySelector("#result-screen.active"),
            { previous: before.currentIndex }
        );
    }
}

test("dashboard, estrategia y oxford muestran contenido real", async ({ page }) => {
    await page.goto("/");
    await login(page);
    await waitForOverrides(page);

    await expect(page.locator("#home-screen.active")).toBeVisible();
    await expect(page.locator("#evolution-kpis .evolution-stat-card")).toHaveCount(4);
    await capture(page, "01-dashboard.png");

    await page.click("#nav-estrategia");
    await expect(page.locator("#learning-menu-screen.active")).toBeVisible();
    await expect(page.locator(".lesson-item")).toHaveCount(3);
    await capture(page, "02-estrategia-menu.png");

    await page.locator(".lesson-item").nth(0).click();
    await expect(page.locator("#lesson-screen.active")).toBeVisible();
    await page.waitForFunction(() => document.querySelector("#lesson-text")?.textContent?.trim().length > 200);
    await expect(page.locator("#lesson-screen")).not.toContainText("PrÃ¡ctica");
    await capture(page, "03-estrategia-lectura.png");

    await page.click("#step-2");
    expect(await page.locator(".video-card").count()).toBeGreaterThan(0);
    await expect(page.locator(".video-card iframe").first()).toHaveAttribute("src", /FP04a7za8Ts|estrategia_45seg\.mp4/);
    await capture(page, "04-estrategia-multimedia.png");

    await page.click("button.btn-back");
    await page.click("#nav-english");
    await expect(page.locator("#learning-menu-screen.active")).toBeVisible();
    await capture(page, "05-english-menu.png");

    await page.locator(".lesson-item").nth(0).click();
    await expect(page.locator("#lesson-screen.active")).toBeVisible();
    await page.waitForFunction(() => document.querySelector("#lesson-text")?.textContent?.trim().length > 120);
    await page.click("#step-2");
    expect(await page.locator(".video-card").count()).toBeGreaterThan(0);
    await capture(page, "06-english-multimedia.png");
});

test("practica guiada no queda vacia en temas criticos", async ({ page }) => {
    await page.goto("/");
    await login(page);
    await waitForOverrides(page);

    await page.click("#nav-estrategia");
    await expect(page.locator("#learning-menu-screen.active")).toBeVisible();

    await page.locator(".lesson-item").nth(1).click();
    await expect(page.locator("#lesson-screen.active")).toBeVisible();
    await page.click("#step-3");
    await expect(page.locator("#practice-area")).not.toContainText("Estamos curando nuevos reactivos");
    await expect(page.locator("#practice-area")).toContainText(/Reactivo de practica|Reactivo de práctica|Relaciona las columnas|Ordena los elementos/);

    await page.click("button.btn-back");
    await page.locator(".lesson-item").nth(2).click();
    await expect(page.locator("#lesson-screen.active")).toBeVisible();
    await page.click("#step-3");
    await expect(page.locator("#practice-area")).not.toContainText("Estamos curando nuevos reactivos");

    await page.click("button.btn-back");
    await page.evaluate(() => enterModule("aprendizaje", null, "CIENCIAS NATURALES"));
    await expect(page.locator("#learning-menu-screen.active")).toBeVisible();
    await page.locator(".lesson-item").nth(2).click();
    await expect(page.locator("#lesson-screen.active")).toBeVisible();
    await page.click("#step-3");
    await expect(page.locator("#practice-area")).not.toContainText("Estamos curando nuevos reactivos");
});

test("curaduria de videos por materia queda aplicada en el syllabus", async ({ page }) => {
    await page.goto("/");
    await login(page);
    await waitForOverrides(page);

    const checks = await page.evaluate(() => {
        const targets = {
            "mat-e1": ["FP04a7za8Ts", "estrategia_45seg.mp4"],
            "mat-1": ["xU4zMra2T7A", "OwcbKpwJnyA"],
            "mat-4": ["FGoSqeFl5zg", "zeN2UYyVAHA"],
            "mat-10": ["YvgDWSd3BU4", "OW6Uys0b_sw"],
            "len-1": ["PyCTNOq8SmU", "u2eFYFQ9_fI"],
            "len-6": ["2Bs6tknaLJQ", "CHffxEk06S0"],
            "sci-1": ["S3jJj68dBxw", "KYUQ-kySe2E"],
            "sci-5": ["ZykXgSqet6A", "Oex6qI90DK8"],
            "soc-1": ["aLHnduUqDdY", "2CO_RWLVAwQ"],
            "soc-4": ["1xi3P5jr7eo", "VARoxLd4JVc"],
            "eng-2": ["gOMypAhVaXE", "xioVn6MPsUc"]
        };

        const lessons = {};
        window.__APP_STATE__.syllabus.forEach((category) => {
            category.modules.forEach((module) => {
                module.lessons.forEach((lesson) => {
                    lessons[lesson.id] = lesson.videos || [];
                });
            });
        });

        return Object.entries(targets).map(([lessonId, expected]) => ({
            lessonId,
            urls: (lessons[lessonId] || []).map((video) => video.url),
            ok: expected.every((snippet) => (lessons[lessonId] || []).some((video) => String(video.url).includes(snippet)))
        }));
    });

    for (const check of checks) {
        expect(check.ok, `${check.lessonId} => ${check.urls.join(", ")}`).toBeTruthy();
    }
});

test("test de habilidades calcula nivel y muestra reporte", async ({ page }) => {
    await page.goto("/");
    await login(page);
    await waitForOverrides(page);

    await page.locator(".card-placement").click();
    await expect(page.locator("#quiz-screen.active")).toBeVisible();

    const total = await page.evaluate(() => window.__APP_STATE__.session.questions.length);
    expect(total).toBeGreaterThan(10);

    await answerCurrentQuestion(page, true);
    await capture(page, "07-placement-question.png");
    await finishQuiz(page, "correct");

    await expect(page.locator("#result-screen.active")).toBeVisible();
    await expect(page.locator("#result-screen")).toContainText("Nivel estimado actual:");
    await expect(page.locator("#result-screen")).toContainText(/A1|A2|B1|B2|C1/);
    await capture(page, "08-placement-result.png");
});

test("simulador adaptativo y examen demo integral recorren el flujo", async ({ page }) => {
    await page.goto("/");
    await login(page);
    await waitForOverrides(page);

    await page.locator(".card-simulador").click();
    await expect(page.locator("#quiz-screen.active")).toBeVisible();
    const adaptiveCount = await page.evaluate(() => window.__APP_STATE__.session.questions.length);
    expect(adaptiveCount).toBe(15);
    await capture(page, "09-adaptive-question.png");
    await finishQuiz(page, "correct");
    await expect(page.locator("#result-screen.active")).toBeVisible();
    await capture(page, "10-adaptive-result.png");

    await page.click("button.btn-primary.mt-4");
    await expect(page.locator("#home-screen.active")).toBeVisible();

    await page.locator(".card-examen-final").click();
    await expect(page.locator("#quiz-screen.active")).toBeVisible();
    const demoCount = await page.evaluate(() => window.__APP_STATE__.session.questions.length);
    expect(demoCount).toBe(100);

    await page.evaluate(() => {
        window.__APP_STATE__.session.questions = window.__APP_STATE__.session.questions.slice(0, 12);
    });
    await capture(page, "11-demo-question.png");
    await finishQuiz(page, "correct");

    await expect(page.locator("#result-screen.active")).toBeVisible();
    await expect(page.locator("#result-screen")).toContainText("Examen Demo Integral");
    await capture(page, "12-demo-result.png");

    await page.click("button.btn-primary.mt-4");
    await expect(page.locator("#home-screen.active")).toBeVisible();
    await expect(page.locator("#recent-sessions .session-history-item")).toHaveCount(2);
    await expect(page.locator("#evolution-domains .domain-progress-card")).toHaveCount(6);
});

test("backend autentica sesion y persiste progreso", async ({ page }) => {
    await page.goto("/");
    await login(page);
    await waitForOverrides(page);

    const session = await page.evaluate(async () => {
        const response = await fetch("/api/auth/session", { credentials: "include" });
        return response.json();
    });

    expect(session.authenticated).toBeTruthy();
    expect(session.user.username).toBe("ari");

    await page.locator(".card-simulador").click();
    await expect(page.locator("#quiz-screen.active")).toBeVisible();
    await answerCurrentQuestion(page, true);
    await page.waitForTimeout(1200);

    const progress = await page.evaluate(async () => {
        const response = await fetch("/api/progress", { credentials: "include" });
        return response.json();
    });

    expect(progress.user.username).toBe("ari");
    expect(progress.performance).toBeTruthy();
    expect(progress.analytics).toBeTruthy();
});

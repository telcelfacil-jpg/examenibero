(function () {
    let saveTimer = null;
    let backendReady = false;
    let hydratedFromBackend = false;

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function syncLocalStateFromPayload(payload) {
        if (!payload) return;

        if (payload.user?.displayName) {
            state.user.name = payload.user.displayName;
            const welcome = document.getElementById("welcome-user-name");
            if (welcome) {
                welcome.textContent = payload.user.displayName;
            }
        }

        if (payload.performance) {
            state.user.profile.performance = clone(payload.performance);
            localStorage.setItem("ari_performance", JSON.stringify(state.user.profile.performance));
        }

        if (payload.analytics) {
            state.analytics = clone(payload.analytics);
            localStorage.setItem("ari_learning_analytics_v2", JSON.stringify(state.analytics));
        }

        if (typeof renderEvolutionDashboard === "function") {
            renderEvolutionDashboard();
        }
    }

    async function pullProgressFromBackend() {
        if (!window.backendClient || !backendReady) return;
        const payload = await window.backendClient.loadProgress();
        syncLocalStateFromPayload(payload);
        hydratedFromBackend = true;
    }

    function scheduleBackendSave() {
        if (!window.backendClient || !backendReady || !hydratedFromBackend) return;

        clearTimeout(saveTimer);
        saveTimer = setTimeout(async () => {
            try {
                await window.backendClient.saveProgress({
                    analytics: state.analytics,
                    performance: state.user.profile.performance
                });
            } catch (error) {
                console.warn("No se pudo sincronizar el progreso con backend.", error);
            }
        }, 700);
    }

    const originalPersistAnalytics = persistAnalytics;
    persistAnalytics = function persistAnalyticsWithBackend() {
        originalPersistAnalytics();
        scheduleBackendSave();
    };

    async function bootstrapBackendSync() {
        if (!window.backendClient) return;
        backendReady = await window.backendClient.isAvailable();
    }

    document.addEventListener("ari:auth-changed", async (event) => {
        const detail = event.detail || {};
        if (!detail.authenticated) {
            hydratedFromBackend = false;
            return;
        }

        if (!backendReady) {
            backendReady = await window.backendClient.isAvailable();
        }

        if (backendReady && detail.source === "backend") {
            try {
                await pullProgressFromBackend();
            } catch (error) {
                console.warn("No se pudo hidratar el progreso desde backend.", error);
            }
        }
    });

    document.addEventListener("DOMContentLoaded", bootstrapBackendSync);
})();

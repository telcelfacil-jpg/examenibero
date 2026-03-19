(function () {
    const jsonHeaders = {
        "Content-Type": "application/json"
    };

    async function request(path, options = {}) {
        const response = await fetch(path, {
            credentials: "include",
            headers: {
                ...jsonHeaders,
                ...(options.headers || {})
            },
            ...options
        });

        const contentType = response.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if (!response.ok) {
            const message = typeof payload === "object" && payload?.error ? payload.error : `HTTP ${response.status}`;
            throw new Error(message);
        }

        return payload;
    }

    const backendClient = {
        async isAvailable() {
            try {
                await request("/api/health", { method: "GET" });
                return true;
            } catch (error) {
                return false;
            }
        },

        async checkSession() {
            try {
                return await request("/api/auth/session", { method: "GET" });
            } catch (error) {
                return { authenticated: false, backend: false };
            }
        },

        async login(username, password) {
            return request("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ username, password })
            });
        },

        async logout() {
            return request("/api/auth/logout", {
                method: "POST",
                body: JSON.stringify({})
            });
        },

        async loadProgress() {
            return request("/api/progress", { method: "GET" });
        },

        async saveProgress(payload) {
            return request("/api/progress", {
                method: "PUT",
                body: JSON.stringify(payload)
            });
        }
    };

    window.backendClient = backendClient;
})();

(function () {
    const fallbackSessionKey = "ari_auth_session_v1";
    const fallbackCredentials = {
        username: "ari",
        password: "santa0249",
        displayName: "Ariadna"
    };

    function setUnlockedState() {
        document.body.classList.remove("auth-locked");
        const gate = document.getElementById("auth-gate");
        if (gate) gate.classList.add("hidden");
    }

    function setLockedState() {
        document.body.classList.add("auth-locked");
        const gate = document.getElementById("auth-gate");
        if (gate) gate.classList.remove("hidden");
    }

    function updateUserUi(user) {
        const welcome = document.getElementById("welcome-user-name");
        if (welcome && user?.displayName) {
            welcome.textContent = user.displayName;
        }

        if (typeof state !== "undefined" && user?.displayName) {
            state.user.name = user.displayName;
        }
    }

    function emitAuthChange(detail) {
        document.dispatchEvent(new CustomEvent("ari:auth-changed", { detail }));
    }

    function isFallbackAuthenticated() {
        return sessionStorage.getItem(fallbackSessionKey) === "ok";
    }

    function authenticateFallback(username, password) {
        return username === fallbackCredentials.username && password === fallbackCredentials.password;
    }

    function getFallbackUser() {
        return {
            id: "student-ari",
            username: fallbackCredentials.username,
            displayName: fallbackCredentials.displayName
        };
    }

    async function resolveExistingSession() {
        if (window.backendClient) {
            const session = await window.backendClient.checkSession();
            if (session?.authenticated) {
                updateUserUi(session.user);
                setUnlockedState();
                emitAuthChange({ authenticated: true, user: session.user, source: "backend" });
                return true;
            }
        }

        if (isFallbackAuthenticated()) {
            const fallbackUser = getFallbackUser();
            updateUserUi(fallbackUser);
            setUnlockedState();
            emitAuthChange({ authenticated: true, user: fallbackUser, source: "fallback" });
            return true;
        }

        setLockedState();
        emitAuthChange({ authenticated: false, user: null, source: "none" });
        return false;
    }

    async function bootstrapAuthGate() {
        const form = document.getElementById("auth-form");
        const usernameInput = document.getElementById("auth-username");
        const passwordInput = document.getElementById("auth-password");
        const errorText = document.getElementById("auth-error");

        if (!form || !usernameInput || !passwordInput || !errorText) return;

        const resolved = await resolveExistingSession();
        if (!resolved) {
            usernameInput.focus();
        }

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            try {
                if (window.backendClient) {
                    const response = await window.backendClient.login(username, password);
                    if (response?.authenticated) {
                        errorText.classList.add("hidden");
                        passwordInput.value = "";
                        updateUserUi(response.user);
                        setUnlockedState();
                        emitAuthChange({ authenticated: true, user: response.user, source: "backend" });
                        return;
                    }
                }
            } catch (error) {
                console.warn("Backend login unavailable, usando respaldo local.", error);
            }

            if (authenticateFallback(username, password)) {
                sessionStorage.setItem(fallbackSessionKey, "ok");
                errorText.classList.add("hidden");
                passwordInput.value = "";
                const fallbackUser = getFallbackUser();
                updateUserUi(fallbackUser);
                setUnlockedState();
                emitAuthChange({ authenticated: true, user: fallbackUser, source: "fallback" });
                return;
            }

            errorText.classList.remove("hidden");
            passwordInput.value = "";
            passwordInput.focus();
        });
    }

    window.logoutApp = async function logoutApp() {
        sessionStorage.removeItem(fallbackSessionKey);

        if (window.backendClient) {
            try {
                await window.backendClient.logout();
            } catch (error) {
                console.warn("No se pudo cerrar sesion en backend.", error);
            }
        }

        setLockedState();

        const usernameInput = document.getElementById("auth-username");
        const passwordInput = document.getElementById("auth-password");
        const errorText = document.getElementById("auth-error");

        if (errorText) errorText.classList.add("hidden");
        if (usernameInput) usernameInput.focus();
        if (passwordInput) passwordInput.value = "";

        emitAuthChange({ authenticated: false, user: null, source: "logout" });

        if (typeof backToHome === "function") {
            try {
                backToHome();
            } catch (error) {
                // no-op
            }
        }
    };

    document.addEventListener("DOMContentLoaded", bootstrapAuthGate);
})();

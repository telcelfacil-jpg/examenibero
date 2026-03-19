(function () {
    const sessionKey = "ari_auth_session_v1";
    const credentials = {
        username: "ari",
        password: "santa0249"
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

    function isSessionAuthenticated() {
        return sessionStorage.getItem(sessionKey) === "ok";
    }

    function authenticate(username, password) {
        return username === credentials.username && password === credentials.password;
    }

    function bootstrapAuthGate() {
        const form = document.getElementById("auth-form");
        const usernameInput = document.getElementById("auth-username");
        const passwordInput = document.getElementById("auth-password");
        const errorText = document.getElementById("auth-error");

        if (!form || !usernameInput || !passwordInput || !errorText) return;

        if (isSessionAuthenticated()) {
            setUnlockedState();
        } else {
            setLockedState();
            usernameInput.focus();
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            if (authenticate(username, password)) {
                sessionStorage.setItem(sessionKey, "ok");
                errorText.classList.add("hidden");
                passwordInput.value = "";
                setUnlockedState();
                return;
            }

            errorText.classList.remove("hidden");
            passwordInput.value = "";
            passwordInput.focus();
        });
    }

    window.logoutApp = function logoutApp() {
        sessionStorage.removeItem(sessionKey);
        setLockedState();
        const usernameInput = document.getElementById("auth-username");
        const passwordInput = document.getElementById("auth-password");
        const errorText = document.getElementById("auth-error");

        if (errorText) errorText.classList.add("hidden");
        if (usernameInput) usernameInput.focus();
        if (passwordInput) passwordInput.value = "";

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

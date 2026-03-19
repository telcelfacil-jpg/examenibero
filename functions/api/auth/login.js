import { buildSessionCookie, constantTimeEqual, createSessionToken, pbkdf2 } from "../../_lib/auth.js";
import { errorResponse, json } from "../../_lib/responses.js";

export async function onRequestPost(context) {
    try {
        if (!context.env?.DB) {
            return errorResponse("Falta el binding DB en Pages Functions.", 503);
        }

        const body = await context.request.json().catch(() => ({}));
        const username = String(body.username || "").trim().toLowerCase();
        const password = String(body.password || "");

        if (!username || !password) {
            return errorResponse("Usuario y password son obligatorios.", 400);
        }

        const user = await context.env.DB.prepare(
            `SELECT id, username, display_name AS displayName, role, password_salt AS passwordSalt, password_hash AS passwordHash
             FROM users
             WHERE lower(username) = ?1`
        ).bind(username).first();

        if (!user) {
            return errorResponse("Credenciales incorrectas.", 401, { authenticated: false });
        }

        const computedHash = await pbkdf2(password, user.passwordSalt);
        if (!constantTimeEqual(computedHash, user.passwordHash)) {
            return errorResponse("Credenciales incorrectas.", 401, { authenticated: false });
        }

        const token = createSessionToken();
        const now = new Date().toISOString();

        await context.env.DB.prepare("DELETE FROM sessions WHERE user_id = ?1").bind(user.id).run();
        await context.env.DB.prepare(
            "INSERT INTO sessions (token, user_id, created_at, last_seen_at) VALUES (?1, ?2, ?3, ?4)"
        ).bind(token, user.id, now, now).run();

        return json({
            authenticated: true,
            user: {
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                role: user.role || "student"
            }
        }, {
            headers: {
                "Set-Cookie": buildSessionCookie(token)
            }
        });
    } catch (error) {
        console.error("Auth login error", error?.message || error);
        return errorResponse("Error interno del servidor.", 500);
    }
}

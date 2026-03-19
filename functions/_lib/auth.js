import { errorResponse } from "./responses.js";

import { pbkdf2 as noblePbkdf2 } from "@noble/hashes/pbkdf2.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";

const SESSION_COOKIE = "ari_session";

export async function pbkdf2(password, saltHex) {
    const derived = noblePbkdf2(sha256, utf8ToBytes(password), utf8ToBytes(saltHex), {
        c: 120000,
        dkLen: 32
    });
    return bytesToHex(derived);
}

export function constantTimeEqual(left, right) {
    if (!left || !right || left.length !== right.length) return false;
    let result = 0;
    for (let index = 0; index < left.length; index += 1) {
        result |= left.charCodeAt(index) ^ right.charCodeAt(index);
    }
    return result === 0;
}

export function parseCookies(request) {
    const header = request.headers.get("cookie") || "";
    return header.split(";").reduce((acc, chunk) => {
        const [rawKey, ...rest] = chunk.trim().split("=");
        if (!rawKey) return acc;
        acc[rawKey] = decodeURIComponent(rest.join("=") || "");
        return acc;
    }, {});
}

export function createSessionToken() {
    return `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
}

export function buildSessionCookie(token, maxAge = 60 * 60 * 24 * 7) {
    return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearSessionCookie() {
    return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export async function getSessionUser(context) {
    if (!context.env?.DB) {
        return { user: null, session: null, dbMissing: true };
    }

    const cookies = parseCookies(context.request);
    const token = cookies[SESSION_COOKIE];
    if (!token) {
        return { user: null, session: null, dbMissing: false };
    }

    const row = await context.env.DB.prepare(
        `SELECT
            sessions.token,
            sessions.user_id AS userId,
            sessions.created_at AS sessionCreatedAt,
            sessions.last_seen_at AS lastSeenAt,
            users.id,
            users.username,
            users.display_name AS displayName,
            users.role
        FROM sessions
        INNER JOIN users ON users.id = sessions.user_id
        WHERE sessions.token = ?1`
    ).bind(token).first();

    if (!row) {
        return { user: null, session: null, dbMissing: false };
    }

    await context.env.DB.prepare("UPDATE sessions SET last_seen_at = ?1 WHERE token = ?2")
        .bind(new Date().toISOString(), token)
        .run();

    return {
        user: {
            id: row.id,
            username: row.username,
            displayName: row.displayName,
            role: row.role || "student"
        },
        session: {
            token: row.token,
            userId: row.userId,
            createdAt: row.sessionCreatedAt,
            lastSeenAt: row.lastSeenAt
        },
        dbMissing: false
    };
}

export async function requireSessionUser(context) {
    const auth = await getSessionUser(context);
    if (auth.dbMissing) {
        return { ok: false, response: errorResponse("Falta el binding DB en Pages Functions.", 503) };
    }
    if (!auth.user) {
        return { ok: false, response: errorResponse("Sesion no valida.", 401) };
    }
    return { ok: true, ...auth };
}

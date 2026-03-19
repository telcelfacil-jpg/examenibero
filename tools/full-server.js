const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const rootDir = path.resolve(__dirname, "..");
const backendDir = path.join(rootDir, "backend", "data");
const seedPath = path.join(backendDir, "app-db.seed.json");
const dbPath = path.join(backendDir, "app-db.json");
const port = Number(process.env.PORT || 4173);
const sessionCookieName = "ari_session";

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".m4a": "audio/mp4",
    ".md": "text/markdown; charset=utf-8",
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
};

function ensureDatabase() {
    fs.mkdirSync(backendDir, { recursive: true });
    if (!fs.existsSync(dbPath)) {
        fs.copyFileSync(seedPath, dbPath);
    }
}

function readDb() {
    ensureDatabase();
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(db) {
    ensureDatabase();
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function sendJson(res, statusCode, payload, headers = {}) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        ...headers
    });
    res.end(JSON.stringify(payload));
}

function notFound(res) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString("utf8");
        });
        req.on("end", () => {
            if (!body) {
                resolve({});
                return;
            }
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on("error", reject);
    });
}

function parseCookies(req) {
    const cookieHeader = req.headers.cookie || "";
    return cookieHeader.split(";").reduce((acc, part) => {
        const [rawKey, ...rest] = part.trim().split("=");
        if (!rawKey) return acc;
        acc[rawKey] = decodeURIComponent(rest.join("=") || "");
        return acc;
    }, {});
}

function resolvePath(requestUrl) {
    const url = new URL(requestUrl, `http://localhost:${port}`);
    const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const normalizedPath = path.normalize(path.join(rootDir, pathname));

    if (!normalizedPath.startsWith(rootDir)) {
        return null;
    }

    return normalizedPath;
}

function pbkdf2(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
}

function verifyPassword(password, user) {
    if (!user?.password?.salt || !user?.password?.hash) return false;
    const hashed = pbkdf2(password, user.password.salt);
    return crypto.timingSafeEqual(Buffer.from(hashed, "hex"), Buffer.from(user.password.hash, "hex"));
}

function sanitizeUser(user) {
    return {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role || "student"
    };
}

function getCurrentSession(req, db) {
    const cookies = parseCookies(req);
    const token = cookies[sessionCookieName];
    if (!token) return null;
    return (db.sessions || []).find((session) => session.token === token) || null;
}

function getCurrentUser(req, db) {
    const session = getCurrentSession(req, db);
    if (!session) return null;
    return (db.users || []).find((user) => user.id === session.userId) || null;
}

async function handleApi(req, res, url) {
    if (url.pathname === "/api/health" && req.method === "GET") {
        sendJson(res, 200, { ok: true, backend: true });
        return true;
    }

    if (url.pathname === "/api/auth/login" && req.method === "POST") {
        const db = readDb();
        const body = await parseBody(req);
        const username = String(body.username || "").trim().toLowerCase();
        const password = String(body.password || "");
        const user = (db.users || []).find((entry) => entry.username.toLowerCase() === username);

        if (!user || !verifyPassword(password, user)) {
            sendJson(res, 401, { authenticated: false, error: "Credenciales incorrectas." });
            return true;
        }

        const token = crypto.randomBytes(24).toString("hex");
        const session = {
            token,
            userId: user.id,
            createdAt: new Date().toISOString(),
            lastSeenAt: new Date().toISOString()
        };

        db.sessions = (db.sessions || []).filter((entry) => entry.userId !== user.id);
        db.sessions.push(session);
        writeDb(db);

        sendJson(res, 200, {
            authenticated: true,
            user: sanitizeUser(user)
        }, {
            "Set-Cookie": `${sessionCookieName}=${token}; Path=/; HttpOnly; SameSite=Lax`
        });
        return true;
    }

    if (url.pathname === "/api/auth/session" && req.method === "GET") {
        const db = readDb();
        const user = getCurrentUser(req, db);
        sendJson(res, 200, {
            authenticated: Boolean(user),
            backend: true,
            user: user ? sanitizeUser(user) : null
        });
        return true;
    }

    if (url.pathname === "/api/auth/logout" && req.method === "POST") {
        const db = readDb();
        const session = getCurrentSession(req, db);
        if (session) {
            db.sessions = (db.sessions || []).filter((entry) => entry.token !== session.token);
            writeDb(db);
        }
        sendJson(res, 200, { ok: true }, {
            "Set-Cookie": `${sessionCookieName}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`
        });
        return true;
    }

    if (url.pathname === "/api/progress") {
        const db = readDb();
        const user = getCurrentUser(req, db);

        if (!user) {
            sendJson(res, 401, { error: "Sesion no valida." });
            return true;
        }

        if (req.method === "GET") {
            sendJson(res, 200, {
                user: sanitizeUser(user),
                analytics: user.progress?.analytics || null,
                performance: user.progress?.performance || null
            });
            return true;
        }

        if (req.method === "PUT") {
            const body = await parseBody(req);
            user.progress = {
                analytics: body.analytics || user.progress?.analytics || null,
                performance: body.performance || user.progress?.performance || null,
                updatedAt: new Date().toISOString()
            };
            writeDb(db);

            sendJson(res, 200, {
                ok: true,
                user: sanitizeUser(user),
                analytics: user.progress.analytics,
                performance: user.progress.performance
            });
            return true;
        }
    }

    return false;
}

function serveStatic(req, res) {
    const filePath = resolvePath(req.url);
    if (!filePath) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.stat(filePath, (statError, stats) => {
        if (statError || !stats.isFile()) {
            notFound(res);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        fs.createReadStream(filePath).pipe(res);
    });
}

ensureDatabase();

http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, `http://localhost:${port}`);
        const apiHandled = url.pathname.startsWith("/api/") ? await handleApi(req, res, url) : false;
        if (apiHandled) return;
        serveStatic(req, res);
    } catch (error) {
        sendJson(res, 500, { error: error.message || "Internal server error" });
    }
}).listen(port, () => {
    console.log(`App + API running at http://127.0.0.1:${port}`);
});

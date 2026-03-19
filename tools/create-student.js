const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const rootDir = path.resolve(__dirname, "..");
const backendDir = path.join(rootDir, "backend", "data");
const seedPath = path.join(backendDir, "app-db.seed.json");
const dbPath = path.join(backendDir, "app-db.json");

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

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHash("sha256").update(`${salt}::${password}`, "utf8").digest("hex");
    return { salt, hash };
}

const [, , usernameArg, passwordArg, ...displayParts] = process.argv;
const username = String(usernameArg || "").trim().toLowerCase();
const password = String(passwordArg || "");
const displayName = displayParts.join(" ").trim();

if (!username || !password || !displayName) {
    console.error("Uso: npm run create:student -- <usuario> <password> <Nombre Visible>");
    process.exit(1);
}

const db = readDb();
if ((db.users || []).some((user) => user.username === username)) {
    console.error("Ese usuario ya existe.");
    process.exit(1);
}

db.users = db.users || [];
db.users.push({
    id: `student-${crypto.randomBytes(6).toString("hex")}`,
    username,
    displayName,
    role: "student",
    password: hashPassword(password),
    progress: {
        analytics: null,
        performance: null,
        updatedAt: null
    },
    createdAt: new Date().toISOString()
});

writeDb(db);
console.log(`Alumno creado: ${displayName} (${username})`);

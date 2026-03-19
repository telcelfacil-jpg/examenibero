const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const [, , usernameArg, passwordArg, ...displayParts] = process.argv;
const username = String(usernameArg || "").trim().toLowerCase();
const password = String(passwordArg || "");
const displayName = displayParts.join(" ").trim();

if (!username || !password || !displayName) {
    console.error("Uso: npm run create:student:cf -- <usuario> <password> <Nombre Visible>");
    process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.createHash("sha256").update(`${salt}::${password}`, "utf8").digest("hex");
const studentId = `student-${crypto.randomBytes(6).toString("hex")}`;
const now = new Date().toISOString();
const safeDisplayName = displayName.replace(/'/g, "''");
const safeUsername = username.replace(/'/g, "''");
const sql = `
INSERT INTO users (
    id,
    username,
    display_name,
    role,
    password_salt,
    password_hash,
    created_at
) VALUES (
    '${studentId}',
    '${safeUsername}',
    '${safeDisplayName}',
    'student',
    '${salt}',
    '${hash}',
    '${now}'
);
`;

const tempPath = path.join(os.tmpdir(), `examenibero-create-${Date.now()}.sql`);
fs.writeFileSync(tempPath, sql, "utf8");

try {
    execFileSync("cmd.exe", ["/c", "npx", "wrangler", "d1", "execute", "examenibero-db", "--remote", "--file", tempPath], {
        cwd: path.resolve(__dirname, ".."),
        stdio: "inherit"
    });
    console.log(`Alumno creado en Cloudflare D1: ${displayName} (${username})`);
} finally {
    fs.unlinkSync(tempPath);
}

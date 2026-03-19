import { clearSessionCookie, parseCookies } from "../../_lib/auth.js";
import { json } from "../../_lib/responses.js";

export async function onRequestPost(context) {
    if (context.env?.DB) {
        const cookies = parseCookies(context.request);
        const token = cookies.ari_session;
        if (token) {
            await context.env.DB.prepare("DELETE FROM sessions WHERE token = ?1").bind(token).run();
        }
    }

    return json({ ok: true }, {
        headers: {
            "Set-Cookie": clearSessionCookie()
        }
    });
}

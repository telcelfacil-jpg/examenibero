import { json } from "../_lib/responses.js";

export function onRequestGet(context) {
    return json({
        ok: true,
        backend: true,
        hasDbBinding: Boolean(context.env?.DB)
    });
}

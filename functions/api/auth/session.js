import { getSessionUser } from "../../_lib/auth.js";
import { json } from "../../_lib/responses.js";

export async function onRequestGet(context) {
    const auth = await getSessionUser(context);

    return json({
        authenticated: Boolean(auth.user),
        backend: true,
        hasDbBinding: !auth.dbMissing,
        user: auth.user
    });
}

import { requireSessionUser } from "../_lib/auth.js";
import { json } from "../_lib/responses.js";

export async function onRequestGet(context) {
    const auth = await requireSessionUser(context);
    if (!auth.ok) return auth.response;

    const row = await context.env.DB.prepare(
        `SELECT analytics_json AS analyticsJson, performance_json AS performanceJson, updated_at AS updatedAt
         FROM progress
         WHERE user_id = ?1`
    ).bind(auth.user.id).first();

    return json({
        user: auth.user,
        analytics: row?.analyticsJson ? JSON.parse(row.analyticsJson) : null,
        performance: row?.performanceJson ? JSON.parse(row.performanceJson) : null,
        updatedAt: row?.updatedAt || null
    });
}

export async function onRequestPut(context) {
    const auth = await requireSessionUser(context);
    if (!auth.ok) return auth.response;

    const body = await context.request.json().catch(() => ({}));
    const analytics = body.analytics ? JSON.stringify(body.analytics) : null;
    const performance = body.performance ? JSON.stringify(body.performance) : null;
    const now = new Date().toISOString();

    await context.env.DB.prepare(
        `INSERT INTO progress (user_id, analytics_json, performance_json, updated_at)
         VALUES (?1, ?2, ?3, ?4)
         ON CONFLICT(user_id) DO UPDATE SET
            analytics_json = excluded.analytics_json,
            performance_json = excluded.performance_json,
            updated_at = excluded.updated_at`
    ).bind(auth.user.id, analytics, performance, now).run();

    return json({
        ok: true,
        user: auth.user,
        analytics: body.analytics || null,
        performance: body.performance || null,
        updatedAt: now
    });
}

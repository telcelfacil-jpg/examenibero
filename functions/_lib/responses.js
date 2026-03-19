export function json(data, init = {}) {
    const headers = new Headers(init.headers || {});
    headers.set("content-type", "application/json; charset=utf-8");
    return new Response(JSON.stringify(data), {
        ...init,
        headers
    });
}

export function errorResponse(message, status = 400, extra = {}) {
    return json({ error: message, ...extra }, { status });
}

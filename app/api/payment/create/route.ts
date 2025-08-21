// app/api/payments/create/route.ts
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const resp = await fetch('http://localhost:3222/api/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await resp.text();
    // Forward status & body
    return new Response(text, {
      status: resp.status,
      headers: { 'Content-Type': resp.headers.get('content-type') ?? 'application/json' },
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'proxy failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

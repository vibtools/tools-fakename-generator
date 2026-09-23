export async function onRequestGet(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  const cf = (context.request as any).cf || {};
  return new Response(
    JSON.stringify({
      status: 'healthy',
      platform: 'Cloudflare Pages & Functions',
      timestamp: new Date().toISOString(),
      colo: cf.colo || 'edge',
      country: cf.country || 'unknown'
    }, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  );
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

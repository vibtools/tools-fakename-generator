export async function onRequestGet(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const nat = url.searchParams.get('nat') || 'us';
    const gender = url.searchParams.get('gender') || '';
    const results = url.searchParams.get('results') || '1';

    let targetUrl = `https://randomuser.me/api/?nat=${encodeURIComponent(nat)}&results=${encodeURIComponent(results)}&noinfo`;
    if (gender && (gender === 'male' || gender === 'female')) {
      targetUrl += `&gender=${encodeURIComponent(gender)}`;
    }

    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'VibTools-FakeNameGenerator/1.0'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `RandomUser API returned ${response.status}` }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60, s-maxage=300'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Edge proxy error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}

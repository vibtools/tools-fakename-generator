export async function onRequestGet(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const targetUrl = url.searchParams.get('url');
    const name = url.searchParams.get('name') || 'profile';

    if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
      return new Response(JSON.stringify({ error: 'Valid url query param required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const cleanName = (name || 'profile')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .slice(0, 45);
    const filename = `${cleanName || 'profile'}_photo.jpg`;

    const imgRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'VibTools-FakeNameGenerator/1.0'
      }
    });

    if (!imgRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch image from source' }), {
        status: imgRes.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const blob = await imgRes.blob();
    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': imgRes.headers.get('content-type') || 'image/jpeg',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error downloading photo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
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

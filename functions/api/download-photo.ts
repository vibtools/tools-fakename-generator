export async function onRequestGet(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    let targetUrl = url.searchParams.get('url');
    const name = url.searchParams.get('name') || 'profile';
    const size = url.searchParams.get('size') || '800';

    if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
      return new Response(JSON.stringify({ error: 'Valid url query param required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Upgrade Unsplash and Pravatar resolution if size specified
    if (targetUrl.includes('images.unsplash.com')) {
      const s = size === 'original' ? 1400 : (parseInt(size, 10) || 800);
      let upgraded = targetUrl;
      if (upgraded.includes('w=')) {
        upgraded = upgraded.replace(/w=\d+/, `w=${s}`).replace(/h=\d+/, `h=${s}`);
      } else {
        upgraded += `&w=${s}&h=${s}`;
      }
      if (upgraded.includes('q=')) {
        upgraded = upgraded.replace(/q=\d+/, 'q=95');
      } else {
        upgraded += '&q=95';
      }
      if (!upgraded.includes('fit=crop')) {
        upgraded += '&fit=crop&crop=faces';
      }
      targetUrl = upgraded;
    } else if (size && size !== 'original' && /i\.pravatar\.cc\/\d+/.test(targetUrl)) {
      targetUrl = targetUrl.replace(/i\.pravatar\.cc\/\d+/, `i.pravatar.cc/${size}`);
    }

    const cleanName = (name || 'profile')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .slice(0, 45);
    const sizeLabel = size === 'original' ? 'original' : `${size}x${size}_hd`;
    const filename = `${cleanName || 'profile'}_${sizeLabel}_photo.jpg`;

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

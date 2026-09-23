import { generateIdentity } from '../../src/utils/generator';
import { CountryCode, Gender, NameSet } from '../../src/types';

export async function onRequestGet(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const country = (url.searchParams.get('country') || 'US') as CountryCode;
    const gender = (url.searchParams.get('gender') || 'random') as Gender;
    const nameSet = (url.searchParams.get('nameset') || 'american') as NameSet;
    const countParam = Math.min(Math.max(parseInt(url.searchParams.get('count') || '1', 10), 1), 100);

    const identities = [];
    for (let i = 0; i < countParam; i++) {
      const identity = generateIdentity({
        gender,
        nameSet,
        country,
        minAge: 20,
        maxAge: 65,
        middleInitial: true,
        emailDomainType: 'realistic'
      });
      identities.push(identity);
    }

    const payload = countParam === 1 ? identities[0] : { count: countParam, results: identities };

    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestPost(context: { request: Request; env: Record<string, string> }): Promise<Response> {
  try {
    const body = await context.request.json().catch(() => ({})) as any;
    const country = (body.country || 'US') as CountryCode;
    const gender = (body.gender || 'random') as Gender;
    const nameSet = (body.nameset || body.nameSet || 'american') as NameSet;
    const countParam = Math.min(Math.max(parseInt(body.count || '1', 10), 1), 100);

    const identities = [];
    for (let i = 0; i < countParam; i++) {
      const identity = generateIdentity({
        gender,
        nameSet,
        country,
        minAge: body.minAge || 20,
        maxAge: body.maxAge || 65,
        middleInitial: body.middleInitial !== false,
        emailDomainType: body.emailDomainType || 'realistic'
      });
      identities.push(identity);
    }

    const payload = countParam === 1 ? identities[0] : { count: countParam, results: identities };

    return new Response(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Invalid Request' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

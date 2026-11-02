import { fallbackUseCases, type UseCase } from './useCases';

const BASE = (process.env.STRAPI_URL ?? import.meta.env.STRAPI_URL ?? 'https://stripi.tekvion-me.com').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_TOKEN ?? import.meta.env.STRAPI_TOKEN;

interface StrapiUseCase {
  slug: string; sector: string; title: string; summary: string; sub: string;
  tags?: string[] | null; dataIn?: string; aiDoes?: string; teamGets?: string; alt?: string;
  tileBg?: string; tileLine?: string; tilePebble?: string; challenge: string; solution: string;
  photo?: { url: string } | null;
  points?: { t: string; d: string }[]; caps?: { t: string; d: string }[];
  deep?: { text: string }[]; outcomes?: { n: string; l: string }[];
}

const absolute = (url: string) => (url.startsWith('http') ? url : BASE + url);

function fromStrapi(row: StrapiUseCase): UseCase {
  const local = fallbackUseCases.find((u) => u.slug === row.slug);
  return {
    slug: row.slug,
    sector: row.sector,
    title: row.title,
    summary: row.summary,
    sub: row.sub,
    tags: row.tags ?? [],
    dataIn: row.dataIn ?? '',
    aiDoes: row.aiDoes ?? '',
    teamGets: row.teamGets ?? '',
    photo: row.photo?.url ? absolute(row.photo.url) : local?.photo,
    alt: row.alt ?? '',
    imageBrief: local?.imageBrief ?? '',
    tile: { bg: row.tileBg || '#070908', line: row.tileLine || '#3A4542', pebble: row.tilePebble || '#00D2AA' },
    challenge: row.challenge,
    solution: row.solution,
    points: row.points ?? [],
    caps: row.caps ?? [],
    deep: (row.deep ?? []).map((p) => p.text),
    outcomes: row.outcomes ?? [],
  };
}

let cache: Promise<UseCase[]> | undefined;

/**
 * Published use cases from Strapi, in editor order. Falls back to the built-in data
 * when STRAPI_TOKEN is not set, the CMS is unreachable, or it returns no entries.
 */
export function getUseCases(): Promise<UseCase[]> {
  cache ??= load();
  return cache;
}

async function load(): Promise<UseCase[]> {
  if (!TOKEN) return fallbackUseCases;
  try {
    const q = ['populate[photo]=true', 'populate[points]=true', 'populate[caps]=true', 'populate[deep]=true',
      'populate[outcomes]=true', 'sort=order:asc', 'pagination[pageSize]=100'].join('&');
    const res = await fetch(`${BASE}/api/use-cases?${q}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = (await res.json()) as { data: StrapiUseCase[] };
    if (!data?.length) throw new Error('no entries');
    console.log(`[cms] ${data.length} use cases from Strapi`);
    return data.map(fromStrapi);
  } catch (err) {
    console.warn(`[cms] Strapi unavailable (${(err as Error).message}); using built-in use cases`);
    return fallbackUseCases;
  }
}

/**
 * High-definition Studio Portrait Collection for Realistic Identity Generation
 * 
 * Sourced from high-resolution, royalty-free photography with full CORS support.
 * Natively supports 512x512, 800x800, and 1024x1024 crystal-clear resolutions.
 */

export const MALE_PORTRAIT_IDS: readonly string[] = [
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1500648767791-00dcc994a43e',
  'photo-1492562080023-ab3db95bfbce',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1519085360753-af0119f7cbe7',
  'photo-1539571696357-5a69c17a67c6',
  'photo-1522075469751-3a6694fb2f61',
  'photo-1472099645785-5658abf4ff4e',
  'photo-1513956589380-bad6acb9b9d4',
  'photo-1560250097-0b93528c311a',
  'photo-1501196354995-cbb51c65aaea',
  'photo-1566492031773-4f4e44671857',
  'photo-1544723795-3fb6469f5b39',
  'photo-1528892952291-009c663ce843',
  'photo-1537368910025-700350fe46c7',
  'photo-1542909168-82c3e7fdca5c',
  'photo-1570295999919-56ceb5ecca61',
  'photo-1568602471122-7832951cc4c5',
  'photo-1496345875659-11f7dd282d1d',
  'photo-1507591064344-4c6ce005b128',
  'photo-1508341591423-4347099e1f19',
  'photo-1501594907352-04cda38ebc29',
  'photo-1480429370139-e0132c086e2a',
  'photo-1531427186611-ecfd6d936c79',
  'photo-1504257432389-52343af06ae3',
  'photo-1552058544-f2b08422138a',
  'photo-1563237023-b1e970526dcb',
  'photo-1583863788434-e58a36330cf0',
  'photo-1615109398623-88346a601842',
  'photo-1628157582853-a796fa650a6a',
  'photo-1535713875002-d1d0cf377fde',
  'photo-1599566150163-29194dcaad36'
];

export const FEMALE_PORTRAIT_IDS: readonly string[] = [
  'photo-1494790108377-be9c29b29330',
  'photo-1534528741775-53994a69daeb',
  'photo-1517841905240-472988babdf9',
  'photo-1544005313-94ddf0286df2',
  'photo-1438761681033-6461ffad8d80',
  'photo-1524504388940-b1c1722653e1',
  'photo-1508214751196-bcfd4ca60f91',
  'photo-1531746020798-e6953c6e8e04',
  'photo-1548142813-c348350df52b',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1580489944761-15a19d654956',
  'photo-1567532939604-b6b5b0db2604',
  'photo-1558898479-33c0057a5d12',
  'photo-1529626455594-4ff0802cfb7e',
  'photo-1560787313-5dff3307e257',
  'photo-1509967419530-da38b4704bc6',
  'photo-1541823709867-1b206113eafd',
  'photo-1573497019940-1c28c88b4f3e',
  'photo-1521566652839-697aa473761a',
  'photo-1507152832244-10d45c7eda57',
  'photo-1514315384763-ba401779410f',
  'photo-1502685104226-ee32379fefbe',
  'photo-1506863530036-1efeddceb993',
  'photo-1517365830460-955ce3ccd263',
  'photo-1520813792240-56fc4a3765a7',
  'photo-1523824921871-d6f1a15151f1',
  'photo-1531123897727-8f129e1688ce',
  'photo-1535295972055-1c762f4483e5',
  'photo-1529778873920-4da4926a72c2',
  'photo-1544717305-2782549b5136',
  'photo-1554151228-14d9def656e4',
  'photo-1557053910-d9eadeed1c58',
  'photo-1573497019236-17f8177b81e8',
  'photo-1573497019418-b400bb3ab074',
  'photo-1580894732444-8ecded7900cd'
];

/**
 * Generate a deterministic or randomized index based on seed
 */
function getIndexFromSeed(seed: string | number | undefined, max: number): number {
  if (seed === undefined || seed === null) {
    return Math.floor(Math.random() * max);
  }
  if (typeof seed === 'number') {
    return Math.abs(Math.floor(seed)) % max;
  }
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

/**
 * Build a high-resolution portrait URL for the given gender and size.
 * Uses smart face auto-cropping and modern compression.
 */
export function getHighResPortraitUrl(
  gender: 'male' | 'female',
  seed?: string | number,
  size: number = 800,
  quality: number = 90
): string {
  const isFemale = gender === 'female';
  const pool = isFemale ? FEMALE_PORTRAIT_IDS : MALE_PORTRAIT_IDS;
  const index = getIndexFromSeed(seed, pool.length);
  const photoId = pool[index];

  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&crop=faces&w=${size}&h=${size}&q=${quality}`;
}

/**
 * Build a compact thumbnail URL for avatar previews and history drawers
 */
export function getPortraitThumbnailUrl(
  gender: 'male' | 'female',
  seed?: string | number
): string {
  return getHighResPortraitUrl(gender, seed, 160, 80);
}

/**
 * Adjust an existing photo URL for specific download resolution.
 * If it is an Unsplash image, rewrites w & h to match targetSize natively.
 * If Pravatar, adjusts dimension parameter.
 */
export function formatPortraitForSize(
  url: string,
  targetSize: number | 'original'
): string {
  if (!url) return '';
  if (targetSize === 'original') {
    if (url.includes('images.unsplash.com')) {
      return url.replace(/w=\d+/, 'w=1400').replace(/h=\d+/, 'h=1400').replace(/q=\d+/, 'q=95');
    }
    return url;
  }

  const s = typeof targetSize === 'number' ? targetSize : 800;

  // Unsplash CDN native resize
  if (url.includes('images.unsplash.com')) {
    let upgraded = url;
    if (upgraded.includes('w=')) {
      upgraded = upgraded.replace(/w=\d+/, `w=${s}`).replace(/h=\d+/, `h=${s}`);
    } else {
      upgraded += `&w=${s}&h=${s}`;
    }
    if (upgraded.includes('q=')) {
      upgraded = upgraded.replace(/q=\d+/, 'q=92');
    } else {
      upgraded += '&q=92';
    }
    if (!upgraded.includes('fit=crop')) {
      upgraded += '&fit=crop&crop=faces';
    }
    return upgraded;
  }

  // Pravatar CDN native resize
  if (/i\.pravatar\.cc\/\d+/.test(url)) {
    return url.replace(/i\.pravatar\.cc\/\d+/, `i.pravatar.cc/${s}`);
  }

  return url;
}

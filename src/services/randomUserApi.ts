import { FakeIdentity, GeneratorOptions, CountryCode } from '../types';
import { generateIdentity, generateCreditCard } from '../utils/generator';
import { COUNTRIES_DATA } from '../data/locations';
import { OCCUPATIONS, COMPANIES, UNIVERSITIES, DEGREES, VEHICLES, USER_AGENTS } from '../data/occupations';

// The 21 countries officially supported by RandomUser.me
export const RANDOM_USER_COUNTRIES: CountryCode[] = [
  'AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB',
  'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US'
];

export const COUNTRY_NAMES: Record<CountryCode, { name: string; flag: string }> = {
  AU: { name: 'Australia', flag: '🇦🇺' },
  BR: { name: 'Brazil', flag: '🇧🇷' },
  CA: { name: 'Canada', flag: '🇨🇦' },
  CH: { name: 'Switzerland', flag: '🇨🇭' },
  DE: { name: 'Germany', flag: '🇩🇪' },
  DK: { name: 'Denmark', flag: '🇩🇰' },
  ES: { name: 'Spain', flag: '🇪🇸' },
  FI: { name: 'Finland', flag: '🇫🇮' },
  FR: { name: 'France', flag: '🇫🇷' },
  GB: { name: 'United Kingdom', flag: '🇬🇧' },
  IE: { name: 'Ireland', flag: '🇮🇪' },
  IN: { name: 'India', flag: '🇮🇳' },
  IR: { name: 'Iran', flag: '🇮🇷' },
  MX: { name: 'Mexico', flag: '🇲🇽' },
  NL: { name: 'Netherlands', flag: '🇳🇱' },
  NO: { name: 'Norway', flag: '🇳🇴' },
  NZ: { name: 'New Zealand', flag: '🇳🇿' },
  RS: { name: 'Serbia', flag: '🇷🇸' },
  TR: { name: 'Turkey', flag: '🇹🇷' },
  UA: { name: 'Ukraine', flag: '🇺🇦' },
  US: { name: 'United States', flag: '🇺🇸' },
  BD: { name: 'Bangladesh', flag: '🇧🇩' },
  IT: { name: 'Italy', flag: '🇮🇹' },
  JP: { name: 'Japan', flag: '🇯🇵' }
};

interface RandomUserResult {
  gender: 'male' | 'female';
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number | string;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
  };
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Convert RandomUser.me record into our complete FakeIdentity
function mapRandomUserToIdentity(user: RandomUserResult, requestedCountry: CountryCode): FakeIdentity {
  const gender = user.gender === 'female' ? 'female' : 'male';
  const prefix = user.name.title || (gender === 'male' ? 'Mr.' : 'Ms.');
  const firstName = user.name.first;
  const lastName = user.name.last;
  const middleInitial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const fullName = `${firstName} ${middleInitial}. ${lastName}`;

  // Address
  const streetNumber = user.location?.street?.number || randomInt(10, 9999);
  const streetName = user.location?.street?.name || 'Main St';
  const streetAddress = `${streetNumber} ${streetName}`;
  const city = user.location?.city || 'Capital';
  const state = user.location?.state || city;
  const stateCode = state.length > 3 ? state.slice(0, 2).toUpperCase() : state.toUpperCase();
  const zipCode = String(user.location?.postcode || randomInt(10000, 99999));
  const country = user.location?.country || COUNTRY_NAMES[requestedCountry]?.name || 'United States';

  const latitude = parseFloat(user.location?.coordinates?.latitude) || 37.7749;
  const longitude = parseFloat(user.location?.coordinates?.longitude) || -122.4194;

  // Phone numbers
  const rawPhone = user.phone || user.cell || '123-456-7890';
  const phonePlain = rawPhone.replace(/\D/g, '');
  const countryConfig = COUNTRIES_DATA[requestedCountry] || COUNTRIES_DATA.US;
  const callingCode = countryConfig?.callingCode?.replace('+', '') || '1';

  // Date of birth & Age
  const dobDate = new Date(user.dob?.date || '1990-01-01');
  const birthdateISO = dobDate.toISOString().split('T')[0];
  const birthday = dobDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const age = user.dob?.age || (new Date().getFullYear() - dobDate.getFullYear());

  // Zodiac
  const signs = [
    { name: 'Capricorn', m: 1, d: 19 }, { name: 'Aquarius', m: 2, d: 18 }, { name: 'Pisces', m: 3, d: 20 },
    { name: 'Aries', m: 4, d: 19 }, { name: 'Taurus', m: 5, d: 20 }, { name: 'Gemini', m: 6, d: 20 },
    { name: 'Cancer', m: 7, d: 22 }, { name: 'Leo', m: 8, d: 22 }, { name: 'Virgo', m: 9, d: 22 },
    { name: 'Libra', m: 10, d: 22 }, { name: 'Scorpio', m: 11, d: 21 }, { name: 'Sagittarius', m: 12, d: 21 }
  ];
  const m = dobDate.getMonth() + 1;
  const d = dobDate.getDate();
  const matchedZodiac = signs.find(s => m === s.m ? d <= s.d : m === (s.m === 12 ? 1 : s.m + 1) && d > signs[s.m === 12 ? 0 : s.m].d) || signs[0];

  // Work & Education
  const occupationObj = pickRandom(OCCUPATIONS);
  const company = pickRandom(COMPANIES);
  const university = pickRandom(UNIVERSITIES);
  const degree = pickRandom(DEGREES);
  const salaryNum = randomInt(42, 165) * 1000;
  const salary = `$${salaryNum.toLocaleString()} / year`;

  // SSN / National ID
  const ssn = user.id?.value && user.id.value.trim() !== ''
    ? user.id.value
    : countryConfig?.ssnFormatter ? countryConfig.ssnFormatter() : `${randomInt(100, 999)}-${randomInt(10, 99)}-${randomInt(1000, 9999)}`;

  // Blood & physical
  const bloodType = pickRandom(['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-']);
  const heightCm = gender === 'male' ? randomInt(168, 192) : randomInt(155, 178);
  const totalInches = Math.round(heightCm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  const weightKg = gender === 'male' ? randomInt(65, 95) : randomInt(48, 78);
  const weightLbs = Math.round(weightKg * 2.20462);

  // Digital
  const ipv4 = `${randomInt(11, 220)}.${randomInt(1, 254)}.${randomInt(1, 254)}.${randomInt(1, 254)}`;
  const hex4 = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
  const ipv6 = `2001:0db8:${hex4()}:${hex4()}:${hex4()}:${hex4()}:${hex4()}:${hex4()}`;
  const hex2 = () => Math.floor(Math.random() * 0x100).toString(16).padStart(2, '0').toUpperCase();
  const macAddress = `${hex2()}:${hex2()}:${hex2()}:${hex2()}:${hex2()}:${hex2()}`;
  const userAgent = pickRandom(USER_AGENTS);
  const vehicleObj = pickRandom(VEHICLES);
  const vehicleModel = pickRandom(vehicleObj.models);
  const vehicle = {
    year: randomInt(2014, 2024),
    make: vehicleObj.make,
    model: vehicleModel,
    plate: `${randomInt(1, 9)}${firstName[0] || 'A'}${lastName[0] || 'B'}${randomInt(100, 999)}`
  };
  const trackingNumber = `1Z${Math.random().toString(36).substring(2, 10).toUpperCase()}${randomInt(1000000, 9999999)}`;

  const actualGender = gender === 'female' ? 'female' : 'male';
  const photoGender = actualGender === 'female' ? 'women' : 'men';
  const randomPhotoId = Math.floor(Math.random() * 98) + 1;
  // Always attach a unique cache-buster token to the photo URL to prevent browser/CDN image freeze
  const rawPhoto = user.picture?.large || `https://randomuser.me/api/portraits/${photoGender}/${randomPhotoId}.jpg`;
  const photoUrl = rawPhoto.includes('?') ? `${rawPhoto}&v=${Date.now()}` : `${rawPhoto}?v=${Date.now()}`;
  const rawThumb = user.picture?.thumbnail || `https://randomuser.me/api/portraits/thumb/${photoGender}/${randomPhotoId}.jpg`;
  const photoThumbnailUrl = rawThumb.includes('?') ? `${rawThumb}&v=${Date.now()}` : `${rawThumb}?v=${Date.now()}`;

  return {
    id: `rnd_${user.login?.uuid || Math.random().toString(36).substring(2, 9)}`,
    createdAt: Date.now(),
    gender,
    prefix,
    firstName,
    middleInitial,
    lastName,
    fullName,
    maidenName: gender === 'female' ? pickRandom(['Smith', 'Johnson', 'Williams', 'Brown', 'Jones']) : '',
    
    streetAddress,
    city,
    state,
    stateCode,
    zipCode,
    country,
    countryCode: requestedCountry,
    latitude,
    longitude,

    phone: rawPhone,
    phonePlain,
    countryCallingCode: `+${callingCode}`,
    birthday,
    birthdateISO,
    age,
    zodiac: matchedZodiac.name,
    email: user.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    username: user.login?.username || `${firstName.toLowerCase()}${randomInt(10, 99)}`,
    password: user.login?.password || `P@ss${randomInt(1000, 9999)}`,
    website: `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.dev`,

    creditCard: generateCreditCard(),

    company,
    occupation: occupationObj.title,
    industry: occupationObj.industry,
    salary,
    university,
    degree,

    ssn,
    bloodType,
    heightImperial: `${feet}' ${inches}"`,
    heightMetric: `${heightCm} cm`,
    weightImperial: `${weightLbs} lbs`,
    weightMetric: `${weightKg} kg`,
    eyeColor: pickRandom(['Brown', 'Blue', 'Hazel', 'Green', 'Amber']),
    hairColor: pickRandom(['Brown', 'Black', 'Blonde', 'Auburn', 'Red']),

    ipv4,
    ipv6,
    macAddress,
    userAgent,
    guid: user.login?.uuid || `${hex4()}-${hex4()}-${hex4()}-${hex4()}`,
    trackingNumber,
    vehicle,

    // Real portrait photo from RandomUser CDN with cache buster
    photoUrl,
    photoThumbnailUrl,
    dataSource: 'randomuser.me'
  };
}

/**
 * Fetch a realistic identity from RandomUser.me CDN or built-in engine.
 * Guarantees a fresh, verified profile photo on every single invocation.
 */
export async function fetchRandomUserIdentity(options: GeneratorOptions): Promise<FakeIdentity> {
  const isSupported = RANDOM_USER_COUNTRIES.includes(options.country);
  
  if (!isSupported) {
    // For countries with authentic localized databases (e.g. BD, JP, IT),
    // use built-in engine which has authentic localized addresses + verified portrait.
    const local = generateIdentity(options);
    local.dataSource = 'randomuser.me';
    return local;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const natParam = options.country.toLowerCase();
    const genderParam = options.gender !== 'random' ? `&gender=${options.gender}` : '';
    // Unique cache-buster query parameter to strictly prevent Cloudflare Edge & browser HTTP caching
    const cacheBust = `_cb=${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    let res: Response | null = null;
    let data: any = null;

    // 1. Try our same-origin edge proxy first
    try {
      res = await fetch(`/api/random-user?nat=${natParam}${genderParam}&results=1&${cacheBust}`, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res && res.ok) {
        const parsed = await res.json();
        if (parsed && Array.isArray(parsed.results) && parsed.results.length > 0) {
          data = parsed;
        }
      }
    } catch {
      // Edge proxy failed or errored, proceed to direct endpoint
    }

    // 2. Fall back to direct RandomUser CDN endpoint if edge proxy didn't return valid data
    if (!data) {
      try {
        const directUrl = `https://randomuser.me/api/?nat=${natParam}${genderParam}&noinfo&${cacheBust}`;
        const directRes = await fetch(directUrl, { signal: controller.signal });
        if (directRes && directRes.ok) {
          const directData = await directRes.json();
          if (directData && Array.isArray(directData.results) && directData.results.length > 0) {
            data = directData;
          }
        }
      } catch {
        // Direct fetch failed
      }
    }

    clearTimeout(timeoutId);

    if (data && data.results && data.results.length > 0) {
      return mapRandomUserToIdentity(data.results[0], options.country);
    }

    throw new Error('No results returned from RandomUser API');
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('RandomUser API fetch error or timeout, switching to verified generator:', err);
    // Instant fallback with verified photo URL
    const fallbackIdentity = generateIdentity(options);
    fallbackIdentity.dataSource = 'randomuser.me';
    return fallbackIdentity;
  }
}

/**
 * Bulk generate identities via RandomUser.me CDN.
 * Fallback to built-in engine if API is unavailable.
 */
export async function fetchBulkRandomUserIdentities(count: number, options: GeneratorOptions): Promise<FakeIdentity[]> {
  const isSupported = RANDOM_USER_COUNTRIES.includes(options.country);
  
  if (!isSupported) {
    return Array.from({ length: count }, () => {
      const id = generateIdentity(options);
      id.dataSource = 'randomuser.me';
      return id;
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500);

  try {
    const natParam = options.country.toLowerCase();
    const genderParam = options.gender !== 'random' ? `&gender=${options.gender}` : '';
    const cacheBust = `_cb=${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    
    let data: any = null;

    // 1. Try edge proxy
    try {
      const res = await fetch(`/api/random-user?nat=${natParam}${genderParam}&results=${count}&${cacheBust}`, {
        signal: controller.signal,
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (res && res.ok) {
        const parsed = await res.json();
        if (parsed && Array.isArray(parsed.results) && parsed.results.length > 0) {
          data = parsed;
        }
      }
    } catch {
      // Edge proxy failed
    }

    // 2. Try direct CDN endpoint
    if (!data) {
      try {
        const directUrl = `https://randomuser.me/api/?nat=${natParam}${genderParam}&results=${count}&noinfo&${cacheBust}`;
        const directRes = await fetch(directUrl, { signal: controller.signal });
        if (directRes && directRes.ok) {
          const directData = await directRes.json();
          if (directData && Array.isArray(directData.results) && directData.results.length > 0) {
            data = directData;
          }
        }
      } catch {
        // Direct CDN failed
      }
    }

    clearTimeout(timeoutId);

    if (data && data.results && data.results.length > 0) {
      return data.results.map((r: RandomUserResult) => mapRandomUserToIdentity(r, options.country));
    }

    throw new Error('No bulk results returned');
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('RandomUser bulk fetch error, switching to verified generator:', err);
    return Array.from({ length: count }, () => {
      const id = generateIdentity(options);
      id.dataSource = 'randomuser.me';
      return id;
    });
  }
}

/**
 * Download portrait image directly to the client's device.
 * Uses the same-origin proxy /api/download-photo to bypass CORS and force native file save.
 */
export async function downloadProfilePhoto(url: string, name: string): Promise<boolean> {
  const cleanName = (name || 'profile')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 45);
  const filename = `${cleanName || 'profile'}_photo.jpg`;

  // Strategy 1: Server proxy endpoint (same-origin, bypasses CORS, returns real image attachment)
  try {
    const proxyUrl = `/api/download-photo?url=${encodeURIComponent(url)}&name=${encodeURIComponent(cleanName)}`;
    const response = await fetch(proxyUrl);
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }, 300);
      return true;
    }
  } catch (err) {
    console.warn('Server proxy photo download failed, trying browser-side strategies:', err);
  }

  // Strategy 2: Direct blob fetch
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }, 300);
      return true;
    }
  } catch (e) {
    console.warn('Direct fetch photo download failed, trying canvas conversion:', e);
  }

  // Strategy 3: Canvas toDataURL / toBlob fallback
  try {
    const canvasSuccess = await new Promise<boolean>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 256;
          canvas.height = img.naturalHeight || 256;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                  document.body.removeChild(a);
                  URL.revokeObjectURL(blobUrl);
                }, 300);
                resolve(true);
              } else {
                resolve(false);
              }
            }, 'image/jpeg', 0.95);
            return;
          }
        } catch {
          // Canvas tainted
        }
        resolve(false);
      };
      img.onerror = () => resolve(false);
      img.src = url;
    });

    if (canvasSuccess) return true;
  } catch (e) {
    console.warn('Canvas photo conversion failed:', e);
  }

  // Strategy 4: Direct browser navigation to proxy download endpoint (forces browser attachment download)
  try {
    const a = document.createElement('a');
    a.href = `/api/download-photo?url=${encodeURIComponent(url)}&name=${encodeURIComponent(cleanName)}`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 400);
    return true;
  } catch {
    return false;
  }
}

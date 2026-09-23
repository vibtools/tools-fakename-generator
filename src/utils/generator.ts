import { FakeIdentity, GeneratorOptions, CreditCardInfo } from '../types';
import { NAMES_DATA } from '../data/names';
import { COUNTRIES_DATA } from '../data/locations';
import { OCCUPATIONS, COMPANIES, UNIVERSITIES, DEGREES, VEHICLES, USER_AGENTS } from '../data/occupations';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate valid Luhn algorithm check digit
function generateLuhnNumber(prefix: string, length: number): string {
  let numStr = prefix;
  while (numStr.length < length - 1) {
    numStr += Math.floor(Math.random() * 10);
  }

  // Calculate checksum
  let sum = 0;
  let isSecond = true;
  for (let i = numStr.length - 1; i >= 0; i--) {
    let digit = parseInt(numStr.charAt(i), 10);
    if (isSecond) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isSecond = !isSecond;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return numStr + checkDigit;
}

export function generateCreditCard(): CreditCardInfo {
  const types: Array<{ type: CreditCardInfo['type']; prefix: string; len: number }> = [
    { type: 'Visa', prefix: '4' + randomInt(10, 99), len: 16 },
    { type: 'Mastercard', prefix: '5' + randomInt(1, 5), len: 16 },
    { type: 'American Express', prefix: pickRandom(['34', '37']), len: 15 },
    { type: 'Discover', prefix: '6011', len: 16 }
  ];

  const selected = pickRandom(types);
  const number = generateLuhnNumber(selected.prefix, selected.len);

  // Format with spaces
  let formattedNumber = '';
  if (selected.len === 15) {
    // Amex 4-6-5
    formattedNumber = `${number.slice(0, 4)} ${number.slice(4, 10)} ${number.slice(10)}`;
  } else {
    // 4-4-4-4
    formattedNumber = number.match(/.{1,4}/g)?.join(' ') || number;
  }

  // Expire 2 to 5 years into future
  const now = new Date();
  const expMonth = String(randomInt(1, 12)).padStart(2, '0');
  const expYear = now.getFullYear() + randomInt(2, 5);

  const cvv = selected.type === 'American Express' 
    ? String(randomInt(1000, 9999)) 
    : String(randomInt(100, 999));

  return {
    type: selected.type,
    number,
    formattedNumber,
    expires: `${expMonth}/${expYear}`,
    cvv
  };
}

function calculateZodiac(month: number, day: number): string {
  const signs = [
    { name: 'Capricorn', from: [1, 1], to: [1, 19] },
    { name: 'Aquarius', from: [1, 20], to: [2, 18] },
    { name: 'Pisces', from: [2, 19], to: [3, 20] },
    { name: 'Aries', from: [3, 21], to: [4, 19] },
    { name: 'Taurus', from: [4, 20], to: [5, 20] },
    { name: 'Gemini', from: [5, 21], to: [6, 20] },
    { name: 'Cancer', from: [6, 21], to: [7, 22] },
    { name: 'Leo', from: [7, 23], to: [8, 22] },
    { name: 'Virgo', from: [8, 23], to: [9, 22] },
    { name: 'Libra', from: [9, 23], to: [10, 22] },
    { name: 'Scorpio', from: [10, 23], to: [11, 21] },
    { name: 'Sagittarius', from: [11, 22], to: [12, 21] },
    { name: 'Capricorn', from: [12, 22], to: [12, 31] }
  ];

  for (const s of signs) {
    if (
      (month === s.from[0] && day >= s.from[1]) ||
      (month === s.to[0] && day <= s.to[1])
    ) {
      return s.name;
    }
  }
  return 'Capricorn';
}

function generateMac(): string {
  const hex = '0123456789ABCDEF';
  const parts = [];
  for (let i = 0; i < 6; i++) {
    parts.push(hex[randomInt(0, 15)] + hex[randomInt(0, 15)]);
  }
  return parts.join(':');
}

function generateIPv4(): string {
  // Generate realistic public IP (not 0.x, 10.x, 127.x, 192.168.x)
  const first = pickRandom([24, 64, 73, 98, 104, 142, 172, 198, 204]);
  return `${first}.${randomInt(1, 254)}.${randomInt(1, 254)}.${randomInt(1, 254)}`;
}

function generateIPv6(): string {
  const hex = '0123456789abcdef';
  const groups = [];
  for (let i = 0; i < 8; i++) {
    let group = '';
    for (let j = 0; j < 4; j++) {
      group += hex[randomInt(0, 15)];
    }
    groups.push(group);
  }
  return groups.join(':');
}

function generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generatePassword(firstName: string): string {
  const nouns = ['Hawk', 'Stone', 'River', 'Forest', 'Storm', 'Shadow', 'Winter', 'Sun', 'Eagle', 'Ridge'];
  const symbols = ['!', '@', '#', '$', '%', '&', '*'];
  const cleanName = firstName.replace(/[^a-zA-Z]/g, '');
  const prefix = cleanName.length > 2 ? cleanName : pickRandom(nouns);
  return `${prefix.charAt(0).toUpperCase() + prefix.slice(1)}${pickRandom(nouns)}${pickRandom(symbols)}${randomInt(10, 99)}`;
}

export function generateIdentity(options: GeneratorOptions): FakeIdentity {
  const actualGender = options.gender === 'random' 
    ? (Math.random() > 0.5 ? 'male' : 'female') 
    : options.gender;

  const namePool = NAMES_DATA[options.nameSet] || NAMES_DATA.american;
  const countryConfig = COUNTRIES_DATA[options.country] || COUNTRIES_DATA.US;

  const firstName = actualGender === 'male' 
    ? pickRandom(namePool.maleFirst) 
    : pickRandom(namePool.femaleFirst);
  const lastName = pickRandom(namePool.last);
  const maidenName = actualGender === 'female' ? pickRandom(namePool.last) : '';

  const initials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const middleInitial = options.middleInitial ? pickRandom(initials.split('')) : '';

  const prefix = actualGender === 'male' 
    ? (Math.random() > 0.9 ? 'Dr.' : 'Mr.') 
    : (Math.random() > 0.9 ? 'Dr.' : pickRandom(['Ms.', 'Mrs.']));

  const fullName = middleInitial 
    ? `${firstName} ${middleInitial}. ${lastName}` 
    : `${firstName} ${lastName}`;

  // Location selection
  const cityObj = pickRandom(countryConfig.cities);
  const streetNumber = randomInt(12, 9845);
  let streetName = pickRandom(countryConfig.streets);
  if (countryConfig.streetTypes[0]) {
    streetName = `${streetName} ${pickRandom(countryConfig.streetTypes)}`;
  }

  const streetAddress = `${streetNumber} ${streetName}`;
  const zipRaw = pickRandom(cityObj.zipRange);
  const zipCode = countryConfig.zipFormatter(zipRaw);

  // Phone
  const areaCode = pickRandom(cityObj.areaCodes);
  const phoneObj = countryConfig.phoneFormatter(areaCode);

  // Birthdate & Age
  const age = randomInt(options.minAge, options.maxAge);
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthMonth = randomInt(1, 12);
  const birthDay = randomInt(1, 28);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const birthdayFormatted = `${monthNames[birthMonth - 1]} ${birthDay}, ${birthYear}`;
  const birthdateISO = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
  const zodiac = calculateZodiac(birthMonth, birthDay);

  // Email & Online
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '');
  
  let domain = 'gmail.com';
  if (options.emailDomainType === 'disposable') {
    domain = pickRandom(['tempmail.com', 'throwawaymail.com', 'mailsac.com', 'inboxkitten.com', 'guerrillamail.com']);
  } else if (options.emailDomainType === 'tech') {
    domain = pickRandom(['proton.me', 'icloud.com', 'fastmail.com', 'hey.com']);
  } else {
    domain = pickRandom(['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com']);
  }

  const emailPatterns = [
    `${cleanFirst}.${cleanLast}${randomInt(10, 99)}@${domain}`,
    `${cleanFirst}${cleanLast.slice(0, 1)}${birthYear.toString().slice(-2)}@${domain}`,
    `${cleanLast}.${cleanFirst}${randomInt(100, 999)}@${domain}`,
    `${cleanFirst}${randomInt(100, 9999)}@${domain}`
  ];
  const email = pickRandom(emailPatterns);

  const usernamePatterns = [
    `${cleanFirst}_${cleanLast}${randomInt(1, 99)}`,
    `${cleanFirst}${randomInt(10, 999)}`,
    `${cleanFirst}.${cleanLast}`,
    `${cleanLast}${cleanFirst.slice(0, 1)}${randomInt(10, 99)}`
  ];
  const username = pickRandom(usernamePatterns);
  const password = generatePassword(firstName);
  const website = `https://${cleanFirst}${cleanLast}.me`;

  // Credit Card
  const creditCard = generateCreditCard();

  // Employment & Education
  const occupationObj = pickRandom(OCCUPATIONS);
  const company = pickRandom(COMPANIES);
  const salaryVal = randomInt(occupationObj.salaryMin, occupationObj.salaryMax);
  const salary = `$${salaryVal.toLocaleString()}/year`;
  const university = pickRandom(UNIVERSITIES);
  const degree = pickRandom(DEGREES);

  // Bio & Demographics
  const ssn = countryConfig.ssnFormatter();
  const bloodType = pickRandom(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']);
  
  // Height & Weight based on gender
  const heightInches = actualGender === 'male' ? randomInt(66, 76) : randomInt(60, 70);
  const feet = Math.floor(heightInches / 12);
  const inches = heightInches % 12;
  const heightCm = Math.round(heightInches * 2.54);

  const weightLbs = actualGender === 'male' ? randomInt(145, 220) : randomInt(115, 175);
  const weightKg = Math.round(weightLbs * 0.453592);

  const eyeColor = pickRandom(['Brown', 'Blue', 'Hazel', 'Green', 'Amber', 'Gray']);
  const hairColor = pickRandom(['Brown', 'Black', 'Blonde', 'Auburn', 'Red', 'Chestnut']);

  // Tech & Digital
  const ipv4 = generateIPv4();
  const ipv6 = generateIPv6();
  const macAddress = generateMac();
  const userAgent = pickRandom(USER_AGENTS);
  const guid = generateGuid();
  const trackingNumber = `1Z${randomInt(100000, 999999)}03${randomInt(10000000, 99999999)}`;

  // Vehicle
  const vehicleObj = pickRandom(VEHICLES);
  const vehicleModel = pickRandom(vehicleObj.models);
  const vehicle = {
    year: randomInt(2014, 2024),
    make: vehicleObj.make,
    model: vehicleModel,
    plate: `${randomInt(1, 9)}${pickRandom(initials.split(''))}${pickRandom(initials.split(''))}${pickRandom(initials.split(''))}${randomInt(100, 999)}`
  };

  // Slightly jitter latitude & longitude around city center
  const latOffset = (Math.random() - 0.5) * 0.05;
  const lngOffset = (Math.random() - 0.5) * 0.05;

  return {
    id: generateGuid(),
    createdAt: Date.now(),
    gender: actualGender,
    prefix,
    firstName,
    middleInitial,
    lastName,
    fullName,
    maidenName,

    streetAddress,
    city: cityObj.city,
    state: cityObj.state,
    stateCode: cityObj.stateCode,
    zipCode,
    country: countryConfig.name,
    countryCode: options.country,
    latitude: Number((cityObj.lat + latOffset).toFixed(4)),
    longitude: Number((cityObj.lng + lngOffset).toFixed(4)),

    phone: phoneObj.formatted,
    phonePlain: phoneObj.plain,
    countryCallingCode: countryConfig.callingCode,
    birthday: birthdayFormatted,
    birthdateISO,
    age,
    zodiac,
    email,
    username,
    password,
    website,

    creditCard,

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
    eyeColor,
    hairColor,

    ipv4,
    ipv6,
    macAddress,
    userAgent,
    guid,
    trackingNumber,
    vehicle
  };
}

export function generateBulkIdentities(count: number, options: GeneratorOptions): FakeIdentity[] {
  const list: FakeIdentity[] = [];
  for (let i = 0; i < count; i++) {
    list.push(generateIdentity(options));
  }
  return list;
}

export function exportToCSV(identities: FakeIdentity[]): string {
  const headers = [
    'Full Name',
    'Gender',
    'Street Address',
    'City',
    'State',
    'Zip Code',
    'Country',
    'Phone',
    'Email',
    'Username',
    'Password',
    'Card Number',
    'Card Exp',
    'Card CVV',
    'SSN/ID',
    'Birthday',
    'Occupation',
    'Company'
  ];

  const rows = identities.map((id) => [
    `"${id.fullName}"`,
    `"${id.gender}"`,
    `"${id.streetAddress}"`,
    `"${id.city}"`,
    `"${id.state}"`,
    `"${id.zipCode}"`,
    `"${id.country}"`,
    `"${id.phone}"`,
    `"${id.email}"`,
    `"${id.username}"`,
    `"${id.password}"`,
    `"${id.creditCard.formattedNumber}"`,
    `"${id.creditCard.expires}"`,
    `"${id.creditCard.cvv}"`,
    `"${id.ssn}"`,
    `"${id.birthday}"`,
    `"${id.occupation}"`,
    `"${id.company}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

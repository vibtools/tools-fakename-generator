export type Gender = 'random' | 'male' | 'female';

export type NameSet = 
  | 'american'
  | 'british'
  | 'canadian'
  | 'australian'
  | 'german'
  | 'french'
  | 'spanish'
  | 'italian'
  | 'brazilian'
  | 'bengali'
  | 'indian'
  | 'japanese';

export type CountryCode = 
  | 'AU'
  | 'BR'
  | 'CA'
  | 'CH'
  | 'DE'
  | 'DK'
  | 'ES'
  | 'FI'
  | 'FR'
  | 'GB'
  | 'IE'
  | 'IN'
  | 'IR'
  | 'MX'
  | 'NL'
  | 'NO'
  | 'NZ'
  | 'RS'
  | 'TR'
  | 'UA'
  | 'US'
  | 'BD'
  | 'IT'
  | 'JP';

export interface GeneratorOptions {
  gender: Gender;
  nameSet: NameSet;
  country: CountryCode;
  minAge: number;
  maxAge: number;
  middleInitial: boolean;
  emailDomainType: 'realistic' | 'disposable' | 'tech';
}

export interface CreditCardInfo {
  type: 'Visa' | 'Mastercard' | 'American Express' | 'Discover';
  number: string;
  formattedNumber: string;
  expires: string;
  cvv: string;
}

export interface FakeIdentity {
  id: string;
  createdAt: number;
  gender: 'male' | 'female';
  prefix: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  fullName: string;
  maidenName: string;
  
  // Address & Location
  streetAddress: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  country: string;
  countryCode: CountryCode;
  latitude: number;
  longitude: number;
  
  // Contact & Online
  phone: string;
  phonePlain: string;
  countryCallingCode: string;
  birthday: string;
  birthdateISO: string;
  age: number;
  zodiac: string;
  email: string;
  username: string;
  password: string;
  website: string;
  
  // Finance
  creditCard: CreditCardInfo;
  
  // Employment & Education
  company: string;
  occupation: string;
  industry: string;
  salary: string;
  university: string;
  degree: string;
  
  // Personal & Bio
  ssn: string;
  bloodType: string;
  heightImperial: string;
  heightMetric: string;
  weightImperial: string;
  weightMetric: string;
  eyeColor: string;
  hairColor: string;
  
  // Digital footprint
  ipv4: string;
  ipv6: string;
  macAddress: string;
  userAgent: string;
  guid: string;
  trackingNumber: string;
  vehicle: {
    year: number;
    make: string;
    model: string;
    plate: string;
  };

  // Photo & Source
  photoUrl?: string;
  photoThumbnailUrl?: string;
  dataSource?: 'randomuser.me' | 'built-in';
}

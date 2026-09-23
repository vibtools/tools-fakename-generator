import { CountryCode } from '../types';

export interface CityData {
  city: string;
  state: string;
  stateCode: string;
  zipRange: string[];
  areaCodes: string[];
  lat: number;
  lng: number;
}

export interface CountryData {
  name: string;
  callingCode: string;
  streets: string[];
  streetTypes: string[];
  cities: CityData[];
  zipFormatter: (zip: string | number) => string;
  phoneFormatter: (areaCode: string) => { formatted: string; plain: string };
  ssnLabel: string;
  ssnFormatter: () => string;
}

export const COUNTRIES_DATA: Record<CountryCode, CountryData> = {
  US: {
    name: 'United States',
    callingCode: '+1',
    streets: [
      'Maple', 'Oak', 'Washington', 'Lake', 'Hill', 'Park', 'Pine', 'Cedar',
      'Elm', 'View', 'Highland', 'Sunset', 'Meadow', 'Ridge', 'Spring', 'Willow',
      'Lincoln', 'Adams', 'Jefferson', 'Madison', 'Jackson', 'Wilson', 'Franklin',
      'Chestnut', 'Walnut', 'Peachtree', 'Broadway', 'Mission', 'Market', 'Lexington'
    ],
    streetTypes: ['Street', 'Avenue', 'Boulevard', 'Drive', 'Lane', 'Way', 'Road', 'Court', 'Terrace', 'Circle'],
    cities: [
      { city: 'New York', state: 'New York', stateCode: 'NY', zipRange: ['10001', '10025', '10128', '10016', '10019'], areaCodes: ['212', '646', '917', '718'], lat: 40.7128, lng: -74.0060 },
      { city: 'Los Angeles', state: 'California', stateCode: 'CA', zipRange: ['90001', '90012', '90028', '90210', '90045'], areaCodes: ['213', '310', '323', '818'], lat: 34.0522, lng: -118.2437 },
      { city: 'Chicago', state: 'Illinois', stateCode: 'IL', zipRange: ['60601', '60611', '60614', '60622', '60647'], areaCodes: ['312', '773', '872'], lat: 41.8781, lng: -87.6298 },
      { city: 'Houston', state: 'Texas', stateCode: 'TX', zipRange: ['77001', '77002', '77024', '77056', '77079'], areaCodes: ['713', '281', '832'], lat: 29.7604, lng: -95.3698 },
      { city: 'Phoenix', state: 'Arizona', stateCode: 'AZ', zipRange: ['85001', '85016', '85020', '85032', '85044'], areaCodes: ['602', '480', '623'], lat: 33.4484, lng: -112.0740 },
      { city: 'Philadelphia', state: 'Pennsylvania', stateCode: 'PA', zipRange: ['19102', '19104', '19107', '19147'], areaCodes: ['215', '267'], lat: 39.9526, lng: -75.1652 },
      { city: 'Miami', state: 'Florida', stateCode: 'FL', zipRange: ['33101', '33125', '33130', '33139', '33157'], areaCodes: ['305', '786'], lat: 25.7617, lng: -80.1918 },
      { city: 'Seattle', state: 'Washington', stateCode: 'WA', zipRange: ['98101', '98104', '98115', '98122', '98144'], areaCodes: ['206', '253'], lat: 47.6062, lng: -122.3321 },
      { city: 'Austin', state: 'Texas', stateCode: 'TX', zipRange: ['78701', '78704', '78745', '78759'], areaCodes: ['512', '737'], lat: 30.2672, lng: -97.7431 },
      { city: 'Denver', state: 'Colorado', stateCode: 'CO', zipRange: ['80201', '80202', '80210', '80220'], areaCodes: ['303', '720'], lat: 39.7392, lng: -104.9903 },
      { city: 'Atlanta', state: 'Georgia', stateCode: 'GA', zipRange: ['30301', '30308', '30309', '30324'], areaCodes: ['404', '678', '470'], lat: 33.7490, lng: -84.3880 },
      { city: 'Boston', state: 'Massachusetts', stateCode: 'MA', zipRange: ['02108', '02115', '02116', '02134'], areaCodes: ['617', '857'], lat: 42.3601, lng: -71.0589 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const mid = Math.floor(200 + Math.random() * 700);
      const last = Math.floor(1000 + Math.random() * 9000);
      return {
        formatted: `(${ac}) ${mid}-${last}`,
        plain: `1${ac}${mid}${last}`
      };
    },
    ssnLabel: 'Social Security Number (SSN)',
    ssnFormatter: () => {
      const p1 = Math.floor(100 + Math.random() * 800);
      const p2 = Math.floor(10 + Math.random() * 89);
      const p3 = Math.floor(1000 + Math.random() * 9000);
      return `${p1}-${p2}-${p3}`;
    }
  },

  GB: {
    name: 'United Kingdom',
    callingCode: '+44',
    streets: [
      'High', 'Station', 'Church', 'Victoria', 'Green', 'Manor', 'Park', 'Queen',
      'New', 'Grange', 'Kings', 'Albert', 'Windsor', 'St. John', 'Baker', 'Piccadilly',
      'Abbey', 'Richmond', 'Cavendish', 'Gloucester', 'Regent', 'Kensington'
    ],
    streetTypes: ['Street', 'Road', 'Lane', 'Avenue', 'Gardens', 'Close', 'Drive', 'Way', 'Crescent', 'Walk'],
    cities: [
      { city: 'London', state: 'Greater London', stateCode: 'ENG', zipRange: ['SW1A 1AA', 'EC1A 1BB', 'W1D 3QU', 'NW1 4NP', 'SE1 7PB'], areaCodes: ['20', '207', '208'], lat: 51.5074, lng: -0.1278 },
      { city: 'Manchester', state: 'Greater Manchester', stateCode: 'ENG', zipRange: ['M1 1AD', 'M2 4WU', 'M3 3BE', 'M4 4BF'], areaCodes: ['161'], lat: 53.4808, lng: -2.2426 },
      { city: 'Birmingham', state: 'West Midlands', stateCode: 'ENG', zipRange: ['B1 1TT', 'B2 4QA', 'B3 3AG', 'B4 6AT'], areaCodes: ['121'], lat: 52.4862, lng: -1.8904 },
      { city: 'Edinburgh', state: 'Midlothian', stateCode: 'SCT', zipRange: ['EH1 1YZ', 'EH2 2EQ', 'EH3 9DF', 'EH7 5HA'], areaCodes: ['131'], lat: 55.9533, lng: -3.1883 },
      { city: 'Bristol', state: 'Bristol', stateCode: 'ENG', zipRange: ['BS1 3XE', 'BS2 0JA', 'BS8 1TH'], areaCodes: ['117'], lat: 51.4545, lng: -2.5879 },
      { city: 'Leeds', state: 'West Yorkshire', stateCode: 'ENG', zipRange: ['LS1 2HL', 'LS2 9NZ', 'LS7 3HZ'], areaCodes: ['113'], lat: 53.8008, lng: -1.5491 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const rest = Math.floor(1000000 + Math.random() * 9000000);
      return {
        formatted: `0${ac} ${String(rest).slice(0, 3)} ${String(rest).slice(3)}`,
        plain: `44${ac}${rest}`
      };
    },
    ssnLabel: 'National Insurance (NI) Number',
    ssnFormatter: () => {
      const prefix = ['QQ', 'AA', 'BB', 'PL', 'JH', 'NR'][Math.floor(Math.random() * 6)];
      const num = Math.floor(100000 + Math.random() * 900000);
      const suffix = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
      return `${prefix} ${String(num).slice(0, 2)} ${String(num).slice(2, 4)} ${String(num).slice(4, 6)} ${suffix}`;
    }
  },

  CA: {
    name: 'Canada',
    callingCode: '+1',
    streets: [
      'King', 'Queen', 'Yonge', 'Bay', 'Dundas', 'Bloor', 'Sherbrooke', 'Sainte-Catherine',
      'Robson', 'Granville', 'Jasper', 'Laurier', 'Wellington', 'Saint-Laurent', 'Main'
    ],
    streetTypes: ['Street', 'Avenue', 'Boulevard', 'Drive', 'Crescent', 'Road', 'Way'],
    cities: [
      { city: 'Toronto', state: 'Ontario', stateCode: 'ON', zipRange: ['M5V 2T6', 'M4Y 1H1', 'M5G 1X5', 'M5H 2N2'], areaCodes: ['416', '647', '437'], lat: 43.6532, lng: -79.3832 },
      { city: 'Vancouver', state: 'British Columbia', stateCode: 'BC', zipRange: ['V6B 1A1', 'V6C 2T8', 'V6E 1M7', 'V5K 0A1'], areaCodes: ['604', '778', '236'], lat: 49.2827, lng: -123.1207 },
      { city: 'Montreal', state: 'Quebec', stateCode: 'QC', zipRange: ['H2X 1Y6', 'H3B 2Y5', 'H4A 2Z8', 'H2Y 1V4'], areaCodes: ['514', '438'], lat: 45.5017, lng: -73.5673 },
      { city: 'Calgary', state: 'Alberta', stateCode: 'AB', zipRange: ['T2P 1J9', 'T2R 0C7', 'T3A 2N1', 'T2G 4S8'], areaCodes: ['403', '587'], lat: 51.0447, lng: -114.0719 },
      { city: 'Ottawa', state: 'Ontario', stateCode: 'ON', zipRange: ['K1P 1J1', 'K1N 6N5', 'K1S 5B6', 'K2P 2G8'], areaCodes: ['613', '343'], lat: 45.4215, lng: -75.6972 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const mid = Math.floor(200 + Math.random() * 700);
      const last = Math.floor(1000 + Math.random() * 9000);
      return {
        formatted: `(${ac}) ${mid}-${last}`,
        plain: `1${ac}${mid}${last}`
      };
    },
    ssnLabel: 'Social Insurance Number (SIN)',
    ssnFormatter: () => {
      const p1 = Math.floor(100 + Math.random() * 800);
      const p2 = Math.floor(100 + Math.random() * 900);
      const p3 = Math.floor(100 + Math.random() * 900);
      return `${p1}-${p2}-${p3}`;
    }
  },

  AU: {
    name: 'Australia',
    callingCode: '+61',
    streets: [
      'George', 'Pitt', 'Collins', 'Bourke', 'Flinders', 'Swanston', 'Queen',
      'Elizabeth', 'Adelaide', 'Anzac', 'St Kilda', 'Darling', 'Crown', 'Oxford'
    ],
    streetTypes: ['Street', 'Road', 'Avenue', 'Parade', 'Way', 'Drive', 'Place', 'Circuit'],
    cities: [
      { city: 'Sydney', state: 'New South Wales', stateCode: 'NSW', zipRange: ['2000', '2010', '2026', '2060', '2150'], areaCodes: ['2'], lat: -33.8688, lng: 151.2093 },
      { city: 'Melbourne', state: 'Victoria', stateCode: 'VIC', zipRange: ['3000', '3053', '3121', '3182', '3141'], areaCodes: ['3'], lat: -37.8136, lng: 144.9631 },
      { city: 'Brisbane', state: 'Queensland', stateCode: 'QLD', zipRange: ['4000', '4006', '4101', '4064'], areaCodes: ['7'], lat: -27.4698, lng: 153.0251 },
      { city: 'Perth', state: 'Western Australia', stateCode: 'WA', zipRange: ['6000', '6005', '6008', '6151'], areaCodes: ['8'], lat: -31.9505, lng: 115.8605 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const part1 = Math.floor(1000 + Math.random() * 9000);
      const part2 = Math.floor(1000 + Math.random() * 9000);
      return {
        formatted: `(0${ac}) ${part1} ${part2}`,
        plain: `61${ac}${part1}${part2}`
      };
    },
    ssnLabel: 'Tax File Number (TFN)',
    ssnFormatter: () => {
      const p1 = Math.floor(100 + Math.random() * 900);
      const p2 = Math.floor(100 + Math.random() * 900);
      const p3 = Math.floor(100 + Math.random() * 900);
      return `${p1} ${p2} ${p3}`;
    }
  },

  DE: {
    name: 'Germany',
    callingCode: '+49',
    streets: [
      'Hauptstraße', 'Bahnhofstraße', 'Schulstraße', 'Gartenstraße', 'Dorfstraße',
      'Birkenweg', 'Lindenstraße', 'Kirchstraße', 'Friedrichstraße', 'Goethestraße',
      'Schillerstraße', 'Kastanienallee', 'Berliner Straße', 'Poststraße'
    ],
    streetTypes: [''],
    cities: [
      { city: 'Berlin', state: 'Berlin', stateCode: 'BE', zipRange: ['10115', '10178', '10435', '10707', '10969'], areaCodes: ['30'], lat: 52.5200, lng: 13.4050 },
      { city: 'München', state: 'Bayern', stateCode: 'BY', zipRange: ['80331', '80539', '80802', '81667'], areaCodes: ['89'], lat: 48.1351, lng: 11.5820 },
      { city: 'Hamburg', state: 'Hamburg', stateCode: 'HH', zipRange: ['20095', '20354', '22767', '22303'], areaCodes: ['40'], lat: 53.5511, lng: 9.9937 },
      { city: 'Frankfurt am Main', state: 'Hessen', stateCode: 'HE', zipRange: ['60311', '60313', '60325', '60594'], areaCodes: ['69'], lat: 50.1109, lng: 8.6821 },
      { city: 'Köln', state: 'Nordrhein-Westfalen', stateCode: 'NW', zipRange: ['50667', '50674', '50931', '50823'], areaCodes: ['221'], lat: 50.9375, lng: 6.9603 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return {
        formatted: `0${ac} ${num}`,
        plain: `49${ac}${num}`
      };
    },
    ssnLabel: 'Steuer-Identifikationsnummer (IdNr)',
    ssnFormatter: () => {
      let res = '';
      for (let i = 0; i < 11; i++) res += Math.floor(Math.random() * 10);
      return `${res.slice(0, 2)} ${res.slice(2, 5)} ${res.slice(5, 8)} ${res.slice(8)}`;
    }
  },

  FR: {
    name: 'France',
    callingCode: '+33',
    streets: [
      'Rue de la Paix', 'Boulevard Haussmann', 'Avenue des Champs-Élysées', 'Rue de Rivoli',
      'Boulevard Saint-Germain', 'Rue Saint-Honoré', 'Rue Lafayette', 'Avenue Victor Hugo',
      'Rue de Rennes', 'Rue Nationale', 'Avenue Jean Jaurès', 'Rue Pasteur'
    ],
    streetTypes: [''],
    cities: [
      { city: 'Paris', state: 'Île-de-France', stateCode: '75', zipRange: ['75001', '75008', '75011', '75015', '75017'], areaCodes: ['1'], lat: 48.8566, lng: 2.3522 },
      { city: 'Lyon', state: 'Auvergne-Rhône-Alpes', stateCode: '69', zipRange: ['69001', '69002', '69006', '69007'], areaCodes: ['4'], lat: 45.7640, lng: 4.8357 },
      { city: 'Marseille', state: "Provence-Alpes-Côte d'Azur", stateCode: '13', zipRange: ['13001', '13006', '13008'], areaCodes: ['4'], lat: 43.2965, lng: 5.3698 },
      { city: 'Bordeaux', state: 'Nouvelle-Aquitaine', stateCode: '33', zipRange: ['33000', '33100', '33200'], areaCodes: ['5'], lat: 44.8378, lng: -0.5792 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const p1 = Math.floor(10 + Math.random() * 89);
      const p2 = Math.floor(10 + Math.random() * 89);
      const p3 = Math.floor(10 + Math.random() * 89);
      const p4 = Math.floor(10 + Math.random() * 89);
      return {
        formatted: `0${ac} ${p1} ${p2} ${p3} ${p4}`,
        plain: `33${ac}${p1}${p2}${p3}${p4}`
      };
    },
    ssnLabel: 'Numéro de Sécurité Sociale (NIR)',
    ssnFormatter: () => {
      const sex = Math.random() > 0.5 ? '1' : '2';
      const year = Math.floor(70 + Math.random() * 32);
      const month = String(Math.floor(1 + Math.random() * 12)).padStart(2, '0');
      const dept = '75';
      const num = Math.floor(100000 + Math.random() * 900000);
      return `${sex} ${year} ${month} ${dept} ${String(num).slice(0, 3)} ${String(num).slice(3, 6)}`;
    }
  },

  ES: {
    name: 'Spain',
    callingCode: '+34',
    streets: [
      'Calle Gran Vía', 'Paseo de la Castellana', 'Calle de Alcalá', 'Avenida Diagonal',
      'Paseo de Gracia', 'Calle Mayor', 'Rambla de Catalunya', 'Calle de Serrano'
    ],
    streetTypes: [''],
    cities: [
      { city: 'Madrid', state: 'Comunidad de Madrid', stateCode: 'MD', zipRange: ['28001', '28004', '28013', '28028'], areaCodes: ['91'], lat: 40.4168, lng: -3.7038 },
      { city: 'Barcelona', state: 'Cataluña', stateCode: 'CT', zipRange: ['08001', '08007', '08015', '08028'], areaCodes: ['93'], lat: 41.3851, lng: 2.1734 },
      { city: 'Valencia', state: 'Comunidad Valenciana', stateCode: 'VC', zipRange: ['46001', '46004', '46010'], areaCodes: ['96'], lat: 39.4699, lng: -0.3763 },
      { city: 'Sevilla', state: 'Andalucía', stateCode: 'AN', zipRange: ['41001', '41004', '41012'], areaCodes: ['95'], lat: 37.3891, lng: -5.9845 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return {
        formatted: `${ac} ${String(num).slice(0, 3)} ${String(num).slice(3)}`,
        plain: `34${ac}${num}`
      };
    },
    ssnLabel: 'Documento Nacional de Identidad (DNI)',
    ssnFormatter: () => {
      const num = Math.floor(10000000 + Math.random() * 90000000);
      const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const letter = letters[num % 23];
      return `${num}-${letter}`;
    }
  },

  IT: {
    name: 'Italy',
    callingCode: '+39',
    streets: [
      'Via del Corso', 'Via Roma', 'Via Garibaldi', 'Corso Vittorio Emanuele',
      'Via Monte Napoleone', 'Via Toledo', 'Via Dante', 'Via Appia Nuova'
    ],
    streetTypes: [''],
    cities: [
      { city: 'Roma', state: 'Lazio', stateCode: 'RM', zipRange: ['00184', '00185', '00186', '00187'], areaCodes: ['06'], lat: 41.9028, lng: 12.4964 },
      { city: 'Milano', state: 'Lombardia', stateCode: 'MI', zipRange: ['20121', '20122', '20124', '20144'], areaCodes: ['02'], lat: 45.4642, lng: 9.1900 },
      { city: 'Napoli', state: 'Campania', stateCode: 'NA', zipRange: ['80132', '80134', '80138'], areaCodes: ['081'], lat: 40.8518, lng: 14.2681 },
      { city: 'Firenze', state: 'Toscana', stateCode: 'FI', zipRange: ['50122', '50123', '50129'], areaCodes: ['055'], lat: 43.7696, lng: 11.2558 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return {
        formatted: `${ac} ${String(num).slice(0, 3)} ${String(num).slice(3)}`,
        plain: `39${ac.replace(/^0/, '')}${num}`
      };
    },
    ssnLabel: 'Codice Fiscale (CF)',
    ssnFormatter: () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let res = '';
      for (let i = 0; i < 6; i++) res += chars[Math.floor(Math.random() * chars.length)];
      res += Math.floor(70 + Math.random() * 30);
      res += chars[Math.floor(Math.random() * 12)];
      res += String(Math.floor(1 + Math.random() * 28)).padStart(2, '0');
      res += chars[Math.floor(Math.random() * chars.length)];
      res += Math.floor(100 + Math.random() * 900);
      res += chars[Math.floor(Math.random() * chars.length)];
      return res;
    }
  },

  BR: {
    name: 'Brazil',
    callingCode: '+55',
    streets: [
      'Avenida Paulista', 'Rua Augusta', 'Avenida Atlântica', 'Avenida Brasil',
      'Rua Oscar Freire', 'Avenida Brigadeiro Faria Lima', 'Rua das Flores', 'Avenida Rio Branco'
    ],
    streetTypes: [''],
    cities: [
      { city: 'São Paulo', state: 'São Paulo', stateCode: 'SP', zipRange: ['01310-100', '01414-001', '04538-133'], areaCodes: ['11'], lat: -23.5505, lng: -46.6333 },
      { city: 'Rio de Janeiro', state: 'Rio de Janeiro', stateCode: 'RJ', zipRange: ['22041-001', '22410-003', '20040-002'], areaCodes: ['21'], lat: -22.9068, lng: -43.1729 },
      { city: 'Belo Horizonte', state: 'Minas Gerais', stateCode: 'MG', zipRange: ['30130-110', '30140-061'], areaCodes: ['31'], lat: -19.9167, lng: -43.9345 },
      { city: 'Curitiba', state: 'Paraná', stateCode: 'PR', zipRange: ['80020-310', '80420-000'], areaCodes: ['41'], lat: -25.4284, lng: -49.2733 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const p1 = Math.floor(98000 + Math.random() * 1999);
      const p2 = Math.floor(1000 + Math.random() * 9000);
      return {
        formatted: `(${ac}) 9${String(p1).slice(1)}-${p2}`,
        plain: `55${ac}9${String(p1).slice(1)}${p2}`
      };
    },
    ssnLabel: 'Cadastro de Pessoas Físicas (CPF)',
    ssnFormatter: () => {
      const d = () => Math.floor(Math.random() * 10);
      return `${d()}${d()}${d()}.${d()}${d()}${d()}.${d()}${d()}${d()}-${d()}${d()}`;
    }
  },

  BD: {
    name: 'Bangladesh',
    callingCode: '+880',
    streets: [
      'Mirpur Road', 'Kazi Nazrul Islam Avenue', 'Dhanmondi Road 27', 'Gulshan Avenue',
      'Banani Road 11', 'VIP Road', 'Agrabad Commercial Area', 'Station Road', 'College Road',
      'Chawkbazar Road', 'Shahjalal Upashahar Main Road', 'Zindabazar Road'
    ],
    streetTypes: [''],
    cities: [
      { city: 'Dhaka', state: 'Dhaka Division', stateCode: 'DHA', zipRange: ['1000', '1205', '1209', '1212', '1215', '1216', '1230'], areaCodes: ['17', '18', '19', '13', '14'], lat: 23.8103, lng: 90.4125 },
      { city: 'Chittagong', state: 'Chittagong Division', stateCode: 'CTG', zipRange: ['4000', '4100', '4204', '4220'], areaCodes: ['18', '17', '16'], lat: 22.3569, lng: 91.7832 },
      { city: 'Sylhet', state: 'Sylhet Division', stateCode: 'SYL', zipRange: ['3100', '3104', '3114'], areaCodes: ['17', '19'], lat: 24.8949, lng: 91.8687 },
      { city: 'Rajshahi', state: 'Rajshahi Division', stateCode: 'RAJ', zipRange: ['6000', '6100', '6205'], areaCodes: ['17', '15'], lat: 24.3636, lng: 88.6241 },
      { city: 'Khulna', state: 'Khulna Division', stateCode: 'KHU', zipRange: ['9000', '9100', '9202'], areaCodes: ['17', '19'], lat: 22.8456, lng: 89.5403 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const rest = Math.floor(1000000 + Math.random() * 9000000);
      return {
        formatted: `01${ac.slice(0, 1)}${String(rest).slice(0, 7)}`,
        plain: `8801${ac.slice(0, 1)}${String(rest).slice(0, 7)}`
      };
    },
    ssnLabel: 'National ID Number (NID)',
    ssnFormatter: () => {
      let nid = '';
      for (let i = 0; i < 10; i++) nid += Math.floor(Math.random() * 10);
      return nid;
    }
  },

  IN: {
    name: 'India',
    callingCode: '+91',
    streets: [
      'MG Road', 'Brigade Road', 'Connaught Place', 'Marine Drive', 'Park Street',
      'Anna Salai', 'Ring Road', 'Linking Road', 'FC Road', 'SV Road', 'Nehru Marg'
    ],
    streetTypes: [''],
    cities: [
      { city: 'Mumbai', state: 'Maharashtra', stateCode: 'MH', zipRange: ['400001', '400050', '400076', '400092'], areaCodes: ['98', '99', '97'], lat: 19.0760, lng: 72.8777 },
      { city: 'Delhi', state: 'Delhi NCR', stateCode: 'DL', zipRange: ['110001', '110016', '110025', '110048'], areaCodes: ['98', '99', '93'], lat: 28.6139, lng: 77.2090 },
      { city: 'Bengaluru', state: 'Karnataka', stateCode: 'KA', zipRange: ['560001', '560034', '560068', '560095'], areaCodes: ['98', '99', '96'], lat: 12.9716, lng: 77.5946 },
      { city: 'Hyderabad', state: 'Telangana', stateCode: 'TS', zipRange: ['500001', '500034', '500081'], areaCodes: ['98', '97', '94'], lat: 17.3850, lng: 78.4867 },
      { city: 'Chennai', state: 'Tamil Nadu', stateCode: 'TN', zipRange: ['600001', '600028', '600085'], areaCodes: ['98', '94', '91'], lat: 13.0827, lng: 80.2707 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: () => {
      const rest = Math.floor(10000000 + Math.random() * 90000000);
      const prefix = ['98', '99', '97', '96', '91', '88'][Math.floor(Math.random() * 6)];
      return {
        formatted: `+91 ${prefix}${String(rest).slice(0, 4)} ${String(rest).slice(4)}`,
        plain: `91${prefix}${rest}`
      };
    },
    ssnLabel: 'Aadhaar Card Number (UIDAI)',
    ssnFormatter: () => {
      const f4 = () => Math.floor(1000 + Math.random() * 9000);
      return `${f4()} ${f4()} ${f4()}`;
    }
  },

  JP: {
    name: 'Japan',
    callingCode: '+81',
    streets: [
      'Chuo-dori', 'Aoyama-dori', 'Meiji-dori', 'Omotesando', 'Waseda-dori',
      'Yasukuni-dori', 'Sotobori-dori', 'Roppongi-dori', 'Showa-dori'
    ],
    streetTypes: [''],
    cities: [
      { city: 'Tokyo', state: 'Tokyo', stateCode: '13', zipRange: ['100-0001', '150-0002', '160-0022', '106-0032'], areaCodes: ['3'], lat: 35.6762, lng: 139.6503 },
      { city: 'Osaka', state: 'Osaka', stateCode: '27', zipRange: ['530-0001', '542-0076', '556-0011'], areaCodes: ['6'], lat: 34.6937, lng: 135.5023 },
      { city: 'Kyoto', state: 'Kyoto', stateCode: '26', zipRange: ['600-8001', '604-8005', '605-0001'], areaCodes: ['75'], lat: 35.0116, lng: 135.7681 },
      { city: 'Yokohama', state: 'Kanagawa', stateCode: '14', zipRange: ['220-0011', '231-0005'], areaCodes: ['45'], lat: 35.4437, lng: 139.6380 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const p1 = Math.floor(1000 + Math.random() * 9000);
      const p2 = Math.floor(1000 + Math.random() * 9000);
      return {
        formatted: `0${ac}-${p1}-${p2}`,
        plain: `81${ac}${p1}${p2}`
      };
    },
    ssnLabel: 'My Number (Individual Number)',
    ssnFormatter: () => {
      const f4 = () => Math.floor(1000 + Math.random() * 9000);
      return `${f4()} ${f4()} ${f4()}`;
    }
  },

  CH: {
    name: 'Switzerland',
    callingCode: '+41',
    streets: ['Bahnhofstrasse', 'Poststrasse', 'Hauptstrasse', 'Kirchgasse', 'Seestrasse', 'Alpenstrasse', 'Dorfstrasse'],
    streetTypes: ['Strasse', 'Gasse', 'Weg', 'Platz'],
    cities: [
      { city: 'Zurich', state: 'Zurich', stateCode: 'ZH', zipRange: ['8001', '8005', '8048', '8050'], areaCodes: ['44'], lat: 47.3769, lng: 8.5417 },
      { city: 'Geneva', state: 'Geneva', stateCode: 'GE', zipRange: ['1201', '1205', '1208', '1211'], areaCodes: ['22'], lat: 46.2044, lng: 6.1432 },
      { city: 'Basel', state: 'Basel-City', stateCode: 'BS', zipRange: ['4001', '4051', '4056'], areaCodes: ['61'], lat: 47.5596, lng: 7.5886 },
      { city: 'Bern', state: 'Bern', stateCode: 'BE', zipRange: ['3001', '3007', '3011'], areaCodes: ['31'], lat: 46.9480, lng: 7.4474 },
      { city: 'Lausanne', state: 'Vaud', stateCode: 'VD', zipRange: ['1003', '1004', '1007'], areaCodes: ['21'], lat: 46.5197, lng: 6.6323 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return { formatted: `0${ac} ${String(num).slice(0, 3)} ${String(num).slice(3, 5)} ${String(num).slice(5)}`, plain: `41${ac}${num}` };
    },
    ssnLabel: 'AVS / AHV Number',
    ssnFormatter: () => `756.${Math.floor(1000 + Math.random() * 9000)}.${Math.floor(1000 + Math.random() * 9000)}.${Math.floor(10 + Math.random() * 90)}`
  },

  DK: {
    name: 'Denmark',
    callingCode: '+45',
    streets: ['Vestergade', 'Østergade', 'Nørregade', 'Søndergade', 'Strandvejen', 'Bredgade', 'Jernbanegade'],
    streetTypes: ['vej', 'gade', 'stræde', 'alle'],
    cities: [
      { city: 'Copenhagen', state: 'Capital', stateCode: 'H', zipRange: ['1050', '1550', '2100', '2200'], areaCodes: ['3'], lat: 55.6761, lng: 12.5683 },
      { city: 'Aarhus', state: 'Central Jutland', stateCode: 'M', zipRange: ['8000', '8200', '8210'], areaCodes: ['8'], lat: 56.1629, lng: 10.2039 },
      { city: 'Odense', state: 'Southern Denmark', stateCode: 'SD', zipRange: ['5000', '5200', '5230'], areaCodes: ['6'], lat: 55.4038, lng: 10.4024 },
      { city: 'Aalborg', state: 'North Jutland', stateCode: 'ND', zipRange: ['9000', '9200', '9220'], areaCodes: ['9'], lat: 57.0488, lng: 9.9217 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: () => {
      const num = Math.floor(20000000 + Math.random() * 70000000);
      return { formatted: `+45 ${String(num).slice(0, 2)} ${String(num).slice(2, 4)} ${String(num).slice(4, 6)} ${String(num).slice(6)}`, plain: `45${num}` };
    },
    ssnLabel: 'CPR-nummer (Personal ID)',
    ssnFormatter: () => `${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(1000 + Math.random() * 9000)}`
  },

  FI: {
    name: 'Finland',
    callingCode: '+358',
    streets: ['Mannerheimintie', 'Aleksanterinkatu', 'Hämeenkatu', 'Kauppakatu', 'Rantakatu', 'Koulukatu'],
    streetTypes: ['katu', 'tie', 'kuja', 'kaari'],
    cities: [
      { city: 'Helsinki', state: 'Uusimaa', stateCode: '18', zipRange: ['00100', '00150', '00200', '00530'], areaCodes: ['9'], lat: 60.1699, lng: 24.9384 },
      { city: 'Espoo', state: 'Uusimaa', stateCode: '18', zipRange: ['02100', '02200', '02600'], areaCodes: ['9'], lat: 60.2055, lng: 24.6559 },
      { city: 'Tampere', state: 'Pirkanmaa', stateCode: '11', zipRange: ['33100', '33200', '33500'], areaCodes: ['3'], lat: 61.4978, lng: 23.7610 },
      { city: 'Turku', state: 'Southwest Finland', stateCode: '19', zipRange: ['20100', '20200', '20500'], areaCodes: ['2'], lat: 60.4518, lng: 22.2666 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: () => {
      const num = Math.floor(40000000 + Math.random() * 50000000);
      return { formatted: `+358 40 ${String(num).slice(2, 5)} ${String(num).slice(5)}`, plain: `358${num}` };
    },
    ssnLabel: 'Henkilötunnus (HETU)',
    ssnFormatter: () => `${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(100 + Math.random() * 900)}A`
  },

  IE: {
    name: 'Ireland',
    callingCode: '+353',
    streets: ['O\'Connell Street', 'Grafton Street', 'Patrick Street', 'Henry Street', 'Main Street', 'Grand Canal Quay'],
    streetTypes: ['Street', 'Road', 'Avenue', 'Way', 'Close'],
    cities: [
      { city: 'Dublin', state: 'Leinster', stateCode: 'D', zipRange: ['D01', 'D02', 'D04', 'D07'], areaCodes: ['1'], lat: 53.3498, lng: -6.2603 },
      { city: 'Cork', state: 'Munster', stateCode: 'C', zipRange: ['T12', 'T23'], areaCodes: ['21'], lat: 51.8985, lng: -8.4756 },
      { city: 'Galway', state: 'Connacht', stateCode: 'G', zipRange: ['H91'], areaCodes: ['91'], lat: 53.2707, lng: -9.0568 },
      { city: 'Limerick', state: 'Munster', stateCode: 'L', zipRange: ['V94'], areaCodes: ['61'], lat: 52.6638, lng: -8.6267 }
    ],
    zipFormatter: (zip) => `${zip} ${Math.floor(1000 + Math.random() * 9000)}`,
    phoneFormatter: (ac) => {
      const num = Math.floor(100000 + Math.random() * 900000);
      return { formatted: `0${ac} ${String(num).slice(0, 3)} ${String(num).slice(3)}`, plain: `353${ac}${num}` };
    },
    ssnLabel: 'PPS Number (Personal Public Service)',
    ssnFormatter: () => `${Math.floor(1000000 + Math.random() * 9000000)}T`
  },

  IR: {
    name: 'Iran',
    callingCode: '+98',
    streets: ['Valiasr', 'Enghelab', 'Shariati', 'Azadi', 'Ferdowsi', 'Karimkhan', 'Pasdaran'],
    streetTypes: ['Street', 'Avenue', 'Boulevard', 'Alley'],
    cities: [
      { city: 'Tehran', state: 'Tehran', stateCode: '07', zipRange: ['11369', '14155', '19978'], areaCodes: ['21'], lat: 35.6892, lng: 51.3890 },
      { city: 'Mashhad', state: 'Razavi Khorasan', stateCode: '09', zipRange: ['91375', '91775'], areaCodes: ['51'], lat: 36.2972, lng: 59.6067 },
      { city: 'Isfahan', state: 'Isfahan', stateCode: '10', zipRange: ['81465', '81655'], areaCodes: ['31'], lat: 32.6546, lng: 51.6680 },
      { city: 'Shiraz', state: 'Fars', stateCode: '14', zipRange: ['71345', '71455'], areaCodes: ['71'], lat: 29.5918, lng: 52.5837 },
      { city: 'Tabriz', state: 'East Azerbaijan', stateCode: '03', zipRange: ['51335', '51665'], areaCodes: ['41'], lat: 38.0962, lng: 46.2738 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(10000000 + Math.random() * 90000000);
      return { formatted: `0${ac} ${String(num).slice(0, 4)} ${String(num).slice(4)}`, plain: `98${ac}${num}` };
    },
    ssnLabel: 'Melli Code (National ID)',
    ssnFormatter: () => `${Math.floor(1000000000 + Math.random() * 9000000000)}`
  },

  MX: {
    name: 'Mexico',
    callingCode: '+52',
    streets: ['Reforma', 'Insurgentes', 'Juárez', 'Hidalgo', 'Morelos', 'Madero', 'Revolución'],
    streetTypes: ['Avenida', 'Calle', 'Boulevard', 'Calzada'],
    cities: [
      { city: 'Mexico City', state: 'CDMX', stateCode: 'CMX', zipRange: ['01000', '03100', '06000', '11000'], areaCodes: ['55'], lat: 19.4326, lng: -99.1332 },
      { city: 'Guadalajara', state: 'Jalisco', stateCode: 'JAL', zipRange: ['44100', '44600', '45000'], areaCodes: ['33'], lat: 20.6597, lng: -103.3496 },
      { city: 'Monterrey', state: 'Nuevo León', stateCode: 'NLE', zipRange: ['64000', '64700', '66220'], areaCodes: ['81'], lat: 25.6866, lng: -100.3161 },
      { city: 'Puebla', state: 'Puebla', stateCode: 'PUE', zipRange: ['72000', '72400', '72500'], areaCodes: ['222'], lat: 19.0414, lng: -98.2063 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(10000000 + Math.random() * 90000000);
      return { formatted: `(${ac}) ${String(num).slice(0, 4)}-${String(num).slice(4)}`, plain: `52${ac}${num}` };
    },
    ssnLabel: 'CURP / RFC ID',
    ssnFormatter: () => `XAXX${Math.floor(100000 + Math.random() * 900000)}000`
  },

  NL: {
    name: 'Netherlands',
    callingCode: '+31',
    streets: ['Kalverstraat', 'Keizersgracht', 'Prinsengracht', 'Kerkstraat', 'Dorpsstraat', 'Molenstraat'],
    streetTypes: ['straat', 'gracht', 'weg', 'laan', 'plein'],
    cities: [
      { city: 'Amsterdam', state: 'North Holland', stateCode: 'NH', zipRange: ['1012', '1017', '1054', '1071'], areaCodes: ['20'], lat: 52.3676, lng: 4.9041 },
      { city: 'Rotterdam', state: 'South Holland', stateCode: 'ZH', zipRange: ['3011', '3014', '3062'], areaCodes: ['10'], lat: 51.9244, lng: 4.4777 },
      { city: 'The Hague', state: 'South Holland', stateCode: 'ZH', zipRange: ['2511', '2517', '2585'], areaCodes: ['70'], lat: 52.0705, lng: 4.3007 },
      { city: 'Utrecht', state: 'Utrecht', stateCode: 'UT', zipRange: ['3511', '3514', '3572'], areaCodes: ['30'], lat: 52.0907, lng: 5.1214 }
    ],
    zipFormatter: (zip) => `${zip} ${['AB', 'CD', 'EF', 'GH', 'JK', 'LM'][Math.floor(Math.random() * 6)]}`,
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return { formatted: `0${ac} ${String(num).slice(0, 3)} ${String(num).slice(3)}`, plain: `31${ac}${num}` };
    },
    ssnLabel: 'BSN (Burgerservicenummer)',
    ssnFormatter: () => `${Math.floor(100000000 + Math.random() * 900000000)}`
  },

  NO: {
    name: 'Norway',
    callingCode: '+47',
    streets: ['Karl Johans gate', 'Storgata', 'Kirkegata', 'Strandgata', 'Kongens gate', 'Dronningens gate'],
    streetTypes: ['gate', 'vei', 'gata', 'allé'],
    cities: [
      { city: 'Oslo', state: 'Oslo', stateCode: '03', zipRange: ['0150', '0161', '0250', '0350'], areaCodes: ['2'], lat: 59.9139, lng: 10.7522 },
      { city: 'Bergen', state: 'Vestland', stateCode: '46', zipRange: ['5003', '5014', '5020'], areaCodes: ['5'], lat: 60.3913, lng: 5.3221 },
      { city: 'Trondheim', state: 'Trøndelag', stateCode: '50', zipRange: ['7010', '7013', '7030'], areaCodes: ['7'], lat: 63.4305, lng: 10.3951 },
      { city: 'Stavanger', state: 'Rogaland', stateCode: '11', zipRange: ['4005', '4008', '4012'], areaCodes: ['4'], lat: 58.9699, lng: 5.7331 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: () => {
      const num = Math.floor(40000000 + Math.random() * 59000000);
      return { formatted: `+47 ${String(num).slice(0, 2)} ${String(num).slice(2, 4)} ${String(num).slice(4, 6)} ${String(num).slice(6)}`, plain: `47${num}` };
    },
    ssnLabel: 'Fødselsnummer (National ID)',
    ssnFormatter: () => `${Math.floor(100000 + Math.random() * 900000)} ${Math.floor(10000 + Math.random() * 90000)}`
  },

  NZ: {
    name: 'New Zealand',
    callingCode: '+64',
    streets: ['Queen Street', 'Victoria Street', 'Lambton Quay', 'Ponsonby Road', 'K Road', 'George Street'],
    streetTypes: ['Street', 'Road', 'Avenue', 'Crescent', 'Terrace'],
    cities: [
      { city: 'Auckland', state: 'Auckland', stateCode: 'AKL', zipRange: ['1010', '1021', '1050'], areaCodes: ['9'], lat: -36.8485, lng: 174.7633 },
      { city: 'Wellington', state: 'Wellington', stateCode: 'WGN', zipRange: ['6011', '6012', '6021'], areaCodes: ['4'], lat: -41.2865, lng: 174.7762 },
      { city: 'Christchurch', state: 'Canterbury', stateCode: 'CAN', zipRange: ['8011', '8013', '8023'], areaCodes: ['3'], lat: -43.5321, lng: 172.6362 },
      { city: 'Hamilton', state: 'Waikato', stateCode: 'WKO', zipRange: ['3204', '3216'], areaCodes: ['7'], lat: -37.7870, lng: 175.2793 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return { formatted: `0${ac} ${String(num).slice(0, 3)} ${String(num).slice(3)}`, plain: `64${ac}${num}` };
    },
    ssnLabel: 'IRD Number (Inland Revenue)',
    ssnFormatter: () => `${Math.floor(10 + Math.random() * 90)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`
  },

  RS: {
    name: 'Serbia',
    callingCode: '+381',
    streets: ['Knez Mihailova', 'Bulevar kralja Aleksandra', 'Terazije', 'Nemanjina', 'Kralja Milana', 'Cara Dusana'],
    streetTypes: ['ulica', 'bulevar', 'trg'],
    cities: [
      { city: 'Belgrade', state: 'Belgrade', stateCode: 'BG', zipRange: ['11000', '11050', '11070'], areaCodes: ['11'], lat: 44.7866, lng: 20.4489 },
      { city: 'Novi Sad', state: 'Vojvodina', stateCode: 'NS', zipRange: ['21000', '21101'], areaCodes: ['21'], lat: 45.2671, lng: 19.8335 },
      { city: 'Nis', state: 'Nisava', stateCode: 'NI', zipRange: ['18000', '18105'], areaCodes: ['18'], lat: 43.3209, lng: 21.8958 },
      { city: 'Kragujevac', state: 'Sumadija', stateCode: 'KG', zipRange: ['34000'], areaCodes: ['34'], lat: 44.0128, lng: 20.9114 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(100000 + Math.random() * 900000);
      return { formatted: `0${ac} ${String(num).slice(0, 3)}-${String(num).slice(3)}`, plain: `381${ac}${num}` };
    },
    ssnLabel: 'JMBG (Jedinstveni matični broj)',
    ssnFormatter: () => `${Math.floor(1000000000000 + Math.random() * 9000000000000)}`
  },

  TR: {
    name: 'Turkey',
    callingCode: '+90',
    streets: ['Istiklal Caddesi', 'Bagdat Caddesi', 'Ataturk Bulvari', 'Cumhuriyet Caddesi', 'Gazi Bulvari', 'Inonu Caddesi'],
    streetTypes: ['Caddesi', 'Sokak', 'Bulvari', 'Meydani'],
    cities: [
      { city: 'Istanbul', state: 'Istanbul', stateCode: '34', zipRange: ['34000', '34100', '34360', '34710'], areaCodes: ['212', '216'], lat: 41.0082, lng: 28.9784 },
      { city: 'Ankara', state: 'Ankara', stateCode: '06', zipRange: ['06000', '06420', '06680'], areaCodes: ['312'], lat: 39.9334, lng: 32.8597 },
      { city: 'Izmir', state: 'Izmir', stateCode: '35', zipRange: ['35000', '35210', '35530'], areaCodes: ['232'], lat: 38.4237, lng: 27.1428 },
      { city: 'Bursa', state: 'Bursa', stateCode: '16', zipRange: ['16000', '16120'], areaCodes: ['224'], lat: 40.1885, lng: 29.0610 },
      { city: 'Antalya', state: 'Antalya', stateCode: '07', zipRange: ['07000', '07100'], areaCodes: ['242'], lat: 36.8969, lng: 30.7133 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return { formatted: `0${ac} ${String(num).slice(0, 3)} ${String(num).slice(3, 5)} ${String(num).slice(5)}`, plain: `90${ac}${num}` };
    },
    ssnLabel: 'T.C. Kimlik No (National Identity)',
    ssnFormatter: () => `${Math.floor(10000000000 + Math.random() * 89999999999)}`
  },

  UA: {
    name: 'Ukraine',
    callingCode: '+380',
    streets: ['Khreshchatyk', 'Volodymyrska', 'Shevchenko Boulevard', 'Saksahanskoho', 'Derybasivska', 'Sumska', 'Prospekt Svobody'],
    streetTypes: ['Street', 'Boulevard', 'Avenue', 'Lane'],
    cities: [
      { city: 'Kyiv', state: 'Kyiv', stateCode: 'KV', zipRange: ['01001', '01030', '02000', '03150'], areaCodes: ['44'], lat: 50.4501, lng: 30.5234 },
      { city: 'Kharkiv', state: 'Kharkiv', stateCode: 'KH', zipRange: ['61000', '61022', '61058'], areaCodes: ['57'], lat: 49.9935, lng: 36.2304 },
      { city: 'Odesa', state: 'Odesa', stateCode: 'OD', zipRange: ['65000', '65026'], areaCodes: ['48'], lat: 46.4825, lng: 30.7233 },
      { city: 'Dnipro', state: 'Dnipropetrovsk', stateCode: 'DP', zipRange: ['49000', '49044'], areaCodes: ['56'], lat: 48.4647, lng: 35.0462 },
      { city: 'Lviv', state: 'Lviv', stateCode: 'LV', zipRange: ['79000', '79008'], areaCodes: ['32'], lat: 49.8397, lng: 24.0297 }
    ],
    zipFormatter: (zip) => String(zip),
    phoneFormatter: (ac) => {
      const num = Math.floor(1000000 + Math.random() * 9000000);
      return { formatted: `+380 ${ac} ${String(num).slice(0, 3)} ${String(num).slice(3)}`, plain: `380${ac}${num}` };
    },
    ssnLabel: 'RNTRC / Tax ID (IPN)',
    ssnFormatter: () => `${Math.floor(1000000000 + Math.random() * 9000000000)}`
  }
};

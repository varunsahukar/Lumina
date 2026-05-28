export interface FundMeta {
  fundHouse: string;
  schemeType: string;
  schemeCategory: string;
  schemeCode: string;
  schemeName: string;
}

export interface NavPoint {
  date: Date;
  nav: number;
}

export interface FundData {
  meta: FundMeta;
  history: NavPoint[];
  latestNav?: number;
  previousNav?: number;
  changePercent?: number;
}

export interface AmfiNavRecord {
  schemeCode: string;
  name: string;
  nav: number;
  date: Date;
}

export interface UsaFundQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  latestTradingDay: Date;
  currency: 'USD';
}

export const DEFAULT_INDIA_SCHEME_CODES = [
  '119598',
  '120503',
  '120465',
  '120594',
  '118989',
  '120716',
  '125354',
  '120828',
  '120505',
  '120822',
  '119597',
  '120716',
  '125497',
  '119206',
  '112090',
  '118825',
  '119551',
  '118778',
  '120505',
  '118989',
];

export const DEFAULT_USA_TICKERS = [
  'VFIAX',
  'FXAIX',
  'VTSAX',
  'FCNTX',
  'VWELX',
  'VTSMX',
  'AGTHX',
  'PRGFX',
];

export const USA_FUND_NAMES: Record<string, string> = {
  VFIAX: 'Vanguard 500 Index',
  FXAIX: 'Fidelity 500 Index',
  VTSAX: 'Vanguard Total Stock',
  FCNTX: 'Fidelity Contrafund',
  VWELX: 'Vanguard Wellington',
  VTSMX: 'Vanguard Total Market',
  AGTHX: 'American Growth Fund',
  PRGFX: 'T. Rowe Price Growth',
};

export const DATA_FRESHNESS_MAX_AGE_MS = 6 * 60 * 60 * 1000;

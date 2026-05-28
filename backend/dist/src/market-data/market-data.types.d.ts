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
export declare const DEFAULT_INDIA_SCHEME_CODES: string[];
export declare const DEFAULT_USA_TICKERS: string[];
export declare const USA_FUND_NAMES: Record<string, string>;
export declare const DATA_FRESHNESS_MAX_AGE_MS: number;

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface NewsItem {
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
}

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);

  constructor(private httpService: HttpService) {}

  async getLatestNews(): Promise<NewsItem[]> {
    try {
      // In production, we parse RSS feeds:
      // const res = await firstValueFrom(this.httpService.get('https://news.google.com/rss/search?q=mutual+funds'));
      // Parse XML to NewsItem array...

      // Provide dynamic, high-quality mocked articles:
      return [
        {
          title:
            'SEBI mandates strict stress test disclosures for Small & Mid Cap mutual funds',
          source: 'Economic Times',
          url: 'https://economictimes.indiatimes.com/mf/sebi-midcap-stress-test',
          publishedAt: new Date().toISOString(),
          summary:
            'The securities regulator has asked mutual funds to reveal liquidity days, concentration metrics, and portfolio volatility outcomes every fortnight.',
        },
        {
          title:
            'Nifty 50 achieves historic milestones amid tech rally and robust domestic inflows',
          source: 'LiveMint',
          url: 'https://livemint.com/market/nifty-50-all-time-highs',
          publishedAt: new Date(Date.now() - 3600000).toISOString(),
          summary:
            'Strong buying by local mutual funds offsets FII outflows as index weights shift towards digital conglomerates.',
        },
        {
          title:
            'US Bond Yields retract from peaks as inflation forecasts align with targets',
          source: 'Bloomberg',
          url: 'https://bloomberg.com/markets/bonds',
          publishedAt: new Date(Date.now() - 7200000).toISOString(),
          summary:
            'Fixed-income managers recommend extending duration as macroeconomic datasets hint at minor rate adjustments.',
        },
      ];
    } catch (error) {
      this.logger.error(`Failed to fetch news: ${error.message}`);
      return [];
    }
  }
}

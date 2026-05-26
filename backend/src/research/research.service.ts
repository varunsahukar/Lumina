import { Injectable, NotFoundException } from '@nestjs/common';

export interface ResearchArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: Date;
  readTimeMinutes: number;
}

@Injectable()
export class ResearchService {
  private articles: ResearchArticle[] = [
    {
      id: 'art-1',
      title:
        'Understanding Beta and Risk-Adjusted Returns in Indian Mutual Funds',
      summary:
        'A deep dive into how beta impacts your mutual fund portfolio and how to choose funds with optimal Sharpe Ratios.',
      content:
        "Beta measures a fund's volatility relative to its benchmark index. A beta of 1.0 indicates that the fund moves in tandem with the index. If you are a conservative investor, look for funds with beta < 1.0...",
      author: 'Dr. Sarah Sen, Senior Researcher',
      tags: ['Mutual Funds', 'Risk Management', 'Education'],
      publishedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000),
      readTimeMinutes: 6,
    },
    {
      id: 'art-2',
      title:
        'US Fed Interest Rates Drift: Implications for International Equities',
      summary:
        'Analyzing how changes in federal funds rates affect emerging markets, particularly Indian IT and banking index weights.',
      content:
        'The Federal Reserve interest rate policy acts as a gravity pull on global liquidity. As rates hold higher for longer, foreign portfolio investors (FPIs) often reallocate capital from emerging markets back to US treasuries...',
      author: 'James Miller, Global FX Strategist',
      tags: ['US Market', 'Macro Economics', 'International'],
      publishedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000),
      readTimeMinutes: 8,
    },
  ];

  async getArticles(tag?: string) {
    if (tag) {
      return this.articles.filter((a) =>
        a.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      );
    }
    return this.articles;
  }

  async getArticle(id: string) {
    const article = this.articles.find((a) => a.id === id);
    if (!article)
      throw new NotFoundException(`Research article with ID ${id} not found`);
    return article;
  }

  async createArticle(data: Omit<ResearchArticle, 'id' | 'publishedAt'>) {
    const newArticle: ResearchArticle = {
      id: `art-${Math.floor(1000 + Math.random() * 9000)}`,
      ...data,
      publishedAt: new Date(),
    };
    this.articles.unshift(newArticle);
    return newArticle;
  }

  async deleteArticle(id: string) {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1)
      throw new NotFoundException(`Research article with ID ${id} not found`);
    const [deleted] = this.articles.splice(index, 1);
    return deleted;
  }
}

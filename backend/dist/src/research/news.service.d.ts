import { HttpService } from '@nestjs/axios';
export interface NewsItem {
    title: string;
    source: string;
    url: string;
    publishedAt: string;
    summary: string;
}
export declare class NewsService {
    private httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    getLatestNews(): Promise<NewsItem[]>;
}

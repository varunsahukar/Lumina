import { ResearchService } from './research.service';
import { NewsService } from './news.service';
export declare class ResearchController {
    private readonly researchService;
    private readonly newsService;
    constructor(researchService: ResearchService, newsService: NewsService);
    getArticles(tag?: string): Promise<import("./research.service").ResearchArticle[]>;
    getNews(): Promise<import("./news.service").NewsItem[]>;
    getArticle(id: string): Promise<import("./research.service").ResearchArticle>;
}

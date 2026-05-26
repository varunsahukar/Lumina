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
export declare class ResearchService {
    private articles;
    getArticles(tag?: string): Promise<ResearchArticle[]>;
    getArticle(id: string): Promise<ResearchArticle>;
    createArticle(data: Omit<ResearchArticle, 'id' | 'publishedAt'>): Promise<ResearchArticle>;
    deleteArticle(id: string): Promise<ResearchArticle>;
}

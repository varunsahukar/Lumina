import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ResearchService } from './research.service';
import { NewsService } from './news.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('research')
@UseGuards(JwtGuard)
export class ResearchController {
  constructor(
    private readonly researchService: ResearchService,
    private readonly newsService: NewsService,
  ) {}

  @Get()
  async getArticles(@Query('tag') tag?: string) {
    return this.researchService.getArticles(tag);
  }

  @Get('news')
  async getNews() {
    return this.newsService.getLatestNews();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return this.researchService.getArticle(id);
  }
}

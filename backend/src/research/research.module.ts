import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ResearchController } from './research.controller';
import { ResearchService } from './research.service';
import { NewsService } from './news.service';

@Module({
  imports: [HttpModule],
  controllers: [ResearchController],
  providers: [ResearchService, NewsService],
  exports: [ResearchService, NewsService],
})
export class ResearchModule {}

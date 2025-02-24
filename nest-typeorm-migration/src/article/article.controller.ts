import { Controller, Post, Body, Get } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get('init')
  async initData() {
    await this.articleService.initData();
    return 'done';
  }

  @Get('find')
  async findAll() {
    return await this.articleService.findAll();
  }

}

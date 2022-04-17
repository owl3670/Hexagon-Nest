import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IMusicScrapingPort } from '../port/music.scraping.port';
import { MelonScraping } from './melon.scraping';

@Injectable()
export class ScrapingService {
  constructor(
    @Inject(MelonScraping) private readonly scrapingPort: IMusicScrapingPort,
  ) {}

  @Cron('*/10 * * * * * ')
  handleScrap() {
    this.scrapingPort.scrap();
  }
}

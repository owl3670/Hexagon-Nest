import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IMusicScrapingPort } from '../port/music.scraping.port';

@Injectable()
export class ScrapingService {
  constructor(
    @Inject('Scraping') private readonly scrapingPorts: IMusicScrapingPort[],
  ) {}

  @Cron('*/5 * * * * * ')
  handleScrap() {
    this.scrapingPorts.map((port) => port.scrap());
  }
}

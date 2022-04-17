import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';
import { Vendor } from '../domain/music.types';
import { MusicJsonDbRepository } from '../infra/json-db';
import { IMusicRepository } from '../port/music.repository.port';
import { IMusicScrapingPort } from '../port/music.scraping.port';

@Injectable()
export class MelonScraping implements IMusicScrapingPort {
  private readonly vendor: Vendor = 'melon';

  constructor(
    @Inject(MusicJsonDbRepository)
    private readonly musicRepository: IMusicRepository,
    private readonly httpService: HttpService,
  ) {}

  async scrap(): Promise<void> {
    const response = await lastValueFrom(
      this.httpService.get('https://www.melon.com/chart/index.htm'),
    );

    const $ = cheerio.load(response.data);

    console.log(JSON.stringify($.html()));
  }
}

import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';
import { Music } from '../domain/music.entity';
import { Vendor } from '../domain/music.types';
import { MusicJsonDbRepository } from '../infra/json-db';
import { IMusicRepository } from '../port/music.repository.port';
import { IMusicScrapingPort } from '../port/music.scraping.port';

@Injectable()
export class MelonScraping implements IMusicScrapingPort {
  private readonly vendor: Vendor = 'genie';

  constructor(
    @Inject(MusicJsonDbRepository)
    private readonly musicRepository: IMusicRepository,
    private readonly httpService: HttpService,
  ) {}

  async scrap(): Promise<void> {
    const response = await lastValueFrom(
      this.httpService.get('https://www.genie.co.kr/chart/top200'),
    );

    const $ = cheerio.load(response.data);

    const $tr = $('tbody').children();

    const results: Music[] = [];
    $tr.each((i, el) => {
      const $td = $(el).children();

      const rank = $($td[1]).find('.rank').text();
      const name = $($td[5]).find('.rank01 a').text();
      const singer = $($td[5]).find('.rank02 > a').text();
      const album = $($td[6]).find('.rank03 a').text();

      const music = new Music({
        ranking: +rank,
        name,
        singer,
        album,
      });

      const albumId = $($td[6]).find('.rank03').html().split("'")[1];

      const response = lastValueFrom(
        this.httpService.get(
          `https://www.melon.com/album/detail.htm?albumId=${albumId}`,
        ),
      );

      response
        .then((res) => {
          const $album = cheerio.load(res.data);
          const publisher = $album('.list dd:nth-child(3)').text();
          const agency = $album('.list dd:nth-child(4)').text();
          music.addDetail({ publisher, agency, ...music });

          results.push(music);
        })
        .catch((err) => console.log(err));
    });
  }
}

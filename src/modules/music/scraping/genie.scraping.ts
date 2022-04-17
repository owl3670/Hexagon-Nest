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
export class GenieScraping implements IMusicScrapingPort {
  private readonly vendor: Vendor = 'genie';

  constructor(
    @Inject(MusicJsonDbRepository)
    private readonly musicRepository: IMusicRepository,
    private readonly httpService: HttpService,
  ) {}

  async scrap(): Promise<void> {
    const responses = [];
    for (let i = 1; i < 5; i++) {
      const response = await lastValueFrom(
        this.httpService.get(`https://www.genie.co.kr/chart/top200?pg=${i}`),
      );
      responses.push(response);
    }

    const results: Music[] = [];
    for (const response of responses) {
      const $ = cheerio.load(response.data);

      const $tr = $('tbody').children();

      for (const el of $tr) {
        const $td = $(el).children();

        const rank = $($td[1]).children().remove().end().text();
        const name = $($td[4])
          .find('.title')
          .children()
          .remove()
          .end()
          .text()
          .trim();
        const singer = $($td[4]).find('.artist').text();
        const album = $($td[4]).find('.albumtitle').text();

        const music = Music.createNew({
          ranking: +rank,
          name,
          singer,
          album,
        });

        music.addId(`${this.vendor}${music.ranking}`);

        const albumId = $($td[4])
          .find('.albumtitle')
          .attr('onclick')
          .split("'")[1];

        const response = await lastValueFrom(
          this.httpService.get(
            `https://www.genie.co.kr/detail/albumInfo?axnm=${albumId}`,
          ),
        );

        const $album = cheerio.load(response.data);
        const $span = $album('.album-detail-infos .info-data').find('.value');
        const publisher = $span.eq(2).text();
        const agency = $span.eq(3).text();
        music.addDetail({ publisher, agency, ...music });

        results.push(music);
      }
    }

    this.musicRepository.save(this.vendor, results);
  }
}

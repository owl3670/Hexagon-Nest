import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { ScrapingService } from './scraping/scraping.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { MelonScraping } from './scraping/melon.scraping';
import { MusicJsonDbRepository } from './infra/json-db';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [
    MusicService,
    ScrapingService,
    MelonScraping,
    MusicJsonDbRepository,
  ],
  controllers: [MusicController],
})
export class MusicModule {}

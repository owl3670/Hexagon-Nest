import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { ScrapingService } from './scraping/scraping.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { MelonScraping } from './scraping/melon.scraping';
import { MusicJsonDbRepository } from './infra/json-db';
import { GenieScraping } from './scraping/genie.scraping';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  providers: [
    MusicService,
    ScrapingService,
    MelonScraping,
    GenieScraping,
    MusicJsonDbRepository,
    {
      provide: 'Scraping',
      useFactory: (melon, genie) => [melon, genie],
      inject: [MelonScraping, GenieScraping],
    },
  ],
  controllers: [MusicController],
})
export class MusicModule {}

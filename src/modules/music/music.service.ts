import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Music } from './domain/music.entity';
import { MusicGetManyDto } from './dto/request/music.get-many.dto';
import { MusicGetOneDto } from './dto/request/music.get-one.dto';
import { MusicDetailDto } from './dto/response/music.detail.dto';
import { MusicSongsDto } from './dto/response/music.songs.dto';
import {
  MusicSummariesDto,
  MusicSummaryDto,
} from './dto/response/music.summaries.dto';
import { MusicJsonDbRepository } from './infra/json-db';
import { IMusicRepository } from './port/music.repository.port';
import { IMusicService } from './port/music.service.port';

@Injectable()
export class MusicService implements IMusicService {
  constructor(
    @Inject(MusicJsonDbRepository)
    private readonly musicRepository: IMusicRepository,
  ) {}

  getDetailOne(dto: MusicGetOneDto): MusicDetailDto {
    const music = this.musicRepository.getOne(dto.vendor, dto.id);

    return music;
  }

  getSummaries(dto: MusicGetManyDto): MusicSummariesDto {
    const musics = this.musicRepository.getAll(dto.vendor);

    const summaries: MusicSummaryDto[] = [];
    for (const key in musics) {
      if (key != 'update_time') {
        const music: Music = musics[key];
        const summary: MusicSummaryDto = {
          id: music.id,
          ranking: music.ranking,
          name: music.name,
          singer: music.singer,
          album: music.album,
        };
        summaries.push(summary);
      }
    }

    return { summaries };
  }

  getSongs(dto: MusicGetManyDto): MusicSongsDto {
    const musics = this.musicRepository.getAll(dto.vendor);

    const details: MusicDetailDto[] = [];
    for (const key in musics) {
      if (key != 'update_time') {
        const music: Music = musics[key];
        details.push(music);
      }
    }

    return { musics: details };
  }
}

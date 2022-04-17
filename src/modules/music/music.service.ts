import { Injectable } from '@nestjs/common';
import { MusicDetailDto } from './dto/response/music.detail.dto';
import { MusicSongsDto } from './dto/response/music.songs.dto';
import { MusicSummariesDto } from './dto/response/music.summaries.dto';
import { IMusicService } from './port/music.service.port';

@Injectable()
export class MusicService implements IMusicService {
  getDetailOne(): MusicDetailDto {
    return new MusicDetailDto();
  }

  getSummaries(): MusicSummariesDto {
    return new MusicSummariesDto();
  }

  getSongs(): MusicSongsDto {
    return new MusicSongsDto();
  }
}

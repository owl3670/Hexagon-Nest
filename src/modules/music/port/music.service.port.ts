import { MusicGetManyDto } from '../dto/request/music.get-many.dto';
import { MusicGetOneDto } from '../dto/request/music.get-one.dto';
import { MusicDetailDto } from '../dto/response/music.detail.dto';
import { MusicSongsDto } from '../dto/response/music.songs.dto';
import { MusicSummariesDto } from '../dto/response/music.summaries.dto';

export interface IMusicService {
  getDetailOne(dto: MusicGetOneDto): MusicDetailDto;

  getSummaries(dto: MusicGetManyDto): MusicSummariesDto;

  getSongs(dto: MusicGetManyDto): MusicSongsDto;
}

import { MusicDetailDto } from '../dto/response/music.detail.dto';
import { MusicSongsDto } from '../dto/response/music.songs.dto';
import { MusicSummariesDto } from '../dto/response/music.summaries.dto';

export interface IMusicService {
  getDetailOne(): MusicDetailDto;

  getSummaries(): MusicSummariesDto;

  getSongs(): MusicSongsDto;
}

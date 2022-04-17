import { MusicSummary } from 'src/modules/music/domain/music.entity';

export class MusicSummaryDto implements MusicSummary {
  id: string;
  ranking: number;
  name: string;
  singer: string;
  album: string;
}

export class MusicSummariesDto {
  summaries: MusicSummaryDto[];
}

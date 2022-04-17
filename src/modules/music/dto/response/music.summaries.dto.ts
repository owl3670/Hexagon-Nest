import { MusicSummary } from 'src/modules/music/domain/music.entity';

class MusicSummaryDto implements MusicSummary {
  id: number;
  ranking: number;
  name: string;
  singer: string;
  album: string;
}

export class MusicSummariesDto {
  summaries: MusicSummaryDto[];
}

import { MusicDetail } from 'src/modules/music/domain/music.entity';

export class MusicDetailDto implements MusicDetail {
  id: number;
  publisher: string;
  agency: string;
  ranking: number;
  name: string;
  singer: string;
  album: string;
}

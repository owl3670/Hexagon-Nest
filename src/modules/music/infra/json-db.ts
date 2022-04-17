import { Music, MusicSummary } from '../domain/music.entity';
import { Vendor } from '../domain/music.types';
import { IMusicRepository } from '../port/music.repository.port';

export class MusicJsonDbRepository implements IMusicRepository {
  save(vendor: Vendor, musics: Music[]) {}

  getOne(id: number): Music {
    const summary: MusicSummary = {
      album: '',
      name: '',
      ranking: 1,
      singer: '',
    };
    return Music.createNew(summary);
  }

  getAll(vendor: Vendor): Music[] {
    const summary: MusicSummary = {
      album: '',
      name: '',
      ranking: 1,
      singer: '',
    };
    return [Music.createNew(summary)];
  }

  getUpdateTime(vendor: Vendor): Date {
    return new Date();
  }
}

import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Music } from '../domain/music.entity';
import { Vendor } from '../domain/music.types';
import { IMusicRepository } from '../port/music.repository.port';

export class MusicJsonDbRepository implements IMusicRepository {
  readonly db = new JsonDB(new Config('music', true, false, '/'));

  save(vendor: Vendor, musics: Music[]) {
    musics.forEach((music) => {
      this.db.push(`/${vendor}/${music.id}`, music);
    });
    this.db.push(`/${vendor}/update_time`, new Date());
  }

  getOne(vendor: Vendor, id: string): Music {
    const data = this.db.getData(`/${vendor}/${id}`);
    return data;
  }

  getAll(vendor: Vendor): Music[] {
    const data = this.db.getData(`/${vendor}`);

    console.log(data);

    return data;
  }

  getUpdateTime(vendor: Vendor): Date {
    try {
      const data = this.db.getData(`/${vendor}/update_time`);
      return new Date(data);
    } catch (err) {
      return null;
    }
  }
}

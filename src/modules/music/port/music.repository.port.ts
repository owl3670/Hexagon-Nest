import { Music } from '../domain/music.entity';
import { Vendor } from '../domain/music.types';

export interface IMusicRepository {
  save(vendor: Vendor, musics: Music[]);
  getOne(vendor: Vendor, id: string): Music;
  getAll(vendor: Vendor): Music[];
  getUpdateTime(vendor: Vendor): Date;
}

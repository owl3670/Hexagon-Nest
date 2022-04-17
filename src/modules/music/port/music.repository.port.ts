import { Music } from '../domain/music.entity';
import { Vendor } from '../domain/music.types';

export interface IMusicRepository {
  save(vendor: Vendor, musics: Music[]);
  getOne(id: number): Music;
  getAll(vendor: Vendor): Music[];
  getUpdateTime(vendor: Vendor): Date;
}

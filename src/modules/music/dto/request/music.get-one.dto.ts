import { IsString } from 'class-validator';
import { Vendor } from '../../domain/music.types';

export class MusicGetOneDto {
  @IsString()
  vendor: Vendor;

  @IsString()
  id: string;
}

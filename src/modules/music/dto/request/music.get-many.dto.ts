import { IsString } from 'class-validator';
import { Vendor } from '../../domain/music.types';

export class MusicGetManyDto {
  @IsString()
  vendor: Vendor;
}

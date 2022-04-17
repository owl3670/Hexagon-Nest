import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Vendor } from '../../domain/music.types';

export class MusicGetOneDto {
  @IsString()
  vendor: Vendor;

  @Transform(({ value }) => +value)
  @IsNumber()
  id: number;
}

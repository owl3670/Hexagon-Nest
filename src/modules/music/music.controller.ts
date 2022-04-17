import { Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { MusicGetManyDto } from './dto/request/music.get-many.dto';
import { MusicGetOneDto } from './dto/request/music.get-one.dto';
import { MusicService } from './music.service';
import { IMusicService } from './port/music.service.port';

@Controller('music-chart')
export class MusicController {
  constructor(
    @Inject(MusicService) private readonly musicService: IMusicService,
  ) {}

  @Get(':vendor/song/:id')
  getDetailOne(@Param() params: MusicGetOneDto) {
    return this.musicService.getDetailOne(params);
  }

  @Get(':vendor/summary')
  getSummaries(@Param() params: MusicGetManyDto) {
    return this.musicService.getSummaries(params);
  }

  @Get(':vendor/songs')
  getSons(@Param() params: MusicGetManyDto) {
    return this.musicService.getSongs(params);
  }
}

import { Vendor } from './music.types';

export interface MusicSummary {
  ranking: number;
  name: string;
  singer: string;
  album: string;
}

export interface MusicDetail extends MusicSummary {
  publisher: string;
  agency: string;
}

export class Music implements MusicDetail {
  id: string;
  publisher: string;
  agency: string;
  ranking: number;
  name: string;
  singer: string;
  album: string;

  constructor(summary: MusicSummary) {
    const { ranking, name, singer, album } = { ...summary };

    this.ranking = ranking;
    this.name = name;
    this.singer = singer;
    this.album = album;
  }

  static createNew(summary: MusicSummary): Music {
    return new Music(summary);
  }

  addDetail(detail: MusicDetail): Music {
    const { publisher, agency } = { ...detail };

    this.publisher = publisher;
    this.agency = agency;

    return this;
  }

  addId(id: string): Music {
    this.id = id;

    return this;
  }
}

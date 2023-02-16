export interface IGenre {
  alias: string;
  id: string;
  link: string;
  name: string;
  title: string;
}

export interface IArtist {
  alias: string;
  cover: string;
  id: string;
  isOA: boolean;
  isOABrand: boolean;
  link: string;
  name: string;
  playlistId: string;
  spotlight: boolean;
  thumbnail: string;
  thumbnailM: string;
  totalFollow: number;
}

export interface ISong {
  album: IAlbum;
  alias: string;
  allowAudioAds: boolean;
  artists: IArtist[];
  artistsNames: string;
  duration: number;
  encodeId: string;
  genreIds: string[];
  hasLyric: string;
  indicators: any[];
  isIndie: boolean;
  isOffical: boolean;
  isPrivate: boolean;
  isWorldWide: boolean;
  link: string;
  preRelease: boolean;
  releaseDate: number;
  streamingStatus: number;
  thumbnail: string;
  thumbnailM: string;
  title: string;
  username: string;
  zingChoice: boolean;
}

export interface IAlbum {
  artists: IArtist[];
  artistsNames: string;
  encodeId: string;
  genreIds: string[];
  isIndie: boolean;
  isoffical: boolean;
  link: string;
  PR: boolean;
  releasedAt: number;
  releaseDate: string;
  sortDescription: string;
  thumbnail: string;
  title: string;
}
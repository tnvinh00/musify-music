export interface IGenre {
  alias: string;
  id: string;
  link: string;
  name: string;
  title: string;
}

export type IBanner = {
  type: number;
  link: string;
  banner: string;
  cover: string;
  target: string;
  title: string;
  description: string;
  ispr: number;
  encodeId: string;
}

export interface IArtist {
  alias: string;
  cover?: string;
  id: string;
  isOA: boolean;
  isOABrand: boolean;
  link: string;
  name: string;
  playlistId: string;
  spotlight: boolean;
  thumbnail: string;
  thumbnailM: string;
  totalFollow?: number;
}

export interface ISong {
  album?: IAlbum;
  alias: string;
  allowAudioAds: boolean;
  artists?: IArtist[];
  artistsNames: string;
  duration: number;
  encodeId: string;
  genreIds?: string[];
  hasLyric?: boolean;
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
  downloadPrivileges?: number[];
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

export type SectionType = 'banner' | 'adBanner' | 'recentPlaylist' | 'new-release' | 'playlist' | 'playlist' | 'livestream' | 'playlist' | 'RTChart' | 'weekChart' | 'artistSpotlight' | 'playlist' | 'adBanner' | 'newReleaseChart' | 'playlist';

export type SectionId = 'hSlider' | 'hRecent' | 'hAutoTheme1' | 'hArtistTheme' | 'hLiveRadio' | 'hAutoTheme2' | 'hZC' | 'h100' | 'hNewrelease' | 'hAlbum';

export type ISection = {
  link?: string;
  sectionId: string;
  title: string;
  sectionType: SectionType;
  viewType: "slider" | string;
  pageType: string;
  adId: string;
  itemType: string;
  items: IAlbum[] | IArtist[] | ISong[];
}
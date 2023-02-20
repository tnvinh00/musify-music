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
  biography?: string;
  birthday?: string;
  sortBiography?: string;
  cover?: string;
  encodeId?: string;
  hasOA?: boolean;
  id: string;
  isOA: boolean;
  isOABrand: boolean;
  link: string;
  name: string;
  national?: string;
  oaid?: string;
  sections?: ISection[];
  oalink?: string;
  playlistId: string;
  realname?: string;
  follow?: boolean;
  spotlight: boolean;
  thumbnail: string;
  thumbnailM: string;
  totalFollow?: number;
  topAlbum?: IAlbum;
}

export interface ISong {
  album?: IAlbum;
  alias: string;
  aliasTitle?: string;
  allowAudioAds: boolean;
  artists?: IArtist[];
  artistsNames: string;
  description?: string;
  duration: number;
  encodeId: string;
  genreIds?: string[];
  hasLyric?: boolean;
  indicators: any[];
  isIndie: boolean;
  like?: number;
  contentLastUpdate?: number;
  isOffical: boolean;
  isPrivate: boolean;
  isWorldWide: boolean;
  link: string;
  preRelease: boolean;
  releaseDate: number;
  streamingStatus: number;
  thumbnail: string;
  thumbnailM: string;
  thumb?: string;
  name?: string;
  title: string;
  username: string;
  zingChoice: boolean;
  downloadPrivileges?: number[];
  song?: {
    items: ISong[];
  },
  sortDescription?: string;
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

export type SectionType = 'banner' | 'adBanner' | 'song' | 'artist' | 'video' | 'recentPlaylist' | 'new-release' | 'playlist' | 'playlist' | 'livestream' | 'playlist' | 'RTChart' | 'weekChart' | 'artistSpotlight' | 'playlist' | 'adBanner' | 'newReleaseChart' | 'playlist';

export type SectionId = 'hSlider' | 'hRecent' | 'hAutoTheme1' | 'hArtistTheme' | 'hLiveRadio' | 'hAutoTheme2' | 'hZC' | 'h100' | 'hNewrelease' | 'hAlbum';

export type ISection = {
  link?: string;
  sectionId: string;
  title: string;
  sectionType: SectionType;
  viewType: "slider";
  pageType: string;
  adId: string;
  itemType: string;
  items: IAlbum[] | IArtist[] | ISong[];
}
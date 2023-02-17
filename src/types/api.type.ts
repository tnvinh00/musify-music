import { IArtist, IAlbum, IGenre, ISong, ISection } from './model.type';

export type ApiResponseType = {
  data: ResponseDataType;
  err: number;
  msg: string;
  timestamp: number;
}

export type ResponseDataType = {
  artist: IArtist;
  artists: IArtist[];
  album: IAlbum;
  genreIds: string[];
  genres: IGenre[];
  song: {
    items: ISong[];
    total: number;
    totalDuration: number;
  }
  textType: string;
  thumbnail: string;
  thumbnailM: string;
  title: string;
  description: string;
  sortDescription: string;
  aliasTitle: string;
  link: string;
  like: number;
  items: ISection[];
}
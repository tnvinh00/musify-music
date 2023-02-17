import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ISong, IAlbum, IArtist, ISection, IBanner } from 'types/model.type';

export type MusicState = {
  album: ISong[];
  artistSpotlight: IArtist[];
  bannerList: IBanner[];
  newMusicToday: ISong[];
  newReleaseChart: ISong[];
  newReleases: {
    all: ISong[];
    others: ISong[];
    vPop: ISong[];
  };
  playlist: ISong[];
  recentPlaylist: IAlbum[];
  top100: ISong[];
  trendingArtists: IArtist[];
};

const initialState: MusicState = {
  album: [],
  artistSpotlight: [],
  bannerList: [],
  newMusicToday: [],
  newReleaseChart: [],
  newReleases: {
    all: [],
    others: [],
    vPop: [],
  },
  playlist: [],
  recentPlaylist: [],
  top100: [],
  trendingArtists: [],
};

export const musicSlice = createSlice({
  name: 'musics',
  initialState,
  reducers: {
    setMusicData: (state, action: PayloadAction<MusicState>) => {
      for (const key in action.payload) {
        // @ts-ignore
        state[key] = action.payload[key];
      }
    },
    setNewReleases: (state, action: PayloadAction<MusicState['newReleases']>) => {
      state.newReleases = action.payload;
    },
    setRecentPlaylist: (state, action: PayloadAction<MusicState['recentPlaylist']>) => {
      state.recentPlaylist = action.payload;
    },
    setArtistSpotlight: (state, action: PayloadAction<MusicState['artistSpotlight']>) => {
      state.artistSpotlight = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<MusicState['playlist']>) => {
      state.playlist = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(HYDRATE, (state, action) => {
  //     return {
  //       ...state,
  //       // @ts-ignore - TS doesn't know about HYDRATE
  //       ...action.payload.comments,
  //     };
  //   });
  // },
});

export const { setArtistSpotlight, setNewReleases, setPlaylist, setRecentPlaylist, setMusicData } = musicSlice.actions;

export const selectMusicData = (state: { comments: MusicState }) => state.comments;

export default musicSlice.reducer;
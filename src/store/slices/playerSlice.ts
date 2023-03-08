import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient2 from "api/axios2";
import { REST_URL } from "constants/REST_URL";
import { ISong } from "types/model.type"

export interface PlayerState {
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: boolean;
  playing: boolean;
  currentTime: number;
  shuffleList: number[];
  currentIndex: number;
  currentSong: ISong;
  lyric: string;
  lyricUrl: string;
  playList: ISong[];
  loading: boolean;
}

const initialState: PlayerState = {
  volume: 75,
  muted: false,
  shuffle: false,
  repeat: false,
  playing: false,
  currentTime: 0,
  currentIndex: 0,
  shuffleList: [],
  currentSong: {} as ISong,
  lyric: '',
  lyricUrl: '',
  playList: [],
  loading: false,
}

export const getLyricUrl = createAsyncThunk(
  "player/getLyricUrl",
  async (payload: ISong) => {
    const response = await axiosClient2.get(`${REST_URL.SONGLYRICS}/${payload?.encodeId || payload?.id}`);
    return response;
  }
)

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume: (state, action) => {
      if (action.payload == 0) {
        setMuted(true)
      } else {
        setMuted(false)
      }
      state.volume = action.payload;
    },
    setMuted: (state, action) => {
      if (!action.payload && state.volume == 0) {
        setVolume(75)
      }
      state.muted = action.payload;
    },
    setShuffle: (state, action) => {
      state.shuffle = action.payload;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
      localStorage.setItem("currentTime", JSON.stringify(state.currentTime));
    },
    setCurrentSongIndex: (state, action) => {
      state.currentIndex = action.payload;
      state.playing = true;
      state.currentSong = state.playList[action.payload] || state.playList[0];
      localStorage.setItem("currentIndex", JSON.stringify(state.currentIndex));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPlayList: (state, action) => {
      state.playList = action.payload?.concat ? [...action.payload.playList, ...state.playList] : action.payload.playList;
      state.currentIndex = action.payload.index ? action.payload.index : 0;
      state.playing = state.playing ? state.playing : action.payload.play;
      state.loading = false;
      state.shuffleList = [];
      state.currentSong = state.playList[state.currentIndex];
      localStorage.setItem("playList", JSON.stringify(state.playList));
      localStorage.setItem("currentIndex", JSON.stringify(state.currentIndex));
    },
    nextSong: (state) => {
      if (state.shuffle) {
        // random index from playList not in shuffleList
        if (state.shuffleList.length >= state.playList.length) {
          state.shuffleList = [];
        }
        let newIndex = Math.floor(Math.random() * state.playList.length);
        while (state.shuffleList.includes(newIndex)) {
          newIndex = Math.floor(Math.random() * state.playList.length);
        }
        state.shuffleList.push(newIndex);
        state.currentIndex = newIndex;
        state.currentSong = state.playList[newIndex];
      } else {
        state.currentIndex++;
        if (state.currentIndex >= state.playList.length) {
          state.currentIndex = 0;
        }
        state.currentSong = state.playList[state.currentIndex];
      }
      localStorage.setItem("currentIndex", JSON.stringify(state.currentIndex));
    },
    prevSong: (state) => {
      state.currentIndex--;
      if (state.currentIndex < 0) {
        state.currentIndex = state.playList.length - 1;
      }
      state.currentSong = state.playList[state.currentIndex];
      localStorage.setItem("currentIndex", JSON.stringify(state.currentIndex));
    },
    setLyric: (state, action) => {
      state.lyric = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLyricUrl.fulfilled, (state, action) => {
      state.lyricUrl = action.payload.data?.file;
    });
  }
})

export const { setVolume, setMuted, setShuffle, setPlaying, setRepeat, setLyric, setLoading, setCurrentSongIndex, setCurrentTime, nextSong, prevSong, setPlayList } = playerSlice.actions;

export const selectPlayer = (state: { player: PlayerState }) => state.player;

export default playerSlice.reducer;
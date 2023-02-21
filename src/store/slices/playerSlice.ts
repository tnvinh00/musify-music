import { createSlice } from "@reduxjs/toolkit";
import { ISong } from "types/model.type"

export interface PlayerState {
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: boolean;
  playing: boolean;
  currentTime: number;
  currentIndex: number;
  currentSong?: ISong;
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
  currentSong: undefined,
  playList: [],
  loading: false,
}

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
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      if (action.payload.streamingStatus === 2) {
        state.playing = false;
      }
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentIndex = action.payload;
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
      state.currentSong = state.playList[state.currentIndex];
      localStorage.setItem("playList", JSON.stringify(state.playList));
      localStorage.setItem("currentIndex", JSON.stringify(state.currentIndex));
    },
    nextSong: (state) => {
      if (state.shuffle) {
        const newIndex = Math.floor(Math.random() * state.playList.length);
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
  }
})

export const { setVolume, setMuted, setShuffle, setPlaying, setRepeat, setLoading, setCurrentSong, setCurrentSongIndex, setCurrentTime, nextSong, prevSong, setPlayList } = playerSlice.actions;

export const selectPlayer = (state: { player: PlayerState }) => state.player;

export default playerSlice.reducer;
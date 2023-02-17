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
  currentSong: {
    encodeId: 'Z6709Z96',
    title: 'Ngày Mai Em Đi Mất (Duet Version)',
    alias: 'Ngay-Mai-Em-Di-Mat-Duet-Version-Khai-Dang-Dat-G',
    isOffical: true,
    username: '',
    artistsNames: 'Khải Đăng, Đạt G',
    artists: [
      {
        id: 'IWZA76EE',
        name: 'Khải Đăng',
        link: '/Khai-Dang',
        spotlight: false,
        alias: 'Khai-Dang',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/1/0/a/9/10a9a536eb062f6adc1f717740cd4155.jpg',
        thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/1/0/a/9/10a9a536eb062f6adc1f717740cd4155.jpg',
        isOA: true,
        isOABrand: false,
        playlistId: 'ZOEWEZCO'
      },
      {
        id: 'IWZFEEU7',
        name: 'Đạt G',
        link: '/Dat-G',
        spotlight: false,
        alias: 'Dat-G',
        thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/2/e/3/82e3d210de3efa9e6ce3e81e9152285f.jpg',
        thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/8/2/e/3/82e3d210de3efa9e6ce3e81e9152285f.jpg',
        isOA: true,
        isOABrand: false,
        playlistId: 'ZOB9UBIO'
      }
    ],
    isWorldWide: true,
    thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/c/9/8/5c9860ad8fd3bc1e7d739e301cf96f25.jpg',
    link: '/bai-hat/Ngay-Mai-Em-Di-Mat-Duet-Version-Khai-Dang-Dat-G/Z6709Z96.html',
    thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/5/c/9/8/5c9860ad8fd3bc1e7d739e301cf96f25.jpg',
    duration: 270,
    zingChoice: false,
    isPrivate: false,
    preRelease: false,
    releaseDate: 1676372400,
    genreIds: [
      'IWZ9Z08I',
      'IWZ97FCD'
    ],
    indicators: [],
    isIndie: false,
    streamingStatus: 1,
    allowAudioAds: false,
    hasLyric: true
  },
  playList: [
    {
      encodeId: 'Z6709Z96',
      title: 'Ngày Mai Em Đi Mất (Duet Version)',
      alias: 'Ngay-Mai-Em-Di-Mat-Duet-Version-Khai-Dang-Dat-G',
      isOffical: true,
      username: '',
      artistsNames: 'Khải Đăng, Đạt G',
      artists: [
        {
          id: 'IWZA76EE',
          name: 'Khải Đăng',
          link: '/Khai-Dang',
          spotlight: false,
          alias: 'Khai-Dang',
          thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/1/0/a/9/10a9a536eb062f6adc1f717740cd4155.jpg',
          thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/1/0/a/9/10a9a536eb062f6adc1f717740cd4155.jpg',
          isOA: true,
          isOABrand: false,
          playlistId: 'ZOEWEZCO'
        },
        {
          id: 'IWZFEEU7',
          name: 'Đạt G',
          link: '/Dat-G',
          spotlight: false,
          alias: 'Dat-G',
          thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/2/e/3/82e3d210de3efa9e6ce3e81e9152285f.jpg',
          thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/8/2/e/3/82e3d210de3efa9e6ce3e81e9152285f.jpg',
          isOA: true,
          isOABrand: false,
          playlistId: 'ZOB9UBIO'
        }
      ],
      isWorldWide: true,
      thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/5/c/9/8/5c9860ad8fd3bc1e7d739e301cf96f25.jpg',
      link: '/bai-hat/Ngay-Mai-Em-Di-Mat-Duet-Version-Khai-Dang-Dat-G/Z6709Z96.html',
      thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/5/c/9/8/5c9860ad8fd3bc1e7d739e301cf96f25.jpg',
      duration: 270,
      zingChoice: false,
      isPrivate: false,
      preRelease: false,
      releaseDate: 1676372400,
      genreIds: [
        'IWZ9Z08I',
        'IWZ97FCD'
      ],
      indicators: [],
      isIndie: false,
      streamingStatus: 1,
      allowAudioAds: false,
      hasLyric: true
    },
    {
      encodeId: 'Z6ZFBDFZ',
      title: 'Tươi Không Cần Tưới',
      alias: 'Tuoi-Khong-Can-Tuoi-Orange-ICD',
      isOffical: true,
      username: '',
      artistsNames: 'Orange, ICD',
      artists: [
        {
          id: 'IWZFFWB7',
          name: 'Orange',
          link: '/Orange',
          spotlight: false,
          alias: 'Orange',
          thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/a/b/3/7/ab37650af0cc6ed08d6f22db0b586784.jpg',
          thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/a/b/3/7/ab37650af0cc6ed08d6f22db0b586784.jpg',
          isOA: true,
          isOABrand: false,
          playlistId: 'ZUO78ZO7'
        },
        {
          id: 'IW68C0E9',
          name: 'ICD',
          link: '/nghe-si/ICD',
          spotlight: false,
          alias: 'ICD',
          thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/6/9/3/0/6930b1c3dfa4ebd6390f2a0df00b9703.jpg',
          thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/6/9/3/0/6930b1c3dfa4ebd6390f2a0df00b9703.jpg',
          isOA: false,
          isOABrand: false,
          playlistId: '6Z8BUA8F'
        }
      ],
      isWorldWide: true,
      thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/7/b/e/3/7be3e4019d59b9f422246d1557697ab4.jpg',
      link: '/bai-hat/Tuoi-Khong-Can-Tuoi-Orange-ICD/Z6ZFBDFZ.html',
      thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/7/b/e/3/7be3e4019d59b9f422246d1557697ab4.jpg',
      duration: 193,
      zingChoice: false,
      isPrivate: false,
      preRelease: false,
      releaseDate: 1676552400,
      genreIds: [
        'IWZ9Z08I',
        'IWZ97FCD'
      ],
      indicators: [],
      isIndie: false,
      streamingStatus: 1,
      allowAudioAds: true,
      hasLyric: true
    },
    {
      encodeId: 'Z6687FIA',
      title: 'Không Yêu Trả Dép Tôi Về',
      alias: 'Khong-Yeu-Tra-Dep-Toi-Ve-HuyR',
      isOffical: true,
      username: '',
      artistsNames: 'HuyR',
      artists: [
        {
          id: 'IW6W8IA9',
          name: 'HuyR',
          link: '/HuyR',
          spotlight: false,
          alias: 'HuyR',
          thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/1/5/2/5/1525d4214c0c500d8bb4df2552f19fb0.jpg',
          thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/1/5/2/5/1525d4214c0c500d8bb4df2552f19fb0.jpg',
          isOA: true,
          isOABrand: false,
          playlistId: 'ZUU8869E'
        }
      ],
      isWorldWide: false,
      thumbnailM: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/2/e/1/b/2e1b8212065aec37f9c3ea6b4bd850c4.jpg',
      link: '/bai-hat/Khong-Yeu-Tra-Dep-Toi-Ve-HuyR/Z6687FIA.html',
      thumbnail: 'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/2/e/1/b/2e1b8212065aec37f9c3ea6b4bd850c4.jpg',
      duration: 230,
      zingChoice: false,
      isPrivate: false,
      preRelease: false,
      releaseDate: 1676480400,
      genreIds: [
        'IWZ9Z08I',
        'IWZ9Z088',
        'IWZ97FCD'
      ],
      indicators: [],
      isIndie: false,
      streamingStatus: 1,
      downloadPrivileges: [
        3
      ],
      allowAudioAds: true,
    },
  ],
  loading: false,
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume: (state, action) => {
      if (action.payload == 0) {
        state.muted = true;
      } else {
        state.muted = false;
      }
      state.volume = action.payload;
    },
    setMuted: (state, action) => {
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
    },
    setCurrentPlayList: (state, action) => {
      state.playList = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentIndex = action.payload;
      state.currentSong = state.playList[action.payload] || state.playList[0];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPlayList: (state, action) => {
      state.playList = action.payload.playList;
      state.currentIndex = action.payload.index ? action.payload.index : 0;
      state.playing = action.payload.play;
      state.loading = false;
      state.currentSong = state.playList[state.currentIndex];
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
    },
    prevSong: (state) => {
      state.currentIndex--;
      if (state.currentIndex < 0) {
        state.currentIndex = state.playList.length - 1;
      }
      state.currentSong = state.playList[state.currentIndex];
    }
  }
})

export const { setVolume, setMuted, setShuffle, setPlaying, setRepeat, setLoading, setCurrentSong, setCurrentSongIndex, setCurrentPlayList, setCurrentTime, nextSong, prevSong, setPlayList } = playerSlice.actions;

export const selectPlayer = (state: { player: PlayerState }) => state.player;

export default playerSlice.reducer;
import SongCard from 'components/Cards/SongCard'
import RangeSlide from 'components/Forms/RangeSlider/RangeSlider'
import { Badge } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill, BsMusicNoteList, BsPauseCircle, BsPlayCircle, BsX } from 'react-icons/bs'
import { GiMusicalNotes } from 'react-icons/gi'
import {
  IoHeartOutline, IoPlaySkipBack, IoPlaySkipForward, IoRepeat,
  IoShuffle
} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { nextSong, prevSong, selectPlayer, setCurrentSongIndex, setCurrentTime, setMuted, setPlaying, setPlayList, setRepeat, setShuffle, setVolume } from 'store/slices/playerSlice'
import { IArtist } from 'types/model.type'
import { convertDuration, getAudioUrl } from 'utils/function'

const PlayerControl = () => {
  const dispatch = useDispatch();
  const playerState = useSelector(selectPlayer);
  const { muted, playing, repeat, currentTime, currentIndex, volume, playList, shuffle, currentSong } = playerState;

  const audioRef = useRef<HTMLAudioElement>(null);

  const playListRef = useRef<HTMLDivElement>(null);

  const [playListStorage, setPlayListStorage] = useState(null);
  const [indexStorage, setIndexStorage] = useState(null);

  useEffect(() => {
    setPlayListStorage(JSON.parse(localStorage.getItem('playList') || '{}'))
    setIndexStorage(JSON.parse(localStorage.getItem('currentIndex') || '{}'))
  }, []);

  useEffect(() => {
    if (playListStorage && indexStorage) {
      dispatch(setPlayList({
        playList: playListStorage,
        index: indexStorage
      }));
    }
  }, [playListStorage, indexStorage]);

  const sideSheetRef = useRef<HTMLDivElement>(null);

  const [showPlaylist, setShowPlaylist] = useState(false);

  // click outside to close playlist
  const handleClickOutside = (event: any) => {
    if (sideSheetRef.current && !sideSheetRef.current.contains(event.target)) {
      setShowPlaylist(false);
    }
  }

  useEffect(() => {
    if (currentSong && currentSong?.streamingStatus === 2) {
      setTimeout(() => {
        dispatch(nextSong());
      }, 5000);
    }
  }, [currentSong]);

  useEffect(() => {
    if (playListRef.current) {
      playListRef.current.scrollTop = (currentIndex - 2) * 92 + 50;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (showPlaylist)
      document.addEventListener('click', handleClickOutside);
    else
      document.removeEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPlaylist]);

  const handleClickPlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    dispatch(setPlaying(!playing));
  }

  const handleChangeTime = (value: number) => {
    if (currentSong?.duration) {
      const duration = currentSong?.duration * value / 100;
      if (audioRef.current) {
        audioRef.current.currentTime = duration;
      }
      dispatch(setCurrentTime(duration));
    }
  }

  const handleChangeVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
    dispatch(setVolume(value));
  }

  const handleClickMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
    dispatch(setMuted(!muted));
  }

  const handleEnded = () => {
    if (repeat) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      dispatch(nextSong());
    }
  }

  return (
    <div className='h-[5rem] md:h-[7rem] w-full bg-gray-100 dark:bg-main shadow-md'>
      {currentSong ? (
        <div className='flex justify-between items-center h-full px-4 relative'>
          <div className='flex items-center basis-2/3 md:basis-2/5'>
            <Image
              src={currentSong?.thumbnailM || currentSong.thumb || ''}
              alt={currentSong?.title || ''}
              height={60}
              width={60}
              className='w-16 h-16 bg-gray-300 rounded-md'
              onClick={() => setShowPlaylist(!showPlaylist)}
            />
            <div className='ml-2 md:ml-4 overflow-hidden'>
              <p className='truncate text-gray-600 dark:text-gray-300 mb-1'>{currentSong?.title}</p>
              <p className='truncate text-gray-400 dark:text-gray-400 text-sm'>
                {currentSong?.artists?.map((artist: IArtist, index: number) => (
                  <Link href={`/artist/${artist.alias}`} key={artist.alias} className='hover:underline'>
                    {index !== 0 && ", "} {artist.name}
                  </Link>
                ))}
              </p>
            </div>
            {playing && currentSong?.streamingStatus !== 2 ? (
              <Image
                src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                alt="playing"
                className='h-6 w-6 ml-2 md:ml-6 hidden md:block'
                width={50}
                height={50}
              />
            ) : (
              <GiMusicalNotes size={26} className='ml-5 text-gray-800 dark:text-white hidden md:block' />
            )}
            <IoHeartOutline className='hidden md:block ml-4 mr-4 text-gray-800 dark:text-white' size={32} />
          </div>

          <div className='flex items-center justify-center flex-wrap basis-1/3 md:basis-2/5'>
            <div className="flex justify-end md:justify-between items-center mb-1 w-full mx-2 md:px-12">
              <div
                className={`hidden md:flex items-center justify-center rounded-full cursor-pointer w-8 h-8 hover:bg-gray-300 dark:hover:bg-gray-500 ${shuffle ? 'text-blue-500 dark:text-blue-500' : ' text-gray-800 dark:text-white'}`}
                onClick={() => dispatch(setShuffle(!shuffle))}
              >
                <IoShuffle size={20} />
              </div>

              <div
                className="mr-4 md:mr-0 hidden md:flex items-center justify-center text-gray-800 dark:text-white rounded-full cursor-pointer w-8 h-8 hover:bg-gray-300 dark:hover:bg-gray-500"
                onClick={() => dispatch(prevSong())}
              >
                <IoPlaySkipBack size={20} />
              </div>

              <div
                className="mr-4 md:mr-0 flex items-center justify-center text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 rounded-full cursor-pointer"
                onClick={handleClickPlay}
              >
                {(playing && currentSong?.streamingStatus !== 2) ? <BsPauseCircle size={40} /> : <BsPlayCircle size={40} />}
              </div>

              <div
                className="flex items-center justify-center text-gray-800 dark:text-white rounded-full cursor-pointer w-8 h-8 hover:bg-gray-300 dark:hover:bg-gray-500"
                onClick={() => dispatch(nextSong())}
              >
                <IoPlaySkipForward size={20} />
              </div>

              <div
                className={`hidden md:flex items-center justify-center rounded-full cursor-pointer w-8 h-8 hover:bg-gray-300 dark:hover:bg-gray-500 ${repeat ? 'text-blue-500 dark:text-blue-500' : ' text-gray-800 dark:text-white'}`}
                onClick={() => dispatch(setRepeat(!repeat))}
              >
                <IoRepeat size={20} />
              </div>
            </div>

            <div className="hidden md:flex items-center justify-between w-full">
              {currentSong?.streamingStatus === 2 ? (
                <div className="mx-auto">
                  <Badge color="failure">
                    Nâng cấp VIP để nghe nhạc không giới hạn
                  </Badge>
                </div>
              ) : (
                <>
                  <span className='text-gray-600 text-xs dark:text-gray-400'>
                    {convertDuration(currentTime || 0)}
                  </span>
                  <div className="w-full mx-2">
                    <RangeSlide
                      className="w-full"
                      value={currentSong?.duration ? currentTime / currentSong?.duration * 100 : 0}
                      onChange={handleChangeTime}
                    />
                  </div>
                  <span className='text-gray-600 text-xs dark:text-gray-400'>
                    {convertDuration(currentSong?.duration || 0)}
                  </span>
                </>
              )}
            </div>
            <audio
              ref={audioRef}
              src={getAudioUrl(currentSong?.encodeId)}
              onTimeUpdate={(e) => dispatch(setCurrentTime((e.target as HTMLAudioElement).currentTime))}
              onEnded={handleEnded}
              autoPlay={playing}
            />
          </div>

          <div className='hidden md:flex items-center justify-end md:basis-1/3'>
            <div className="flex items-center justify-center text-gray-800 dark:text-white rounded-full cursor-pointer">
              {!muted ?
                <BsFillVolumeUpFill size={25} className="mr-2" onClick={handleClickMute} />
                : <BsFillVolumeMuteFill size={25} className="mr-2" onClick={handleClickMute} />
              }
              <RangeSlide
                value={muted ? 0 : volume}
                onChange={handleChangeVolume}
              />
            </div>
            <div className='md:relative' ref={sideSheetRef} >
              <button
                title='Danh sách đang phát'
                onClick={() => setShowPlaylist(!showPlaylist)}
                className='rounded-md h-10 w-10 bg-slate-300 dark:bg-slate-500 text-gray-500 dark:text-gray-100 hover:bg-slate-400 hover:dark:bg-slate-600 hover:text-gray-200 hover:dark:text-gray-200 ml-3'
              >
                <BsMusicNoteList className='mx-auto' size={20} />
              </button>
              {showPlaylist &&
                <div ref={playListRef} className="absolute right-0 bottom-20 z-20 side-sheet overflow-y-scroll w-96 max-h-layout p-4 bg-gray-100 dark:bg-main rounded-md shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-center pl-2 pr-4 py-2">
                    <p className="text-gray-600 text-xl font-semibold dark:text-gray-300">
                      Đang phát ({playList.length})
                    </p>
                    <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full hover:scale-120" onClick={() => setShowPlaylist(false)}>
                      <BsX size={30} />
                    </button>
                  </div>
                  {playList.map((song, index) => (
                    <SongCard
                      key={song.encodeId}
                      playing={currentIndex === index && playing}
                      item={song}
                      showStartIcon
                      onClick={() => dispatch(setCurrentSongIndex(index))}
                    />
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className='text-gray-700 dark:text-gray-200 text-lg font-semibold'>
            Không có bài hát nào đang phát
          </p>
          <p className='text-gray-700 dark:text-gray-200 text-base'>
            Hãy chọn danh sách phát và bắt đầu nghe nhạc
          </p>
        </div>
      )}
    </div>
  )
}

export default PlayerControl
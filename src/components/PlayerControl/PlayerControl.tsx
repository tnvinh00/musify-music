import RangeSlide from 'components/Forms/RangeSlider/RangeSlider'
import React, { useRef } from 'react'
import {
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoRepeat,
  IoShuffle,
  IoHeartOutline,
} from 'react-icons/io5'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill, BsPauseCircle, BsPlayCircle, BsMusicNoteList } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { selectPlayer } from 'store/slices/playerSlice'
import Image from 'next/image'
import { setMuted, setRepeat, setVolume, setPlaying, setShuffle, setCurrentTime, nextSong, prevSong } from 'store/slices/playerSlice'
import { useDispatch } from 'react-redux'
import { convertDuration, getAudioUrl } from 'utils/function'

const PlayerControl = () => {
  const dispatch = useDispatch();
  const { muted, playing, repeat, currentTime, volume, shuffle, currentSong } = useSelector(selectPlayer)

  const audioRef = useRef<HTMLAudioElement>(null);

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
    <div className='h-[7rem] w-full bg-gray-100 dark:bg-main shadow-md'>
      <div className='flex justify-between items-center h-full px-4'>
        <div className='flex items-center basis-1/2 md:basis-1/3'>
          <Image
            src={currentSong?.thumbnailM || ''}
            alt={currentSong?.title || ''}
            height={60}
            width={60}
            className='w-16 h-16 bg-gray-300 rounded-md'
          />
          <div className='ml-4 overflow-hidden'>
            <p className='truncate text-gray-600 dark:text-gray-300 mb-1'>{currentSong?.title}</p>
            <p className='truncate text-gray-400 dark:text-gray-400 text-sm'>{currentSong?.artistsNames}</p>
          </div>
          <IoHeartOutline className='hidden md:block ml-4 mr-4 text-gray-800 dark:text-white' size={32} />
        </div>

        <div className='flex items-center justify-center flex-wrap basis-1/2 md:basis-1/3'>
          <div className="flex justify-end md:justify-between items-center mb-1 w-full mx-2 md:px-12">
            <div
              className={`hidden md:flex items-center justify-center rounded-full cursor-pointer w-8 h-8 hover:bg-gray-300 dark:hover:bg-gray-500 ${shuffle ? 'text-blue-500 dark:text-blue-500' : ' text-gray-800 dark:text-white'}`}
              onClick={() => dispatch(setShuffle(!shuffle))}
            >
              <IoShuffle size={20} />
            </div>

            <div
              className="hidden md:flex items-center justify-center text-gray-800 dark:text-white rounded-full cursor-pointer w-8 h-8 hover:bg-gray-300 dark:hover:bg-gray-500"
              onClick={() => dispatch(prevSong())}
            >
              <IoPlaySkipBack size={20} />
            </div>

            <div
              className="mr-4 md:mr-0 flex items-center justify-center text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 rounded-full cursor-pointer"
              onClick={handleClickPlay}
            >
              {!playing ? <BsPlayCircle size={40} /> : <BsPauseCircle size={40} />}
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
          </div>
          <audio
            ref={audioRef}
            src={getAudioUrl(currentSong?.encodeId)}
            onTimeUpdate={(e) => dispatch(setCurrentTime((e.target as HTMLAudioElement).currentTime))}
            onEnded={handleEnded}
            autoPlay={playing} />
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
          <button className='rounded-md h-10 w-10 bg-slate-300 dark:bg-slate-500 text-gray-500 dark:text-gray-100 hover:bg-slate-400 hover:dark:bg-slate-600 hover:text-gray-200 hover:dark:text-gray-200 ml-3'>
            <BsMusicNoteList className='mx-auto' size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerControl
import useSongLyric from 'hooks/useSongLyric';
import React from 'react'
import { BsX } from 'react-icons/bs';
import { Lrc } from 'react-lrc';
import { useDispatch } from 'react-redux';
import { setCurrentTime } from 'store/slices/playerSlice';

export interface ILyricsProps {
  onClose: () => void;
  showOnMD?: boolean;
  open: boolean;
}

const Lyrics = (props: ILyricsProps) => {
  const { onClose, showOnMD, open } = props
  const dispatch = useDispatch()

  const { lyric, currentTime, currentSong } = useSongLyric()

  return (
    open ? <div className={`absolute bottom-20 -mb-1 z-20 side-sheet overflow-y-scroll w-screen h-lyric p-3 md:p-4 bg-gray-100 dark:bg-main shadow-md transition-all duration-500 ease-in-out transform translate-x-full sm:translate-x-0 ${!showOnMD ? 'md:hidden left-[calc(-100vw-1rem)]' : '-right-4'}`}>
      <div className="flex justify-between items-center pl-2 pr-4 py-4">
        <p className="text-gray-600 text-lg md:text-2xl dark:text-gray-300">
          <b className='text-slate-500 dark:text-slate-400'>{currentSong?.title}</b>
        </p>
        <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full hover:scale-120" onClick={onClose}>
          <BsX size={30} />
        </button>
      </div>
      <div className="md:px-4 flex items-center w-full text-center">
        <Lrc
          lrc={lyric}
          currentMillisecond={currentTime * 1000}
          className="text-gray-600 dark:text-gray-400 h-layout-2 w-full sidebar"
          verticalSpace
          recoverAutoScrollInterval={5000}
          lineRenderer={({ index, active, line }) => (
            <p
              key={index}
              onClick={() => dispatch(setCurrentTime(line.startMillisecond / 1000))}
              className={`text-lg md:text-2xl transition-all duration-300 ${active ? 'text-yellow-400 dark:text-yellow-300 text-shadow-yellow text-xl md:text-3xl font-medium my-6' : 'my-4'}`}
            >
              {line.content}
            </p>
          )}
        />
      </div>
    </div> : null
  )

}

export default Lyrics
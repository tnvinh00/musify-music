import useSongLyric from 'hooks/useSongLyric';
import { useState, useMemo } from 'react';
import { BsX } from 'react-icons/bs';
import { Lrc } from 'react-lrc';

export interface ILyricsProps {
  onClose: () => void;
  showOnMD?: boolean;
  open: boolean;
}

const Lyrics = (props: ILyricsProps) => {
  const { onClose, showOnMD, open } = props
  const { lyric, currentTime, currentSong } = useSongLyric()
  const [textSize, setTextSize] = useState<'sm' | 'md' |'lg'>('md')

  const mapSize = useMemo(() => ({
    sm: {
      normal: 'text-xl',
      active: 'text-2xl'
    },
    md: {
      normal: 'text-3xl',
      active: 'text-4xl'
    },
    lg: {
      normal: 'text-4xl',
      active: 'text-5xl'
    }
  }), [])

  return (
    open ? <div className={`absolute bottom-20 -mb-1 z-20 overflow-y-scroll w-screen h-lyric p-3 md:p-4 bg-gray-100 dark:bg-main shadow-md transition-all duration-500 ease-in-out transform translate-x-full sm:translate-x-0 ${!showOnMD ? 'md:hidden left-[calc(-100vw-1rem)]' : '-right-4'}`}>
      <div className="flex justify-between items-center pl-2 pr-4 py-4">
        <div className="">
          <p className="text-gray-600 text-lg md:text-2xl dark:text-gray-300">
            <b className='text-slate-500 dark:text-slate-400'>{currentSong?.title}</b>
          </p>
        </div>
        <div className="flex">
          <button className={`h-12 w-12 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 mr-2 rounded-full text-base ${textSize === 'sm' && 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`} onClick={() => setTextSize('sm')}>
            A
          </button>
          <button className={`h-12 w-12 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 mr-2 rounded-full text-2xl ${textSize === 'md' && 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`} onClick={() => setTextSize('md')}>
            A
          </button>
          <button className={`h-12 w-12 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 mr-2 rounded-full text-4xl ${textSize === 'lg' && 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`} onClick={() => setTextSize('lg')}>
            A
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full hover:scale-120" onClick={onClose}>
            <BsX size={30} />
          </button>
        </div>
      </div>
      <div className="md:px-4 flex items-center w-full text-center">
        <Lrc
          // remove empty line, and replace \r to \n
          lrc={lyric.replace(/^\[.*\]$/gm, '').replace(/\r/g, '\n')}
          currentMillisecond={currentTime * 1000 + 500}
          className="text-gray-600 dark:text-gray-400 h-layout-2 w-full"
          verticalSpace
          recoverAutoScrollInterval={5000}
          lineRenderer={({ index, active, line }) => (
            <p
              key={index}
              className={`text-xl md:${mapSize[textSize].normal} transition-all duration-500 ${active ? `text-yellow-400 dark:text-yellow-300 text-shadow-yellow text-2xl md:${mapSize[textSize].active} font-medium my-6` : 'my-4'}`}
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
import SongCard from 'components/Cards/SongCard';
import React from 'react'
import { useEffect, useRef } from 'react';
import { BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteSong, selectPlayer, setCurrentSongIndex } from 'store/slices/playerSlice';

export interface IPlayingListProps {
  open: boolean;
  showOnMD?: boolean;
  onClose: () => void;
  setShowPlaylist: (value: boolean) => void;
}

const PlayingList = ({ open, showOnMD, onClose, setShowPlaylist }: IPlayingListProps) => {
  const dispatch = useDispatch();
  const playerState = useSelector(selectPlayer);
  const { playing, currentIndex, playList } = playerState;

  const playListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (playListRef.current) {
      playListRef.current.scrollTop = (currentIndex - 2) * 92 + 50;
    }
  }, [currentIndex]);

  return (
    open ? <div ref={playListRef} className={`absolute bottom-20 z-20 side-sheet overflow-y-scroll w-96 max-h-layout p-4 bg-gray-100 dark:bg-main rounded-md shadow-2xl transition-all duration-300 ${!showOnMD ? 'md:hidden left-0' : 'right-0'}`}>
      <div className="flex justify-between items-center pl-2 pr-4 py-2">
        <p className="text-gray-600 text-xl dark:text-gray-300">
          Đang phát <b>({currentIndex + 1}/{playList.length})</b>
        </p>
        <button className="text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full hover:scale-120" onClick={onClose}>
          <BsX size={30} />
        </button>
      </div>
      {playList.map((song, index) => (
        <SongCard
          key={song.encodeId}
          playing={currentIndex === index && playing}
          item={song}
          showStartIcon
          onDelete={() => {
            dispatch(deleteSong(index));
            console.log('delete');
            setShowPlaylist(true);
          }}
          onClick={() => dispatch(setCurrentSongIndex(index))}
        />
      ))}
    </div> : null
  )
}

export default PlayingList
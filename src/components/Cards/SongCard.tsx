import Image from 'next/image';
import React from 'react'
import { ISong } from 'types/model.type';
import { convertDuration } from 'utils/function';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { Badge } from 'flowbite-react';
import Link from 'next/link';

export interface ISongCardProps {
  item: ISong;
  playing?: boolean;
  showStartIcon?: boolean;
  onClick?: () => void;
}

const SongCard = (props: ISongCardProps) => {
  const { item, playing, showStartIcon, onClick } = props;

  return (
    <div
      className="flex w-full p-2.5 items-center bg-transparent hover:bg-slate-200 bg-opacity-50 border-none hover:border rounded-lg shadow flex-row md:max-w-xl hover:border-gray-700 dark:hover:bg-slate-900 transition duration-150 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex">
        {showStartIcon && (
          playing ? (
            <Image
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
              alt="playing"
              className='h-5 w-5 mr-3.5'
              width={200}
              height={200}
            />
          ) : <HiOutlineMusicNote size={20} className="text-gray-400 mr-4" />
        )}
      </div>
      <Image
        className={`object-cover h-full w-1/5 md:h-auto ${playing ? 'rounded-full spin' : 'rounded-lg'}`}
        src={item.thumbnailM || item.thumb || ''}
        alt=""
        width={500}
        height={500}
      />
      <div className="flex flex-col justify-between px-4 leading-normal overflow-hidden">
        <h5 className="truncate mb-1 font-bold tracking-tight text-gray-900 dark:text-white" title={item.title}>
          {item.title || item.name}
          {item.streamingStatus === 2 && (
            <Badge color="warning" className='inline-flex ml-3'>
              VIP
            </Badge>
          )}
        </h5>
        <p className="truncate mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">
          {item?.artists?.map((artist) => artist.name).join(', ')}
        </p>
        <div className="flex items-baseline">
          {item.duration && <span className="text-sm font-normal text-gray-700 dark:text-gray-400 mr-3">
            {convertDuration(item.duration)}
          </span>}
        </div>
      </div>
    </div>
  )
}

SongCard.defaultProps = {
  playing: false,
}

export default SongCard
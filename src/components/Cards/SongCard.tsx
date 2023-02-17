import Image from 'next/image';
import React from 'react'
import { ISong } from 'types/model.type';
import { convertDuration } from 'utils/function';

export interface ISongCardProps {
  item: ISong;
  playing?: boolean;
  onClick?: () => void;
}

const SongCard = (props: ISongCardProps) => {
  const { item, playing, onClick } = props;

  return (
    <div
      className="flex w-full p-2 items-center bg-transparent hover:bg-slate-200 bg-opacity-50 border-none hover:border rounded-lg shadow flex-row md:max-w-xl hover:border-gray-700 dark:hover:bg-slate-900 transition duration-150 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <Image
        className="object-cover h-full rounded-lg w-1/4 md:h-auto"
        src={item.thumbnailM}
        alt=""
        width={500}
        height={500}
      />
      <div className="flex flex-col justify-between p-4 leading-normal overflow-hidden">
        <h5 className="truncate mb-1 font-bold tracking-tight text-gray-900 dark:text-white" title={item.title}>
          {item.title}
        </h5>
        <p className="truncate mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">
          {item.artistsNames}
        </p>
        <div className="flex items-baseline">
          <span className="text-sm font-normal text-gray-700 dark:text-gray-400">
            {convertDuration(item.duration)}
          </span>
          {playing && (
            <Image
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
              alt="playing"
              className='h-6 w-6 ml-2'
              width={50}
              height={50}
            />
          )}
        </div>
      </div>
    </div>
  )
}

SongCard.defaultProps = {
  playing: false,
}

export default SongCard
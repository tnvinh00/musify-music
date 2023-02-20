import { Badge } from 'flowbite-react';
import Image from 'next/image';
import React from 'react'
import { HiOutlineMusicNote } from 'react-icons/hi';
import { ISong } from 'types/model.type';
import { convertDuration } from 'utils/function';

export interface ISongRowProps {
  item?: ISong;
  isHeader?: boolean;
  onClick?: () => void;
}

const SongRow = (props: ISongRowProps) => {
  const { item, isHeader, onClick } = props;
  return (
    <div
      className='border-b border-gray-200 dark:border-gray-700 rounded-md flex justify-between bg-transparent items-center w-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md p-3 cursor-pointer'
      onClick={onClick}
    >
      <div className="flex w-3/5 md:w-1/2 items-center">
        {isHeader ?
          <>
            <div className="flex">
              <HiOutlineMusicNote size={20} className="text-gray-400 mr-4" />
            </div>
            <p className='text-sm uppercase text-gray-500 dark:text-gray-200 font-medium'>Bài hát</p>
          </>
          : (
            <>
              <div className="flex">
                <HiOutlineMusicNote size={20} className="text-gray-400 mr-4" />
              </div>
              <Image
                src={item?.thumbnailM || ''}
                alt={item?.title || ''}
                height={60}
                width={60}
                className='w-16 h-16 bg-gray-300 rounded-md'
              />
              <div className='ml-3 truncate w-full'>
                <p className='truncate text-gray-600 dark:text-gray-300 mb-1' title={item?.title}>
                  {item?.title}
                  {item?.streamingStatus === 2 && (
                    <Badge color="warning" className='inline-flex ml-3'>
                      VIP
                    </Badge>
                  )}
                </p>
                <p className='truncate text-gray-400 dark:text-gray-400 text-sm'>{item?.artistsNames}</p>
              </div>
            </>
          )}
      </div>
      <div className="md:flex w-1/3 hidden">
        {isHeader ? (
          <span className='text-sm uppercase text-gray-500 dark:text-gray-200 font-medium'>Album</span>
        ) : (
          item?.album && item?.album && (
            <span title={item?.album.title} className='truncate text-gray-400 dark:text-gray-400 text-sm'>{item?.album.title}</span>
          )
        )}
      </div>
      <div className="flex">
        {isHeader ? (
          <span className='text-sm uppercase text-gray-500 dark:text-gray-200 font-medium'>--:--</span>
        ) : (
          <p className='text-gray-400 dark:text-gray-400 text-sm'>
            {convertDuration(item?.duration || 0)}
          </p>
        )}
      </div>
    </div>
  )
}

SongRow.defaultProps = {
  isHeader: false
}

export default SongRow
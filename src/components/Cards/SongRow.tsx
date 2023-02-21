import { Badge } from 'flowbite-react';
import Image from 'next/image';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { RiArrowDownSFill, RiArrowUpSFill, RiSubtractLine } from 'react-icons/ri';
import { ISong } from 'types/model.type';
import { convertDuration } from 'utils/function';

export interface ISongRowProps {
  item?: ISong;
  isHeader?: boolean;
  isChart?: boolean;
  showStatus?: boolean;
  index?: number;
  onClick?: () => void;
}

const SongRow = (props: ISongRowProps) => {
  const { item, isHeader, index, isChart, showStatus, onClick } = props;
  return (
    <div
      className='border-b border-gray-200 dark:border-gray-700 rounded-md flex justify-between bg-transparent items-center w-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md p-3 cursor-pointer'
      onClick={onClick}
    >
      <div className="flex w-full md:w-1/2 items-center">
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
                {isChart && item?.rakingStatus !== undefined ? (
                  <>
                    <div className="flex w-10 md:w-20 justify-center">
                      <h1 className={`text-transparent font-bold mr-4 ${(index && index <= 3) ? `text-stroke-${index} text-4xl md:text-5xl` : 'text-stroke text-4xl md:text-4xl'}`}>
                        {(index || 0)}
                      </h1>
                    </div>
                    {showStatus && <div className="flex items-center">
                      <span className='text-gray-600 dark:text-gray-300'>
                        {!!item?.rakingStatus && Math.abs(item?.rakingStatus)}
                      </span>
                      {item?.rakingStatus > 0 ? (
                        <RiArrowUpSFill size={24} className="text-green-500 mr-2" />
                      ) : item?.rakingStatus < 0 ? (
                        <RiArrowDownSFill size={24} className="text-red-600 mr-2" />
                      ) : (
                        <RiSubtractLine size={24} className="text-gray-400 mr-4" />
                      )}
                    </div>}
                  </>
                ) : (
                  <HiOutlineMusicNote size={20} className="text-gray-400 mr-4" />
                )}
              </div>
              <Image
                src={item?.thumbnailM || ''}
                alt={item?.title || ''}
                height={200}
                width={200}
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
      <div className="hidden md:flex">
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
  isHeader: false,
  isChart: false,
  index: 0,
}

export default SongRow
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IAlbum, ISong } from 'types/model.type';

export interface IAlbumCardProps {
  item: IAlbum | ISong;
  onClick?: () => void;
}

const AlbumCard = (props: IAlbumCardProps) => {
  const { item, onClick } = props;

  return (
    <div
      aria-label="card-item-"
      className="flex flex-col cursor-pointer"
    >
      <div className="relative flex-shrink-0 mb-5 h-[250px] lg:h-[300px]">
        <Link className='w-full' href={item.link.replace('.html', '')}>
          <Image
            src={item.thumbnailM ? item.thumbnailM : item.thumbnail}
            alt=""
            width={1000}
            height={1000}
            onClick={onClick}
            className="object-cover w-full h-full shadow-sm rounded-lg hover:opacity-90 transition duration-150 ease-in-out hover:shadow-lg hover:scale-105"
          />
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-gray-800 dark:text-white font-bold">
          {item.title}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {item?.artists?.map((artist, index: number) => (
            <Link href={`/nghe-si/${artist.alias}`} key={artist.alias} className='hover:underline'>
              {index !== 0 && ", "} {artist.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AlbumCard
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IArtist } from 'types/model.type';
import { shortNumber } from 'utils/function';

export interface IArtistCardProps {
  item: IArtist;
}

const ArtistCard = (props: IArtistCardProps) => {
  const { item } = props;

  return (
    <div className="flex flex-col items-center pb-10">
      <Link href={`/artist/${item.alias}`}>
        <Image
          src={item.cover || item.thumbnailM || ''}
          alt=""
          width={500}
          height={500}
          className="object-cover cursor-pointer w-28 h-28 shadow-sm rounded-full hover:opacity-90 transition duration-150 ease-in-out hover:shadow-lg hover:scale-105"
        />
      </Link>
      <h5 className="mt-4 mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {item.name}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {shortNumber(item.totalFollow || 0)} người theo dõi
      </span>
      <div className="flex mt-4 space-x-3 md:mt-6">
        <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Theo dõi
        </button>
      </div>
    </div>
  )
}

export default ArtistCard
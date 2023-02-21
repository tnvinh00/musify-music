import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { ICategory } from 'types/model.type';

export interface ITopicCardProps {
  item: ICategory;
}

const TopicCard = (props: ITopicCardProps) => {
  const { item } = props;
  return (
    <div className='relative'>
      <Link href={`/the-loai/${item.link.split('/')[2]}/${item.encodeId}`}>
        <Image
          src={item.thumbnailHasText}
          width={1920}
          height={1080}
          title={item.title}
          alt=""
          className='object-cover w-full h-full rounded-lg hover:opacity-80 transition-opacity duration-300'
        />
      </Link>
      <div className='absolute flex justify-center gap-2 bottom-0 rounded-b-lg left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent' >
        {item.playlists.slice(0, 3).map((item, index) => (
          <Link href={item.link.replace('.html', '')} key={index}>
            <Image
              src={item.thumbnail}
              width={1920}
              height={1080}
              title={item.title}
              alt=""
              className='rounded-lg h-14 w-14 object-cover hover:scale-110 transition-transform duration-300'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopicCard
import AlbumCard from 'components/Cards/AlbumCard';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { BsArrowRightShort } from 'react-icons/bs';
import { Grid, Navigation, Pagination, Autoplay } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { ICategory } from 'types/model.type';
import { IAlbum } from '../../types/model.type';

export interface ICategorySlidersProps {
  item: ICategory;
  type: 'category' | 'banner' | 'card'
  pagination?: boolean;
  autoplay?: boolean;
  responsive?: number[];
  className?: string;
}

const CategorySlider = (props: ICategorySlidersProps) => {
  const { item, pagination, type, autoplay, responsive, className } = props;

  const renderItem = (item: IAlbum | ICategory) => {
    switch (type) {
      case "category":
        return (
          <AlbumCard item={item as IAlbum} />
        )

      case "banner":
        const banner = item as ICategory;
        const url = banner.link.replace('.html', '');
        return (
          <Link href={`/the-loai/${url.split('/')[2]}/${url.split('/')[3]}`}>
            <Image
              src={banner?.cover}
              width={1920}
              height={1080}
              title={banner.title}
              alt=""
              className='w-full rounded-lg'
            />
          </Link>
        )
    }
  }

  return (
    <div className={`px-4 ${className}`}>
      <div className="flex justify-between items-baseline">
        {item.title && <p className='text-shadow text-gray-700 dark:text-gray-200 text-2xl md:text-3xl font-medium'>
          {item.title}
        </p>}
        {type === 'category' && <Link
          href={`/the-loai/${item.link.split('/')[2]}/${item.encodeId}`}
          className='text-gray-700 inline-flex items-center dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-700 text-lg font-medium hover:underline'
        >
          Xem tất cả <BsArrowRightShort className='' size={30} />
        </Link>}
      </div>

      <Swiper
        spaceBetween={15}
        breakpoints={{
          480: {
            slidesPerView: responsive ? responsive[0] : 1,
          },
          640: {
            slidesPerView: responsive ? responsive[1] : 2,
          },
          768: {
            slidesPerView: responsive ? responsive[2] : 3,
          },
          1024: {
            slidesPerView: responsive ? responsive[3] : 4,
          },
          1280: {
            slidesPerView: responsive ? responsive[4] : 4,
          }
        }}
        loop={true}
        autoplay={autoplay ? {
          delay: 3000,
        } : false}
        pagination={!pagination ? false : { clickable: true }}
        modules={[Grid, Navigation, Pagination, Autoplay]}
        className={item.title ? 'mt-6' : ''}
      >
        {item.playlists?.map((item, index) => (
          <SwiperSlide
            className="mb-8"
            key={index}
          >
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

CategorySlider.defaultProps = {
  pagination: true,
  autoplay: true,
  className: 'mt-6 md:mt-8 ',
}

export default CategorySlider
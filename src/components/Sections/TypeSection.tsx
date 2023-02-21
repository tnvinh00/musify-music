import React from 'react'
import { Grid, Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IAlbum, IArtist, ISection, ISong } from 'types/model.type';

import AlbumCard from 'components/Cards/AlbumCard';
import ArtistCard from 'components/Cards/ArtistCard';
import SongCard from 'components/Cards/SongCard';
import { useDispatch } from 'react-redux';
import { setPlayList } from 'store/slices/playerSlice';

export interface ITypeSectionProps {
  section: ISection;
}

const TypeSection = (props: ITypeSectionProps) => {
  const { section } = props;
  const dispatch = useDispatch();

  const saveToPlaylist = (playList: ISong[], index: number, play = true) => {
    dispatch(setPlayList({ playList, index, play }));
  }

  const renderItem = (item: IAlbum | IArtist | ISong, index: number) => {
    switch (section.sectionType) {
      case "playlist":
        return (
          <AlbumCard
            item={item as any}
          />
        )
      case "artist":
        return (
          <ArtistCard
            item={item as IArtist}
          />
        )
      case "song":
        return (
          <SongCard
            item={item as ISong}
            onClick={() => saveToPlaylist(section.items as any, index, true)}
          />
        )
      case "video":
        return (
          <AlbumCard item={item as any} />
        )
    }
  }

  return (
    <div className='mt-6 md:mt-8'>
      <p className='text-shadow text-gray-700 dark:text-gray-200 text-2xl md:text-3xl font-medium'>
        {section.title}
      </p>
      <Swiper
        spaceBetween={15}
        breakpoints={{
          480: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          }
        }}
        grid={{
          rows: section.sectionType === "song" ? 5 : 1,
          fill: "row",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        pagination={section.sectionType === "song" ? false : { clickable: true }}
        modules={[Grid, Navigation, Pagination, Autoplay]}
        className='mt-6 mySlider'
      >
        {section.items?.map((item, index) => (
          <SwiperSlide
            className={section.sectionType !== "song" ? 'mb-8' : 'mb-0'}
            key={index}
          >
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div >
  )
}

export default TypeSection
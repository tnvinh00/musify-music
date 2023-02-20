import React from 'react'
import { Grid, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IAlbum, IArtist, ISection, ISong } from 'types/model.type';

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AlbumCard from 'components/Cards/AlbumCard';
import ArtistCard from 'components/Cards/ArtistCard';
import SongCard from 'components/Cards/SongCard';

export interface IArtistSectionProps {
  section: ISection;
}

const ArtistSection = (props: IArtistSectionProps) => {
  const { section } = props;

  const renderItem = (item: IAlbum | IArtist | ISong) => {
    switch (section.sectionType) {
      case "playlist":
        return (
          <AlbumCard item={item as any} />
        )
      case "artist":
        return (
          <ArtistCard item={item as IArtist} />
        )
      case "song":
        return (
          <SongCard item={item as ISong} />
        )
    }
  }

  return (
    <div className='mt-12'>
      <p className='text-gray-700 dark:text-gray-200 text-2xl md:text-3xl font-medium'>
        {section.title}
      </p>
      <Swiper
        spaceBetween={15}
        slidesPerView={3}
        grid={{
          rows: section.sectionType === "song" ? 5 : 1,
          fill: "row",
        }}
        autoplay={{
          delay: 5000,
        }}
        pagination={section.sectionType === "song" ? false : { clickable: true }}
        modules={[Grid, Navigation, Pagination]}
        className='mt-6'
      >
        {section.items?.map((item, index) => (
          <SwiperSlide
            className={section.sectionType !== "song" ? 'mb-8' : 'mb-0'}
            key={index}
          >
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div >
  )
}

export default ArtistSection
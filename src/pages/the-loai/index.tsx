import axiosClient2 from 'api/axios2';
import { REST_URL } from 'constants/REST_URL';
import { GetServerSideProps } from 'next';
import React from 'react'
import { ICategory } from 'types/model.type';
import CategorySlider from 'components/Sliders/CategorySlider';
import AppHeader from 'components/AppHeader/AppHeader';
import TopicCard from 'components/Cards/TopicCard';

export interface ICategoryPageProps {
  banner: ICategory[];
  nations: ICategory[];
  featured: ICategory[];
  topics: ICategory[];
  genres: ICategory[];
}

const CategoryPage = (props: ICategoryPageProps) => {
  const { nations, featured, topics, genres } = props;

  return (
    <>
      <AppHeader
        title={`Nghe theo thể loại: ${genres.slice(0, 5).map(item => item.title).join(', ')}`}
        description={`Tổng hợp các bài hát theo thể loại: ${genres.slice(0, 5).map(item => item.title).join(', ')}`}
      />
      <CategorySlider
        item={{ playlists: featured } as ICategory}
        type="banner"
        pagination={false}
        responsive={[1, 2, 2, 3, 3]}
        className='mt-0'
      />
      <CategorySlider
        item={{ playlists: nations } as ICategory}
        type="banner"
        pagination={false}
        responsive={[1, 2, 2, 3, 3]}
        className='mt-0'
      />

      <div className="px-4">
        <p className='text-shadow text-gray-700 dark:text-gray-200 text-2xl md:text-3xl font-medium'>
          TOPIC
        </p>
        <div className="flex flex-wrap w-full mt-6">
          {topics.map((item, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:1/4 p-1.5">
              <TopicCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {genres.map((item, index) => (
        <CategorySlider
          key={index}
          type='category'
          item={item}
          responsive={[1, 2, 3, 4, 4]}
        />
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axiosClient2.get(REST_URL.HUB_HOME);

  return {
    props: {
      // banner: data.banners as ICategory[],
      nations: data.nations as ICategory[],
      featured: data.featured.items as ICategory[],
      topics: data.topic as ICategory[],
      genres: data.genre as ICategory[],
    }
  }
}

export default CategoryPage
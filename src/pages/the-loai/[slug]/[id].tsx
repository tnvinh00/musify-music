import { REST_URL } from 'constants/REST_URL';
import { GetServerSideProps } from 'next';
import React from 'react'
import { ICategory } from 'types/model.type';
import AppHeader from 'components/AppHeader/AppHeader';
import TypeSection from 'components/Sections/TypeSection';
import Image from 'next/image';
import axiosClient from 'api/axios';

export interface ICategoryDetailPageProps {
  category: ICategory;
}

const CategoryDetailPage = (props: ICategoryDetailPageProps) => {
  const { category } = props;
  return (
    <>
      <AppHeader
        title={category.title}
        description={category.description}
      />
      <Image
        src={category.cover}
        width={1920}
        height={1080}
        alt={category.title}
        className='w-full h-36 md:h-80 xl:h-96 object-cover rounded-lg'
      />
      <div className='px-4'>
        {category.sections?.map((section, index) => (
          <TypeSection key={index} section={section} />
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  const res = await axiosClient.get(REST_URL.CATEGORY + `/${id}`);

  return {
    props: {
      category: res.data as ICategory || {},
    },
  };
}

export default CategoryDetailPage
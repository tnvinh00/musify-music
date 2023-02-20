import axiosClient from 'api/axios';
import AppHeader from 'components/AppHeader/AppHeader';
import { REST_URL } from 'constants/REST_URL';
import { Button } from 'flowbite-react';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { ResponseDataType } from 'types/api.type';
import { IArtist } from 'types/model.type';
import { shortNumber } from 'utils/function';
import { SlUserFollow } from 'react-icons/sl';
import Image from 'next/image';
import ArtistSection from 'components/Sections/ArtistSection';
import Loader from 'components/Loader/Loader';
import { useRouter } from 'next/router';

export type ArtistPageProps = {
  data: IArtist;
}

const ArtistPage = (props: ArtistPageProps) => {
  const { data } = props;

  const { id } = useRouter().query;
  console.log("~ ~ ArtistPage ~ data", data);

  const [loading, setLoading] = useState(true);

  // set loading when id change
  useEffect(() => {
    setLoading(true);
  }, [id]);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <AppHeader
        title={data?.name}
        description={data?.sortBiography}
      />
      <Loader loading={loading} />
      <div className='relative'>
        <div className='absolute inset-x-0 top-0 h-52 md:h-80 lg:h-96'>
          {/* image cover with bg linear gradient */}
          <div
            className='h-full w-full bg-cover bg-gradient'
            style={{
              backgroundImage: `url(${data?.cover})`,
            }}>
          </div>
          <div className='-mt-40 px-4 md:px-8'>
            <Image src={data?.thumbnailM} alt="" width={200} height={200} className='rounded-full shadow-lg mb-4 h-32 w-32 md:h-64 md:w-64' />
            <div className='font-bold text-4xl md:text-6xl text-shadow text-gray-700 dark:text-gray-200'>
              {data.name}
            </div>
            <div className='flex items-center my-6'>
              <span className='text-gray-700 dark:text-gray-200 mr-4 text-shadow'>
                {shortNumber(data?.totalFollow || 0)} người theo dõi
              </span>
              <Button
                color="purple"
                pill={true}
              >
                <SlUserFollow className='mr-2' />
                Quan tâm
              </Button>
            </div>
            <p className='text-gray-700 dark:text-gray-200'>
              {data?.sortBiography}
            </p>
          </div>
          <div className='px-4 md:px-8'>
            {data.sections?.map((section, index) => (
              <ArtistSection key={index} section={section} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  const res = await axiosClient.get<IArtist>(REST_URL.ARTIST + `/${id}`);
  const data = res.data;
  return {
    props: {
      data: data,
    },
  };
}


export default ArtistPage
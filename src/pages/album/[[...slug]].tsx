import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { REST_URL } from 'constants/REST_URL';
import axiosClient from 'api/axios';
import { ResponseDataType } from 'types/api.type';
import AppHeader from 'components/AppHeader/AppHeader';

export type AlbumPageProps = {
  albumData: ResponseDataType;
}

const AlbumPage = ({ albumData }: AlbumPageProps) => {
  console.log("~ ~ AlbumPage ~ albumData", albumData);
  const router = useRouter();
  const arr = router.query;

  return (
    <>
      <AppHeader
        title={albumData?.title}
        description={albumData?.description}
      />
      {/* <h1>Album page for {slug} with ID {id}</h1> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [slug, id] = params?.slug as string[];

  const res = await axiosClient.get<ResponseDataType>(REST_URL.PLAYLIST + `/${id}`);
  const data = res.data;
  return {
    props: {
      albumData: data,
    },
  };
}

export default AlbumPage;
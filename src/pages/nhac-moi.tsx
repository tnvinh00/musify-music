import axiosClient2 from 'api/axios2';
import AppHeader from 'components/AppHeader/AppHeader';
import ListChartSong from 'components/Charts/ListChartSong';
import { REST_URL } from 'constants/REST_URL';
import { GetServerSideProps } from 'next';
import React from 'react'
import { ISong } from 'types/model.type';

export interface INewReleasePageProps {
  newReleases: ISong[];
  title: string;
  banner: string;
}

const NewReleasePage = (props: INewReleasePageProps) => {
  const { newReleases, title, banner } = props;

  return (
    <>
      <AppHeader
        title={title}
        description="Nhạc mới phát hành"
      />
      <ListChartSong items={newReleases} title={title} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axiosClient2.get(REST_URL.NEW_RELEASE_LIST);

  return {
    props: {
      newReleases: data.items as ISong[],
      title: data.title,
      banner: data.banner,
    }
  }
}

export default NewReleasePage
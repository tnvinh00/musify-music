import styles from 'styles/Home.module.css'
import AppHeader from 'components/AppHeader/AppHeader'
import { GetServerSideProps } from 'next'
import axiosClient from 'api/axios'
import { REST_URL } from 'constants/REST_URL'
import { ResponseDataType } from 'types/api.type'
import { getSectionByType } from 'utils/function'
import { IAlbum, IArtist, IBanner, ISection, ISong } from 'types/model.type';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { setMusicData } from 'store/slices/musicSlice'

export interface IHomePageProps {
  album: ISong[];
  artistSpotlight: IArtist[];
  bannerList: IBanner[];
  newMusicToday: ISong[];
  newReleaseChart: ISong[];
  newReleases: {
    all: ISong[];
    others: ISong[];
    vPop: ISong[];
  };
  playlist: ISong[];
  recentPlaylist: IAlbum[];
  top100: ISong[];
  trendingArtists: IArtist[];
}

const HomePage = (props: IHomePageProps) => {
  const {
    album,
    artistSpotlight,
    bannerList,
    newMusicToday,
    newReleaseChart,
    newReleases,
    playlist,
    recentPlaylist,
    top100,
    trendingArtists,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMusicData(props))
  }, [props]);

  return (
    <>
      <AppHeader
        title="Musify App"
      />
      <div className={styles.container}>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo ea culpa molestiae doloribus, saepe quod velit quam, expedita aliquam unde quisquam ipsum perferendis eveniet ab accusantium porro aperiam consectetur cumque.
        </h1>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axiosClient.get<ResponseDataType>(REST_URL.HOME);
  const listItems = res.data.items;

  return {
    props: {
      album: getSectionByType(listItems, 'playlist', 'hAlbum')?.items || [],
      artistSpotlight: getSectionByType(listItems, 'artistSpotlight')?.items || [],
      bannerList: getSectionByType(listItems, 'banner')?.items || [],
      newMusicToday: getSectionByType(listItems, 'playlist', 'hAutoTheme2')?.items || [],
      newReleaseChart: getSectionByType(listItems, 'newReleaseChart')?.items || [],
      newReleases: getSectionByType(listItems, 'new-release')?.items || [],
      playlist: getSectionByType(listItems, 'playlist')?.items || [],
      recentPlaylist: getSectionByType(listItems, 'recentPlaylist')?.items || [],
      top100: getSectionByType(listItems, 'playlist', 'h100')?.items || [],
      trendingArtists: getSectionByType(listItems, 'playlist', 'hArtistTheme')?.items || [],
      listItems,
    },
  };
}

export default HomePage
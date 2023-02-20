import styles from 'styles/Home.module.css'
import AppHeader from 'components/AppHeader/AppHeader'
import { GetServerSideProps } from 'next'
import axiosClient from 'api/axios'
import { REST_URL } from 'constants/REST_URL'
import { ResponseDataType } from 'types/api.type'
import { getSectionByType } from 'utils/function'
import { IAlbum, IArtist, IBanner, ISection, ISong } from 'types/model.type';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { setMusicData } from 'store/slices/musicSlice'
import AlbumCard from 'components/Cards/AlbumCard'
import ArtistCard from 'components/Cards/ArtistCard'
import { Tabs } from 'flowbite-react'
import SongCard from 'components/Cards/SongCard'
import { setPlayList, setLoading, selectPlayer } from 'store/slices/playerSlice'
import Link from 'next/link'

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

  const { playing, currentSong } = useSelector(selectPlayer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMusicData(props))
    saveToPlaylist(newReleases.vPop, 0, false);
  }, [props]);

  const handleClickAlbum = async (item: ISong | IArtist) => {
    dispatch(setLoading(true));
    const { data } = await axiosClient.get<ResponseDataType>(`${REST_URL.PLAYLIST}/${item.encodeId}`);
    const playList = data.song.items;
    saveToPlaylist(playList, 0);
  }

  const saveToPlaylist = (playList: ISong[], index: number, play = true) => {
    dispatch(setPlayList({ playList, index, play }));
  }

  return (
    <>
      <AppHeader
        title={playing ? `${currentSong?.title} - ${currentSong?.artistsNames}` : ''}
      />

      <h2 className='mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Mới phát hành
      </h2>
      <Tabs.Group
        aria-label="Pills"
        style="pills"
        className='pl-1 mt-4'
      >
        <Tabs.Item
          title="Tất cả"
        >
          <div className="flex flex-wrap w-full">
            {newReleases.all.slice(0, 12).map((item, index) => (
              <div className="flex p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3" key={index}>
                <SongCard
                  onClick={() => saveToPlaylist(newReleases.all, index)}
                  item={item as any}
                />
              </div>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Việt Nam" active={true}>
          <div className="flex flex-wrap w-full">
            {newReleases.vPop.slice(0, 12).map((item, index) => (
              <div className="flex p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3" key={index}>
                <SongCard
                  onClick={() => saveToPlaylist(newReleases.vPop, index)}
                  item={item as any}
                />
              </div>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Quốc tế">
          <div className="flex flex-wrap w-full">
            {newReleases.others.slice(0, 12).map((item, index) => (
              <div className="flex p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3" key={index}>
                <SongCard
                  onClick={() => saveToPlaylist(newReleases.others, index)}
                  item={item as any}
                />
              </div>
            ))}
          </div>
        </Tabs.Item>
      </Tabs.Group>

      <h2 className='mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Album hôm nay
      </h2>
      <div className="flex flex-wrap w-full">
        {newMusicToday.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <Link className='w-full' href={item.link.replace('.html', '')}>
              <AlbumCard
                item={item as any}
              // onClick={() => handleClickAlbum(item)}
              />
            </Link>
          </div>
        ))}
      </div>

      <h2 className='mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Top 100
      </h2>
      <div className="flex flex-wrap w-full">
        {top100.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <Link href={item.link.replace('.html', '')}>

              <AlbumCard
                item={item as any}
              // onClick={() => handleClickAlbum(item)}
              />
            </Link>
          </div>
        ))}
      </div>

      <h2 className='mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Gần đây
      </h2>
      <div className="flex flex-wrap w-full">
        {playlist.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <Link href={item.link.replace('.html', '')}>
              <AlbumCard
                item={item as any}
              // onClick={() => handleClickAlbum(item)}
              />
            </Link>
          </div>
        ))}
      </div>

      <h2 className='mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>Ca sĩ nổi bật</h2>
      <div className="flex flex-wrap w-full">
        {trendingArtists.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <Link href={item.link.replace('.html', '')}>
              <AlbumCard
                item={item as any}
              // onClick={() => handleClickAlbum(item)}
              />
            </Link>
          </div>
        ))}
      </div>

      <h2 className='mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Có thể bạn sẽ thích
      </h2>
      <div className="flex flex-wrap w-full mt-4">
        {artistSpotlight.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <ArtistCard
              item={item as any}
            />
          </div>
        ))}
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
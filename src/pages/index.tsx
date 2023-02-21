import axiosClient from 'api/axios'
import AppHeader from 'components/AppHeader/AppHeader'
import AlbumCard from 'components/Cards/AlbumCard'
import ArtistCard from 'components/Cards/ArtistCard'
import SongCard from 'components/Cards/SongCard'
import { REST_URL } from 'constants/REST_URL'
import { Tabs } from 'flowbite-react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMusicData } from 'store/slices/musicSlice'
import { selectPlayer, setPlayList } from 'store/slices/playerSlice'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ResponseDataType } from 'types/api.type'
import { IAlbum, IArtist, IBanner, ISong } from 'types/model.type'
import { getSectionByType } from 'utils/function'

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
  weekChart: {
    banner: string;
    link: string;
  }[];
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
    weekChart,
  } = props;

  const { playing, currentSong } = useSelector(selectPlayer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMusicData(props))
    // if (!playing && !currentSong) {
    //   saveToPlaylist(newReleases.vPop, 0, false);
    // }
  }, [props]);

  const saveToPlaylist = (playList: ISong[], index: number, play = true) => {
    dispatch(setPlayList({ playList, index, play }));
  }

  return (
    <>
      <AppHeader
        title={'Nghe nhạc ' + newMusicToday[0]?.title + ' - ' + newMusicToday[0]?.artists?.map((item) => item.name).join(', ')}
        description={newMusicToday.map(item => item.sortDescription).join(', ')}
      />

      <div className="mb-8 px-2">
        <Swiper
          spaceBetween={15}
          breakpoints={{
            480: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className='mt-6'
        >
          {bannerList?.map((item, index) => (
            <SwiperSlide
              className='mb-8'
              key={index}
            >
              {item.type === 4 ? (
                <Link
                  href={`/album/${item.link.split('/')[2]}/${item.encodeId}`}
                >
                  <Image
                    src={item.banner}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="object-cover h-48 md:h-60 lg:h-80 w-full rounded-2xl"
                  />
                </Link>
              ) : (
                <Image
                  src={item.banner}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="object-cover h-48 md:h-60 lg:h-80 w-full rounded-2xl"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h2 className='text-shadow mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
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

      <h2 className='text-shadow mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Album hôm nay
      </h2>
      <div className="flex flex-wrap w-full">
        {newMusicToday.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <AlbumCard
              item={item as any}
            />
          </div>
        ))}
      </div>

      <h2 className='text-shadow mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        BXH Tuần
      </h2>
      <div className="flex flex-wrap w-full">
        {weekChart?.map((item, index) => {
          let url = item.link.replace('.html', '');
          url = `album/${url.split('/')[2]}/${url.split('/')[3]}`
          return (
            <div className="flex p-2 w-full md:w-1/3" key={index}>
              <Link
                href={url}
              >
                <Image
                  src={item.banner}
                  alt=''
                  width={500}
                  height={500}
                  className="object-cover h-32 rounded-2xl hover:opacity-80 hover:scale-105 transition duration-300"
                />
              </Link>
            </div>
          )
        })}
      </div>

      <h2 className='text-shadow mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Top 100
      </h2>
      <div className="flex flex-wrap w-full">
        {top100.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <AlbumCard
              item={item as any}
            />
          </div>
        ))}
      </div>

      <h2 className='text-shadow mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
        Gần đây
      </h2>
      <div className="flex flex-wrap w-full">
        {playlist.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <AlbumCard
              item={item as any}
            />
          </div>
        ))}
      </div>

      <h2 className='text-shadow mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>Ca sĩ nổi bật</h2>
      <div className="flex flex-wrap w-full">
        {trendingArtists.map((item, index) => (
          <div className="flex p-2 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5" key={index}>
            <AlbumCard
              item={item as any}
            />
          </div>
        ))}
      </div>

      <h2 className='text-shadow mt-16 mb-2 ml-2 text-gray-800 text-3xl font-bold dark:text-gray-100'>
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
      bannerList: getSectionByType(listItems, 'banner', 'hSlider')?.items || [],
      newMusicToday: getSectionByType(listItems, 'playlist', 'hAutoTheme2')?.items || [],
      newReleaseChart: getSectionByType(listItems, 'newReleaseChart')?.items || [],
      newReleases: getSectionByType(listItems, 'new-release')?.items || [],
      playlist: getSectionByType(listItems, 'playlist')?.items || [],
      recentPlaylist: getSectionByType(listItems, 'recentPlaylist')?.items || [],
      top100: getSectionByType(listItems, 'playlist', 'h100')?.items || [],
      trendingArtists: getSectionByType(listItems, 'playlist', 'hArtistTheme')?.items || [],
      weekChart: getSectionByType(listItems, 'weekChart')?.items || [],
    },
  };
}

export default HomePage
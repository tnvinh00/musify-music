import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { REST_URL } from 'constants/REST_URL';
import axiosClient from 'api/axios';
import { ResponseDataType } from 'types/api.type';
import AppHeader from 'components/AppHeader/AppHeader';
import Image from 'next/image';
import { ISong } from 'types/model.type';
import { convertToDateTime, shortNumber } from 'utils/function';
import SongRow from 'components/Cards/SongRow';
import { useDispatch } from 'react-redux';
import { setPlayList } from 'store/slices/playerSlice';
import Link from 'next/link';

export type AlbumPageProps = {
  albumData: ISong;
}

const AlbumPage = ({ albumData }: AlbumPageProps) => {
  const dispatch = useDispatch();

  const handleClickSong = (index: number) => {
    dispatch(setPlayList({
      playList: albumData.song?.items,
      index,
      play: true
    }));
  }

  return (
    <>
      <AppHeader
        title={albumData?.title + " - " + albumData?.artistsNames}
        description={albumData?.description}
        image={albumData?.thumbnailM}
      />
      <div className="flex flex-wrap items-start">
        <div className="flex flex-col sticky justify-center px-6 w-full lg:w-1/3">
          <Image
            src={albumData?.thumbnailM}
            alt={albumData?.title}
            width={500}
            height={500}
            className="object-cover mx-auto mb-4 shadow-sm rounded-lg hover:opacity-90 transition duration-150 ease-in-out hover:shadow-lg hover:scale-105"
          />
          <p className='text-center text-gray-600 dark:text-gray-200 font-semibold text-3xl my-3'>
            {albumData?.title}
          </p>
          <p className='text-center text-gray-600 dark:text-gray-400 hover:underline text-lg mb-2'>
            {albumData?.artists?.map((artist, index: number) => (
              <Link href={`/artist/${artist.alias}`} key={artist.alias} className='hover:underline'>
                {index !== 0 && ", "} {artist.name}
              </Link>
            ))}
          </p>
          <p className='text-center text-gray-600 dark:text-gray-400 text-base mb-2'>
            {shortNumber(albumData?.like || 0)} lượt thích
          </p>
          <p className='text-center italic text-gray-600 dark:text-gray-400 text-base'>
            Cập nhật: {convertToDateTime(albumData?.contentLastUpdate || 0)}
          </p>

        </div>
        <div className="flex flex-wrap w-full lg:w-2/3">
          <p className='text-gray-600 dark:text-gray-400 text-lg ml-3 my-3'>
            Lời tựa: <b>{albumData?.description}</b>
          </p>
          <div className="flex flex-wrap w-full pr-4 justify-between">
            <SongRow isHeader />
            {albumData?.song?.items.map((song, index) => (
              <SongRow key={song.encodeId} item={song} onClick={() => handleClickSong(index)} />
            ))}
          </div>
        </div>
      </div>
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
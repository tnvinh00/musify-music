import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import axiosClient2 from 'api/axios2';
import { REST_URL } from 'constants/REST_URL';
import { ISong } from 'types/model.type';
import SongCard from 'components/Cards/SongCard';
import SongRow from 'components/Cards/SongRow';
import { useDispatch } from 'react-redux';
import { setPlayList } from 'store/slices/playerSlice';
import AppHeader from 'components/AppHeader/AppHeader';
import { Button } from 'flowbite-react';
import Link from 'next/link';

export interface MusifyChartPageProps {
  musifyChart: ISong[];
  weekChart: {
    title: string;
    items: ISong[];
    playlistId: string;
    alias: string;
  }[];
}

const MusifyChartPage = (props: MusifyChartPageProps) => {
  const { musifyChart, weekChart } = props;

  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <AppHeader
        title={`Bảng xếp hạng #musifychart ngày ${new Date().toLocaleDateString('vi-VN')} - BXH Nhạc Việt, Nhạc Hàn, Nhạc Âu Mỹ mới nhất`}
        description={`BXH #musifychart ngày ${new Date().toLocaleDateString('vi-VN')} - BXH Nhạc Việt, Nhạc Hàn, Nhạc Âu Mỹ mới nhất`}
      />
      <h1 className='font-bold text-4xl ml-4 mb-4 text-shadow text-gray-700 dark:text-gray-200'>
        #musifychart
      </h1>
      <div className='flex flex-wrap justify-center flex-row md:px-3'>
        {musifyChart.slice(0, showMore ? musifyChart.length : 20).map((song, index) => (
          <div className="w-full" key={index}>
            <SongRow
              item={song}
              index={index + 1}
              isChart
              showStatus
              onClick={() => dispatch(setPlayList({
                playList: musifyChart,
                index: index,
                play: true,
              }))}
            />
          </div>
        ))}
        <Button
          color="purple"
          pill={true}
          className="my-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Thu gọn' : 'Hiển thị toàn bộ'}
        </Button>
      </div>

      <h1 className='font-bold text-4xl mt-8 ml-4 mb-8 text-shadow text-gray-700 dark:text-gray-200'>
        Bảng xếp hạng tuần
      </h1>
      <div className="flex w-full flex-wrap mb-8">
        {weekChart.map((item, index) => (
          <div key={index} className='flex flex-wrap flex-row w-full md:w-1/2 xl:w-1/3'>
            <div className="flex flex-wrap justify-center m-1 gap-1 p-4 rounded-2xl bg-opacity-60 bg-slate-100 dark:bg-slate-700">
              <h2 className='font-bold text-2xl mb-4 text-gray-700 dark:text-gray-200'>
                {item.title}
              </h2>
              {item.items.slice(0, 5).map((song, index) => (
                <SongCard
                  item={song}
                  key={index}
                  onClick={() => dispatch(setPlayList({
                    playList: item.items,
                    index: index,
                    play: true,
                  }))}
                />
              ))}
              <Link
                href={`/album/${item.alias}/${item.playlistId}`}
                className="mt-6 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axiosClient2.get(REST_URL.CHART);

  return {
    props: {
      musifyChart: data.RTChart.items as ISong[],
      weekChart: [
        {
          title: 'V-POP',
          items: data.weekChart.vn.items as ISong[],
          playlistId: data.weekChart.vn.playlistId,
          alias: 'BXH-tuan-V-POP'
        },
        {
          title: 'K-POP',
          items: data.weekChart.korea.items as ISong[],
          playlistId: data.weekChart.korea.playlistId,
          alias: 'BXH-tuan-K-POP'
        },
        {
          title: 'US-UK',
          items: data.weekChart.us.items as ISong[],
          playlistId: data.weekChart.us.playlistId,
          alias: 'BXH-tuan-US-UK'
        }
      ],
    }
  }
}

export default MusifyChartPage
import SongRow from 'components/Cards/SongRow';
import { Button } from 'flowbite-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPlayList } from 'store/slices/playerSlice';
import { ISong } from 'types/model.type';

export interface IListChartSongProps {
  items: ISong[];
  title: string;
}

const ListChartSong = (props: IListChartSongProps) => {
  const { items, title } = props;

  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <h1 className='font-bold text-4xl ml-4 mb-4 text-shadow text-gray-700 dark:text-gray-200'>
        {title}
      </h1>
      <div className='flex flex-wrap justify-center flex-row md:px-3'>
        {items.slice(0, showMore ? items.length : 20).map((song, index) => (
          <div className="w-full" key={index}>
            <SongRow
              item={song}
              index={index + 1}
              isChart
              showStatus
              onClick={() => dispatch(setPlayList({
                playList: items,
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
    </>
  )
}

export default ListChartSong
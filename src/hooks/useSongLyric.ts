import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectPlayer, setLyric } from "store/slices/playerSlice";

const useSongLyric = () => {
  const dispatch = useDispatch();
  const playerState = useSelector(selectPlayer);
  const { lyric, lyricUrl, currentTime, currentSong, playing } = playerState;

  useEffect(() => {
    if (!lyricUrl) return;
    const fetchData = async () => {
      const response = await fetch(lyricUrl);
      const text = await response.text();
      dispatch(setLyric(text));
    }
    dispatch(setLyric(''));
    fetchData();
  }, [lyricUrl]);

  // Memoize the values returned by the hook using useMemo
  const memoizedValues = useMemo(() => ({
    lyric,
    playing,
    currentTime,
    currentSong,
  }), [lyric, playing, currentTime, currentSong]);

  return memoizedValues;
}

export default useSongLyric;
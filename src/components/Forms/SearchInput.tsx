import { Spinner, TextInput } from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useCallback, useRef, useState, useEffect } from 'react';
import { ApiSuggestKeywordType } from 'types/api.type';
import { REST_URL } from 'constants/REST_URL';
import axiosClient2 from 'api/axios2';
import debounce from 'lodash/debounce';
import SongCard from 'components/Cards/SongCard';
import { useDispatch } from 'react-redux';
import { setPlayList } from 'store/slices/playerSlice';

const SearchInput = () => {
  const [showBox, setShowBox] = useState(false)
  const [suggestions, setSuggestions] = useState<any>()
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')

  const handleSearch = (keyword: string) => {
    setKeyword(keyword)
    debouncedHandleInputChange(keyword);
  }

  // Sử dụng hàm debounce để gọi hàm handleInputChange sau 1000ms kể từ lần cuối cùng giá trị của inputValue được thay đổi
  const debouncedHandleInputChange = useCallback(
    debounce((value) => getSuggestions(value), 1000), []
  );

  const getSuggestions = async (keyword: string) => {
    setLoading(true)
    setSuggestions([])
    const res = await axiosClient2.get<ApiSuggestKeywordType>(REST_URL.SUGGEST, {
      params: {
        keyword: keyword
      }
    });
    setSuggestions(res.data.items);
    setLoading(false)
  }

  const onClickResult = (keyword: string) => {
    setKeyword(keyword)
    handleSearch(keyword)
    inputRef.current?.focus()
  }

  const handleClickSong = (item: any) => {
    dispatch(
      setPlayList({
        playList: [item],
        index: 0,
        play: true,
        concat: true
      })
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowBox(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef])

  return (
    <div className='relative' ref={divRef}>
      <TextInput
        ref={inputRef}
        value={keyword}
        autoFocus
        onFocus={() => setShowBox(true)}
        // onBlur={() => setShowBox(false)}
        onChange={(e) => handleSearch(e.target.value)}
        id="input-success"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, album..."
        required={true}
        icon={AiOutlineSearch}
        className="text-center text-lg w-auto mx-2 md:w-80 lg:w-[40rem]"
        color="success"
      />
      {showBox && keyword &&
        <div className="absolute inset-x-0 w-full ml-1 top-11 z-20 side-sheet overflow-y-scroll max-h-layout p-4 bg-gray-100 dark:bg-main rounded-md shadow-2xl transition-all duration-300">
          <p className='text-gray-700 dark:text-gray-400 text-lg underline font-semibold'>Từ khóa liên quan:</p>
          {loading && (
            <Spinner size="md" className='w-full my-6' />
          )}
          {suggestions && suggestions[0]?.keywords.map((item: any, index: number) => (
            <p
              key={index}
              onClick={() => onClickResult(item.keyword)}
              className="text-gray-700 p-3 cursor-pointer inline-flex w-full items-center dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-700 text-base"
            >
              <AiOutlineSearch className='mr-2' />{item.keyword}
            </p>
          ))}

          <p className='text-gray-700 dark:text-gray-400 text-lg underline font-semibold mt-4'>Gợi ý kết quả:</p>
          {loading && (
            <Spinner size="md" className='w-full my-6' />
          )}
          <div className="flex flex-wrap">
            {suggestions && suggestions[1]?.suggestions.map((item: any, index: number) => (
              <div key={index} className="w-full lg:w-1/2 p-1.5">
                <SongCard item={item} onClick={() => handleClickSong(item)}/>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default SearchInput
import { Spinner } from 'flowbite-react'
import Image from 'next/image';
import React from 'react'

const Loader = (props: { loading: boolean }) => {
  const { loading } = props;
  return (
    loading ? <div className='absolute top-0 z-50 bg-slate-400 bg-opacity-70 left-0 h-screen w-screen'>
      <div className="flex flex-col justify-center items-center h-full">
        <Image
          src="images/loading.svg"
          alt="loading"
          width={120}
          height={120}
        />
        <div className='flex text-gray-700 dark:text-gray-200'>
          Đang tải...
        </div>
      </div>
    </div >
      : null
  )
}

export default Loader
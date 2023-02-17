import { Spinner } from 'flowbite-react'
import React from 'react'

const Loader = (props: { loading: boolean }) => {
  const { loading } = props;
  return (
    loading ? <div className='absolute top-0 z-50 bg-slate-50 bg-opacity-50 left-0 h-screen w-screen flex justify-center items-center'>
      <Spinner
        size="xl"
      />
    </div >
      : null
  )
}

export default Loader
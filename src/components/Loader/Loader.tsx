import { Spinner } from 'flowbite-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='absolute top-0 left-0 h-screen w-screen flex justify-center items-center'>
      <Spinner
        aria-label="Extra large spinner example"
        size="xl"
      />
    </div>
  )
}

export default Loader
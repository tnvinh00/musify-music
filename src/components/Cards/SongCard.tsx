import React from 'react'

const SongCard = () => {
  return (
    <div aria-label="card-overlay" className="relative w-[250px] h-[300px]">
      <img
        src="https://bit.ly/3zzCTUT"
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute flex flex-col p-2 bg-white rounded bottom-5 left-5 right-5 gap-y-1">
        <h3 className="text-base font-bold">Maria</h3>
        <span className="text-sm text-gray-400">24 years old</span>
      </div>
    </div>
  )
}

export default SongCard
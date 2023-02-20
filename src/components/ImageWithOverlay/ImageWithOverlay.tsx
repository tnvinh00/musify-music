import Image from 'next/image';
import React from 'react'
import { BsPlayCircle } from 'react-icons/bs';

export type ImageWithOverlayProps = {
  src: string;
  overlay?: React.ReactNode;
  className?: string;
}

const ImageWithOverlay = (props: ImageWithOverlayProps) => {
  const { src, overlay, className } = props;

  return (
    <div className='relative'>
      <Image
        src={src}
        alt=""
        width={500}
        height={500}
        className={`object-cover w-full h-full shadow-sm rounded-lg hover:opacity-80 transition duration-150 ease-in-out hover:shadow-lg hover:scale-105 ${className}`}
      />
      {overlay && (
        <div className='absolute inset-0 flex items-center justify-center'>
          {overlay}
        </div>
      )}
    </div>
  )
}

ImageWithOverlay.defaultProps = {
  className: '',
  overlay: <BsPlayCircle size={40} />,
}

export default ImageWithOverlay
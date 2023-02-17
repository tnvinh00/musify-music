import React from 'react'
import { useEffect, useRef } from 'react';

export type IRangeSlider = {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const RangeSlide = (props: IRangeSlider) => {
  const { className, value, onChange } = props;
  const [val, setVal] = React.useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(+e.target.value)
    onChange(+e.target.value)
  }

  useEffect(() => {
    setVal(value)
  }, [value])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundSize = `${val}% 100%`;
    }
  }, [val])

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className=''>
      <input
        id="small-range"
        type="range"
        title=''
        value={val}
        ref={ref}
        onChange={handleChange}
        className={className + " h-1 mb-3 rounded-lg cursor-pointer range-sm appearance-none bg-gray-400 bg-no-repeat bg-slider"}
      />
    </div>
  )
}

RangeSlide.defaultProps = {
  sizing: 'md',
  color: 'indigo',
  value: 40,
  onChange: () => { }
}

export default RangeSlide
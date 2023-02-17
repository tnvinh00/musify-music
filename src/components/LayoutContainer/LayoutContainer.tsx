import React from 'react'
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectPlayer } from 'store/slices/playerSlice';

export type LayoutContainerProps = {
  children?: React.ReactNode;
}

const LayoutContainer = (props: LayoutContainerProps) => {
  const { children } = props;

  const { loading } = useSelector(selectPlayer);

  return (
    <div className='px-3 pt-8 h-layout w-full overflow-y-overlay main-layout'>
      <Loader loading={loading} />
      {children}
    </div>
  )
}

export default LayoutContainer
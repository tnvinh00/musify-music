import React from 'react'
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectPlayer } from 'store/slices/playerSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type LayoutContainerProps = {
  children?: React.ReactNode;
}

const LayoutContainer = (props: LayoutContainerProps) => {
  const { children } = props;

  const router = useRouter();

  const { loading } = useSelector(selectPlayer);

  const ref = React.useRef<HTMLDivElement>(null);

  // scroll to top when route change
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [router.pathname, router.query]);

  return (
    <div className='px-3 pt-8 h-layout w-full overflow-y-overlay main-layout' ref={ref}>
      <Loader loading={loading} />
      {children}
    </div>
  )
}

export default LayoutContainer
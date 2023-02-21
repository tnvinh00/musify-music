import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Roboto } from '@next/font/google'
import { Provider } from 'react-redux';
import { wrapper } from 'store/store';
import NavBar from 'components/NavBar/NavBar';
import LayoutContainer from 'components/LayoutContainer/LayoutContainer';
import { Flowbite } from 'flowbite-react';
import SideBar from 'components/SideBar/SideBar';
import PlayerControl from 'components/PlayerControl/PlayerControl';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-family',
})

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <Provider store={store}>
      <style jsx global>
        {`
          :root {
            --font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Flowbite>
        <main className={`${inter.variable} font-sans flex flex-wrap bg-white dark:bg-layout overflow-hidden h-screen`}>
          <NavBar />
          <div className="flex w-full">
            <SideBar />
            <LayoutContainer>
              {loading ? <Loader loading={loading} /> : (
                <Component {...pageProps} />
              )}
            </LayoutContainer>
          </div>
          <PlayerControl />
        </main>
      </Flowbite>
    </Provider>
  )
}

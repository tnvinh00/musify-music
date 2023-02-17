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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-family',
})

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
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
              <Component {...pageProps} />
            </LayoutContainer>
          </div>
          <PlayerControl />
        </main>
      </Flowbite>
    </Provider>
  )
}

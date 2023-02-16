import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';
import NavBar from 'components/NavBar/NavBar';
import LayoutContainer from 'components/LayoutContainer/LayoutContainer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <main className={`${inter.variable} font-sans`}>
        <NavBar />
        <LayoutContainer >
          <Component {...pageProps} />
        </LayoutContainer>
      </main>
    </Provider>
  )
}

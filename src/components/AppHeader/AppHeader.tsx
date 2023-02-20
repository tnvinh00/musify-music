import React from 'react'
import Head from 'next/head'

export type AppHeaderProps = {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
}

const AppHeader = (props: AppHeaderProps) => {
  const { title, description, image, children } = props;
  return (
    <Head>
      <title>{title ? title +' | Musify Music' : 'Musify Music'}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="Musify Music" />
      <meta name="url" content="https://musify-music.vercel.app/" />
      <meta name="og:url" content="https://musify-music.vercel.app/" />
      <meta name="og:image" content={image} />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  )
}

AppHeader.defaultProps = {
  title: 'Home',
  description: 'Nghe nhạc online cùng Musify Music',
  image: ''
}

export default AppHeader
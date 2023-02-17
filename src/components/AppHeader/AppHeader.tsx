import React from 'react'
import Head from 'next/head'

export type AppHeaderProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const AppHeader = (props: AppHeaderProps) => {
  const { title, description, children } = props;
  return (
    <Head>
      <title>{title ? title +' | Musify Music' : 'Musify Music'}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  )
}

AppHeader.defaultProps = {
  title: 'Home',
  description: 'Next.js App with TypeScript, Tailwind CSS, and Flowbite React UI components',
}

export default AppHeader
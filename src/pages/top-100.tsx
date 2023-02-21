import axiosClient from 'api/axios'
import AppHeader from 'components/AppHeader/AppHeader'
import TypeSection from 'components/Sections/TypeSection'
import { REST_URL } from 'constants/REST_URL'
import { GetServerSideProps } from 'next'
import React from 'react'
import { ISection } from 'types/model.type'

export interface ITop100PageProps {
  sections: ISection[];
}

const Top100Page = (props: ITop100PageProps) => {
  const { sections } = props;

  return (
    <div>
      <AppHeader
        title={`Top 100 bài hát ${sections.map(item => item.title).join(', ')}}`}
        description={`Top 100 bài hát ${sections.map(item => item.title).join(', ')}}`}
      />
      {sections.map((item, index) => (
        <TypeSection key={index} section={item} />
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axiosClient.get(REST_URL.TOP100);

  return {
    props: {
      sections: data,
    }
  }
}

export default Top100Page
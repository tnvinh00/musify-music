import React from 'react'

export type LayoutContainerProps = {
  children?: React.ReactNode;
}

const LayoutContainer = (props: LayoutContainerProps) => {
  const { children } = props;
  return (
    <div className='container'>
      {children}
    </div>
  )
}

export default LayoutContainer
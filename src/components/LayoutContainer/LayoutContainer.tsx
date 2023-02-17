import React from 'react'

export type LayoutContainerProps = {
  children?: React.ReactNode;
}

const LayoutContainer = (props: LayoutContainerProps) => {
  const { children } = props;
  return (
    <div className='px-3 h-layout overflow-y-overlay main-layout'>
      {children}
    </div>
  )
}

export default LayoutContainer
import React from 'react'

const ContainerHeading: React.FC<{text: string}> = ( {text} ) => {
  return (
    <div className='font-bold text-[0.9375rem] text-[#7191A5]'>{text}</div>
  )
}

export default ContainerHeading
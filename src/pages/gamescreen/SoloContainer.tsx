import React from 'react'
import ContainerHeading from './ContainerHeading'

const SoloContainer: React.FC<{title: string}> = ( {title} ) => {
  return (
    <div className='rounded-[5px] bg-[#DFE7EC] h-[70px] w-[151px] flex flex-col justify-between items-center py-[10px]'>
      <ContainerHeading text={title}/>
      <p></p>
    </div>
  )
}

export default SoloContainer
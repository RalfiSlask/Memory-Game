import React from 'react'
import ContainerHeading from '../ContainerHeading'

type SoloPropsType = {
  title: string;
  gameMetric?: string;
};

const SoloContainer: React.FC<SoloPropsType> = ( {title, gameMetric} ) => {
  return (
    <div className='rounded-[5px] bg-[#DFE7EC] h-[70px] w-[151px] md:w-[255px] flex flex-col md:flex-row md:px-6 justify-between items-center py-[10px]'>
      <ContainerHeading text={title}/>
      <p className='font-bold text-[1.5rem] md:text-[2rem] text-[#304859]'>{gameMetric}</p>
    </div>
  )
}

export default SoloContainer
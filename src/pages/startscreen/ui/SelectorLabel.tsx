import React from 'react'

const SelectorLabel: React.FC<{text: string}> = ( {text} ) => {
  return (
    <label className='text-[0.9375rem] md:text-[1.250rem] font-bold text-[#7191A5]'>{text}</label>
  )
}

export default SelectorLabel
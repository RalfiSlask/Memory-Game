import React from 'react'

const SelectorLabel: React.FC<{text: string}> = ( {text} ) => {
  return (
    <div className='text-[0.9375rem] font-bold text-[##7191A5]'>{text}</div>
  )
}

export default SelectorLabel
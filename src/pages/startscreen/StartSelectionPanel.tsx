import { ReactNode } from 'react'
import SelectorLabel from './ui/SelectorLabel'

const StartSelectionPanel: React.FC<{title: string, children?: ReactNode}> = ( {title, children} ) => {
  return (
    <div className='flex flex-col gap-[11px]'>
      <SelectorLabel text={title}/>
      {children}
    </div>
  )
}

export default StartSelectionPanel
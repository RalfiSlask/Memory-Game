import { StartMenuButtonPropsType } from '../../../types/types'

const SmallButton: React.FC<StartMenuButtonPropsType> = ( {label, selected, onClick} ) => {
  return (
    <div onClick={onClick} className={`${selected ? "bg-[#304859]" : "bg-[#BCCED9] hover:bg-[#6395B8]"} h-10 md:h-[56px] w-[62px] md:w-[119px] rounded-[26px] flex justify-center items-center text-white text-[1rem] md:text-[1.625rem] font-bold cursor-pointer`}>{label}</div>
  )
}

export default SmallButton
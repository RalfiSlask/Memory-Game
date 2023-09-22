import ContainerHeading from "../ContainerHeading";

const MultiplayerContainer: React.FC< {label: string} > = ( {label} ) => {

  return (
    <div className='rounded-[5px] bg-[#DFE7EC] h-[70px] md:h-20 w-[64px] xl:h-20 md:w-[164px] xl:w-[255px] flex flex-col xl:flex-row items-center md:items-start xl:items-center justify-center md:px-4 xl:px-6 xl:justify-between'>
        <ContainerHeading text={label}/>
        <p className="font-bold text-[#304859] text-[1.5rem] xl:text-[2rem]">0</p>
    </div>
  )
}

export default MultiplayerContainer
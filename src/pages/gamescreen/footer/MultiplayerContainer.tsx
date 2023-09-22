import ContainerHeading from "../ContainerHeading";
import UIContext from "../../../context/UIContext";
import { useContext } from "react";

const MultiplayerContainer: React.FC< {label: string} > = ( {label} ) => {
  const uiContext = useContext(UIContext);

  if(!uiContext) {
      throw new Error("Does not exist in contextProvider")
  };

  const { screenSize } = uiContext; 

  return (
    <div className="flex flex-col items-center gap-6">
      <div className='rounded-[5px] bg-[#DFE7EC] h-[70px] md:h-20 w-[64px] xl:h-20 md:w-[164px] xl:w-[255px] flex flex-col xl:flex-row items-center md:items-start xl:items-center justify-center md:px-4 xl:px-6 xl:justify-between'>
          <ContainerHeading text={label}/>
          <p className="font-bold text-[#304859] text-[1.5rem] xl:text-[2rem]">0</p>
      </div>
      {screenSize !== "small" && <p className="uppercase font-bold text-[0.625rem] xl:text-[0.8125rem] tracking-[5px]">current turn</p>}
    </div>
  )
}

export default MultiplayerContainer
import Context from "../../context/Context";
import UIContext from "../../context/UIContext";
import { useContext, useEffect } from "react";
import FourByFourMemoryPiece from "./FourByFourMemoryPiece";
import SixBySixMemoryPiece from "./SixBySixMemoryPiece";

const MemoryContainer = () => {
  const context = useContext(Context);
  const uiContext = useContext(UIContext);

  if(!context || !uiContext) {
      throw new Error("Does not exist in contextProvider")
  };

  const { selectedSettings } = context;
  const memoryArray = Array.from( {length: selectedSettings.grid === "4x4" ? 16 : 36} )

  useEffect(() => {
    console.log(selectedSettings)
  })

  return (
    <div className={`${selectedSettings.grid === "4x4" ? "gap-3 md:gap-5" : "gap-[9px] md:gap-4"} w-full flex flex-wrap h-[327px] justify-center md:min-w-[532px] md:max-w-[572px] md:min-h-[532px] md:max-h-[572px] mt-20 md:mt-[157px] xl:mt-[85px] mb-[102px] md:mb-[126px] xl:mb-[102px]`}>
      {memoryArray.map((piece, index) => {
        return selectedSettings.grid === "4x4" ? <FourByFourMemoryPiece key={index}/> : <SixBySixMemoryPiece key={index}/>
      })}
    </div>
  )
}

export default MemoryContainer
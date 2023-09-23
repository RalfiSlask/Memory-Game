import Context from "../../context/Context";
import UIContext from "../../context/UIContext";
import { useContext } from "react";
import MemoryPiece from "./MemoryPiece";


const MemoryContainer = () => {
  const context = useContext(Context);
  const uiContext = useContext(UIContext);

  if(!context || !uiContext) {
      throw new Error("Does not exist in contextProvider")
  };

  const { selectedSettings, numbersList } = context;
  const memoryArray = Array.from( {length: selectedSettings.grid === "4x4" ? 16 : 36} )
  const fourByFourDimensions = "w-[72.53px] h-[72.53px] md:w-[118px] md:h-[118px] rounded-[59px]";
  const sixBysixDimensions = "w-[46.878px] h-[46.878px] md:w-[82px] md:h-[82px] rounded-[41px]";

  return (
    <div className={`${selectedSettings.grid === "4x4" ? "gap-3 md:gap-5" : "gap-[9px] md:gap-4"} w-full flex flex-wrap h-[327px] justify-center md:min-w-[532px] md:max-w-[572px] md:min-h-[532px] md:max-h-[572px] mt-20 md:mt-[157px] xl:mt-[85px] mb-[102px] md:mb-[126px] xl:mb-[102px]`}>
      {memoryArray.map((_, index) => {
        return selectedSettings.grid === "4x4" ? 
        <MemoryPiece
          key={index}
          id={index}
          dimensions={fourByFourDimensions}
          memoryItem={numbersList[index]}
          pieceLarge={true}
        /> : 
        <MemoryPiece
          key={index}
          id={index}
          dimensions={sixBysixDimensions}
          memoryItem={numbersList[index]}
          pieceLarge={false}
          />
      })}
    </div>
  )
}

export default MemoryContainer
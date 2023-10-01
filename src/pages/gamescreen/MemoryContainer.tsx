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

  const { selectedSettings, memoryPiecesList } = context;
  const memoryArray = Array.from( {length: selectedSettings.grid === "4x4" ? 16 : 36} )
  const fourByFourDimensions = "w-[72.53px] h-[72.53px] md:w-[118px] md:h-[118px] rounded-[59px]";
  const sixBysixDimensions = "w-[46.878px] h-[46.878px] md:w-[82px] md:h-[82px] rounded-[41px]";
  const dimensions = selectedSettings.grid === "4x4" ? fourByFourDimensions : sixBysixDimensions;

  return (
    <div className={`${selectedSettings.grid === "4x4" ? "gap-3 md:gap-5" : "gap-[9px] md:gap-4"} w-full flex flex-wrap h-[327px] justify-center md:min-w-[532px] md:max-w-[572px] md:min-h-[532px] md:max-h-[572px] mt-20 md:mt-[157px] xl:mt-[85px] mb-[102px] md:mb-[126px] xl:mb-[102px]`}>
      {memoryArray.map((_, index) => {
        return <MemoryPiece
          key={index}
          index={index}
          dimensions={dimensions}
          pieceLarge={selectedSettings.grid === "4x4" ? true : false}
          memoryPiece={memoryPiecesList[index]}
        /> 
      })}
     
    <div>
        <svg width="38" height="40" viewBox="0 0 38 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 2 Q38 20 19 38 Q0 20 19 2 M19 38 L19 26" fill="black"/>
        </svg>
    </div>


    </div>
  )
}

export default MemoryContainer
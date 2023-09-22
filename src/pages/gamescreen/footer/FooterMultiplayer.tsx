
import { useContext, useEffect } from "react";
import Context from "../../../context/Context";
import MultiplayerContainer from "./MultiplayerContainer";
import UIContext from "../../../context/UIContext";

const FooterMultiplayer = () => {
  const context = useContext(Context);
  const uiContext = useContext(UIContext);

  if(!context || !uiContext) {
      throw new Error("Does not exist in contextProvider")
  };

  let number = 0;

  const { selectedSettings } = context;
  const { screenSize } = uiContext;
  // creating an array that is the length of numbers of players selected to be used for rendering components
  const multiplayerArray = Array.from( {length: selectedSettings.playerNumbers} , () =>  number += 1 )

  useEffect(() => {
    console.log(multiplayerArray)
  })

  return (
    <div className="flex justify-between items-end gap-[23px] md:gap-[11px] xl:gap-[30px]">
      {multiplayerArray.map((number, index) => {
        const numberAsString = number.toString();
        const label = screenSize === "small" ? `P${numberAsString}` : `Player ${numberAsString}`;
        return <MultiplayerContainer 
          key={index} 
          label={label}
        /> }
      )}
    </div>
  )
}

export default FooterMultiplayer
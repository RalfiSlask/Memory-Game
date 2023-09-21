
import { useContext, useEffect } from "react";
import Context from "../../../context/Context";
import MultiplayerContainer from "./MultiplayerContainer";

const FooterMultiplayer = () => {
  const context = useContext(Context);

  if(!context) {
      throw new Error("Does not exist in contextProvider")
  };

  const { selectedSettings } = context;
  // creating an array that is the length of numbers of players selected to be used for rendering components
  const multiplayerArray = Array.from( {length: selectedSettings.playerNumbers} , () => 0)

  return (
    <div className="flex justify-between items-end gap-[23px] md:gap-[11px] xl:gap-[30px]">
      {multiplayerArray.map((_, index) => <MultiplayerContainer key={index} />)}
    </div>
  )
}

export default FooterMultiplayer
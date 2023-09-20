import LargeButton from "../startscreen/ui/LargeButton";
import UIContext from "../../context/UIContext"
import { useContext } from "react";

const MenuModal = () => {
    const uiContext = useContext(UIContext);

    if(!uiContext) {
        throw new Error("Does not exist in contextProvider")
    }

    const { screenSize, closeMenuModal } = uiContext;

    const handleClickOnResume = () => {
        closeMenuModal();
    };

  return (
    <div className="flex flex-col justify-between w-[327px] h-[224px] p-6 bg-[#F2F2F2] rounded-[10px] absolute z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <LargeButton 
            text="Restart" 
            color="#FDA214"
        />
        <LargeButton 
            text="New Game" 
            color="#DFE7EC" 
            textColor="#304859"
        />
        <LargeButton 
            text="Resume Game" 
            color="#DFE7EC" 
            textColor="#304859"
            onClick={handleClickOnResume}
        />
    </div>
  )
}

export default MenuModal
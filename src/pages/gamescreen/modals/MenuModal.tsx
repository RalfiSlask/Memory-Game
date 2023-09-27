import LargeButton from "../../startscreen/ui/LargeButton";
import UIContext from "../../../context/UIContext"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../context/Context";

const MenuModal = () => {
    const uiContext = useContext(UIContext);
    const context = useContext(Context)

    if(!uiContext || !context) {
        throw new Error("Does not exist in contextProvider")
    }

    const { closeModal } = uiContext;
    const { navigateToMainMenu, restartGame, resumeGame } = context;
    const navigate = useNavigate();

    const handleClickOnRestart = () => {
        closeModal("menu");
        restartGame();
    };

    const handleClickOnResume = () => {
        closeModal("menu");
        resumeGame();
    };

    const handleClickOnNewGame = () => {
        navigateToMainMenu(navigate)
        closeModal("menu");
    };

  return (
    <div className="flex flex-col justify-between w-[327px] h-[224px] p-6 bg-[#F2F2F2] rounded-[10px] absolute z-50 left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2">
        <LargeButton 
            text="Restart" 
            color="#FDA214"
            onClick={handleClickOnRestart}
        />
        <LargeButton 
            text="New Game" 
            color="#DFE7EC" 
            textColor="#304859"
            onClick={handleClickOnNewGame}
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
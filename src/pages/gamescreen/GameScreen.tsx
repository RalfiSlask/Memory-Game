import Lightbox from "../../components/ui/Lightbox";
import GameHeader from "./GameHeader";
import UIContext from "../../context/UIContext";
import { useContext } from "react";
import MenuModal from "./MenuModal";
import GameFooter from "./GameFooter";

const GameScreen = () => {
    const uiContext = useContext(UIContext);

    if(!uiContext) {
        throw new Error("Does not exist in contextProvider")
    }

    const { modals } = uiContext;

  return (
    <div className="flex flex-col items-center">
        <div className="w-[327px] md:w-[689px] xl:w-[1110px] mt-6 md:mt-[37px] xl:mt-[67px]">
            <GameHeader />
            <main></main>
        </div>
        {modals.menu && <MenuModal />}
        {modals.lightbox && <Lightbox />}
        <GameFooter />
    </div>
  )
}

export default GameScreen